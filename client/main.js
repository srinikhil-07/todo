function addTask() {
    console.log("Adding task")
    var tr = `
    <tr> 
        <th scope = "row"> 4 </th> 
        <td> Mark2 </td> 
        <td> Otto 2 </td> 
        <td> @mdo 2 </td> 
    </tr>
        `;
    console.log("Row: " + tr);
    $('#table tbody').append(tr);
    var tbodyRef = document.getElementById('tasks').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var newRow = tbodyRef.insertRow(tbodyRef.rows.length);
    newRow.innerHTML = tr;
}
// $(document).ready(function() {
//     $("#exampleModalLabel").modal();
// });