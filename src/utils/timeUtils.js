// src/utils/timeUtils.js
export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInMs = now - postDate;
  const diffInMinutes = diffInMs / (1000 * 60);
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 1) {
    return 'Ahora mismo';
  } else if (diffInMinutes < 60) {
    const minutes = Math.floor(diffInMinutes);
    return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    const days = Math.floor(diffInDays);
    return `Hace ${days} día${days > 1 ? 's' : ''}`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
  }
};