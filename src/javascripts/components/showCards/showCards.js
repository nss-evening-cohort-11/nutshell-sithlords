import firebase from 'firebase/app';

import './showCards.scss';


const buildShowCards = (show) => {
  let domString = '';
  domString += '<div class="col-lg-4 col-md-6 mb-2">';
  domString += `<div class="card" id="${show.id}">`;
  domString += `<img src="${show.imageUrl}" class="card-img-top img-fluid show-images" alt="...">`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">${show.name}</h5>`;
  domString += `<p class="card-text">Time: ${show.time}</p>`;
  domString += `<p class="card-text">Stage: ${show.stage}</p>`;
  domString += `<p class="card-text">Location: ${show.location}</p>`;
  domString += '<div class="d-flex justify-content-center">';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += '<button class="btn m-1 btn-default show-edit-btn"><i class="fas fa-feather-alt"></i></button>';
    domString += '<button class="btn m-1 btn-default show-delete-btn"><i class="far fa-trash-alt"></i></button>';
  }
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildShowCards };
