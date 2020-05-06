/* eslint-disable no-use-before-define */

import eventFoodData from '../../helpers/data/eventFoodData';
import eventFoodDetails from './eventFoodDetails';
import eventStaffData from '../../helpers/data/eventStaffData';
import eventStaffDetails from './eventStaffDetails';
import eventShowData from '../../helpers/data/eventShowData';
import eventAnimalData from '../../helpers/data/eventAnimalData';
import eventSouvenirDetails from './eventSouvenirDetails';
import eventSouvenirData from '../../helpers/data/eventSouvenirData';
import showDetails from './eventShowDetails';
import smashData from '../../helpers/data/smash';

import singleEventCharts from '../singleEventCharts/singleEventCharts';
import eventFilterFields from './eventFilters';
import animalEvent from './eventAnimalDetails';

import utils from '../../helpers/utils';

import './eventSingleView.scss';
import '../../../styles/main.scss';

const eventSingleViewClickEvents = () => {
  $('body').on('click', '#closeSingleEvent', closeSingleEvent);
  $('body').on('click', '.deleteEventFoodBtn', removeEventFood);
  $('body').on('click', '.deleteEventStaffBtn', removeEventStaff);
  $('body').on('click', '.deleteEventShowBtn', removeEventShow);
  $('body').on('click', '.deleteEventAnimalBtn', removeEventAnimal);
  $('body').on('click', '.deleteEventSouvenirBtn', removeEventSouvenir);
  $('body').on('click', '#make-new-event-animal', makeNewEventAnimal);
  $('body').on('click', '#make-new-event-food', makeNewEventFood);
  $('body').on('click', '#make-new-event-staff', makeNewEventStaff);
  $().on('click', '.alert', closeAlert);
  $().on('click', '.myAlert', closeAlert);
};

const closeSingleEvent = () => {
  utils.printToDom('single-view-event', '');
  $('#foodCards').removeClass('hide');
  $('#souvenirs').removeClass('hide');
  $('#staff-collection').removeClass('hide');
  $('#shows').removeClass('hide');
  $('#events').removeClass('hide');
  $('#single-view-event').addClass('hide');
  $('#animals').removeClass('hide');
};

const removeEventFood = (e) => {
  const eventFoodId = e.target.closest('button').dataset.id;
  const eventId = $('.foodRow').data('container');
  eventFoodData.getSingleEventFood(eventFoodId)
    .then(() => {
      eventFoodData.deleteEventFood(eventFoodId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          viewSingleEvent(eventId);
        });
    })
    .catch((error) => console.error('could not delete food item from event', error));
};

const makeNewEventFood = (e) => {
  $('.alertFood').alert('close');
  e.preventDefault();
  const thisEventId = $('#inputFoodChoices option:selected').attr('value');
  const foodId = $('#inputFoodChoices option:selected').attr('id');
  const quantityVal = $('#inputFoodQuantity').val() * 1;
  console.error('quantity value', quantityVal);
  if (foodId !== undefined && quantityVal !== 0) {
    const newEventFood = {
      eventId: thisEventId,
      foodId: $('#inputFoodChoices option:selected').attr('id'),
      quantity: $('#inputFoodQuantity').val() * 1,
    };
    eventFoodData.addEventFood(newEventFood);
    // eslint-disable-next-line no-use-before-define
    viewSingleEvent(thisEventId);
  } else {
    let domString = '';
    domString += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Please choose a food item and quantity!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

    utils.printToDom('alertFood', domString);
  }
};

const removeEventShow = (e) => {
  e.preventDefault();
  const eventShowId = e.target.closest('button').id;
  const eventId = e.target.closest('.showRow').id;
  eventShowData.getSingleEventShow(eventShowId)
    .then(() => {
      eventShowData.deleteEventShow(eventShowId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          viewSingleEvent(eventId);
        });
    })
    .catch((error) => console.error('could not delete show from event', error));
};
const makeNewEventShow = (e) => {
  console.error('button');
  e.preventDefault();
  const thisEventId = $('#inputShowChoices option:selected').attr('value');
  const newEventShow = {
    eventId: thisEventId,
    showId: $('#inputShowChoices option:selected').attr('id'),
    quantity: $('#inputShowQuantity').val() * 1,
  };
  eventShowData.addEventShow(newEventShow);
  // eslint-disable-next-line no-use-before-define
  viewSingleEvent(thisEventId);
};

