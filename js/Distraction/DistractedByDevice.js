import {
  updateDarkMode,
} from '../Misc/Settings.js';

/**
 * DistractedByDevice object, handles everything related to
 */
class DistractedByDevice {
  constructor(noDeviceSwitch) {
    /**
     * Variable that keeps track of the duration of UI change
     * @type {Number}
     */
    this.uiChangeDuration = 0;
    /**
     * The switch element in settings for this feature
     * @type {HTMLInputElement}
     */
    this.noDeviceSwitch = noDeviceSwitch;
    /**
     * Keeps track of the timeout ID so that timeout can be interrupted
     * @type {Number}
     */
    this.timeoutID = 0;
    /**
     * Records whether this feature is currently running
     * @type {Boolean}
     */
    this.running = false;
  }

  /**
   * Called when a pomo session starts, and adds event listeners accordingly
   */
  startPomoTime() {
    // locks the option when pomo session starts
    // TODO: There's no UI that indicates the switch is disabled, user might be confused
    this.noDeviceSwitch.disabled = true;
    if (!this.running && !this.noDeviceSwitch.checked) {
      this.running = true;
      document.addEventListener('mousemove', this.userDistracted);
      document.addEventListener('keydown', this.userDistracted);
    }
  }

  /**
   * Called when a pomo session ends, removes event listeners if necessary
   */
  endPomoTime() {
    this.noDeviceSwitch.disabled = false;
    if (this.running) {
      this.running = false;
      document.removeEventListener('mousemove', this.userDistracted);
      document.removeEventListener('keydown', this.userDistracted);
    }
  }

  /**
   * Method that handles anythinig that shoudl happen if user is distracted
   * by their device
   */
  userDistracted() {
    clearTimeout(this.timeoutID);
    this.uiChangeDuration = 300;
    document.documentElement.style.setProperty('--page-bg-color', '#f54263');
    this.timeoutID = setTimeout(() => {
      updateDarkMode();
    }, 3000);
  }
}

export { DistractedByDevice };
