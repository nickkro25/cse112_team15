import{classNames}from"./TaskVariables.js";import{TaskStorage}from"./TodoListDomVariables.js";class Task extends HTMLTableRowElement{constructor(t,e,s,n=0,o=!1){super(),this.className=classNames.uncheckedTaskClassName,this.id=t,this.name=e,this.totalSessions=s,this.currentSessionNum=n,this.checked=o,this.checkBox=this.setupCheckBox(),this.taskText=this.setupTaskText(),this.pomoSessions=this.setupTotalPomoSessions(),this.deleteButton=this.setupDeleteButton(),this.threeDotsButton=this.setupThreeDotsButton(),this.focusButton=this.setupFocusButton(),this.taskUpButton=this.setupTaskUpButton(),this.taskDownButton=this.setupTaskDownButton(),this.setupLastColumnToggle(this.threeDotsButton,this.deleteButton,this.focusButton,this.taskUpButton,this.taskDownButton)}setupCheckBox(){const t=document.createElement("td"),e=document.createElement("input");e.setAttribute("type","checkbox"),e.setAttribute("id",`checkbox-${this.id}`),e.setAttribute("class","custom_checkbox");const s=document.createElement("label");return s.setAttribute("id",`done-${this.id}`),s.setAttribute("for",`checkbox-${this.id}`),s.setAttribute("class","material-icons"),s.textContent="check_box",s.addEventListener("mouseenter",(()=>{s.textContent="check_box_outline_blank"})),s.addEventListener("mouseleave",(()=>{s.textContent="check_box"})),t.appendChild(e),t.appendChild(s),this.appendChild(t),e.disabled=!0,this.checked&&(this.setAttribute("class",classNames.completedTaskClassName),e.checked=!0,e.disabled=!1),e.addEventListener("click",(()=>{this.checked?this.uncheckTask():this.checkOffTask();const t=new CustomEvent("checkbox-updated",{bubbles:!0,composed:!0,detail:{taskID:this.id,checkBoxState:this.checked}});document.body.dispatchEvent(t)})),e}setupTaskText(){const t=document.createElement("td");return t.setAttribute("id",`text-${this.id}`),this.appendChild(t),this.updateText(),t}setupTotalPomoSessions(){const t=document.createElement("td");return t.setAttribute("id",`pomoSessions-${this.id}`),this.appendChild(t),this.updatePomoSessions(),t}setupDeleteButton(){const t=document.createElement("button");return t.className="material-icons delete-single",t.textContent="delete",t.addEventListener("click",(()=>{this.onDelete()})),t}setupFocusButton(){const t=document.createElement("button");return t.className="material-icons focus",t.textContent="keyboard_double_arrow_up",this.checked&&(t.style.display="none"),t.addEventListener("click",(()=>{this.threeDotsButton.parentElement.style.display="flex",t.parentElement.style.display="none";const e=new CustomEvent("focus-task",{bubbles:!0,composed:!0,detail:{taskID:this.id}});document.body.dispatchEvent(e)})),t}setupTaskUpButton(){const t=document.createElement("button");return t.className="material-icons task-up",t.textContent="keyboard_arrow_up",this.checked&&(t.style.display="none"),t.addEventListener("click",(()=>{this.threeDotsButton.parentElement.style.display="flex",t.parentElement.style.display="none";const e=new CustomEvent("task-up",{bubbles:!0,composed:!0,detail:{taskID:this.id}});document.body.dispatchEvent(e)})),t}setupTaskDownButton(){const t=document.createElement("button");return t.className="material-icons task-down",t.textContent="keyboard_arrow_down",this.checked&&(t.style.display="none"),t.addEventListener("click",(()=>{this.threeDotsButton.parentElement.style.display="flex",t.parentElement.style.display="none";const e=new CustomEvent("task-down",{bubbles:!0,composed:!0,detail:{taskID:this.id}});document.body.dispatchEvent(e)})),t}setupThreeDotsButton(){const t=document.createElement("button");return t.className="material-icons three-dots",t.textContent="more_vert",t.addEventListener("click",(()=>{t.parentElement.style.display="none",this.deleteButton.parentElement.style.display="flex"})),t}setupLastColumnToggle(t,e,s,n,o){const a=document.createElement("td"),i=document.createElement("div"),c=document.createElement("div"),l=document.createElement("div");l.className=classNames.doubleButtons,l.appendChild(e),l.appendChild(s),l.appendChild(n),l.appendChild(o),c.appendChild(t),c.className=classNames.threeDotsWrapper,l.style.display="none",i.appendChild(c),i.className=classNames.lastCol,i.appendChild(l),a.appendChild(i),this.appendChild(a)}removeFromLocalStorage(){for(let t=0;t<window.localData.length;t+=1)window.localData[t][TaskStorage.idIndex]===this.id&&window.localData.splice(t,1);localStorage.setItem("tasks",JSON.stringify(window.localData))}updateText(){this.querySelector(`#text-${this.id}`).textContent=this.name}updatePomoSessions(){this.querySelector(`#pomoSessions-${this.id}`).textContent=`${this.currentSessionNum}/${this.totalSessions}`}incrementSession(){if(this.checked)throw new RangeError("Increment checked Task");this.currentSessionNum+=1,this.updatePomoSessions(),this.updateLocalStorage()}updateLocalStorage(){for(let t=0;t<window.localData.length;t+=1)window.localData[t][TaskStorage.idIndex]===this.id&&(window.localData[t][TaskStorage.currentSessionIndex]=this.currentSessionNum,window.localData[t][TaskStorage.checkedIndex]=this.checked);localStorage.setItem("tasks",JSON.stringify(window.localData))}checkOffTask(){this.checked=!0,this.setAttribute("class",classNames.completedTaskClassName);const t=new CustomEvent("task-checked-off",{});this.dispatchEvent(t);const e=this.focusButton.parentElement;e.style.display="none";for(let t=1;t<e.children.length;t+=1)e.children[t].style.display="none";this.updateLocalStorage()}uncheckTask(){this.checked=!1,this.setAttribute("class",classNames.uncheckedTaskClassName);const t=this.focusButton.parentElement;t.style.display="flex";for(let e=1;e<t.children.length;e+=1)t.children[e].style.display="inline-block";this.checkBox.disabled=!1,this.updateLocalStorage()}onDelete(){this.remove(),this.removeFromLocalStorage();let t=new CustomEvent("task-deleted",{bubbles:!0,composed:!0,detail:{taskID:this.id}});document.body.dispatchEvent(t),t=new CustomEvent("task-deleted",{detail:{pomoSessions:this.totalSessions}}),this.dispatchEvent(t)}}export{Task};customElements.define("task-item",Task,{extends:"tr"});
