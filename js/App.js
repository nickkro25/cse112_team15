import { TodoListDom } from './ToDoList/TodoListDom.js';
import { Timer } from './Timer/Timer.js';
import { Statistics } from './Statistics/Statistics.js';
import { Distraction } from './Distraction/Distraction.js';
import { longBreakColors, shortBreakColors, workModeColors } from './Misc/ChangeColors.js';
import { breakModeSound, workModeSound } from './Misc/Sounds.js';
import { classNames } from './ToDoList/TaskVariables.js';
import { DistractedByDevice } from './Distraction/DistractedByDevice.js';

/**
 * Used to see if data needs to be cleared or not (if timer is started after 3 a.m. or not)
 * @returns True if the current time is 03:00:00 or later. False otherwise.
 */
function after3amToday() {
  const currDate = new Date();
  return currDate.getHours() >= 3;
}

/**
 * Navigation bar
 * @type {HTMLElement}
 */
const navBar = document.querySelector('nav');

/**
 * Location where time is displayed
 * @type {HTMLParagraphElement}
 */
const timeDisplay = document.getElementById('timeDisplay');

/**
 *  Location where current pomo session type  is displayed
 * @type {HTMLParagraphElement}
 */
const modeDisplay = document.getElementById('modeDisplay');

/**
 * Table where ToDo List is housed
 * @type {HTMLTableElement}
 */
const todoTable = document.getElementById('todo');

/**
 * Form for inputting new tasks
 * @type {HTMLFormElement}
 */
const addTodoForm = document.getElementById('add-todo');

/**
 * Button to submit addTodoForm
 * @type {HTMLButtonElement}
 */
const addTodoButton = document.getElementById('add-button');

/**
 * Button to start the timer
 * @type {HTMLButtonElement}
 */
const startTimerButton = document.getElementById('startTimer');

/**
 * Button to display the statistics popup
 * @type {HTMLButtonElement}
 */
const statsButton = document.getElementById('statsButton');

/**
 * Button to log a distraction
 * @type {HTMLButtonElement}
 */
const distractButton = document.getElementById('distractionButton');

/**
 * Section which houses the distraction popup
 * @type {HTMLElement}
 */
const distractPopUp = document.getElementById('distract-popup');

/**
 * Button to cancel logging a distraction
 * @type {HTMLButtonElement}
 */
const cancelButton = document.getElementById('cancel-button');

/**
 * Form for entering a new distraction
 * @type {HTMLFormElement}
 */
const distractForm = document.getElementById('distract-form');

/**
 * Input element for logging a distraction
 * @type {HTMLInputElement}
 */
const description = document.getElementById('description');

/**
 * Section which houses the statistics popup
 * @type {HTMLElement}
 */
const statsPopUp = document.getElementById('stats-section');

/**
 * Div which houses the text elements inside the statistics popup
 * @type {HTMLDivElement}
 */
const parentDiv = document.getElementById('parentDiv');

/**
 * Button to close the statitics popup
 * @type {HTMLButtonElement}
 */
const closeStatsButton = document.getElementById('close-stats-button');

/**
 * Button to delete all tasks
 * @type {HTMLButtonElement}
 */
const deleteAllButton = document.getElementById('delete-all-button');

/**
 * Overlay to darken popup backgrounds
 * @type {HTMLDivElement}
 */
const overlay = document.getElementById('overlay');

/**
 * Button to toggle "Data" tab within the Statistics popup
 * @type {HTMLButtonElement}
 */
const statsTabBtn = document.getElementById('data');
/**
 * Section for showing which task is currently in progress
 * @type {HTMLElement}
 */
const currentTaskDiv = document.getElementById('currentTask');

/**
 * Button to start the tour of the page
 * @type {HTMLButtonElement}
 */
const tourButton = document.getElementById('onboardingButton');

/**
 * Button to complete current task (replaces checkbox functionality)
 * @type {HTMLButtonElement}
 */
const finishTaskBtn = document.getElementById('finishTask');
/**
 * @type {Statistics}
 */
const StatsPage = new Statistics();
/**
 * @type {TodoListDom} DOM handler for the ToDo List data structure
 */
const TDLDom = new TodoListDom(todoTable, addTodoForm, addTodoButton,
  deleteAllButton, finishTaskBtn, currentTaskDiv);

/**
 * @type {Timer}
 */
const TimerObj = new Timer(startTimerButton, timeDisplay, modeDisplay);
/**
 * @type {Distraction}
 */
const DistractionPage = new Distraction(distractButton, distractPopUp,
  cancelButton, distractForm, description, overlay);
/**
 * The switch element in settings for this feature
 * @type {HTMLInputElement}
 */
const noDeviceSwitch = document.getElementById('noDeviceSwitch');
/**
 * For handling device distractions
 * @type {DistractedByDevice}
 */
const distractedByDevice = new DistractedByDevice(noDeviceSwitch, modeDisplay);
/**
 * For hiding/showing the nav buttons
 * @type {Array}
 */
const navButtons = [document.getElementById('faqButton'),
  document.getElementById('statsButton'),
  document.getElementById('settingsButton'),
  document.getElementById('onboardingButton')];

// if the user has not already visited the page, run the introduction
if (localStorage.getItem('onboarding') === null) {
  // eslint-disable-next-line
  introJs().start();
  localStorage.setItem('onboarding', 'true');
}

/**
 * Event listener for the tour button to play the tour
 */
tourButton.addEventListener('click', () => {
  // eslint-disable-next-line
  introJs().start();
});

/**
 * Update session indicator icons based on how many pomos are left until long break
 */
function updateSessionIndicators(location) {
  const indicators = document.querySelectorAll('.indicator');
  // Long break finished, reset all indicators
  if (location === 7) {
    for (let i = 0; i < indicators.length; i += 1) {
      indicators[i].textContent = 'trip_origin';
    }
  } else {
    // fill in the appropriate indicator
    indicators[6 - location].textContent = 'circle';
  }
}

/**
 * When timer is complete, if a work session was completed then:
 * 1. Increment current task pomo sessions
 * 2. Add work time to stats
 * 3. Increment completed pomo sessions in stats
 *
 * If a break session was just completed, the add to total time spent in stats
 *
 * Then change colors accordingly
 */
TimerObj.addEventListener('timer-complete', (e) => {
  if (e.detail.sessionIsWork) { // if it was a work mode
    distractedByDevice.endPomoTime();
    TDLDom.onSessionComplete();
    StatsPage.addWorkTime(e.detail.duration);
    StatsPage.incrementActualPomoSessions();

    if (e.detail.nextSessionName === 'Short Break') {
      shortBreakColors();
    } else {
      longBreakColors();
    }
    breakModeSound();
  } else {
    StatsPage.addTimeSpent(e.detail.duration);
    workModeColors();
    workModeSound();
  }
  updateSessionIndicators(e.detail.longBreakLocation);
});

/**
 * When the start/stop timer button is clicked:
 * 1. If there is old data, compress it and clear it
 * 2. If you are clicking stop timer:
 *  a. Compress statistics
 *  b. Set session start time to a past date so it resets when start button is fixed.
 */
startTimerButton.addEventListener('click', () => {
  if (StatsPage.dataToCompressExists()) {
    StatsPage.clearData();
  }
  if (startTimerButton.childNodes[0].nodeValue === 'Start') { // Button text updates before this
    StatsPage.compressStats();
    // Definitely in the past so data is cleared when Start Day is clicked
    const newDate = new Date(2000, 0, 1);
    localStorage.setItem('startDateTime', newDate);
    StatsPage.sessionStartDateTime = newDate;
  }
});

function enterFocusMode() {
  todoTable.parentElement.style.opacity = '0';
  todoTable.parentElement.style.visibility = 'hidden';
  todoTable.parentElement.style.transition = 'visibility 0s 0.25s, opacity 0.25s linear';
  timeDisplay.parentElement.parentElement.classList.add('focus');
  currentTaskDiv.classList.add('focus');
  navBar.style.transitionDuration = '0.2s';
  navBar.classList.add('focus');
  document.getElementById('sessionIndicator').style.opacity = 0;
  document.getElementById('sessionIndicator').classList.add('focus');
}

function exitFocusMode() {
  todoTable.parentElement.style.opacity = '1';
  todoTable.parentElement.style.visibility = 'visible';
  todoTable.parentElement.style.transition = 'opacity 1s linear';
  todoTable.parentElement.style.transitionDelay = '1s';
  timeDisplay.parentElement.parentElement.classList.remove('focus');
  currentTaskDiv.classList.remove('focus');
  navBar.style.transitionDuration = '0.2s';
  navBar.classList.remove('focus');
  document.getElementById('sessionIndicator').style.opacity = 1;
  document.getElementById('sessionIndicator').classList.remove('focus');
}

/**
 * When a session is started:
 * If it is a work session, disable distraction button, otherwise enable the distraction button
 */
TimerObj.addEventListener('timer-start', (e) => {
  if (e.detail.sessionIsWork) {
    distractButton.disabled = false;
    // hide all buttons on focus
    navButtons.forEach((element) => {
      element.style.opacity = '0';
      element.style.pointerEvents = 'none';
    });
    distractedByDevice.startPomoTime();
    enterFocusMode();
  } else {
    distractButton.disabled = true;
    DistractionPage.resetPopUp();
    // unhide buttons on break time
    navButtons.forEach((element) => {
      element.style.opacity = '1';
      element.style.pointerEvents = 'auto';
    });
    exitFocusMode();
  }
});

/**
 * If the timer isn't ticking, you cannot log a distraction so disable the distraction button
 */
