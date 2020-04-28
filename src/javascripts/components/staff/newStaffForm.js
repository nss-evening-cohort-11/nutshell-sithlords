import utils from '../../helpers/utils';

const newStaffForm = () => {
  $('#addStaffModal').modal('show');
  let domString = '';
  domString += '<div class="form-group">';
  domString += '<label for="staffName">Enter name of new staff member</label>';
  domString += '<input type="text" class="form-control" id="staffName" placeholder="Name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="characterType">Enter the type of character</label>';
  domString += '<input type="text" class="form-control" id="characterType" placeholder="Type of character (enter n/a if none)">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="staffImageUrl">Staff member photo</label>';
  domString += '<input type="text" class="form-control" id="staffImageUrl" placeholder="image Url">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="characterName">Character name</label>';
  domString += '<input type="text" class="form-control" id="characterName" placeholder="Character name (enter n/a if none)">';
  domString += '</div>';
  utils.printToDom('modalStaffForm', domString);
  $('#newStaffSubmit').removeClass('hide');
  $('#editStaffSubmit').addClass('hide');
};

export default { newStaffForm };
