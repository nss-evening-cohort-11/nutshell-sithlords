import firebase from 'firebase/app';
import staffData from '../../helpers/data/staffData';
import staffCards from './staffCards';
import utils from '../../helpers/utils';
import newStaffForm from './newStaffForm';
import editStaffMemberForm from './editStaffMemberForm';

import './staffCards.scss';

const saveNewStaffItem = (e) => {
  e.stopImmediatePropagation();
  const newStaff = {
    name: $('#staffName').val(),
    characterType: $('#characterType').val(),
    imageUrl: $('#staffImageUrl').val(),
    characterName: $('#characterName').val(),
    location: $('.form-check-input:checked').val(),
  };
  staffData.addStaff(newStaff)
    .then(() => {
      document.getElementById('modalStaffForm').reset();
      $('#addStaffModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((err) => console.error('Save new staff member failed', err));
};

const editStaffMemberItem = (e) => {
  e.preventDefault();
  const staffId = $('.staffForm').data('id');
  const editStaff = {
    name: $('#edit-staffName').val(),
    characterType: $('#edit-characterType').val(),
    imageUrl: $('#edit-staffImageUrl').val(),
    characterName: $('#edit-characterName').val(),
    location: $('.form-check-input:checked').val(),
  };
  staffData.updateStaffMember(staffId, editStaff)
    .then(() => {
      document.getElementById('modalStaffForm').reset();
      $('#addStaffModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((err) => console.error('edit staff failed', err));
};

const removeStaffCards = (e) => {
  e.preventDefault();
  const staffId = e.target.closest('.card').id;
  staffData.deleteStaffMember(staffId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((err) => console.error('delete staff member failed', err));
};

const buildAllStaff = () => {
  let domString = '';
  staffData.getStaff()
    .then((allStaff) => {
      domString += '<div class="text-center" id="staff-title">';
      domString += '<h2 class="text-center mt-3">Staff</h2>';
      const user = firebase.auth().currentUser;
      if (user !== null) {
        domString += '<button class="btn btn-lg add-Staff-Btn" id="addStaffBtn"><i class="fas fa-plus"></i> Add a new staff member</button>';
      }
      domString += '</div>';
      domString += '<div class="styling-columns card-columns justify-content-center">';
      allStaff.forEach((staff) => {
        domString += staffCards.buildStaffCards(staff);
      });
      domString += '</div>';
      utils.printToDom('staff-collection', domString);
    })
    .catch((err) => console.error('get staff failed', err));
};

const staffEvents = () => {
  $('body').on('click', '#deleteStaffBtn', removeStaffCards);
  $('body').on('click', '#addStaffBtn', newStaffForm.newStaffForm);
  $('body').on('click', '#newStaffSubmit', saveNewStaffItem);
  $('body').on('click', '#editStaffBtn', editStaffMemberForm.editStaffMemberForm);
  $('body').on('click', '#editStaffSubmit', editStaffMemberItem);
};

export default { buildAllStaff, staffEvents };
