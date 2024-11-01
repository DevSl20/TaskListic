import './index.css'
import localforage from 'localforage';
import { sortBy as sort } from 'lodash';
import SingleTask from './components/SingleTask';
import { titleCase, randomID } from './utils';
import { formEl, inputEl, taskContainerEl} from './domSelection';

//===MARK: State
let state = [];

localforage.setDriver(localforage.LOCALSTORAGE);
function updateLocal(){
    localforage.setItem("tasks", state);
}

localforage.getItem("tasks").then((data) => {
    state = data || [];
    renderTasks();
  });

    //=== MARK: ClearTasks
function clearTasks(){
        state.length= 0;
        updateLocal();
        renderTasks();
        inputEl.value= "";
        
    }

function toggleCompleted(id) {
    state = state.map((task) => {
      if (id === task.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
  
      return task;
    });

    updateLocal();
  }

    //=== MARK: Render
function renderTasks(){
    taskContainerEl.innerHTML = "";

    const frag = document.createDocumentFragment();
    state.forEach((task) => {
        frag.appendChild (SingleTask(task.text, task.isCompleted, task.id));
    });

    taskContainerEl.appendChild(frag);
}

    //=== MARK: Listener
    formEl.addEventListener("submit", (e) =>{
        e.preventDefault(); 
        if (!inputEl.value) return; // Gaurd Clause
    
    //New Task Creating
    const newTask= {
        text: titleCase(inputEl.value),
        isCompleted: false,
        id: randomID(),
    };

    //Adding
    state.unshift(newTask);

    // localforage.setItem("tasks", state);
    updateLocal();

    renderTasks();

    //Input Value clear
    inputEl.value = "";
});

taskContainerEl.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
        toggleCompleted(e.target.id);

        //First show Uncompleted
        state.sort((a,b) => a.isCompleted - b.isCompleted);

        updateLocal();
        renderTasks();
    //   console.log(e.target.id);
    }
  });

    //Render the Current Year
    const showYearEl = document.querySelector(".show-year");
showYearEl.textContent = new Date().getFullYear();



