/**
 * audio element for alert
 * @type {HTMLAudioElement}
 */
const alert = document.getElementById('alert-sound');

alert.volume = 0.3;
/**
 * the selector for work sound
 * @type {HTMLSelectElement}
 */
const workSoundSelector = document.getElementById('workSoundSelector');
/**
 * the selector for break sound
 * @type {HTMLSelectElement}
 */
const breakSoundSelector = document.getElementById('breakSoundSelector');
/**
 * string constant for marimba alarm path
 * @type {String}
 */
const marimba = './assets/audio/marimba.mp3';
/**
 * string constant for microwave alarm path
 * @type {String}
 */
const microwave = './assets/audio/microwave.mp3';
/**
 * string constant for kitchen alarm path
 * @type {String}
 */
const kitchen = './assets/audio/kitchen.mp3';
/**
 * string constant for kitchen alarm path
 * @type {String}
 */
const fire = './assets/audio/fire-alarm.mp3';
/**
* string constant for kitchen alarm path
* @type {String}
*/
const item = './assets/audio/item.mp3';
/**
* string constant for kitchen alarm path
* @type {String}
*/
const ringtone = './assets/audio/ringtone.mp3';
/**
 * mute switch element
 * @type {HTMLInputElement}
 */
const muteSwitch = document.getElementById('muteSwitch');
/**
 * global to hold current selected path
 * @type {String}
 */
let workModeSoundPath = marimba;
/**
 * global to hold current selected path
 * @type {String}
 */
let breakModeSoundPath = marimba;

/**
 * Function that handles the logic for playing the sound
 * upon switching to work mode.
 */
export function workModeSound() {
  if (muteSwitch.checked === true) {
    return;
  }
  alert.setAttribute('src', workModeSoundPath);
  alert.play();
}

/**
 * Function that handles the logic for playing the sound
 * upon switching to break mode.
 */
export function breakModeSound() {
  if (muteSwitch.checked === true) {
    return;
  }
  alert.setAttribute('src', breakModeSoundPath);
  alert.play();
}

/**
 * Handles the changing of the sounds in settings.
 * @param {HTMLSelectElement} soundSelector - the sound selector element in settings
 * @param {Boolean} playSound - whether to play sound when settings is changed
 */
export function changeSound(soundSelector, playSound) {
  let path;
  switch (soundSelector.value) {
    /* case 'horn':
      path = airHorn;
      break;
    case 'celebration':
      path = celebration;
      break;
    case 'error':
      path = error;
      break; */
    case 'item':
      path = item;
      break;
    case 'ringtone':
      path = ringtone;
      break;
    case 'marimba':
      path = marimba;
      break;
    case 'kitchen':
      path = kitchen;
      break;
    case 'microwave':
      path = microwave;
      break;
    case 'fire':
      path = fire;
      break;
    default:
      path = marimba;
      break;
  }
  if (playSound) {
    alert.setAttribute('src', path);
    alert.play();
  }
  if (soundSelector.id === 'workSoundSelector') {
    workModeSoundPath = path;
  } else {
    breakModeSoundPath = path;
  }
}

/**
 * add event listeners to the select menus and update localStorage accordingly
 */
workSoundSelector.addEventListener('change', () => {
  changeSound(workSoundSelector, !muteSwitch.checked);
  localStorage.setItem('workSoundSelector', workSoundSelector.value);
});
breakSoundSelector.addEventListener('change', () => {
  changeSound(breakSoundSelector, !muteSwitch.checked);
  localStorage.setItem('breakSoundSelector', breakSoundSelector.value);
});
