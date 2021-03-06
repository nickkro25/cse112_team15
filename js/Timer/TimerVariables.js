// these are all variables for the Timer. Changing these will change them universally
/**
 * Name the pomo app should display on load
 * @type {String}
 */
const sessionStartName = 'Pomo-Time!';

/**
 * Message displayed after user is distracted
 * @type {String}
 */
const distractionMessage = 'Session interrupted due to distraction!';

/**
 * Parameters for the working mode of the timer
 * @type {Object}
 */
const workMode = {
  name: 'Working Time',
  duration: 25,
  isWork: true,
};

/**
 * Parameters for the short break mode of the timer
 * @type {Object}
 */
const shortBreakMode = {
  name: 'Short Break',
  duration: 5,
  isWork: false,
};

/**
 * Parameters for the long break mode of the timer
 * @type {Object}
 */
const longBreakMode = {
  name: 'Long Break',
  duration: 15,
  isWork: false,
};

/**
 * The text displayed on the start timer buttons
 * @type {Object}
 */
const buttonText = {
  stopTimerText: 'End Day',
  startTimerText: 'Start\xa0\xa0\xa0\xa0',
};

export {
  sessionStartName, distractionMessage, workMode, shortBreakMode, longBreakMode, buttonText,
};
