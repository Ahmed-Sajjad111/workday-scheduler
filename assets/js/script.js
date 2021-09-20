let currentDate = moment().format("dddd, MMM Do");
$("#currentDay").text(currentDate);

let tasks = {};

$(".time-block").on("click", "div", function() {
    let taskId = $(this).attr("id").replace("row", "");
    let taskDivEl = $("#" + taskId);
    let taskClass = taskDivEl.attr("class");
    let taskText = taskDivEl.text();
    let textInput = $("<textarea>").addClass(taskClass).val(taskText);
    textInput.attr("id", taskId);
    taskDivEl.replaceWith(textInput);
    textInput.trigger("focus");
})