import firebase from 'firebase/app';

import './souvenirsCards.scss';

const buildSouvenirsCards = (souvenir) => {
  let domString = '';
  domString += '<div class="mb-2 souvenir-card">';
  domString += `<div class="card" id="${souvenir.id}">`;
  domString += `<img src="${souvenir.imageUrl}" class="card-img-top img-fluid souvenirs-image">`;
  domString += '<div class="card-body">';
  domString += `<div class="text-center card-title">${souvenir.type}</div>`;
  domString += `<p class="card-text">Description: ${souvenir.description}</p>`;
  domString += `<p class="card-text">Price: $ ${souvenir.price}</p>`;
  if (`${souvenir.isAvailable}` === 'Available') {
    domString += '<p class="card-text">Now Available!</p>';
  } else {
    domString += '<p class="card-text">Unavailable</p>';
  }
  domString += '<div class="d-flex justify-content-center">';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += '<button id="editSouvenirBtn" class="m-1 btn btn-default editSouvenirBtn souvenirs-edit-btn"><i class="fas fa-feather-alt"></i></<button>';
    domString += '<button id="deleteSouvenirBtn" class="m-1 btn btn-default deleteSouvenirBtn souvenirs-delete-btn"><i class="far fa-trash-alt"></i></button>';
  }
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { buildSouvenirsCards };
