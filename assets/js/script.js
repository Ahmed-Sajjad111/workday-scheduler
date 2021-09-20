let currentDate = moment().format("dddd, MMM Do");
$("#currentDay").text(currentDate);

let hourlyTasks = {};

const saveTasks = function() {
    localStorage.setItem("task", JSON.stringify(hourlyTasks));
}

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
        console.log(textEl)
        console.log(divId)
    textEl.replaceWith(divId);
    console.log(textEl)
    hourlyTasks[id] = taskText;
    console.log(hourlyTasks)
    saveTasks();
})