const removeEventStaff = (e) => {
  e.preventDefault();
  const eventStaffId = e.target.closest('button').id;
  const eventId = e.target.closest('.staffRow').id;
  eventStaffData.getSingleEventStaff(eventStaffId)
    .then(() => {
      eventStaffData.deleteEventStaff(eventStaffId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          viewSingleEvent(eventId);
        });
    })
    .catch((error) => console.error('could not delete staff member from event', error));
};

const makeNewEventStaff = (e) => {
  $('.myAlert').alert('close');
  e.preventDefault();
  const staff = $('#inputStaffChoices option:selected').attr('id');
  const thisEventId = $('#inputStaffChoices option:selected').attr('value');
  if (staff !== undefined) {
    const newEventStaff = {
      eventId: thisEventId,
      staffId: staff,
    };
    eventStaffData.addEventStaff(newEventStaff);
    // eslint-disable-next-line no-use-before-define
    viewSingleEvent(thisEventId);
  } else {
    let domString = '';
    domString += `<div class="myAlert alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Please</strong> choose a staff member!
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>`;
    utils.printToDom('myAlert', domString);
  }
};

const removeEventAnimal = (e) => {
  const eventNumber = e.target.closest('.animalrow').id;
  const eventAnimalId = e.target.closest('button').id;
  eventAnimalData.getSingleEventAnimal(eventAnimalId)
    .then(() => {
      eventAnimalData.deleteEventAnimal(eventAnimalId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          viewSingleEvent(eventNumber);
        });
    })
    .catch((error) => console.error('could not delete animal item from event', error));
};

const makeNewEventAnimal = (e) => {
  $('.alert').alert('close');
  e.preventDefault();
  const animal = $('#inputGroupSelect04 option:selected').attr('id');
  const thisEventId = $('#inputGroupSelect04 option:selected').attr('value');
  if (animal !== undefined) {
    const newEventAnimal = {
      eventId: thisEventId,
      animalId: animal,
    };
    eventAnimalData.addEventAnimal(newEventAnimal);
    // eslint-disable-next-line no-use-before-define
    viewSingleEvent(thisEventId);
  } else {
    let domString = '';
    domString += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>I Cry Your Mercy!</strong> Prithee choose an item from the dropdown ere clicking the +Add button.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    utils.printToDom('alert', domString);
  }
};
const removeEventSouvenir = (e) => {
  e.preventDefault();
  const eventSouvenirId = e.target.closest('button').id;
  const eventId = e.target.closest('.souvenirRow').id;
  eventSouvenirData.getSingleEventSouvenir(eventSouvenirId)
    .then(() => {
      eventSouvenirData.deleteEventSouvenir(eventSouvenirId)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          viewSingleEvent(eventId);
        });
    })
    .catch((error) => console.error('could not delete souvenir item from event', error));
};

const getGrandTotal = () => {
  // eventSouvenirDetails.getSouvenirTotals(completeEvent);
  const souvenirTotal = $('#souvTotalCost').val() * 1;
  const showTotal = $('#showTotalCost').val() * 1;
  const foodTotal = $('#foodTotalCost').val() * 1;
  const staffTotal = $('#staffTotalCost').val() * 1;
  const animalTotal = $('#animalTotalCost').val() * 1;
  const fullTotal = souvenirTotal + showTotal + foodTotal + staffTotal + animalTotal;
  utils.printToDom('theGrandDaddyTotal', fullTotal);
};

