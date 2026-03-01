export const formatRelativeTime = (timestamp: number): string => {
  if (!timestamp) return 'No Date';
  
  const now = Date.now();
  const diff = timestamp - now;
  const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Tomorrow';
  if (daysDiff === -1) return 'Yesterday';
  
  if (daysDiff > 0 && daysDiff < 7) {
    return `In ${daysDiff} days`;
  }
  if (daysDiff < 0 && daysDiff > -7) {
    return `${Math.abs(daysDiff)} days ago`;
  }

  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
