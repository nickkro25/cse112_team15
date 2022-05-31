import {
  pageBGColor, headerColor, evenColor, toothpaste,
  tableBG, modalBGColor, modalFontColor, fontColor,
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
const workColorPicker = document.getElementById('workColorPicker');
/**
 * @type {HTMLInputElement}
 */
const shortColorPicker = document.getElementById('shortColorPicker');
/**
 * @type {HTMLInputElement}
 */
const longColorPicker = document.getElementById('longColorPicker');
const autoStartSwitch = document.getElementById('autoStartSwitch');
/**
 * @type {HTMLInputElement}
 */
const muteSwitch = document.getElementById('muteSwitch');
/**
 * @type {HTMLInputElement}
 */
const noDeviceSwitch = document.getElementById('noDeviceSwitch');
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

document.addEventListener('click', (event) => {
  if (settingsPopup.style.display === 'block') {
    if (!settingsPopup.contains(event.target) && (event.target.id !== 'settingsButton' && event.target.id !== 'settingsButtonIcon')) {
      settingsPopup.style.display = 'none';
    }
  }
});

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
 * Anon function that shades a color.
 * col = input color you want to change in #RRGGBB format
 * amt = percentage amount you want to shade (-ve is darker)
 */
const colorShade = (col, amt) => {
  col = col.replace(/^#/, '');
  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r, g, b] = col.match(/.{2}/g);
  ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt]);

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;

  return `#${rr}${gg}${bb}`;
};

function getFontColor(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const arr = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  if (0.213 * arr[0] + 0.715 * arr[1] + 0.072 * arr[2] > 255 / 2) {
    return 'black';
  }
  return 'white';
}

if (localStorage.getItem('--page-bg-color') === null) {
  localStorage.setItem('--page-bg-color', '#d9645f');
  localStorage.setItem('--header-color', colorShade(localStorage.getItem('--page-bg-color'), -60));
  localStorage.setItem('--btn-icon-color', colorShade(localStorage.getItem('--page-bg-color'), 30));
  localStorage.setItem('--font-color', getFontColor(localStorage.getItem('--page-bg-color')));
  pageBGColor.val = localStorage.getItem('--page-bg-color');
  headerColor.val = localStorage.getItem('--header-color');
  evenColor.val = localStorage.getItem('--btn-icon-color');
  fontColor.val = localStorage.getItem('--font-color');
}

root.style.setProperty('--page-bg-color', localStorage.getItem('--page-bg-color'));
root.style.setProperty('--header-color', localStorage.getItem('--header-color'));
root.style.setProperty('--table-bg-color', colorShade(localStorage.getItem('--page-bg-color'), -10));
root.style.setProperty('--btn-icon-color', colorShade(localStorage.getItem('--page-bg-color'), 30));
root.style.setProperty('--font-color', localStorage.getItem('--font-color'));
workColorPicker.value = localStorage.getItem('--page-bg-color');

