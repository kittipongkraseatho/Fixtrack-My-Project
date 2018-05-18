    window.onload=function(){
        initApp();
    }
    function initApp(){
        firebase.auth().onAuthStateChanged(function(user) {
            // [START_EXCLUDE silent]
            document.getElementById('quickstart-verify-email').disabled = true;
            // [END_EXCLUDE]
            if (user) {
              //   window.location = 'index3.html';
              // User is signed in.
              var displayName = user.displayName;
              var C_email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;

              var admin = 'kittipongbig@gmail.com';
              if(C_email === admin){
                  admin = 'admin';
              }
              // [START_EXCLUDE]
              document.getElementById('name_admin').textContent = admin;
              document.getElementById('name_email').textContent = C_email;
              document.getElementById('quickstart-sign-in').textContent = 'ออกจากระบบ';
              document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
              if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
              }
              // [END_EXCLUDE]
              
            } else {
              // User is signed out.
              // [START_EXCLUDE]
              document.getElementById('quickstart-sign-in').textContent = 'ออกจากระบบ';
              document.getElementById('quickstart-account-details').textContent = 'null';
              // [END_EXCLUDE]
            }
            // [START_EXCLUDE silent]
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });


    }
    
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          window.location = 'login.html';
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