import {
  sessionStartName, distractionMessage, workMode, shortBreakMode, longBreakMode, buttonText,
} from './TimerVariables.js';
import { workModeColors } from '../Misc/ChangeColors.js';

import { timeToString } from '../Misc/UtilityFunctions.js';
/**
 * A class for the Timer object. Has functions to start the timer,
 * display the current mode of the timer and display the time remaining
 * Class throws the 'timer-complete' event
 */
class Timer extends HTMLElement {
  /**
   * Constructor of Time Object. Takes the HTML element of where
   * you want the time and the status of the timer to be implemented.
   * HTML Elements must have the 'textElement' attribute.
   * @param {HTMLButtonElement} startButton - button that starts the button
   * @param {HTMLParagraphElement} timeDisplay - area to display the time remaining
   * @param {HTMLParagraphElement} displayStatus - area to display the status of the timer
   */
  constructor(startButton, timeDisplay, displayStatus) {
    super();
    /**
     * State of the timer (the current mode)
     * @type {String}
     */
    this.state = '';
    /**
     * Queue that stores the Session objects. Rotates to provide
     * rotation functionality for the timer
     * @type {Object[]}
     * @property {String} object.name name of the session
     * @property {Number} object.duration duration of the session
     */
    this.stateQueue = [];
    /**
     * HTML Tag that is reponsible for controlling the timer
     * @type {HTMLElement}
     */
    this.startButton = startButton;
    /**
     * HTML Tag that is reponsible for displaying the time remaining
     * @type {HTMLElement}
     */
    this.timeDisplay = timeDisplay;
    /**
     * HTML Tag that is reponsible for displaying the mode of the timer
     * @type {HTMLElement}
     */
    this.displayStatus = displayStatus;
    /**
     * HTML tag for controlling the focus timer length
     * @type {HTMLElement}
     */
    this.focusTime = document.getElementById('focusTime');
    /**
     * HTML tag for controlling the short break timer length
     * @type {HTMLElement}
     */
    this.shortBreakTime = document.getElementById('shortBreakTime');
    /**
     * HTML tag for controlling the long break timer length
     * @type {HTMLElement}
     */
    this.longBreakTime = document.getElementById('longBreakTime');
    /**
     * auto start switch element
     * @type {HTMLInputElement}
     */
    this.autoStart = document.getElementById('autoStartSwitch');
    /**
     * Web worker responsible for count down timer
     * @type {Worker}
     */
    this.timerWorker = new Worker('./js/Timer/TimerWorker.js');
    // Recieve message from web worker and update display
    this.timerWorker.onmessage = (e) => {
      if (e.data !== -1) {
        this.timeDisplay.textContent = e.data;
        document.title = `${e.data} ${this.state}`;
      } else {
        this.onTimerComplete();
      }
    };
    /**
     * The sessionId. Increments on each working session. Stored in
     * local storage to keep track of id on multiple sessions every day
     * @type {Number}
     */
    this.sessionId = localStorage.getItem('pomoSessionId');
    this.sessionId = ((this.sessionId === null) ? 0 : parseInt(this.sessionId, 10) + 1);

    // this is the order for the timer. It will loop in this order.
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    // for (let i = 0; i < workOrder.length; i += 1) {
    //   this.stateQueue.push(workOrder[i]);
    // }
    this.stateQueue = workOrder;

    // #6 get previous time durations from localStorage on refresh
    if (localStorage.getItem('workModeTime') !== null) {
      // ...
      workMode.duration = localStorage.getItem('workModeTime');
    }
    if (localStorage.getItem('shortBreakTime') !== null) {
      // ...
      shortBreakMode.duration = localStorage.getItem('shortBreakTime');
    }
    if (localStorage.getItem('longBreakTime') !== null) {
      // ...
      longBreakMode.duration = localStorage.getItem('longBreakTime');
    }

    // #6 We can do this with "this" as shown above, just did it this way as a test
    if (this.focusTime !== null) {
      this.focusTime.value = workMode.duration;
      this.shortBreakTime.value = shortBreakMode.duration;
      this.longBreakTime.value = longBreakMode.duration;
    }
    if (this.timeDisplay !== null) {
      this.timeDisplay.textContent = timeToString(workMode.duration * 60);
    }
    this.addEventListeners();
  }

  /**
   * Function that resets the pomo session id and stores it in local storage
   */
  resetPomoSessionId() {
    this.sessionId = 0;
    localStorage.setItem('pomoSessionId', this.sessionId);
  }

