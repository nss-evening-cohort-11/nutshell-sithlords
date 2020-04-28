import firebase from 'firebase/app';
import './staffCards.scss';

const buildStaffCards = (staff) => {
  let domString = '';
  domString += '<div>';
  domString += `<div class="card" id="${staff.id}">`;
  domString += `<img src="${staff.imageUrl}" class="card-img-top img-fluid staff-image" alt="Photo of ${staff.name}">`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">${staff.name}</h5>`;
  domString += `<p class="card-text">Character Type: ${staff.characterType}</p>`;
  domString += `<p class="card-text">Character Name: ${staff.characterName}</p>`;
  domString += '<div class="d-flex justify-content-center">';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += '<button id="editStaffBtn" class="btn editStaffBtn"><i class="fas fa-feather-alt"></i></<button>';
    domString += '<button class="btn delete-staff-btn" id="deleteStaffBtn"><i class="far fa-trash-alt"></i></button>';
  }
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildStaffCards };
