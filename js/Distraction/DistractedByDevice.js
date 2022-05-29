import {
  updateDarkMode,
} from '../Misc/Settings.js';

/**
 * DistractedByDevice object, handles everything related to tracking mouse
 * & keyboard activity
 */
class DistractedByDevice extends HTMLElement {
  constructor(noDeviceSwitch) {
    super();
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
      document.addEventListener('mousemove', () => this.userDistracted(), {once: true});
      document.addEventListener('keydown', () => this.userDistracted(), {once: true});
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
    const event = new CustomEvent('distraction-created', {
      detail: {
        date: new Date(),
        description: 'Distracted by device',
        pomoSessionId: null,
      },
    });
    
    this.dispatchEvent(event);
  }
}

customElements.define('device-distraction', DistractedByDevice);
export { DistractedByDevice };
