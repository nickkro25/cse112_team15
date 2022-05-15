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
 * @type {HTMLButtonElement}
 */
const timeInputs = document.querySelectorAll('#customTimeGroup input');
/**
 * @type {HTMLInputElement}
 */
const darkModeSwitch = document.getElementById('darkModeSwitch');
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
// for (const input of timeInputs) {
//   input.addEventListener('keypress', (event) => {
//     if (!(event.which >= 48 && event.which <= 57) && (event.which !== 13)) {
//       event.preventDefault();
//     }
//     if (event.which === 48 && event.target.value === '') {
//       event.preventDefault();
//     }
//   });
// }

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