  /**
   * Function that fires when the timer runs out of time.
   * Moves on to start the timer again at the end of the function.
   */
  onTimerComplete() {
    const completedSession = this.stateQueue.shift();

    // Gets current state to determine which notification to give.
    const currentState = this.stateQueue[0].name;
    const iconUrl = './assets/img/webicon.png';
    if (Notification.permission === 'granted') {
      if (currentState === 'Short Break') {
        new Notification('Pomo XV', {
          body: 'Time for a short break!',
          icon: iconUrl,
        });
      } else if (currentState === 'Working Time') {
        new Notification('Pomo XV', {
          body: 'Time to work!',
          icon: iconUrl,
        });
      } else if (currentState === 'Long Break') {
        new Notification('Pomo XV', {
          body: 'Time for a long break!',
          icon: iconUrl,
        });
      }
    }

    this.stateQueue.push(completedSession);
    const event = new CustomEvent('timer-complete', {
      detail: {
        sessionName: completedSession.name,
        duration: completedSession.duration,
        sessionIsWork: completedSession.isWork,
        sessionId: this.sessionId,
        nextSessionName: this.stateQueue[0].name,
      },
    });

    this.dispatchEvent(event);
    if (!completedSession.isWork) {
      this.sessionId += 1;
      localStorage.setItem('pomoSessionId', this.sessionId);
    }

    if (this.autoStart.checked === false) {
      // check whether auto start break option is checked
      // update the display if the option is not checked, but don't start the timer yet
      this.state = this.stateQueue[0].name;
      this.updateDisplay();
    } else {
      // start the timer automatically if option is checked
      this.startTimer();
    }
  }

  /**
   * Starts the timer for the session at the top of the queue.
   * Updates the display for the status.
   */
  startTimer() {
    // Edgar: StateQueue is set right after line 62, we get our timee duration
    // from TimerVariables.js, we want to change this to user set duration
    const session = this.stateQueue[0];
    this.state = session.name;
    this.displayStatus.textContent = this.state;
    const event = new CustomEvent('timer-start', {
      detail: {
        sessionName: this.state,
        sessionIsWork: session.isWork,
      },
    });

    this.dispatchEvent(event);
    this.timerWorker.postMessage(session.duration * 60);
  }

  /**
   * Ends the timer.
   * Updates the display for the status.
   */
  endTimer() {
    this.timerWorker.postMessage(-1);
    this.displayStatus.textContent = sessionStartName;
    // #6: only works with whole numbers
    this.timeDisplay.textContent = timeToString(workMode.duration * 60);
    document.title = 'Pomodoro';
    this.stateQueue = [];
    const workOrder = [workMode, shortBreakMode, workMode,
      shortBreakMode, workMode, shortBreakMode, workMode, longBreakMode];
    for (let i = 0; i < workOrder.length; i += 1) {
      this.stateQueue.push(workOrder[i]);
    }
    const event = new CustomEvent('timer-end');
    this.dispatchEvent(event);
  }

  /**
   * Reset the current work session, used for distraction
   */
  resetSession() {
    this.timerWorker.postMessage(-1);
    this.updateDisplay();
    this.displayStatus.textContent = distractionMessage;
  }

  /**
   * Change and save timer length when changed.
   */
  // Issue #6: only works with whole numbers
  changeTime(e) {
    // Does not allow user to input 0 or numbers over 99
    if (e.target.value === 0) { e.target.value = 1; }
    if (e.target.value > 99) { e.target.value = 99; }
    if (e.target.id === 'focusTime') {
      this.timeDisplay.textContent = `${e.target.value}:00`;
      workMode.duration = e.target.value;
      localStorage.setItem('workModeTime', e.target.value);
    } else if (e.target.id === 'shortBreakTime') {
      // document.getElementById("timeDisplay").textContent = " " + e.target.value + ":00" + " ";
      shortBreakMode.duration = e.target.value;
      localStorage.setItem('shortBreakTime', e.target.value);
    } else if (e.target.id === 'longBreakTime') {
      // document.getElementById("timeDisplay").textContent = " " + e.target.value + ":00" + " ";
      longBreakMode.duration = e.target.value;
      localStorage.setItem('longBreakTime', e.target.value);
    }
  }

  /**
   * Adds event listener to the start button that was added
   * Add event listeners to change timer length
   */
  addEventListeners() {
    this.startButton.addEventListener('click', () => {
      if (this.startButton.textContent.indexOf(buttonText.startTimerText) > -1) {
        this.startTimer();
        this.startButton.childNodes[0].nodeValue = buttonText.stopTimerText;
      } else {
        this.endTimer();
        this.startButton.childNodes[0].nodeValue = buttonText.startTimerText;
        workModeColors();
      }
    });

    this.focusTime.addEventListener('change', (event) => { this.changeTime(event); });
    this.shortBreakTime.addEventListener('change', (event) => { this.changeTime(event); });
    this.longBreakTime.addEventListener('change', (event) => { this.changeTime(event); });
  }

  /**
   * Updates the text elements on screen based on
   * this.state and stateQueue[0] when the timer pauses
   */
  updateDisplay() {
    this.startButton.childNodes[0].nodeValue = buttonText.startTimerText;
    const session = this.stateQueue[0];
    this.displayStatus.textContent = this.state;
    this.timeDisplay.textContent = timeToString(session.duration * 60);
    document.title = session.name;
    const distractionOffEvent = new CustomEvent('timer-end');
    this.dispatchEvent(distractionOffEvent);
  }
}

customElements.define('custom-timer', Timer);
export { Timer };
