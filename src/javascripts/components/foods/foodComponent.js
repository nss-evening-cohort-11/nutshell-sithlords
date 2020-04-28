import firebase from 'firebase/app';

import './food.scss';

const foodDataCardInfo = (food) => {
  let domString = '';
  domString += '<div class="col-lg-4 col-md-6 mb-2">';
  domString += `<div class="card" id="${food.id}">`;
  domString += `<img src="${food.imageUrl}" class="card-img-top" alt="...">`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title text-center">${food.type}</h5>`;
  domString += `<p class="card-text">${food.description}</p>`;
  domString += `<p class="card-text">Price: $${food.price}</p>`;
  domString += `<p class="card-text">Location: ${food.location}</p>`;
  if (`${food.isAvailable}` === 'Available') {
    domString += '<p class="card-text">Now available!</p>';
  } else {
    domString += '<p class="card-text">Still cooking and prepping! Please come back later!</p>';
  }
  domString += '<div class="d-flex justify-content-center">';
  const user = firebase.auth().currentUser;
  if (user !== null) {
    domString += '<button id="editFoodBtn" class="btn btn-default editFoodBtn"><i class="fas fa-feather-alt"></i></<button>';
    domString += '<button id="deleteFoodBtn" class="btn btn-default deleteFoodBtn"><i class="far fa-trash-alt"></i></button>';
  }
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { foodDataCardInfo };
