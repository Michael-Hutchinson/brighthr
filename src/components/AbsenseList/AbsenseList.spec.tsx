import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AbsenceList from './AbsenseList';
import { useAbsencesWithConflicts } from '@/app/hooks/useAbsences';
jest.mock('@/app/hooks/useAbsences');

describe('AbsenceList', () => {
  it('displays loading state correctly', () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    render(<AbsenceList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Test error';
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      error: { message: errorMessage },
    });
    render(<AbsenceList />);
    expect(
      screen.getByText(`An error occurred: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it('show employee table', () => {
    (useAbsencesWithConflicts as jest.Mock).mockReturnValue({
      data: [
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
      ],
      isLoading: false,
    });
    render(<AbsenceList />);
    expect(screen.getByText('Employee Name')).toBeInTheDocument();
  });
});
