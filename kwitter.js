function addUser(){
    var username = document.getElementById("logininput").value;
    localStorage.setItem("username", username);
    window.location = "kwitter_room.html";
}