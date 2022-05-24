import {
  pageBGColor, headerColor, evenColor, toothpaste,
  tableBG, modalBGColor, modalFontColor,
} from './MiscVariables.js';
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
const workColorPicker = document.getElementById('workColorPicker');
/**
 * @type {HTMLInputElement}
 */
const shortColorPicker = document.getElementById('shortColorPicker');
/**
 * @type {HTMLInputElement}
 */
const longColorPicker = document.getElementById('longColorPicker');
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
 * handle darkmode by changing root variables
 */
darkModeSwitch.addEventListener('change', () => {
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
});

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

/**
 * handle color picker for work color
 */
workColorPicker.addEventListener('change', () => {
  root.style.setProperty('--page-bg-color', workColorPicker.value);
  root.style.setProperty('--header-color', colorShade(workColorPicker.value, -60));
  root.style.setProperty('--table-bg-color', colorShade(workColorPicker.value, -10));
});

/**
 * handle color picker for work color
 */
shortColorPicker.addEventListener('change', () => {
  root.style.setProperty('--page-bg-color-short', shortColorPicker.value);
  root.style.setProperty('--header-color-short', colorShade(shortColorPicker.value, -60));
  root.style.setProperty('--table-bg-color-short', colorShade(shortColorPicker.value, -10));
});

/**
 * handle color picker for work color
 */
longColorPicker.addEventListener('change', () => {
  root.style.setProperty('--page-bg-color-long', longColorPicker.value);
  root.style.setProperty('--table', colorShade(longColorPicker.value, -60));
  root.style.setProperty('--table-bg-color-long', colorShade(longColorPicker.value, -10));
});
