import formatAbsenceType from './formatAbsenseType';

describe('formatAbsenceType', () => {
  it('should return "Annual Leave" for "ANNUAL_LEAVE"', () => {
    expect(formatAbsenceType('ANNUAL_LEAVE')).toBe('Annual Leave');
  });

  it('should return "Sickness" for "SICKNESS"', () => {
    expect(formatAbsenceType('SICKNESS')).toBe('Sickness');
  });

  it('should return "Medical" for "MEDICAL"', () => {
    expect(formatAbsenceType('MEDICAL')).toBe('Medical');
  });

  it('should return the original type for unexpected absence types', () => {
    const unexpectedType = 'UNEXPECTED_TYPE';
    expect(formatAbsenceType(unexpectedType)).toBe(unexpectedType);
  });
});
