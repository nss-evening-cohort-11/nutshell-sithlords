import firebase from 'firebase/app';

import smash from '../../helpers/data/smash';

import './eventSingleView.scss';
import '../../../styles/main.scss';

import utils from '../../helpers/utils';
import foodData from '../../helpers/data/foodData';

const printFoodChoices = (foodObject) => {
  const eventId = foodObject.parentEventId;
  smash.getFoodNotInEvent(eventId)
    .then((foods) => {
      let domString = '';
      domString += '<select class="custom-select col-11 p-2" id="inputFoodChoices">';
      domString += '  <option disabled selected>Choose food to add to event:</option>';
      foods.forEach((food) => {
        if (food.isAvailable === 'Available') {
          domString += `<option class="foodChoice" value="${eventId}" id="${food.id}">${food.type} / $${food.price}</option>`;
        } else {
          domString += `<option class="foodChoice" value="${eventId}" id="${food.id}" disabled>${food.type} / $${food.price}</option>`;
        }
      });
      domString += '</select>';
      utils.printToDom('foodChoices', domString);
    })
    .catch((err) => console.error('cannot add new food item to event', err));
};

const noSelectedFoods = (event) => {
  const eventId = event.id;
  foodData.getFoods()
    .then((foods) => {
      let domString = '';
      domString += '<select class="custom-select col-11 p-2" id="inputFoodChoices">';
      domString += '  <option disabled selected>Choose food to add to event:</option>';
      foods.forEach((food) => {
        if (food.isAvailable === 'Available') {
          domString += `<option class="foodChoice" value="${eventId}" id="${food.id}">${food.type} / $${food.price}</option>`;
        } else {
          domString += `<option class="foodChoice" value="${eventId}" id="${food.id}" disabled>${food.type} / $${food.price}</option>`;
        }
      });
      domString += '</select>';
      utils.printToDom('foodChoices', domString);
    })
    .catch((error) => console.error('cannot add new food to an empty food section', error));
};


const getEventFoodDetails = (singleEvent) => {
  const user = firebase.auth().currentUser;
  const foodsFound = singleEvent.food;
  let domString = '';
  domString += '<div id="eventFoodSection" class="quad col-md-4 col-sm-12">';
  domString += '  <h4 class="eventSectionTitle">Food Details</h4>';
  if (user.uid === singleEvent.uid) {
    domString += ' <button class="btn btn-default btn-lg d-flex ml-auto addEventItemBtn" data-toggle="collapse" data-target="#collapseFoodList" aria-expanded="false" aria-controls="collapseFoodList"><i class="fas fa-plus"></i></button>';
  }
  domString += '  <table class="table-responsive table-dark table-width">';
  domString += '    <thead>';
  domString += '      <tr>';
  domString += '        <th scope="col">Food Type</th>';
  domString += '        <th scope="col">Price</th>';
  domString += '        <th scope="col">Qty</th>';
  domString += '        <th scope="col">Cost</th>';
  domString += '      </tr>';

  domString += '      <tr class="collapse" id="collapseFoodList">';

  domString += '        <th colspan="3" class="p-0">';
  domString += '          <div id="foodChoices">';
  domString += '          </div>';
  domString += '        </th>';

  domString += '        <th colspan="1" class="p-0">';
  domString += '          <select id="inputFoodQuantity" class="custom-select">';
  domString += '<option selected disabled>Quantity:</option>';
  domString += '<option class="foodQuantity" value="50">50</option>';
  domString += '<option class="foodQuantity" value="100">100</option>';
  domString += '<option class="foodQuantity" value="150">150</option>';
  domString += '<option class="foodQuantity" value="200">200</option>';
  domString += '<option class="foodQuantity" value="250">250</option>';
  domString += '<option class="foodQuantity" value="500">500</option>';
  domString += '          </select>';
  domString += '        </th>';

  domString += '        <th colspan="1" class="p-0">';
  domString += '          <div class="input-group-append" colspan="1">';
  domString += '            <button class="btn btn-outline-secondary add-button my-2" type="button" id="make-new-event-food"><i class="fas fa-plus"></i>Add</button>';
  domString += '          </div>';
  domString += '        </th>';
  domString += '<div id="alertFood" class="alertFood"></div>';
  domString += '        </tr>';

  domString += '</thead>';
  domString += '<tbody>';

  if (foodsFound.length !== 0) {
    singleEvent.food.forEach((foodItem) => {
      if (`${foodItem.price}` < 101 && `${foodItem.price}` > 0) {
        domString += `<tr class="eventFoodItem foodRow from0To100" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      } else if (`${foodItem.price}` > 100 && `${foodItem.price}` < 201) {
        domString += `<tr class="eventFoodItem foodRow from101To200" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      } else if (`${foodItem.price}` > 200 && `${foodItem.price}` < 301) {
        domString += `<tr class="eventFoodItem foodRow from201To300" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      } else if (`${foodItem.price}` > 300 && `${foodItem.price}` < 401) {
        domString += `<tr class="eventFoodItem foodRow from301To400" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      } else if (`${foodItem.price}` > 400 && `${foodItem.price}` < 501) {
        domString += `<tr class="eventFoodItem foodRow from501To500" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      } else if (`${foodItem.price}` > 500) {
        domString += `<tr class="eventFoodItem foodRow from501On" data-id="${foodItem.id}" data-parent="${foodItem.parentEventFoodId}" data-container="${foodItem.parentEventId}">`;
      }
      domString += `<th scope="row" class="cell-width">${foodItem.type}</th>`;
      domString += `<td class="cell-width">$${foodItem.price}</td>`;
      domString += `<td class="cell-width">${foodItem.parentQuantity}</td>`;
      domString += `<td class="cell-width">$${foodItem.rowTotal}</td>`;
      printFoodChoices(foodItem);
      domString += '</div>';
      if (user.uid === singleEvent.uid) {
        domString += `<td class="cell-width"><button id="deleteEventFoodBtn" class="btn btn-default deleteEventBtn deleteEventFoodBtn" data-id="${foodItem.parentEventFoodId}"><i class="far fa-trash-alt"></i></button></td>`;
      }
      domString += '</tr>';
    });
  } else {
    noSelectedFoods(singleEvent);
  }
  domString += '</tbody>';
  domString += '</table>';
  domString += '<div class="input-group mb-3">';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">Total Event Food Costs:</span>';
  domString += '</div>';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">$</span>';
  domString += '</div>';
  domString += `<input id="foodTotalCost" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" readonly value="${singleEvent.foodTotalAmount}">`;
  domString += '<div class="input-group-append">';
  domString += '<span class="input-group-text">.00</span>';
  domString += '</div>';
  domString += '</div>';

  domString += '</div>';
  return domString;
};

export default { getEventFoodDetails };
