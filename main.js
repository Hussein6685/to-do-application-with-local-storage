let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


//empty array to store the tasks
let arrayOfTasks = [];


// check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local storage function
getDataFromLocalStorage();

//  add task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //add task to array of tasks
        input.value = ""; //empty input field
    }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
    // delete button
    if (e.target.classList.contains("del")) {
        //  remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //  remove element from page
        e.target.parentElement.remove();
    }
    // task element
    if (e.target.classList.contains("task")) {
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //  toggle done class
        e.target.classList.toggle("done");
    }
})


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
    addElementsToPageFrom(arrayOfTasks);
    //  add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
    // // test
    // console.log(arrayOfTasks);
    // console.log(JSON.stringify(arrayOfTasks));
}

function addElementsToPageFrom(arrayOfTasks) {
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

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        // console.log(tasks);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`)
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
        for (let i = 0; i < arrayOfTasks.length; i++) {
            // console.log(`${arrayOfTasks[i].id}`);
            if (arrayOfTasks[i].id == taskId) {
                arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed == false)
            }
    }
        addDataToLocalStorageFrom(arrayOfTasks);
}