TimerObj.addEventListener('timer-end', () => {
  distractButton.disabled = true;

  distractedByDevice.endPomoTime();
  DistractionPage.resetPopUp();
  // show all buttons when timer ends
  navButtons.forEach((element) => {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
  });
  exitFocusMode();
});

document.body.addEventListener('task-up', (e) => {
  TDLDom.moveTaskUp(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

document.body.addEventListener('task-down', (e) => {
  TDLDom.moveTaskDown(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

/**
 * Event that fires when someone focuses on a certain task
 */
document.body.addEventListener('focus-task', (e) => {
  TDLDom.onFocusTask(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

/**
 * Event that fires when someone deletes a task
 */
document.body.addEventListener('task-deleted', (e) => {
  TDLDom.todoList.removeTask(e.detail.taskID);
  TDLDom.updateCurrentTask();
});

/**
 * Event that fires when someone checks/unchecks checkbox
 */
document.body.addEventListener('checkbox-updated', (e) => {
  // chechBoxstate is the updated checkbox state (state after event happened)
  if (e.detail.checkBoxState === true) {
    TDLDom.onCompletedTask();
  } else {
    TDLDom.onUncheckedTask(e.detail.taskID);
  }
  TDLDom.updateCurrentTask();
});

/**
 * This function determines if someone clicked the area where the delete
 * and the focus button show up, in order to hide them if the cursor was
 * clicked somewhere else
 */
window.addEventListener('click', (e) => {
  const lastColumnElements = document.getElementsByClassName(classNames.lastCol);
  let touchedButton = false;

  for (let i = 0; i < lastColumnElements.length && !touchedButton; i += 1) {
    if (lastColumnElements[i].contains(e.target)) touchedButton = true;
  }

  if (!touchedButton) {
    const buttonPairList = document.getElementsByClassName(classNames.doubleButtons);
    const threeDotButtonList = document.getElementsByClassName(classNames.threeDotsWrapper);
    for (let i = 0; i < buttonPairList.length; i += 1) {
      buttonPairList[i].style.display = 'none';
      threeDotButtonList[i].style.display = 'flex';
    }
  }
});

/**
 * When a task is created, add the expected pomo-duration to stats
 */
TDLDom.todoList.addEventListener('task-added', (e) => {
  StatsPage.addExpectedPomoSessions(e.detail.duration);
});

/**
 * When a task is checked off, update the number of completed tasks in stats
 */
TDLDom.todoList.addEventListener('task-checked-off', () => {
  StatsPage.incrementTasksCompleted();
});

/**
 * When a task is un-checked, update the number of completed tasks in stats
 */
TDLDom.todoList.addEventListener('task-unchecked', () => {
  StatsPage.decrementTasksCompleted();
});

/**
 * When a task is deleted, subtract the expected pomo-duration from stats
 */
TDLDom.todoList.addEventListener('task-deleted', (e) => {
  StatsPage.deleteExpectedPomoSessions(e.detail.pomoSessions);
});

/**
 * When a distraction is logged:
 * 1. Store the id of the session during which it occurred
 * 2. Reset the current work session
 * 3. Store the distraction in task
 */
function distractionCreated(e) {
  e.detail.pomoSessionId = TimerObj.sessionId;
  TimerObj.resetSession();
  StatsPage.addDistraction(e.detail);
}

DistractionPage.addEventListener('distraction-created', distractionCreated);
distractedByDevice.addEventListener('distraction-created', distractionCreated);

/**
 * When End Day is clicked, set pomo session id back to zero to restart distraction count
 */
StatsPage.addEventListener('reset-timer', () => {
  TimerObj.resetPomoSessionId();
});

/**
 * Makes the Statistics button in the header  responsive
 */
statsButton.addEventListener('click', () => {
  StatsPage.updateDom();
  statsPopUp.style.display = 'block';
  parentDiv.style.display = 'block';
  statsPopUp.style.animation = 'fadeEffect-popup 1s';
  overlay.style.animation = 'fadeEffect-overlay 1s';
  parentDiv.setAttribute('class', 'slide-in');
  document.getElementById('overlay').style.display = 'block';
});

/**
 * Makes the Statistics close button responsive
 */
closeStatsButton.addEventListener('click', () => {
  parentDiv.setAttribute('class', 'slide-out');
  statsPopUp.style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
});

/**
 * If it's after 3a.m. today and the last time that "Start Day" was clicked was
 * before 3a.m. today, compress stats and clear data
 */
if (after3amToday() && StatsPage.dataToCompressExists()) {
  StatsPage.compressStats();
  StatsPage.clearData();
}

/**
 * Makes the Data tab default when Statistics popup appears
 */
statsTabBtn.click();

navBar.addEventListener('transitionend', () => {
  navBar.style.transitionDuration = '0.2s';
});
