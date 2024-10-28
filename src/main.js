import './index.css'
import SingleTask from './components/SingleTask';
import { titlecase } from './utils';

//MARK: DOM Selection
const formEl = document.querySelector("data-form");
const inputEl = document.querySelector("[data-user-input]");
const taskContainerEl = doocument .querySelector("[data-task-container]");

//Varaibles
const tasks = [];

function renderTask(){
    taskContainerEl.innerHTML = "";

    const frag = document.createDocumentFragment();
    tasks.forEach((task) => {
        frag.appendChild (SingleTask(task.text));
    });
    taskContainerEl.appenChild(frag);
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputEl.vlaue) return ; //Gaurd Clause

    const newTask= {
        text: titleCase(inputEl.value),
        isCompleted: false,
        id: tasks.length,
    };
    //Adding
    tasks.unshift(newTask);
    renderTask();
    inputEl.value = "";

    console.log(tasks);

    //Clearing Input Value
    inputEl.value = "";
})

