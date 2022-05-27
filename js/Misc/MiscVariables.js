/**
 * Names for break
 * @type {Object}
*/
const breakNames = {
  short: 'short-break',
  long: 'long-break',
};

/**
 * Background color for the page
 * @type {Object}
 */
const pageBGColor = {
  name: '--page-bg-color',
  shortName: '--page-bg-color-short',
  longName: '--page-bg-color-long',
  val: localStorage.getItem('--page-bg-color'),
  shortVal: localStorage.getItem('--page-bg-color-short'),
  longVal: localStorage.getItem('--page-bg-color-long'),
  darkVal: '#363636',
};

/**
 * Color for the header
 * @type {Object}
 */
const headerColor = {
  name: '--header-color',
  shortName: '--header-color-short',
  longName: '--header-color-long',
  val: localStorage.getItem('--header-color'),
  shortVal: localStorage.getItem('--header-color-short'),
  longVal: localStorage.getItem('--header-color-long'),
  darkVal: '#2d2c2b',
};

/**
 * Color for even tr
 * @type {Object}
 */
const evenColor = {
  name: '--even-color',
  shortName: '--even-color-short',
  longName: '--even-color-long',
  val: localStorage.getItem('--btn-icon-color'),
  shortVal: localStorage.getItem('--btn-icon-color-short'),
  longVal: localStorage.getItem('--btn-icon-color-long'),
  darkVal: 'lightslategray',
};

/**
 * Toothpaste-esque colors
 * @type {Object}
 */
const toothpaste = {
  name: '--toothpaste',
  val: 'rgb(2, 177, 177)',
  darkVal: '#2d2c2b',
};

/**
 * Background color for table
 * @type {Object}
 */
const tableBG = {
  name: '--table-bg=color-short',
  val: '#60afcc',
  darkVal: '#2d2c2b',
};

/**
 * Modal background color
 * @type {Object}
 */
const modalBGColor = {
  name: '--modal-bg-color',
  val: '#f1f1f1',
  darkVal: '#2d2c2b',
};

/**
 * Font for modal
 * @type {Object}
 */
const modalFontColor = {
  name: '--modal-font-color',
  val: 'black',
  darkVal: 'white',
};

export {
  breakNames, pageBGColor, headerColor, toothpaste, tableBG, evenColor,
  modalBGColor, modalFontColor,
};
