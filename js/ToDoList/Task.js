import { classNames } from './TaskVariables.js';
import { TaskStorage } from './TodoListDomVariables.js';

/**
 * Task object, stores its id, task name, total expected Pomo Sessions to complete the Task,
 * the number of the current Pomo Session, and whether the task has been completed or not.
 */
class Task extends HTMLTableRowElement {
  /**
  * Task construcutor. Initializes the task with appropriate attributes
  * @param {String} id - Id of the task
  * @param {String} name - Name of the task
  * @param {Number} totalSessions - Total sessions the task should take
  * @param {Number} [currentSession = 0] - Total sessions the task has taken
  * @param {Number} [completed = false] - Is the task completed or not
  */
  constructor(id, name, totalSessions, currentSession = 0, completed = false) {
    super();
    /**
     * Holds the current classname of the task object
     * @type {String}
     */
    this.className = classNames.uncheckedTaskClassName;
    /**
     * Stores the id of the task
     * @type {String}
     */
    this.id = id;
    /**
     * Stores the name of the task
     * @type {String}
     */
    this.name = name;
    /**
     * Stores the total sessions anticipated for the task
     * @type {Number}
     */
    this.totalSessions = totalSessions;
    /**
     * Stores the total amount of sessions spent working on the task
     * @type {Number}
     */
    this.currentSessionNum = currentSession;
    /**
     * Stores if the task has been checked off or not
     * @type {Boolean}
     */
    this.checked = completed;

    /**
     * The checkbox attribute for the task
     * @type {HTMLInputElement}
     */
    this.checkBox = this.setupCheckBox();

    /**
     * Stores the view that shows the task name to the user
     * @type {HTMLTableDataCellElement}
     */
    this.taskText = this.setupTaskText();
    /**
     * Stores the view that displayes the total pomo sessions spent
     * and alloted for the tasl
     * @type {HTMLTableDataCellElement}
     */
    this.pomoSessions = this.setupTotalPomoSessions();
    /**
     * The delete button for the task
     * @type {HTMLButtonElement}
     */
    this.deleteButton = this.setupDeleteButton();
    /**
     * The button that hides the delete and focus buttons
     * @type {HTMLButtonElement}
     */
    this.threeDotsButton = this.setupThreeDotsButton();
    /**
     * The focus button for the task
     * @type {HTMLButtonElement}
     */
    this.focusButton = this.setupFocusButton();

    this.taskUpButton = this.setupTaskUpButton();
    this.taskDownButton = this.setupTaskDownButton();

    this.setupLastColumnToggle(this.threeDotsButton,
      this.deleteButton,
      this.focusButton,
      this.taskUpButton,
      this.taskDownButton);
  }

  /**
   * This sets up the checkbox to check off tasks
   * @returns {HTMLInputElement}
   */
  setupCheckBox() {
    const firstCol = document.createElement('td');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `checkbox-${this.id}`);
    checkBox.setAttribute('class', 'custom_checkbox');
    const icon = document.createElement('label');
    icon.setAttribute('id', `done-${this.id}`);
    icon.setAttribute('for', `checkbox-${this.id}`);
    icon.setAttribute('class', 'material-icons');
    icon.textContent = 'check_box';
    icon.addEventListener('mouseenter', () => { icon.textContent = 'check_box_outline_blank'; });
    icon.addEventListener('mouseleave', () => { icon.textContent = 'check_box'; });
    firstCol.appendChild(checkBox);
    firstCol.appendChild(icon);
    this.appendChild(firstCol);
    // undisable the checkbox by default (updated by the todolistdom class)
    checkBox.disabled = false;

    if (this.checked) {
      this.setAttribute('class', classNames.completedTaskClassName);
      checkBox.checked = true;
      checkBox.disabled = false;
    }

