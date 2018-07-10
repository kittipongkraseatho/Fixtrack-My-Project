var db = firebase.database();
var members_ref = db.ref('User').child('Garage');
var table = $('table tbody');


function getFormData() {
  var namegarage = $('#namegarage').val();
  var link = $('#link').val();
  var link2 = $('#link2').val();
  var email = $('#email').val();

  
  return {
    namegarage: namegarage,
    link: link,
    link2: link2,
    email: email
  };
}


function addMember(event) {
  event.preventDefault();
  var member = getFormData();
  
  members_ref.push(member);
  $('form input').val('');
}


function addMemberToDOM(is_update, member, key, row) {
  var el = 
    '<tr data-key="' + key + '">' + 
      '<td>' + member.namegarage + '</td>' +
      '<td>' + member.link + '</td>' + 
      '<td>' + member.link2 + '</td>' +
      '<td>' +
        '<button class="btn btn-sm update">ดูข้อมูล</button>' +
      '</td>' +
    '</tr>';
  
  if ( is_update ) {
    row.after(el);
    row.remove();
  } else table.append(el);
}


function updateMember(key, row) {
  var member = getFormData();
  addMemberToDOM(true, member, key, row);
  
  members_ref.child(key).set(member);
  $('form input').val('');
  $('#submit')
    .unbind()
    .text('Submit')
    .on('click', addMember);
    $('#cancel').hide();
}


function getMember() {
  var row = $(this).parents('tr');
  var key = row.data('key');
  var member_ref = members_ref.child(key);
  var submit = $('#submit');
  
  member_ref.once('value')
  .then(function(member) {
    member = member.val();
    
    $('#namegarage').val(member.namegarage);
    $('#email').val(member.email);
    $('#link').val(member.link);
    $('#link2').val(member.link2);
    
    submit.text('Update');
    submit.unbind().on('click', function(e) {
      e.preventDefault();
      
      updateMember(key, row);
    });
  });
  
  $('#cancel')
    .unbind()
    .show()
    .on('click', function(e) {
      e.preventDefault();
      $('form input').val('');
      $(this).hide();
      submit.text('Submit');
      submit.unbind().on('click', addMember);
    });
}


function deleteMember() {
  var row = $(this).parents('tr');
  var key = row.data('key');
  
  row.remove();
  members_ref.child(key).remove();
}


function getMembers() {  
  members_ref.on('child_added', function(member) {
    var key = member.key;
    member = member.val();
    
    addMemberToDOM(false, member, key);
  });
}

function init() {
  getMembers();
  
  $("#submit").on("click", addMember);
  table.on('click', 'button.update', getMember);
}

init();