if (localStorage.getItem('--page-bg-color-short') === null) {
  localStorage.setItem('--page-bg-color-short', '#76a662');
  localStorage.setItem('--header-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -60));
  localStorage.setItem('--btn-icon-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), 30));
  localStorage.setItem('--font-color-short', getFontColor(localStorage.getItem('--page-bg-color-short')));
  pageBGColor.shortVal = localStorage.getItem('--page-bg-color-short');
  headerColor.shortVal = localStorage.getItem('--header-color-short');
  evenColor.shortVal = localStorage.getItem('--btn-icon-color-short');
  fontColor.shortVal = localStorage.getItem('--font-color-short');
}

root.style.setProperty('--page-bg-color-short', localStorage.getItem('--page-bg-color-short'));
root.style.setProperty('--header-color-short', localStorage.getItem('--header-color-short'));
root.style.setProperty('--table-bg-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -10));
root.style.setProperty('--btn-icon-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), 30));
root.style.setProperty('--font-color-short', localStorage.getItem('--font-color-short'));
shortColorPicker.value = localStorage.getItem('--page-bg-color-short');

if (localStorage.getItem('--page-bg-color-long') === null) {
  localStorage.setItem('--page-bg-color-long', '#66b4db');
  localStorage.setItem('--header-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -60));
  localStorage.setItem('--btn-icon-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), 30));
  localStorage.setItem('--font-color-long', getFontColor(localStorage.getItem('--page-bg-color-long')));
  pageBGColor.longVal = localStorage.getItem('--page-bg-color-long');
  headerColor.longVal = localStorage.getItem('--header-color-long');
  evenColor.longVal = localStorage.getItem('--btn-icon-color-long');
  fontColor.longVal = localStorage.getItem('--font-color-long');
}

root.style.setProperty('--page-bg-color-long', localStorage.getItem('--page-bg-color-long'));
root.style.setProperty('--header-color-long', localStorage.getItem('--header-color-long'));
root.style.setProperty('--table-bg-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -10));
root.style.setProperty('--btn-icon-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), 30));
root.style.setProperty('--font-color-long', localStorage.getItem('--font-color-long'));
longColorPicker.value = localStorage.getItem('--page-bg-color-long');

/**
 * Update the theme of the page based on darkModeSwitch
 */
function updateDarkMode() {
  if (darkModeSwitch.checked) {
    root.style.setProperty(pageBGColor.name, pageBGColor.darkVal);
    root.style.setProperty(pageBGColor.shortName, pageBGColor.darkVal);
    root.style.setProperty(pageBGColor.longName, pageBGColor.darkVal);
    root.style.setProperty(headerColor.name, headerColor.darkVal);
    root.style.setProperty(headerColor.shortName, headerColor.darkVal);
    root.style.setProperty(headerColor.longName, headerColor.darkVal);
    root.style.setProperty(evenColor.name, evenColor.darkVal);
    root.style.setProperty(evenColor.shortName, evenColor.darkVal);
    root.style.setProperty(evenColor.longName, evenColor.darkVal);
    root.style.setProperty(fontColor.name, fontColor.darkVal);
    root.style.setProperty(fontColor.shortName, fontColor.darkVal);
    root.style.setProperty(fontColor.longName, fontColor.darkVal);
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
    document.getElementById('finishTask').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('delete-all-button').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('add-button').style.backgroundColor = 'rgb(78, 78, 78)';
    document.getElementById('taskListHeader').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('add-todo').style.backgroundColor = 'rgb(32, 32, 32)';
    document.getElementById('todo').style.backgroundColor = 'rgb(62, 62, 62)';
  } else {
    root.style.setProperty(pageBGColor.name, pageBGColor.val);
    root.style.setProperty(pageBGColor.shortName, pageBGColor.shortVal);
    root.style.setProperty(pageBGColor.longName, pageBGColor.longVal);
    root.style.setProperty(headerColor.name, headerColor.val);
    root.style.setProperty(headerColor.shortName, headerColor.shortVal);
    root.style.setProperty(headerColor.longName, headerColor.longVal);
    root.style.setProperty(evenColor.name, evenColor.val);
    root.style.setProperty(evenColor.shortName, evenColor.shortVal);
    root.style.setProperty(evenColor.longName, evenColor.longVal);
    root.style.setProperty(fontColor.name, fontColor.val);
    root.style.setProperty(fontColor.shortName, fontColor.shortVal);
    root.style.setProperty(fontColor.longName, fontColor.longVal);
    root.style.setProperty(toothpaste.name, toothpaste.val);
    root.style.setProperty(tableBG.name, tableBG.val);
    root.style.setProperty(modalBGColor.name, modalBGColor.val);
    root.style.setProperty(modalFontColor.name, modalFontColor.val);
    document.getElementById('faqButton').style.backgroundColor = null;
    document.getElementById('statsButton').style.backgroundColor = null;
    document.getElementById('settingsButton').style.backgroundColor = null;
    document.getElementById('onboardingButton').style.backgroundColor = null;
    document.getElementById('nav-wrapper').style.backgroundColor = null;
    document.getElementById('startTimer').style.backgroundColor = null;
    document.getElementById('delete-all-button').style.backgroundColor = null;
    document.getElementById('add-button').style.backgroundColor = null;
    document.getElementById('taskListHeader').style.backgroundColor = null;
    document.getElementById('add-todo').style.backgroundColor = null;
    document.getElementById('todo').style.backgroundColor = null;
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
muteSwitch.addEventListener('change', () => {
  localStorage.setItem('muteSwitch', muteSwitch.checked);
});
noDeviceSwitch.addEventListener('change', () => {
  localStorage.setItem('noDeviceSwitch', noDeviceSwitch.checked);
});

/**
 * handle color picker for work color
 */
workColorPicker.addEventListener('change', () => {
  if (!darkModeSwitch.checked) {
    root.style.setProperty('--page-bg-color', workColorPicker.value);
    root.style.setProperty('--header-color', colorShade(workColorPicker.value, -60));
    root.style.setProperty('--even-color', colorShade(workColorPicker.value, 30));
    root.style.setProperty('--font-color', getFontColor(workColorPicker.value));
  }
  root.style.setProperty('--table-bg-color', colorShade(workColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color', colorShade(workColorPicker.value, 30));
  localStorage.setItem('--page-bg-color', workColorPicker.value);
  localStorage.setItem('--header-color', colorShade(localStorage.getItem('--page-bg-color'), -60));
  localStorage.setItem('--btn-icon-color', colorShade(localStorage.getItem('--page-bg-color'), 30));
  localStorage.setItem('--font-color', getFontColor(localStorage.getItem('--page-bg-color')));
  pageBGColor.val = localStorage.getItem('--page-bg-color');
  headerColor.val = localStorage.getItem('--header-color');
  evenColor.val = localStorage.getItem('--btn-icon-color');
  fontColor.val = localStorage.getItem('--font-color');
});

/**
 * handle color picker for work color
 */
shortColorPicker.addEventListener('change', () => {
  if (!darkModeSwitch.checked) {
    root.style.setProperty('--page-bg-color-short', shortColorPicker.value);
    root.style.setProperty('--header-color-short', colorShade(shortColorPicker.value, -60));
    root.style.setProperty('--even-color-short', colorShade(shortColorPicker.value, 30));
    root.style.setProperty('--font-color-short', getFontColor(shortColorPicker.value));
  }
  root.style.setProperty('--table-bg-color-short', colorShade(shortColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color-short', colorShade(shortColorPicker.value, 30));
  localStorage.setItem('--page-bg-color-short', shortColorPicker.value);
  localStorage.setItem('--header-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -60));
  localStorage.setItem('--btn-icon-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), 30));
  localStorage.setItem('--font-color-short', getFontColor(localStorage.getItem('--page-bg-color-short')));
  pageBGColor.shortVal = localStorage.getItem('--page-bg-color-short');
  headerColor.shortVal = localStorage.getItem('--header-color-short');
  evenColor.shortVal = localStorage.getItem('--btn-icon-color-short');
  fontColor.shortVal = localStorage.getItem('--font-color-short');
});

/**
 * handle color picker for work color
 */
longColorPicker.addEventListener('change', () => {
  if (!darkModeSwitch.checked) {
    root.style.setProperty('--page-bg-color-long', longColorPicker.value);
    root.style.setProperty('--header-color-long', colorShade(longColorPicker.value, -60));
    root.style.setProperty('--even-color-long', colorShade(longColorPicker.value, 30));
    root.style.setProperty('--font-color-long', getFontColor(longColorPicker.value));
  }
  root.style.setProperty('--table-bg-color-long', colorShade(longColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color-long', colorShade(longColorPicker.value, 30));
  localStorage.setItem('--page-bg-color-long', longColorPicker.value);
  localStorage.setItem('--header-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -60));
  localStorage.setItem('--btn-icon-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), 30));
  localStorage.setItem('--font-color-long', getFontColor(localStorage.getItem('--page-bg-color-long')));
  pageBGColor.longVal = localStorage.getItem('--page-bg-color-long');
  headerColor.longVal = localStorage.getItem('--header-color-long');
  evenColor.longVal = localStorage.getItem('--btn-icon-color-long');
  fontColor.longVal = localStorage.getItem('--font-color-long');
});
// set values from localStorage
darkModeSwitch.checked = localStorage.getItem('darkModeSwitch') == null ? false : localStorage.getItem('darkModeSwitch') === 'true';
autoStartSwitch.checked = localStorage.getItem('autoStartSwitch') == null ? true : localStorage.getItem('autoStartSwitch') === 'true';
muteSwitch.checked = localStorage.getItem('muteSwitch') == null ? false : localStorage.getItem('muteSwitch') === 'true';
noDeviceSwitch.checked = localStorage.getItem('noDeviceSwitch') == null ? true : localStorage.getItem('noDeviceSwitch') === 'true';
workSoundSelector.value = localStorage.getItem('workSoundSelector') == null ? 'marimba' : localStorage.getItem('workSoundSelector');
breakSoundSelector.value = localStorage.getItem('breakSoundSelector') == null ? 'marimba' : localStorage.getItem('breakSoundSelector');
changeSound(workSoundSelector, false);
changeSound(breakSoundSelector, false);
updateDarkMode();
