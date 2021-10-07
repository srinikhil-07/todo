var userDetails;
$(document).ready(function() {
    console.log("ready!");
    document.getElementById("task-button").disabled = true;
});

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = decodeJwtResponse(response.credential);
    userDetails = responsePayload;
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    localStorage.setItem("user_name", responsePayload.name);
    localStorage.setItem("user_id", responsePayload.sub);
    localStorage.setItem("user_pic", responsePayload.picture);
    console.log(localStorage.getItem("user_pic"));
    updateAfterLoginUIElements()
}

function updateAfterLoginUIElements() {
    $('<img src="' + localStorage.getItem("user_pic") + '" width ="30" height="30" class="rounded">').appendTo('#userInfo');
    $('<pclass="fs-5" style="margin-left: 5px"> ' + localStorage.getItem("user_name") + '</p>').appendTo('#userInfo');
    document.getElementById("task-button").disabled = false;
}

function getTask() {
    let time = Date.parse($("#datepicker").val()) / 1000;
    console.log("Date selected:" + Date.parse($("#datepicker").val()) / 1000)
    window.location.href = "../task?date=" + time;
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};