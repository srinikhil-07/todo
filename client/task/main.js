var taskList = []
var taskNo = 0
var date
var editTask = false;
var editTaskId = -1
var editRow;
let deleteButton = `<a class="delete" title="Delete" data-toggle="tooltip" style="cursor: pointer" onclick="getConfirmation(this);" "><i class="material-icons" ></i></a>`

function getNewTask() {
    var task = $("#exampleFormControlInput1").val();
    var taskType = $("#exampleFormControlSelect1").val();
    var comments = $("#exampleFormControlTextarea1").val();
    var status = $("#taskStatusSelect").val();
    let newTask = {
        Task: task,
        Type: taskType,
        Description: comments,
        Status: status,
        Action: deleteButton
    }
    var $table = $('#tasks')
    if (!editTask) {
        console.log("new task:" + newTask);
        taskList.push(newTask);
        $table.bootstrapTable('append', newTask)
    } else {
        taskList[editTaskId] = newTask
        editTask = false;
        $table.bootstrapTable('remove', {
            field: '$index',
            values: [editTaskId]
        })
        $table.bootstrapTable('append', newTask)
        editTaskId = -1;
    };
    postTasks()
}

$(document).ready(function() {
    console.log("ready!");
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('data')
    date = getUrlParameter('date');
    console.log("Task for " + date)
    getTaskList();
    $('#tasks').find('tr').click(function() {
        var index = $(this).index();
        $("#exampleFormControlInput1").val(taskList[index].Task);
        $("#exampleFormControlSelect1").val(taskList[index].Type);
        $("#exampleFormControlTextarea1").val(taskList[index].Description);
        $("#taskStatusSelect").val(taskList[index].Status);
        editTaskId = index;
        editTask = true;
        editRow = $(this).parents("tr");
        $('#exampleModalCenter').modal('show');
    });
});

function getTaskList() {
    getTasks();
    for (var itr = 0; itr < taskList.length; itr++) {
        if (taskList[itr].Action !== deleteButton) {
            taskList[itr].Action = deleteButton;
        }
    }
    $('#tasks').bootstrapTable({
        data: taskList
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function printTasks() {
    console.log("Printing tasks");
    for (var itr = 0; itr < taskList.length; itr++) {
        console.log("Task print:" + JSON.stringify(taskList[itr]));
    }
}

function postTasks() {
    console.log("JSON to send" + JSON.stringify(taskList))
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '../../api/todo?date=' + date + '&userId=' + localStorage.getItem("user_id"), //Ensure that 'to_do_list_function' is the package name of your function
        data: JSON.stringify(taskList),
        success: function(data) {
            console.log("POST success");
        }
    });
}

async function getTasks() {
    $.ajax({
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        url: '../../api/todo?date=' + date + '&user=' + localStorage.getItem("user_id"), //Ensure that 'to_do_list_function' is the package name of your function
        async: false,
        success: function(data) {
            let tasks = data;
            console.log("Tasks:" + JSON.stringify(tasks));
            var itr = 0;
            while (true) {
                console.log(data[itr]);
                if (typeof data[itr] !== "undefined") {
                    taskList.push(data[itr]);
                } else {
                    break;
                }
                itr++;
            }
            console.log("Length of tasks:" + taskList.length);
        }
    });
}

function cellStyle(value, row, index) {
    var classes = [
        'table-warning',
        'table-success',
        'table-danger'
    ]
    if (row.Status === "In-progress" || row.Status === "In progress") {
        return {
            classes: classes[0]
        }
    } else if (row.Status === "Done") {
        return {
            classes: classes[1]
        }
    } else {
        return {
            classes: classes[2]
        }
    }
}

function getConfirmation(info) {
    let rowId = info.closest('tr').rowIndex;
    console.log("Delete: " + rowId);
    var $table = $('#tasks')
    $table.bootstrapTable('remove', {
        field: '$index',
        values: [rowId - 1]
    })
    taskList.splice(rowId - 1, 1);
    postTasks()
}