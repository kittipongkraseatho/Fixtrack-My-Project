var db = firebase.database();
var members_ref = db.ref('User').child('Garage_staff');
var table = $('table tbody');


function getFormData() {
  var namestaff = $('#namestaff').val();
  var phone = $('#phone').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var status = 'check';
  
  return {
    namestaff: namestaff,
    phone: phone,
    email: email,
    password: password,
    status: status
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
      '<td>' + member.namestaff + '</td>' +
      '<td>' + member.phone + '</td>' + 
      '<td>' + member.email + '</td>' +
      '<td>' + member.password + '</td>' +
      '<td>' + member.status + '</td>' +
      '<td>' +
        '<button class="btn btn-sm update">Update</button>' +
        '<button class="btn btn-sm grey darken-1 delete">Delete</button>' +
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
    
    $('#namestaff').val(member.namestaff);
    $('#phone').val(member.phone);
    $('#email').val(member.email);
    $('#password').val(member.password);
    $('#status').val(member.status);
    
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
  table.on('click', 'button.delete', deleteMember);
}

init();
