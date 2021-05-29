var firebaseConfig = {
    apiKey: "AIzaSyDJSmfKFNTmghF3_kmAO0ZphFx-VeUIuZk",
    authDomain: "letschat-83221.firebaseapp.com",
    projectId: "letschat-83221",
    databaseURL: "https://letschat-83221-default-rtdb.firebaseio.com/",
    storageBucket: "letschat-83221.appspot.com",
    messagingSenderId: "648209995528",
    appId: "1:648209995528:web:7842f933667515d1da7ebd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  document.getElementById("name_of_user").innerHTML = localStorage.getItem("username");
``
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("roomdiv").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            
                  childKey = childSnapshot.key; 
                  Room_names = childKey;
                  //Start code
                  console.log("Room name = " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + Room_names + "</div><br><br>";
                  document.getElementById("roomdiv").innerHTML += row;
                  //End code
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
function addRoom() {
      room_name = document.getElementById("add_room").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
