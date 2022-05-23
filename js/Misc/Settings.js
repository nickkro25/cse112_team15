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
 * @type {HTMLButtonElement}
 */
const timeInputs = document.querySelectorAll('#customTimeGroup input');
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
 * Simple timer length validation. Only allow whole numbers
 */
for (let i = 0; i < timeInputs.length; i += 1) {
  timeInputs[i].addEventListener('keypress', (event) => {
    if (!(event.which >= 48 && event.which <= 57) && (event.which !== 13)) {
      event.preventDefault();
    }
    if (event.which === 48 && event.target.value === '') {
      event.preventDefault();
    }
  });
}

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
    document.getElementById('faqButton').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('statsButton').style.backgroundColor = 'rgb(78, 78, 78';
    document.getElementById('settingsButton').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('onboardingButton').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('nav-wrapper').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('startTimer').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('delete-all-button').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('add-button').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('taskListHeader').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('add-todo').style.backgroundColor = 'rgb(32, 32, 32)';
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
    document.getElementById('faqButton').style.backgroundColor = '#26a69a';
    document.getElementById('statsButton').style.backgroundColor = '#26a69a';
    document.getElementById('settingsButton').style.backgroundColor = '#26a69a';
    document.getElementById('onboardingButton').style.backgroundColor = '#26a69a';
    document.getElementById('nav-wrapper').style.backgroundColor = 'darkcyan';
    document.getElementById('startTimer').style.backgroundColor = '#26a69a';
    document.getElementById('delete-all-button').style.backgroundColor = '#26a69a';
    document.getElementById('add-button').style.backgroundColor = '#26a69a';
    document.getElementById('add-todo').style.backgroundColor = '#008B8B';
  }
}

/**
 * handle darkmode by changing root variables and update localStorage
 */
darkModeSwitch.addEventListener('change', () => {
  localStorage.setItem('darkModeSwitch', darkModeSwitch.checked);
  updateDarkMode();
});

/**
 * Update localStorage whenever settings are changed
 */
autoStartSwitch.addEventListener('change', () => {
  localStorage.setItem('autoStartSwitch', autoStartSwitch.checked);
});

/**
 * Update localStorage whenever settings are changed
 */
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
