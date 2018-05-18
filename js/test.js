// $(document).ready(function(){
// var rootRef = firebase.database().ref().child('users');

// rootRef.on("child_added", snap => {
//   var name = snap.child("name").val();
//   var email = snap.child("email").val();
//   var age = snap.child("age").val();

//   $("#table_body").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + age +
//    "</td><td><button>" + + "</button></td></tr>");
//   });
// });

var playersRef = firebase.database().ref("users/");

playersRef.orderByChild("name").on("child_added", function(data) {
   console.log(data.val().name);
});