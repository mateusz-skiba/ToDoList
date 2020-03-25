let li = document.body.querySelectorAll("li");

const block = document.body.querySelector("#block");
const taskTitle = document.querySelector("#block #blockTitle");
const taskComment = document.querySelector("#block #blockComments");

const addTaskTitle = document.body.querySelector("#addTask input")
const addTaskComment = document.body.querySelector("#addTask textarea")

let changeElement;
let elemsCheck = true;

// add task
const addTask = (e) => {
    block.style.right = "-473px";

    document.body.querySelector("#addTask").style.display = "block";

    e.stopPropagation(); // disable function hideBlock with click on li

    const exceptBlock = (block) => {
        block.stopPropagation();
    } // disable function hideBlock with click on block

    const exceptButton = (button) => {
        button.stopPropagation();
    } // disable function hideBlock with click on add button

    document.body.querySelector("#addTask").addEventListener("mouseup", exceptBlock);
    document.body.querySelector("#add").addEventListener("mouseup", exceptButton);
}

// new task
const newTask = (e) => {

    e.preventDefault();
    document.body.querySelector("#addTask").style.display = "none";
    const newLi = document.createElement("li");
    newLi.innerHTML = `<i class="fa-circle far"></i><div class="taskTitle">test</div><span class="fa fa-star"></span><div class="taskComment">test</div>`
    const titleLenght = addTaskTitle.value;
    newLi.querySelector(".taskTitle").textContent = addTaskTitle.value;

    newLi.querySelector(".taskComment").textContent = addTaskComment.value;
    document.querySelector("ul").insertBefore(newLi, document.querySelector("ul").firstChild);
    li = document.body.querySelectorAll("li");

    newLi.addEventListener("click", showBlock);

    // clear form after add task
    addTaskTitle.value = "";
    addTaskComment.value = "";
}

// hide task
const hideTask = () => {
    document.body.querySelector("#addTask").style.display = "none";
}

// show block
const showBlock = (e) => {
    // mark circle and star
    if (e.target.className == "fa-circle far") {
        e.target.classList.remove("fa-circle");
        e.target.classList.remove("far");
        e.target.classList.add("fa-check-circle");
        e.target.classList.add("far");
        
        e.target.parentNode.classList.add("colorDone");
        e.target.parentNode.querySelector(".taskTitle").style.textDecoration = "line-through";
        elemsCheck = !elemsCheck;
        return;
    } else if (e.target.className == "fa-check-circle far") {
        e.target.classList.remove("fa-check-circle");
        e.target.classList.remove("far");
        e.target.classList.add("fa-circle");
        e.target.classList.add("far");
        e.target.parentNode.classList.remove("colorDone");
        e.target.parentNode.querySelector(".taskTitle").style.textDecoration = "none";
        elemsCheck = !elemsCheck;
        return;
    } else if (e.target.className == "fa fa-star") {
        if (e.target.style.opacity == "1") {
            e.target.style.opacity = ".42";
        } else {
            e.target.style.opacity = "1";
        }
        return;
    }

    if (e.target.className == "taskTitle") {
        e.target.parentNode.style.background = "#dadada";
        taskTitle.value = e.target.parentNode.querySelector(".taskTitle").textContent;
        taskComment.value = e.target.parentNode.querySelector(".taskComment").textContent;
        changeElement = e.target.parentNode;
    } // click on .title
    else if (e.target.querySelector(".taskTitle").className == "taskTitle") {
        e.target.style.background = "#dadada";
        taskTitle.value = e.target.querySelector(".taskTitle").textContent;
        taskComment.value = e.target.querySelector(".taskComment").textContent;
        changeElement = e.target;
    }

    block.style.right = "0px";
    li.forEach(li => {
        li.style.background = "#fff";
    });

    e.stopPropagation();

    const exceptOpenBlock = (block) => {
        block.stopPropagation();
    }

    block.addEventListener("mouseup", exceptOpenBlock);
}

// hide block
const hideBlock = (e) => {
    if (e.target.className == "fa-circle far" || e.target.className == "fa-check-circle far") return;

    block.style.right = "-473px";
    li.forEach(li => {
        li.style.background = "#fff";
    });
}

// changeTask
const changeTask = () => {
    changeElement.querySelector(".taskTitle").textContent = taskTitle.value;
    changeElement.querySelector(".taskComment").textContent = taskComment.value;
}

// removeTask
const removeTask = () => {
    block.style.right = "-473px";
    changeElement.remove();
}

// deklaracje funkcji //

document.querySelector("#add").addEventListener("click", addTask);

document.body.querySelector("#addTask button").addEventListener("click", newTask);

document.body.addEventListener("mouseup", hideTask);

li.forEach(element => {
    element.addEventListener("mouseup", showBlock);
});

document.body.addEventListener("mouseup", hideBlock);

document.querySelector("#block #save").addEventListener("click", changeTask);

document.querySelector("#block #remove").addEventListener("click", removeTask);