function getTask() {
    let time = Date.parse($("#datepicker").val()) / 1000;
    console.log("Date selected:" + Date.parse($("#datepicker").val()) / 1000)
    window.location.href = "../task?date=" + time;
}