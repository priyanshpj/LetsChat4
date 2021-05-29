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
  user_name = localStorage.getItem('username');
room_name = localStorage.getItem('room_name');
var SpeechRecognition = window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition;  
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function sendmessage() {
  msg = document.getElementById("sendmessageinput").value;
  firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
  });
  document.getElementById("msg").value = "";
}
function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("roommessages").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                    firebase_message_id = childKey;
                    message_data = childData;
                    //Start code
                    console.log(firebase_message_id);
                    console.log(message_data);
                    names = message_data['name'];
                    message = message_data['message'];
                    like = message_data['like'];
                    name_with_tag = "<h4> " + names + "<img class='user_tick' src='coffee_gif.gif' style='width: 17px; height:17px'></h4>";
                    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                    like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                    row = name_with_tag + message_with_tag + like_button + span_with_tag;
                    document.getElementById("roommessages").innerHTML += row;
                    //End code
              }
        });
  });
}
getData();
function updateLike(message_id) {
  likes = document.getElementById(message_id).value;
  likes = Number(likes) + 1;
  firebase.database().ref(room_name).child(message_id).update({
        like: likes
  })
}
function start() {
      document.getElementById("sendmessageinput").value = "";
      recognition.start();
  }
recognition.onresult = function run(event) {
            console.log(event);
            var Content = event.results[0][0].transcript;
            console.log(Content);
            document.getElementById("sendmessageinput").value = Content;
      }