const calculateEndDate = (startDate: string, days: number): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days - 1);
  return endDate;
};

export default calculateEndDate;
