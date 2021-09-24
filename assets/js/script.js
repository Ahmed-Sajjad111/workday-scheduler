// create date and assign id to display on HTML
let currentDate = moment().format("dddd, MMM Do");
$("#currentDay").text(currentDate);

// object to hold all tasks
let hourlyTasks = {};

// save tasks to local storage
const saveTasks = function() {
    localStorage.setItem("task", JSON.stringify(hourlyTasks));
}

// gets and displays tasks from local storage
const displayTasks = function () {
    hourlyTasks = JSON.parse(localStorage.getItem("task"));
    if (!hourlyTasks) {
        hourlyTasks = {
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
    } else {
        $.each(hourlyTasks, function (id, text) {
            $("#div" + id).text(text);
        })
    }
}

// checks current time with hour blocks and assigns proper class
const timeChecker = function() {
    $(".description").each(function() {
        let currentHour = parseInt(moment().hour());
        let hourBlock = parseInt($(this).attr("id").replace("div", ""));
        if (currentHour > hourBlock) {
            $(this).addClass("past");
        } else if (currentHour === hourBlock) {
            $(this).addClass("present");
        } else if (currentHour < hourBlock) {
            $(this).addClass("future");
        }
    });
}

// on click event for editing task
$(".time-block").on("click", "div", function() {
    let taskId = $(this)
        .attr("id")
        .replace("row", "");
    let taskDivEl = $("#" + taskId);
    let taskClass = taskDivEl
        .attr("class");
    let taskText = taskDivEl
        .text();
    let textInput = $("<textarea>")
        .attr("id", taskId);
    textInput.addClass(taskClass)
        .val(taskText);
    taskDivEl.replaceWith(textInput);
    textInput.trigger("focus");
})

//on click event for save button to save task
$(".time-block").on("click", ".saveBtn", function () {
    let id = $(this)
        .attr("id")
        .replace("btn", "");
    let textEl = $("#div" + id)
    let taskText = textEl
        .val()
        .trim();
    if (!taskText) {
        taskText = textEl
            .text()
            .trim();
    };
    let divId = $("<div>")
        .attr("id", "div" + id)
        .addClass(textEl.attr("class"))
        .text(taskText)
    textEl.replaceWith(divId);
    hourlyTasks[id] = taskText;
    saveTasks();
})

timeChecker();

displayTasks();

let timeCheck = setInterval(function() {
    timeChecker();
}, 60000);