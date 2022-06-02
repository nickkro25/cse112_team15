import { Timer } from '../js/Timer/Timer';
import {
  workMode, shortBreakMode, longBreakMode, buttonText,
} from '../js/Timer/TimerVariables';
import Worker from './mockWorker.js';

beforeEach(() => {
  window.localData = [];
  window.Worker = Worker;
  window.Notification = ({
    permission: 'denied',
  });
  document.body.innerHTML = '<div>'
  + '  <p id="displayTime"></p>'
  + ' <p id="displayStatus"></p>'
  + '<button id=start>Start&nbsp;&nbsp;&nbsp;&nbsp;</button>'
  + '<input type="number" id="focusTime">'
  + '<input type="number" id="shortBreakTime">'
  + '<input type="number" id="longBreakTime">'
  + '<input type="checkbox" id="autoStartSwitch" checked="true">'
  + '</div>';
  jest.useFakeTimers();
  jest.clearAllTimers();
});

test('Test Initial State is Nothing', () => {
  const button = document.getElementById('start');
  const displayTime = document.getElementById('displayTime');
  const TimerObj = new Timer(button, displayTime, null);
  expect(TimerObj.state).toBe('');
  expect(TimerObj.sessionId).toBe(0);
});

test('Test First Iteration of Timer', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  TimerObj.startTimer();
  expect(TimerObj.state).toBe(workMode.name);
});

test('Test That Queue Gets Updated During Second Iteration Of Timer', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();

  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(TimerObj.stateQueue[0]).toBe(shortBreakMode);
  expect(TimerObj.stateQueue[6]).toBe(longBreakMode);
});

test('Test That Multiple Iterations of the Timer Work', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();

  jest.advanceTimersByTime(workMode.duration * 120 * 1000);
  expect(TimerObj.sessionId).toBe(1);
});

test('Test That HTML Gets Updated During Second ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  TimerObj.startTimer();
  jest.advanceTimersByTime(workMode.duration * 60 * 1000);

  expect(displayStatus.textContent).toBe(shortBreakMode.name);
  expect(displayTime.textContent).toBe(`${shortBreakMode.duration}:00`);
});

test('Test That Start Button Functions Properly ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  expect(button.textContent).toBe(buttonText.stopTimerText);
});

test('Test That Clicking Start Twice Changes HTML ', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  button.click();
  expect(TimerObj.startButton.textContent.indexOf(buttonText.startTimerText) > -1).toBe(true);
  expect(TimerObj.displayStatus.textContent).toBe('Pomo-Time!');
});

test('Test That Timer Resets Properly When End Day is Clicked', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  jest.clearAllTimers();
  button.click();
  jest.advanceTimersByTime(workMode.duration * 60 * 1000);
  button.click();
  TimerObj.resetPomoSessionId();
  expect(TimerObj.stateQueue[0]).toBe(workMode);
  expect(TimerObj.sessionId).toBe(0);
});

test('Test Timer Pauses After Work Session When Auto Start is Disabled', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);
  const autoStartSwitch = document.getElementById('autoStartSwitch');
  jest.clearAllTimers();
  button.click();
  autoStartSwitch.checked = false;
  jest.advanceTimersByTime(workMode.duration * 60 * 1000);
  expect(TimerObj.displayStatus.textContent).toBe('Short Break');
  expect(button.childNodes[0].nodeValue).toBe(buttonText.startTimerText);
  expect(displayStatus.textContent).toBe('Short Break');
  expect(document.title).toBe('Short Break');
});

test('get previous time durations from localStorage on refresh', () => {
  localStorage.workModeTime = 26;
  localStorage.shortBreakTime = 6;
  localStorage.longBreakTime = 16;

  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);

  expect(TimerObj.focusTime.value).toBe('26');
  expect(TimerObj.shortBreakTime.value).toBe('6');
  expect(TimerObj.longBreakTime.value).toBe('16');

  localStorage.clear();
});

test('changeTime', () => {
  const displayTime = document.getElementById('displayTime');
  const displayStatus = document.getElementById('displayStatus');
  const button = document.getElementById('start');
  const TimerObj = new Timer(button, displayTime, displayStatus);

  const event = new Event('change');

  const focus = TimerObj.focusTime;
  focus.dispatchEvent(event);
  event.target.value = 33;
  focus.dispatchEvent(event);
  expect(localStorage.workModeTime).toBe('33');

  const shortBreak = TimerObj.shortBreakTime;
  shortBreak.dispatchEvent(event);
  event.target.value = 1;
  shortBreak.dispatchEvent(event);
  expect(localStorage.shortBreakTime).toBe('1');

  const longBreak = TimerObj.longBreakTime;
  longBreak.dispatchEvent(event);
  event.target.value = 9;
  longBreak.dispatchEvent(event);
  expect(localStorage.longBreakTime).toBe('9');
});
