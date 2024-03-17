import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('Header', () => {
  it('renders the header component correctly', () => {
    render(<Header />);
    expect(screen.getByText('Absence Manager')).toBeInTheDocument();
  });
});
