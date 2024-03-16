import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useAbsencesWithConflicts } from './useAbsences';
import { ReactNode } from 'react';
import { Absence } from '@/types/types';

// Mock the global fetch function
global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

interface ConflictResponse {
  conflicts: boolean;
}

interface WrapperProps {
  children: ReactNode;
}

// Utility function to wrap the hook within the QueryClientProvider
const wrapper = ({ children }: WrapperProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAbsencesWithConflicts', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should initially be in loading state', () => {
    const { result } = renderHook(() => useAbsencesWithConflicts(), {
      wrapper,
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('should return absences with conflicts', async () => {
    // Mock data
    const absences: Absence[] = [
      {
        id: 0,
        startDate: '2022-05-28T04:39:06.470Z',
        days: 9,
        absenceType: 'SICKNESS',
        employee: {
          firstName: 'Rahaf',
          lastName: 'Deckard',
          id: '2ea05a52-4e31-450d-bbc4-5a6c73167d17',
        },
        approved: true,
      },
    ];

    const conflictsResponse: ConflictResponse = { conflicts: true };

    // Setup fetch mock to return the mock data
    mockFetch.mockImplementation((url: string) => {
      if (url.includes('absences')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(absences),
        });
      }
      if (url.includes('conflict')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(conflictsResponse),
        });
      }
      return Promise.reject(new Error('Not Found'));
    });

    // Use the renderHook function to test the hook
    const { result } = renderHook(() => useAbsencesWithConflicts(), {
      wrapper,
    });

    // Wait for the hook to finish loading
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assertions
    expect(result.current.data).toEqual([
      {
        ...absences[0],
        conflicts: true,
      },
    ]);
    expect(fetch).toHaveBeenCalledTimes(2); // One for absences and one for conflicts
  });
});
