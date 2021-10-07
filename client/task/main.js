var taskList = []
var taskNo = 0
var date

function addTask(newTask) {
    var tbodyRef = document.getElementById('tasks').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newRow = tbodyRef.insertRow(tbodyRef.rows.length);
    var status = 'Mark task status'
    if (typeof newTask.Status !== "undefined") {
        status = newTask.Status
    }
    let rowColor = getRowColor()
    var tr = `
    <tr class="bg-success">  
        <td  >` + newTask.Task + `</td>  
        <td  >` + newTask.Type + `</td> 
        <td contenteditable="true" >` + newTask.Description + `</td>  
        <td  >
        <a class="delete" title="Delete" data-toggle="tooltip" style="cursor: pointer"><i class="material-icons"></i></a>
        </td>
        <td  >
        <select id="taskStatus" class="form-select" aria-label="Default select example">
            <option selected>` + status + `</option>
            <option value="1">In-progress</option>
            <option value="2">Done</option>
            <option value="3">Yet to</option>
        </select>
        </td>
    </tr>
    `;
    //console.log("Task: " + tr);
    newRow.innerHTML = tr;
}

function getRowColor(taskStatus) {
    var status = "table-active"
    if (taskStatus == 'In-progress') {
        status = "table-warning"
    } else if (taskStatus == 'Done') {
        status = "table-success"
    } else if (taskStatus == 'Yet to') {
        status = "table-danger"
    }
    return status
}

function getNewTask() {
    var task = $("#exampleFormControlInput1").val();
    var taskType = $("#exampleFormControlSelect1").val();
    var comments = $("#exampleFormControlTextarea1").val();
    var status = $("#taskStatus").val();
    let newTask = {
        Task: task,
        Type: taskType,
        Description: comments,
        Status: status
    }
    addTask(newTask)
    taskList.push(newTask);
    console.log("Full task JSON: ");
    printTasks()
}

$(document).ready(function() {
    console.log("ready!");
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('data')
    date = getUrlParameter('date');
    console.log("Task for " + date)
    getTaskList();
    $(document).on("click", ".delete", function() {
        var rowid = $(this).closest('tr').text();
        rowid = rowid.replace(/ /g, '');
        console.log(" Full data: " + rowid.split("\n"));
        var cols = rowid.split("\n");
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
        var $table = $('#tasks')
        removeTask(cols);
    });
    $(document).on("click", ".form-select", function() {
        var rowid = $(this).closest('tr').text();
        rowid = rowid.replace(/ /g, '');
        var cols = rowid.split("\n");
        console.log("Select selected for:" + cols)
        $('.form-select').change(function() {
            console.log($(this).find("option:selected").text());
            updateTask(cols, $(this).find("option:selected").text());
        })

    });

});

function getTaskList() {
    getTasks();
    for (var itr = 0; itr < taskList.length; itr++) {
        addTask(taskList[itr])
    }
}

function removeTask(taskInfo) {
    console.log("Task to delete:" + taskInfo);
    for (var itr = 0; itr < taskList.length; itr++) {
        if (taskInfo[2] == taskList[itr].Task.replace(/ /g, '')) {
            console.log("Removing task:" + taskList[itr].Task);
            taskList.splice(itr, 1);
            break;
        }
    }
    console.log("Full task JSON: ");
    printTasks()
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
        url: '../../api/todo?date=' + date, //Ensure that 'to_do_list_function' is the package name of your function
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
        url: '../../api/todo?date=' + date, //Ensure that 'to_do_list_function' is the package name of your function
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

function updateTask(taskInfo, status) {
    console.log("Task to update:" + taskInfo);
    for (var itr = 0; itr < taskList.length; itr++) {
        if (taskInfo[2] == taskList[itr].Task.replace(/ /g, '')) {
            console.log("updating task:" + taskList[itr].Task);
            console.log(taskInfo[11]);
            taskList[itr].Status = status;
            break;
        }
    }
    printTasks()
}