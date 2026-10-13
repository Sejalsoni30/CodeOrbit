export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const calculateStreak = (activityDates = []) => {
  if (!activityDates.length) return 0;
  // Calculation helper for streak
  return activityDates.length;
};
