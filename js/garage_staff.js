var db = firebase.database();
var members_ref = db.ref('User').child('Garage');
var table = $('table tbody');


function getFormData() {
  var name = $('#name').val();
  var phone = $('#phone').val();
  var email = $('#email').val();
  var garageid = $('#Garageid').val();
  var fixtable = $('#Fixtable').val();
  var side = $('#Side').val();

  
  return {
    name: name,
    phone: phone,
    email: email,
    garageid: garageid,
    fixtable: fixtable,
    side: side
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
      '<td>' + member.name + '</td>' +
      '<td>' + member.phone + '</td>' + 
      '<td>' + member.email + '</td>' +
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
    
    $('#name').val(member.name);
    $('#phone').val(member.phone);
    $('#email').val(member.email);
    $('#garageid').val(member.garageid);
    $('#side').val(member.side);
    
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

