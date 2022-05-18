import {
  pageBGColor, headerColor, evenColor, toothpaste,
  tableBG, modalBGColor, modalFontColor,
} from './MiscVariables.js';

import {
  changeSound,
} from './Sounds.js';
/**
 * @type {HTMLButtonElement}
 */
const settingsButton = document.getElementById('settingsButton');
/**
 * @type {HTMLButtonElement}
 */
const settingsPopup = document.getElementById('settingsPopup');
/**
 * @type {HTMLInputElement}
 */
const darkModeSwitch = document.getElementById('darkModeSwitch');
/**
 * @type {HTMLInputElement}
 */
const autoStartSwitch = document.getElementById('autoStartSwitch');
/**
 * @type {HTMLInputElement}
 */
const muteSwitch = document.getElementById('muteSwitch');
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
 * @type {HTMLElement}
 */
const root = document.querySelector(':root');
/**
 * handle the settings popup display
 */
settingsButton.addEventListener('click', () => {
  if (settingsPopup.style.display === 'block') {
    settingsPopup.style.display = 'none';
  } else {
    settingsPopup.style.display = 'block';
  }
});

/**
 * Update the theme of the page based on darkModeSwitch
 */
function updateDarkMode() {
  if (darkModeSwitch.checked) {
    root.style.setProperty(pageBGColor.name, pageBGColor.darkVal);
    root.style.setProperty(pageBGColor.shortName, pageBGColor.darkVal);
    root.style.setProperty(headerColor.name, headerColor.darkVal);
    root.style.setProperty(headerColor.shortName, headerColor.darkVal);
    root.style.setProperty(evenColor.name, evenColor.darkVal);
    root.style.setProperty(evenColor.shortName, evenColor.darkVal);
    root.style.setProperty(toothpaste.name, toothpaste.darkVal);
    root.style.setProperty(tableBG.name, tableBG.darkVal);
    root.style.setProperty(modalBGColor.name, modalBGColor.darkVal);
    root.style.setProperty(modalFontColor.name, modalFontColor.darkVal);
  } else {
    root.style.setProperty(pageBGColor.name, pageBGColor.val);
    root.style.setProperty(pageBGColor.shortName, pageBGColor.val);
    root.style.setProperty(headerColor.name, headerColor.val);
    root.style.setProperty(headerColor.shortName, headerColor.val);
    root.style.setProperty(evenColor.name, evenColor.val);
    root.style.setProperty(evenColor.shortName, evenColor.val);
    root.style.setProperty(toothpaste.name, toothpaste.val);
    root.style.setProperty(tableBG.name, tableBG.val);
    root.style.setProperty(modalBGColor.name, modalBGColor.val);
    root.style.setProperty(modalFontColor.name, modalFontColor.val);
  }
}

/**
 * handle darkmode by changing root variables
 */
darkModeSwitch.addEventListener('change', () => {
  localStorage.setItem('darkModeSwitch', darkModeSwitch.checked);
  updateDarkMode();
});

autoStartSwitch.addEventListener('change', () => {
  localStorage.setItem('autoStartSwitch', autoStartSwitch.checked);
});

muteSwitch.addEventListener('change', () => {
  localStorage.setItem('muteSwitch', muteSwitch.checked);
});

// set values from localStorage
darkModeSwitch.checked = localStorage.getItem('darkModeSwitch') == null ? false : localStorage.getItem('darkModeSwitch') === 'true';
autoStartSwitch.checked = localStorage.getItem('autoStartSwitch') == null ? true : localStorage.getItem('autoStartSwitch') === 'true';
muteSwitch.checked = localStorage.getItem('muteSwitch') == null ? false : localStorage.getItem('muteSwitch') === 'true';
workSoundSelector.value = localStorage.getItem('workSoundSelector') == null ? 'horn' : localStorage.getItem('workSoundSelector');
breakSoundSelector.value = localStorage.getItem('breakSoundSelector') == null ? 'celebration' : localStorage.getItem('breakSoundSelector');
changeSound(workSoundSelector, false);
changeSound(breakSoundSelector, false);
updateDarkMode();
