import { timeToString } from '../Misc/UtilityFunctions.js';

/**
 * Local timer class
 */
class Timer {
  constructor() {
    /**
     * Variable that keeps track of time
     * @type {Number}
     */
    this.duration = 0;
    /**
     * Check whether timer should end
     * @type {Boolean}
     */
    this.end = false;
  }

  /**
   * Count down from the given duration
   */
  countdown() {
    if (this.end) return;
    const displayString = timeToString(this.duration);
    postMessage(displayString);
    this.duration -= 1;
    if (this.duration >= 0) {
      setTimeout(() => {
        this.countdown();
      }, 1000);
    } else {
      // Post -1 if count down is complete
      postMessage(-1);
    }
  }
}

const timer = new Timer();
// Recieve message from Timer.js
onmessage = (e) => {
  // If message is -1 then end timer
  if (e.data !== -1) {
    timer.duration = e.data;
    timer.end = false;
    timer.countdown();
  } else {
    timer.end = true;
  }
};
