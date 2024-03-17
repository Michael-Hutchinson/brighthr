const formatAbsenceType = (type: string): string => {
  switch (type) {
    case 'ANNUAL_LEAVE':
      return 'Annual Leave';
    case 'SICKNESS':
      return 'Sickness';
    case 'MEDICAL':
      return 'Medical';
    default:
      console.warn(`Unexpected absence type: ${type}`);
      return type;
  }
};

export default formatAbsenceType;
