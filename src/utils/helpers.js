
export const thenCallbackRQ = ({ data }) => data;

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return date.toLocaleString('en-US', {
      weekday: 'long', // e.g. "Monday"
      year: 'numeric', // e.g. "2024"
      month: 'long', // e.g. "December"
      day: 'numeric', // e.g. "21"
      hour: 'numeric', // e.g. "5 PM"
      minute: 'numeric', // e.g. "58"
      second: 'numeric', // e.g. "12"
      hour12: true, // 12-hour clock with AM/PM
    });
};
