const calculateEndDate = (startDate: string, days: number): string => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days - 1);
  return endDate.toISOString().split('T')[0];
};

export default calculateEndDate;
