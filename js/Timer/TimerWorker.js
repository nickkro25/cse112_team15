function timeToString(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

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
     * Keep track of timeout ID so that it can be interrupted
     * @type {Number}
     */
    this.timeoutID = 0;
  }

  /**
   * Count down from the given duration
   */
  countdown() {
    const displayString = timeToString(this.duration);
    postMessage(displayString);
    this.duration -= 1;
    if (this.duration >= 0) {
      this.timeoutID = setTimeout(() => {
        this.countdown();
      }, 1000);
    } else {
      // Post -1 if count down is complete
      postMessage(-1);
    }
  }

  /**
   * End the timer by interrupting the timeout
   */
  endTimer() {
    clearTimeout(this.timeoutID);
  }
}

const timer = new Timer();
// Recieve message from Timer.js
onmessage = (e) => {
  // If message is -1 then end timer
  if (e.data !== -1) {
    timer.duration = e.data;
    timer.countdown();
  } else {
    timer.endTimer();
  }
};
