// Function to initialize a date object based on the given date and time format
export function initializeDate(dateString, timeString) {
  return new Date(`${dateString}T${timeString}`);
}

// Function to format a Date object to YYYY-MM-DD format
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Function to format a Date object to HH:MM:SS format
export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Function to change the day
export function changeDay(date, daysToAdd) {
  date.setDate(date.getDate() + daysToAdd); // Add or subtract days
  return date;
}

// Function to change the hour
export function changeHour(date, hoursToAdd) {
  date.setHours(date.getHours() + hoursToAdd); // Add or subtract hours
  return date;
}