const grandTotalBuilder = () => {
  let domString = '';
  domString += '<div class="grandTotalSection">';
  domString += '<div id="grandTotalSection">';
  domString += '<h4 class="eventSectionTitle"> Grand Total</h4>';
  domString += '<table class="table-responsive table-dark">';
  domString += '<thread>';
  domString += '<tr>';
  domString += '<th scope="col">$</th>';
  domString += '<th scope="col">';
  domString += '<div id="theGrandDaddyTotal">';
  domString += '</div>';
  domString += '</th>';
  domString += '</tr>';
  domString += '</thread>';
  domString += '</table>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

const applyFilterByModuleSelection = () => {
  const selectedModule = $('#moduleSelected').val();
  if (selectedModule === 'showModule') {
    $('#eventAnimalsSection').addClass('hide');
    $('#eventFoodSection').addClass('hide');
    $('#eventShowSection').removeClass('hide');
    $('#eventSouvenirSection').addClass('hide');
    $('#eventStaffSection').addClass('hide');
  } else if (selectedModule === 'animalModule') {
    $('#eventAnimalsSection').removeClass('hide');
    $('#eventFoodSection').addClass('hide');
    $('#eventShowSection').addClass('hide');
    $('#eventSouvenirSection').addClass('hide');
    $('#eventStaffSection').addClass('hide');
  } else if (selectedModule === 'foodModule') {
    $('#eventAnimalsSection').addClass('hide');
    $('#eventFoodSection').removeClass('hide');
    $('#eventShowSection').addClass('hide');
    $('#eventSouvenirSection').addClass('hide');
    $('#eventStaffSection').addClass('hide');
  } else if (selectedModule === 'souvenirModule') {
    $('#eventAnimalsSection').addClass('hide');
    $('#eventFoodSection').addClass('hide');
    $('#eventShowSection').addClass('hide');
    $('#eventSouvenirSection').removeClass('hide');
    $('#eventStaffSection').addClass('hide');
  } else if (selectedModule === 'staffModule') {
    $('#eventAnimalsSection').addClass('hide');
    $('#eventFoodSection').addClass('hide');
    $('#eventShowSection').addClass('hide');
    $('#eventSouvenirSection').addClass('hide');
    $('#eventStaffSection').removeClass('hide');
  }
};

// FUNCTIONS FOR THE BUTTONS IN THE ACCORDION SECTION WITH FILTERS ARE BELOW
const applyFilterByPriceRange = () => {
  const selectedPriceRange = $('#priceRangeSelected').val();
  if (selectedPriceRange === 'Under $100') {
    $('.from0To100').removeClass('hide');
    $('.from101To200').addClass('hide');
    $('.from201To300').addClass('hide');
    $('.from301To400').addClass('hide');
    $('.from401To500').addClass('hide');
    $('.from501On').addClass('hide');
  } else if (selectedPriceRange === '$101-$200') {
    $('.from0To100').addClass('hide');
    $('.from101To200').removeClass('hide');
    $('.from201To300').addClass('hide');
    $('.from301To400').addClass('hide');
    $('.from401To500').addClass('hide');
    $('.from501On').addClass('hide');
  } else if (selectedPriceRange === '$201-$300') {
    $('.from0To100').addClass('hide');
    $('.from101To200').addClass('hide');
    $('.from201To300').removeClass('hide');
    $('.from301To400').addClass('hide');
    $('.from401To500').addClass('hide');
    $('.from501On').addClass('hide');
  } else if (selectedPriceRange === '$301-$400') {
    $('.from0To100').addClass('hide');
    $('.from101To200').addClass('hide');
    $('.from201To300').addClass('hide');
    $('.from301To400').removeClass('hide');
    $('.from401To500').addClass('hide');
    $('.from501On').addClass('hide');
  } else if (selectedPriceRange === '$401-$500') {
    $('.from0To100').addClass('hide');
    $('.from101To200').addClass('hide');
    $('.from201To300').addClass('hide');
    $('.from301To400').addClass('hide');
    $('.from401To500').removeClass('hide');
    $('.from501On').addClass('hide');
  } else if (selectedPriceRange === 'Over $500') {
    $('.from0To100').addClass('hide');
    $('.from101To200').addClass('hide');
    $('.from201To300').addClass('hide');
    $('.from301To400').addClass('hide');
    $('.from401To500').addClass('hide');
    $('.from501On').removeClass('hide');
  }
};

const clearFilters = (e) => {
  const eventId = e.target.dataset.id;
  // eslint-disable-next-line no-use-before-define
  viewSingleEvent(eventId);
};

const filterEvents = () => {
  $('body').on('click', '#btnFilterPriceRangeSave', applyFilterByPriceRange);
  $('body').on('click', '#btnFilterPriceRangeClear', clearFilters);
  $('body').on('click', '#btnFilterModuleSave', applyFilterByModuleSelection);
  $('body').on('click', '#btnFilterModuleClear', clearFilters);
};
// Anca: Functions for filter buttons end here.

const viewSingleEvent = (eventId) => {
  smashData.getCompleteEvent(eventId)
    .then((singleEvent) => {
      let domString = '';
      domString += '<div class="singleEventTitle">';
      domString += `<h2>${singleEvent.name}</h2>`;
      domString += `<h5>${singleEvent.location}</h5>`;
      domString += `<h5>${singleEvent.date}</h5>`;
      domString += `<h5>${singleEvent.timeStart} - ${singleEvent.timeEnd}</h5>`;
      domString += '<button id="closeSingleEvent" class="btn btn-lg closeEventBtn"><i class="fas fa-times"></i> Close Event Details</button>';
      domString += '</div>';
      domString += eventFilterFields.eventFilters(eventId);
      domString += grandTotalBuilder(singleEvent);
      domString += '<div id="eventDetails" class="container-fluid d-flex flex-wrap">';
      domString += eventFoodDetails.getEventFoodDetails(singleEvent);
      domString += eventSouvenirDetails.getEventSouvenirDetails(singleEvent);
      domString += eventStaffDetails.getEventStaffDetails(singleEvent);
      domString += showDetails.eventShowDetails(singleEvent);
      domString += animalEvent.getEventAnimalDetails(singleEvent);
      domString += '<div id="chartDiv"></div>';
      utils.printToDom('single-view-event', domString);
      singleEventCharts.buildSingleEventChart();
      getGrandTotal(singleEvent);
      $('#foodCards').addClass('hide');
      $('#souvenirs').addClass('hide');
      $('#staff-collection').addClass('hide');
      $('#shows').addClass('hide');
      $('#events').addClass('hide');
      $('#animals').addClass('hide');
      $('#single-view-event').removeClass('hide');
    })
    .catch((error) => console.error('problem with single event', error));
};

const viewSingleEventCall = (e) => {
  const eventId = e.target.dataset.id;
  viewSingleEvent(eventId);
};

const closeAlert = () => {
  $('.alert').addClass('close');
  $('.alertFood').addClass('close');
  $('.myAlert').addClass('close');
};


const eventSingleViewClickEvents = () => {
  $('body').on('click', '#closeSingleEvent', closeSingleEvent);
  $('body').on('click', '.deleteEventFoodBtn', removeEventFood);
  $('body').on('click', '.deleteEventStaffBtn', removeEventStaff);
  $('body').on('click', '.deleteEventShowBtn', removeEventShow);
  $('body').on('click', '.deleteEventAnimalBtn', removeEventAnimal);
  $('body').on('click', '.deleteEventSouvenirBtn', removeEventSouvenir);
  $('body').on('click', '#make-new-event-animal', makeNewEventAnimal);
  $('body').on('click', '#make-new-event-food', makeNewEventFood);
  $('body').on('click', '#make-new-event-show', makeNewEventShow);
  $().on('click', '.alert', closeAlert);
};

export default {
  viewSingleEventCall,
  eventSingleViewClickEvents,
  filterEvents,
};
