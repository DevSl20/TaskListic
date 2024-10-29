import './index.css'
import SingleTask from './components/SingleTask';
import { titleCase, randomID } from './utils';

// === MARK: DOM Selection
const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-user-input]");
const taskContainerEl = document.querySelector("[data-task-container]");

//Variables
const state = [];

function renderTask(){
    taskContainerEl.innerHTML = "";

    const frag = document.createDocumentFragment();
    state.forEach((task) => {
        frag.appendChild (SingleTask(task.text, task.isCompleted, task.id));
    });
    taskContainerEl.appenChild(frag);
}
    //=== MARK: Listener
    formEl.addEventListener("submit", (e) =>{
        e.preventDefault(); 
        if (!inputEl.value) return; // Gaurd Clause
    
    //New Task Creating
    const newTask= {
        text: titleCase(inputEl.value),
        isCompleted: true,
        id: randomID(),
    };

    //Adding
    state.unshift(newTask);
    renderTask();
    console.log(state);
    //Input Value clear
    inputEl.value = "";
});

taskContainerEl.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
        toggleCompleted(e.target.id);
        state.sort((a,b) => a.isCompleted - b.isCompleted);
        renderTask();
    //   console.log(e.target.id);
    }
  });

    //Render the Current Year
    const showYearEl = document.querySelector(".show-year");
showYearEl.textContent = new Date().getFullYear();



