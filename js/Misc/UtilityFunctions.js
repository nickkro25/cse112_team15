// Contains all utility functions that can be used across the entire app

/**
 * Used to convert a time to string that can be displayed
 * @param {Number} duration Amount of seconds to convert to string
 * @returns {String} Duration converted to string
 */
export function timeToString(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
