import firebase from 'firebase/app';

import showData from '../../helpers/data/showData';

import addShow from '../newShowForm/newShowForm';
import editShow from '../editShowForm/editShowForm';
import showCards from '../showCards/showCards';

import './shows.scss';
import utils from '../../helpers/utils';


// add a new show
const saveNewShowItem = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const newShow = {
    name: $('#new-show-name').val(),
    time: $('#new-show-time').val(),
    stage: $('#new-show-stage').val(),
    location: $('#new-show-location').val(),
    imageUrl: $('#new-show-image').val(),
    uid: utils.getMyUid(),
  };
  showData.addShow(newShow)
    .then(() => {
      $('#shows-modal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllShows();
    })
    .catch((err) => console.error('could not add show', err));
};

// update a show item
const editShowItem = (e) => {
  e.preventDefault();
  const showId = $('.edit-show-form').data('id');
  const editedShow = {
    name: $('#edit-show-name').val(),
    time: $('#edit-show-time').val(),
    stage: $('#edit-show-stage').val(),
    location: $('#edit-show-location').val(),
    imageUrl: $('#edit-show-image').val(),
    uid: utils.getMyUid(),
  };
  showData.updateShow(showId, editedShow)
    .then(() => {
      $('#shows-modal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllShows();
    })
    .catch((err) => console.error('could not update show', err));
};

// remove a show
const removeShow = (e) => {
  e.preventDefault();
  const showId = e.target.closest('.card').id;
  showData.deleteShow(showId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllShows();
    })
    .catch((err) => console.error('cannot remove show', err));
};


// build all shows - on page load
const buildAllShows = () => {
  showData.getShows()
    .then((shows) => {
      let domString = '';
      domString += '<div class="show-title text-center">';
      domString += '<h2 class="mt-3">Shows</h2>';
      domString += '<h3>Fun Shows for All Ages</h3>';
      const user = firebase.auth().currentUser;
      if (user !== null) {
        domString += '<button class="btn btn-lg mb-2 new-show-btn" id="add-new-show-btn"><i class="fas fa-plus"></i> <span class="pl-1">Add New Show</span></button>';
      }
      domString += '</div>';
      domString += '<div class="styling-columns card-columns justify-content-center">';
      shows.forEach((show) => {
        domString += showCards.buildShowCards(show);
      });
      domString += '</div>';
      utils.printToDom('shows', domString);
    })
    .catch((err) => console.error('get shows failed', err));
};

// events
const showEvents = () => {
  $('body').on('click', '#add-new-show-btn', addShow.addShowForm);
  $('body').on('click', '#save-new-show-btn', saveNewShowItem);
  $('body').on('click', '.show-delete-btn', removeShow);
  $('body').on('click', '.show-edit-btn', editShow.editShowForm);
  $('body').on('click', '#update-show-btn', editShowItem);
};

export default { buildAllShows, showEvents };
