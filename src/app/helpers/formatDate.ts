const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
};

export default formatDate;
