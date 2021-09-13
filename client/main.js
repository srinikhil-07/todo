var taskList

function addTask(newTask) {
    var tbodyRef = document.getElementById('tasks').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newRow = tbodyRef.insertRow(tbodyRef.rows.length);
    //console.log("Adding task")
    var tr = `
    <tr>  
        <td>` + newTask.Type + `</td>  
        <td>` + newTask.Task + `</td>  
        <td>` + newTask.Description + `</td>  
        <td><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td>
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
    getTaskList();
    $(document).on("click", ".delete", function() {
        var rowid = $(this).closest('tr').text();
        rowid = rowid.replace(/ /g, '');
        console.log(" Full data: " + rowid.split("\n"));
        var cols = rowid.split("\n");
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
        var $table = $('#tasks')
        console.log(" Task type: " + cols[2]);
        removeTask(cols);
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
    for (var itr = 0; itr < taskList.length; itr++) {
        addTask(taskList[itr])
    }
}

function removeTask(taskInfo) {
    for (var itr = 0; itr < taskList.length; itr++) {
        if (taskInfo[2] == taskList[itr].Task) {
            taskList = taskList.splice(itr, 1);
        }
    }
    console.log("Full task JSON: " + taskList);
}