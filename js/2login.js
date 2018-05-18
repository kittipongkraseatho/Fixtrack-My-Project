function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
}
  window.onload=function(){
      initApp();
  }
  function initApp(){
      firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var C_email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            
            // var ref = firebase.database().ref('User/Garage/' + uid + '/status');
            //     ref.once('value').then(function (snapshot) {
            //     console.log('snapshot.val()', snapshot.val());
            //     var status = snapshot.val().status;
            //     alert(status);
               
            //     });

            
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('name_email').textContent = C_email;
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            
             var cc = 'kittipongbig@gmail.com';
                if(C_email != cc){
                  window.location = "staff.html";
                  // window.location = "admin_garage.html";
                }else{
                  // window.location = "staff.html";
                  window.location = "admin_garage.html";
                }
            
            
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
            
            
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
          //เช็ค status
          // firebase.database().ref('User/Garage/' + uid )
          // return firebase.database().ref('User/Garage/' + uid).once('value').then(function(snapshot) {
          // console.log('snap.val()', snapshot.val());
          // var status = snapshot.val().status;
          // document.getElementById('cc').textContent = status;
          // if(status == 'admin'){
          //   alert('admin');
          //   var ss = 1;
          //   alert(ss);
          // }
          // else if(status == 'staff'){
          //   alert('staff');
          //   header('Location: staff.html');
          // }
          // else if(status == 'user'){
          //   alert('user')
          // }
          // else{
          //   alert('กรุณา ติดต่อเจ้าหน้าที่')
          // }
                // });
                // header('Location: admin_garage.html');
                
        });
  }

  
  
  function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        // header('Location: index3.php');
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
      initApplogin()
    }

    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }