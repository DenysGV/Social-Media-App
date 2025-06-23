function timeAgo(createTimestamp: number) {
   const now = new Date().getTime();
   const diffInSeconds = Math.floor((now - createTimestamp) / 1000);

   if (diffInSeconds < 60) {
      return "Just now";
   } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min ago`;
   } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} h ago`;
   } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} d ago`;
   } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} w ago`;
   } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} m ago`;
   } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} y ago`;
   }
}

export default timeAgo