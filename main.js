let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


//empty array to store the tasks
let arrayOfTasks = [];

//  add task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //add task to array of tasks
        input.value = ""; //empty input field
    }
};

function addTaskToArray(taskText) {
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push task to array of tasks
    arrayOfTasks.push(task);
    // console.log(arrayOfTasks)
    // add tasks to page
    addElementsTOPageFrom(arrayOfTasks);
    //  add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
    // // test
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsTOPageFrom(arrayOfTasks) {
    // empty tasks div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done
        if (task.completed) {
            div.className = "task done";


        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // console.log(div);
        // create delete button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append button to main div
        div.appendChild(span);
        // console.log(div);
        //  add task div to tasks container
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function addDataToLocalStorageFrom() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        console.log(tasks);
    }
}
