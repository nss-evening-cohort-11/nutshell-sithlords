import firebase from 'firebase/app';

import smash from '../../helpers/data/smash';

import './eventSingleView.scss';
import '../../../styles/main.scss';

import utils from '../../helpers/utils';
import souvenirsData from '../../helpers/data/souvenirsData';

const printSouvenirChoices = (souvenirObject) => {
  const eventId = souvenirObject.parentEventId;
  smash.getSouvenirsNotInEvent(eventId)
    .then((souvenirs) => {
      let domString = '';
      domString += '<select class="custom-select col-11 p-2" id="inputSouvChoices">';
      domString += '<option disabled selected>Choose a souvenir to add to this event:</option>';
      souvenirs.forEach((souvenir) => {
        if (souvenir.isAvailable === true) {
          domString += `<option class="souvenirChoice" value="${eventId}" id="${souvenir.id}">${souvenir.type} / $${souvenir.price}</option>`;
        } else {
          domString += `<option class="souvenirChoice" value="${eventId}" id="${souvenir.id}" disabled>${souvenir.tyoe} / $${souvenir.price}</option>`;
        }
      });
      domString += '</select>';
      utils.printToDom('souvenirChoices', domString);
    })
    .catch((err) => console.error('cannot add new souvenir item to event', err));
};

const noSelectedSouvenirs = (event) => {
  const eventId = event.id;
  souvenirsData.getSouvenirs()
    .then((souvenirs) => {
      let domString = '';
      domString += '<select class="custom-select col-11 p-2" id="inputSouvenirChoices">';
      domString += '<option disabled selected>Choose souvenir to add to this event:</option>';
      souvenirs.forEach((souvenir) => {
        if (souvenirsData.isAvailable === 'Available') {
          domString += `<option class="souvenirChoice" value="${eventId}" id="${souvenir.id}">${souvenir.type} / $${souvenir.price}</option>`;
        } else {
          domString += `<option class="souvenirChoice" value="${eventId}" id="${souvenir.id}" disabled>${souvenir.type} / $${souvenir.price}</option>`;
        }
      });
      domString += '</select>';
      utils.printToDom('souvenirChoices', domString);
    })
    .catch((err) => console.error('cannnot add new souvenir to an empty souvenir sectio', err));
};

const getEventSouvenirDetails = (singleEvent) => {
  const user = firebase.auth().currentUser;
  const souvenirsFound = singleEvent.souvenirs;
  let domString = '';
  domString += '<div id="eventSouvenirSection" class="quad col-md-4 col-sm-12">';
  domString += '<h4 class="eventSectionTitle">Souvenir Details</h4>';
  if (user.uid === singleEvent.uid) {
    domString += ' <button class="btn btn-default btn-lg d-flex ml-auto addEventItemBtn" data-toggle="collapse" data-target="#collapseSouvenirList" aria-expanded="false" aria-controls="collapseSouvenirList"><i class="fas fa-plus"></i></button>';
  }
  domString += '<table class="table-responsive table-dark">';
  domString += '<thead>';
  domString += '<tr>';
  domString += '<th scope="col">Souvenir Type</th>';
  domString += '<th scope="col">Price</th>';
  domString += '<th scope="col">Qty</th>';
  domString += '</tr>';
  domString += '<tr class="collapse" id="collapseSouvenirList">';
  domString += '<th colspan="3" class="p-0">';
  domString += '<div id="souvenirChoices">';
  domString += '</div>';
  domString += '</th>';

  domString += '<th colspan="1" class="p-0">';
  domString += '<select id="inputSouvenirQuantity" class="custom-select">';
  domString += '<option selected disabled>Quantity:</option>';
  domString += '<option class="souvenirQuantity" value="50">50</option>';
  domString += '<option class="souvenirQuantity" value="100">100</option>';
  domString += '<option class="souvenirQuantity" value="150">150</option>';
  domString += '<option class="souvenirQuantity" value="200">200</option>';
  domString += '<option class="souvenirQuantity" value="250">250</option>';
  domString += '<option class="souvenirQuantity" value="500">500</option>';
  domString += '</select>';
  domString += '</th>';

  domString += '<th colspan="1" class="p-0">';
  domString += '<div class="input-group-append" colspan="1">';
  domString += '<button class="btn btn-outline-secondary add-button my-2" type="button" id="make-new-event-souvenir"><i class="fas fa-plus"></i>Add</button>';
  domString += '</div>';
  domString += '</th>';
  domString += '<div id="alertSouvenir" class="alertSouvenir"></div>';
  domString += '</tr>';

  domString += '</thead>';
  domString += '<tbody>';

  if (souvenirsFound.length !== 0) {
    singleEvent.souvenirs.forEach((souvenirItem) => {
      if (`${souvenirItem.price}` < 101 && `${souvenirItem.price}` > 0) {
        domString += `<tr class="eventSouvItem souvenirRow from0To100" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      } else if (`${souvenirItem.price}` > 100 && `${souvenirItem.price}` < 201) {
        domString += `<tr class="eventSouvItem souvenirRow from101To200" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      } else if (`${souvenirItem.price}` > 200 && `${souvenirItem.price}` < 301) {
        domString += `<tr class="eventSouvItem souvenirRow from201To300" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      } else if (`${souvenirItem.price}` > 300 && `${souvenirItem.price}` < 401) {
        domString += `<tr class="eventSouvItem souvenirRow from301To400" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      } else if (`${souvenirItem.price}` > 400 && `${souvenirItem.price}` < 501) {
        domString += `<tr class="eventSouvItem souvenirRow from401To500" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      } else if (`${souvenirItem.price}` > 500) {
        domString += `<tr class="eventSouvItem souvenirRow from501On" data-id="${souvenirItem.id}" data-parent="${souvenirItem.parentEventSouvenirId}" data-container="${souvenirItem.parentEventId}">`;
      }
      domString += `<th scope="row" class="cell-width">${souvenirItem.type}</th>`;
      domString += `<td class="cell-width">$${souvenirItem.price}</td>`;
      domString += `<td class="cell-width">${souvenirItem.parentQuantity}</td>`;
      domString += `<td class="cell-width">$${souvenirItem.rowTotal}</td>`;
      printSouvenirChoices(souvenirItem);
      domString += '</div>';
      if (user.uid === singleEvent.uid) {
        domString += `<td class="cell-width"><button id="${souvenirItem.parentEventSouvenirId}" class="btn btn-default deleteEventBtn deleteEventSouvenirBtn" data-id="${souvenirItem.parentEventId}"><i class="far fa-trash-alt"></i></button></td>`;
      }
      domString += '</tr>';
    });
  } else {
    noSelectedSouvenirs(singleEvent);
  }
  domString += '</tbody>';
  domString += '</table>';
  domString += '<div class="input-group mb-3">';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">Total Event Souvenir Costs:</span>';
  domString += '</div>';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">$</span>';
  domString += '</div>';
  domString += `<input id="souvenirTotalCost" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" readonly value="${singleEvent.souvenirTotalAmount}">`;
  domString += '<div class="input-group-append">';
  domString += '<span class="input-group-text">.00</span>';
  domString += '</div>';
  domString += '</div>';

  domString += '</div>';
  return domString;
};

export default { getEventSouvenirDetails };
