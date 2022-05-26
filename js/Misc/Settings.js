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

if (localStorage.getItem('--page-bg-color') === null) {
  localStorage.setItem('--page-bg-color', '#d9645f');
  localStorage.setItem('--header-color', colorShade(localStorage.getItem('--page-bg-color'), -60));
  pageBGColor.val = localStorage.getItem('--page-bg-color');
  headerColor.val = localStorage.getItem('--header-color');
}

root.style.setProperty('--page-bg-color', localStorage.getItem('--page-bg-color'));
root.style.setProperty('--header-color', localStorage.getItem('--header-color'));
root.style.setProperty('--table-bg-color', colorShade(localStorage.getItem('--page-bg-color'), -10));
root.style.setProperty('--btn-icon-color', colorShade(localStorage.getItem('--page-bg-color'), 30));
workColorPicker.value = localStorage.getItem('--page-bg-color');

if (localStorage.getItem('--page-bg-color-short') === null) {
  localStorage.setItem('--page-bg-color-short', '#76a662');
  localStorage.setItem('--header-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -60));
}

root.style.setProperty('--page-bg-color-short', localStorage.getItem('--page-bg-color-short'));
root.style.setProperty('--header-color-short', localStorage.getItem('--header-color-short'));
root.style.setProperty('--table-bg-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -10));
root.style.setProperty('--btn-icon-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), 30));
shortColorPicker.value = localStorage.getItem('--page-bg-color-short');

if (localStorage.getItem('--page-bg-color-long') === null) {
  localStorage.setItem('--page-bg-color-long', '#66b4db');
  localStorage.setItem('--header-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -60));
}

root.style.setProperty('--page-bg-color-long', localStorage.getItem('--page-bg-color-long'));
root.style.setProperty('--header-color-long', localStorage.getItem('--header-color-long'));
root.style.setProperty('--table-bg-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -10));
root.style.setProperty('--btn-icon-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), 30));
longColorPicker.value = localStorage.getItem('--page-bg-color-long');

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

/**
 * handle color picker for work color
 */
workColorPicker.addEventListener('change', () => {
  if (!darkModeSwitch.checked) {
    root.style.setProperty('--page-bg-color', workColorPicker.value);
    root.style.setProperty('--header-color', colorShade(workColorPicker.value, -60));
  }
  root.style.setProperty('--table-bg-color', colorShade(workColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color', colorShade(workColorPicker.value, 30));
  localStorage.setItem('--page-bg-color', workColorPicker.value);
  localStorage.setItem('--header-color', colorShade(localStorage.getItem('--page-bg-color'), -60));
  pageBGColor.val = localStorage.getItem('--page-bg-color');
  headerColor.val = localStorage.getItem('--header-color');
});

/**
 * handle color picker for work color
 */
shortColorPicker.addEventListener('change', () => {
  root.style.setProperty('--page-bg-color-short', shortColorPicker.value);
  root.style.setProperty('--header-color-short', colorShade(shortColorPicker.value, -60));
  root.style.setProperty('--table-bg-color-short', colorShade(shortColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color-short', colorShade(shortColorPicker.value, 30));
  localStorage.setItem('--page-bg-color-short', shortColorPicker.value);
  localStorage.setItem('--header-color-short', colorShade(localStorage.getItem('--page-bg-color-short'), -60));
});

/**
 * handle color picker for work color
 */
longColorPicker.addEventListener('change', () => {
  root.style.setProperty('--page-bg-color-long', longColorPicker.value);
  root.style.setProperty('--header-color-long', colorShade(longColorPicker.value, -60));
  root.style.setProperty('--table-bg-color-long', colorShade(longColorPicker.value, -10));
  root.style.setProperty('--btn-icon-color-long', colorShade(longColorPicker.value, 30));
  localStorage.setItem('--page-bg-color-long', longColorPicker.value);
  localStorage.setItem('--header-color-long', colorShade(localStorage.getItem('--page-bg-color-long'), -60));
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
