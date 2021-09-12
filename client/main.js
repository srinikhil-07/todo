function addTask() {
    var tbodyRef = document.getElementById('tasks').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newRow = tbodyRef.insertRow(tbodyRef.rows.length);
    console.log("Adding task")
    let newRowCount = tbodyRef.rows.length + 1;
    newTask = getNewTask()
    var tr = `
    <tr> 
        <th scope = "row">` + newRowCount + `</th>  
        <td>` + newTask.Type + `</td>  
        <td>` + newTask.Task + `</td>  
        <td>` + newTask.Description + `</td>  
        <td><a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td>
    </tr>
    `;
    console.log("Task: " + tr);
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
    return newTask
}

$(document).ready(function() {
    $(document).on("click", ".delete", function() {
        let rowid = $(this).closest('tr').index('#tasks tr');
        console.log("Removing: " + rowid);

        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });
});