<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>รายชื่ออู่</title>
  <link rel="stylesheet" href="css/style.css">
   <!--Import Google Icon Font-->
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   <!--Import materialize.css-->
   <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

   <!--Let browser know website is optimized for mobile-->
   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
 

<div class="row">
    <form class="col s12">
    <div class="col s12 m4 l2"></div>
    <div class="col s12 m4 l8">
    <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">mail</i>
          <input id="icon_prefix" type="text" class="validate" id="email_pass">
          <label for="icon_prefix">Email</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">check_circle</i>
          <input id="icon_telephone" type="tel" class="validate" id="password_pass">
          <label for="icon_telephone">Password</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
    <div class="col s12 m4 l2"></div>
    </form>
  </div>

  

  <!--Import jQuery before materialize.js-->
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="js/materialize.min.js"></script>
  <script>
    $(function(){
      $(".button-collapse").sideNav();
    })
  </script>
<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
<script src="route2.js"></script>
    <script src="./test.js"></script>
  <script src="js/garage_staff.js"></script>  
  <footer class="page-footer">
</footer>
</body>
</html>