    checkBox.addEventListener('click', () => {
      if (!this.checked) {
        this.checkOffTask();
      } else {
        this.uncheckTask();
      }
      const event = new CustomEvent('checkbox-updated', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
          checkBoxState: this.checked,
        },
      });
      document.body.dispatchEvent(event);
    });
    return checkBox;
  }

  /**
   * This sets up the view that will display the task name
   * @returns {HTMLTableDataCellElement}
   */
  setupTaskText() {
    const text = document.createElement('td');
    text.setAttribute('id', `text-${this.id}`);
    this.appendChild(text);
    this.updateText();
    return text;
  }

  /**
   * This sets up the view that will display the pomo sessions
   * @return {HTMLTableDataCellElement}
   */
  setupTotalPomoSessions() {
    const pomoSessions = document.createElement('td');
    pomoSessions.setAttribute('id', `pomoSessions-${this.id}`);
    this.appendChild(pomoSessions);
    this.updatePomoSessions();
    return pomoSessions;
  }

  /**
   * This sets up the delete button for a task
   * Delete only works visually, doesn't remove it from the TodoList
   * Data Structure
   * @return {HTMLButtonElement}
   */
  setupDeleteButton() {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'material-icons delete-single';
    deleteBtn.textContent = 'delete';
    deleteBtn.addEventListener('click', () => {
      this.onDelete();
    });
    return deleteBtn;
  }

  /**
   * This sets up the focus button for a task. The button fires and event that
   * indicates the task has been focused on, and hides the button
   * @returns {HTMLButtonElement}
   */
  setupFocusButton() {
    const focusBtn = document.createElement('button');
    focusBtn.className = 'material-icons focus';
    focusBtn.textContent = 'keyboard_double_arrow_up';

    // hide the button if the task came from local storage and was checked
    if (this.checked) {
      focusBtn.style.display = 'none';
    }

    focusBtn.addEventListener('click', () => {
      this.threeDotsButton.parentElement.style.display = 'flex';
      focusBtn.parentElement.style.display = 'none';
      const event = new CustomEvent('focus-task', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
        },
      });
      document.body.dispatchEvent(event);
    });

    return focusBtn;
  }

  setupTaskUpButton() {
    const taskUpBtn = document.createElement('button');
    taskUpBtn.className = 'material-icons task-up';
    taskUpBtn.textContent = 'keyboard_arrow_up';

    if (this.checked) {
      taskUpBtn.style.display = 'none';
    }

    taskUpBtn.addEventListener('click', () => {
      this.threeDotsButton.parentElement.style.display = 'flex';
      taskUpBtn.parentElement.style.display = 'none';
      const event = new CustomEvent('task-up', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
        },
      });
      document.body.dispatchEvent(event);
    });
    return taskUpBtn;
  }

  setupTaskDownButton() {
    const taskDownBtn = document.createElement('button');
    taskDownBtn.className = 'material-icons task-down';
    taskDownBtn.textContent = 'keyboard_arrow_down';
    if (this.checked) {
      taskDownBtn.style.display = 'none';
    }

    taskDownBtn.addEventListener('click', () => {
      this.threeDotsButton.parentElement.style.display = 'flex';
      taskDownBtn.parentElement.style.display = 'none';
      const event = new CustomEvent('task-down', {
        bubbles: true,
        composed: true,
        detail: {
          taskID: this.id,
        },
      });
      document.body.dispatchEvent(event);
    });
    return taskDownBtn;
  }

  /**
   * Setups up the three dots "show more" button. Wrapped inside a div so it
   * can easily dissapear and appear on clicks
   * @returns {HTMLButtonElement}
   */
  setupThreeDotsButton() {
    const button = document.createElement('button');
    button.className = 'material-icons three-dots';
    button.textContent = 'more_vert';
    button.addEventListener('click', () => {
      button.parentElement.style.display = 'none';
      this.deleteButton.parentElement.style.display = 'flex';
    });

    return button;
  }

  /**
   * Sets up the last column of the todolist. Wraps things
   * in the divs they need to be wrapped in. Add task
   * and check HTML file to see structure that this creates
   * @param {HTMLButtonElement} threeDotsButton - show more button
   * @param {HTMLDivElement} deleteDiv - div where the delete button is located
   * @param {HTMLDivElement} focusDiv - div where the focus button is located
   */
  setupLastColumnToggle(threeDotsButton, deleteDiv,
    focusDiv, taskUpDiv, taskDownDiv) {
    const lastCol = document.createElement('td');
    const lastColDiv = document.createElement('div');
    const threeDotsDiv = document.createElement('div');
    const ButtonsDiv = document.createElement('div');

    // wrap the delete and focus buttons in a div
    ButtonsDiv.className = classNames.doubleButtons;
    ButtonsDiv.appendChild(deleteDiv);
    ButtonsDiv.appendChild(focusDiv);
    ButtonsDiv.appendChild(taskUpDiv);
    ButtonsDiv.appendChild(taskDownDiv);
    // wrap the three dots button in a div
    threeDotsDiv.appendChild(threeDotsButton);
    threeDotsDiv.className = classNames.threeDotsWrapper;

    // make sure the delete and focus buttons are hidden
    ButtonsDiv.style.display = 'none';
    lastColDiv.appendChild(threeDotsDiv);
    lastColDiv.className = classNames.lastCol;
    lastColDiv.appendChild(ButtonsDiv);
    lastCol.appendChild(lastColDiv);
    this.appendChild(lastCol);
  }

  /**
   * Removes a task from local storage given the id
   */
  removeFromLocalStorage() {
    for (let i = 0; i < window.localData.length; i += 1) {
      if (window.localData[i][TaskStorage.idIndex] === this.id) {
        window.localData.splice(i, 1);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Update method to edit task name
   */
  updateText() {
    this.querySelector(`#text-${this.id}`).textContent = this.name;
    // this.children[1].textContent = this.name;
  }

  /**
   * This updates the pomo sessions when a session is complete
   */
  updatePomoSessions() {
    this.querySelector(`#pomoSessions-${this.id}`).textContent = `${this.currentSessionNum}/${this.totalSessions}`;
    // this.children[2].textContent = `${this.currentSessionNum}/${this.totalSessions}`;
  }

  /**
   * Increment this task's current session number. Checks off task if all sessions completed.
   * @throws {RangeError} - Incrementing a completed tasks' session number
   * (all sessions have been completed or user has checked off task manually)
   */
  incrementSession() {
    if (this.checked) {
      throw (new RangeError('Increment checked Task'));
    }

    this.currentSessionNum += 1;
    this.updatePomoSessions();

    this.updateLocalStorage();
  }

  /**
   * This updates the localStorage whenever session increases or checked off
   */
  updateLocalStorage() {
    for (let i = 0; i < window.localData.length; i += 1) {
      if (window.localData[i][TaskStorage.idIndex] === this.id) {
        window.localData[i][TaskStorage.currentSessionIndex] = this.currentSessionNum;
        window.localData[i][TaskStorage.checkedIndex] = this.checked;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(window.localData));
  }

  /**
   * Marks a task as completed
   */
  checkOffTask() {
    this.checked = true;
    this.setAttribute('class', classNames.completedTaskClassName);
    const event = new CustomEvent('task-checked-off', {
    });

    this.dispatchEvent(event);
    const buttonsDiv = this.focusButton.parentElement;
    buttonsDiv.style.display = 'none';
    for (let i = 1; i < buttonsDiv.children.length; i += 1) {
      buttonsDiv.children[i].style.display = 'none';
    }
    this.updateLocalStorage();
  }

  /**
   * Marks a task as not completed
   */
  uncheckTask() {
    this.checked = false;
    this.setAttribute('class', classNames.uncheckedTaskClassName);
    const buttonsDiv = this.focusButton.parentElement;
    buttonsDiv.style.display = 'flex';
    for (let i = 1; i < buttonsDiv.children.length; i += 1) {
      buttonsDiv.children[i].style.display = 'inline-block';
    }
    this.checkBox.disabled = false;
    this.updateLocalStorage();
  }

  /**
   * Deletes a task, remove from DOM, tasklist and localStorage
   */
  onDelete() {
    this.remove();
    this.removeFromLocalStorage();
    // for actual task deletion
    let event = new CustomEvent('task-deleted', {
      bubbles: true,
      composed: true,
      detail: {
        taskID: this.id,
      },
    });
    document.body.dispatchEvent(event);

    // for stats
    event = new CustomEvent('task-deleted', {
      detail: {
        pomoSessions: this.totalSessions,
      },
    });
    this.dispatchEvent(event);
  }
}

export { Task };
customElements.define('task-item', Task, { extends: 'tr' });
