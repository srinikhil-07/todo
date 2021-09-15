var taskList
var taskNo = 0

function addTask(newTask) {
    var tbodyRef = document.getElementById('tasks').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newRow = tbodyRef.insertRow(tbodyRef.rows.length);
    //console.log("Adding task")

    var tr = `
    <tr>  
        <td  >` + newTask.Task + `</td>  
        <td  >` + newTask.Type + `</td> 
        <td  >` + newTask.Description + `</td>  
        <td  >
        <a class="delete" title="Delete" data-toggle="tooltip" style="cursor: pointer"><i class="material-icons"></i></a>
        </td>
        <td  >
        <select id="empid" class="form-select" aria-label="Default select example">
            <option selected>Mark task status</option>
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

function getNewTask() {
    var task = $("#exampleFormControlInput1").val();
    var taskType = $("#exampleFormControlSelect1").val();
    var comments = $("#exampleFormControlTextarea1").val();
    let newTask = {
        Task: task,
        Type: taskType,
        Description: comments
    }
    addTask(newTask)
    taskList.push(newTask);
    console.log("Full task JSON: " + taskList);
}

$(document).ready(function() {
    console.log("ready!");
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('data')
    console.log("Task for " + getUrlParameter('date'))
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
        })
    });

});

function getTaskList() {
    taskList = [{
            Task: "task",
            Type: "taskType",
            Description: "comments"
        },
        {
            Task: "task2",
            Type: "taskType",
            Description: "comments"
        }
    ]
    taskNo = 0
    for (var itr = 0; itr < taskList.length; itr++) {
        addTask(taskList[itr])
    }
}

function removeTask(taskInfo) {
    for (var itr = 0; itr < taskList.length; itr++) {
        if (taskInfo[3] == taskList[itr].Task) {
            taskList = taskList.splice(itr, 1);
        }
    }
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