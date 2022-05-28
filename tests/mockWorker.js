import { timeToString } from '../js/Misc/UtilityFunctions.js';

/**
 * Mock worker for testing purposes
 */
export default class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.end = false;
    this.duration = 0;
    this.onmessage = () => {};
  }

  countdown() {
    if (this.end) return;
    const displayString = timeToString(this.duration);
    this.onmessage({ data: displayString });
    this.duration -= 1;
    if (this.duration >= 0) {
      setTimeout(() => {
        this.countdown();
      }, 1000);
    } else {
      // Post -1 if count down is complete
      this.onmessage({ data: -1 });
    }
  }

  postMessage(msg) {
    this.duration = msg;
    this.countdown();
  }
}
