import formatDate from './formatDate';

describe('formatDate', () => {
  it('correctly formats a date string to UK format', () => {
    const inputDate = '2020-01-01T00:00:00.000Z';
    const expectedOutput = '01 January 2020';
    expect(formatDate(inputDate)).toBe(expectedOutput);
  });

  it('correctly formats a leap day to UK format', () => {
    const inputDate = '2020-02-29T00:00:00.000Z';
    const expectedOutput = '29 February 2020';
    expect(formatDate(inputDate)).toBe(expectedOutput);
  });
});
