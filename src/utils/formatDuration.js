export function formatDuration(days) {
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function formatHours(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours === 1) return '1 hour';
  return `${hours} hours`;
}
