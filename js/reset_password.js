function c_password() {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      alert("กลับไปที่ Email ของท่าน");
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  

  function backcall(){
    window.location = "login.html";
  }