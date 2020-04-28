import firebase from 'firebase/app';
import souvenirsData from '../../helpers/data/souvenirsData';
import souvenirComponent from './souvenirsCards/souvenirsCards';
import utils from '../../helpers/utils';
import souvenirForm from './newSouvenirForm/newSouvenirForm';
import editSouvenirs from './editSouvenirsForm/editSouvenirsForm';
import './souvenirs.scss';

const editSouvenirCard = (e) => {
  e.preventDefault();
  const souvenirId = $('.edit-souvenir-form').data('id');
  const editSouvenir = {
    type: $('#edit-souvenirType').val(),
    description: $('#edit-souvenirDescription').val(),
    imageUrl: $('#edit-souvenirImage').val(),
    price: $('#edit-souvenirPrice').val() * 1,
    location: $('#edit-souvenirLocation').val(),
    isAvaliable: $('#edit-souvenirAvailability').val(),
    uid: utils.getMyUid(),
  };
  souvenirsData.updateSouvenirs(souvenirId, editSouvenir)
    .then(() => {
      $('#souvenirs-modal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllSouvenirs();
    })
    .catch((err) => console.error('update failed', err));
};

const removeSouvenirCard = (e) => {
  const souvenirsId = e.target.closest('.card').id;
  souvenirsData.deleteSouvenirs(souvenirsId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllSouvenirs();
    })
    .catch((err) => console.error('cannot delete souvenir', err));
};

const saveNewSouvenirItem = (e) => {
  e.preventDefault();
  console.error('submit button is in fact working!');
  const newSouvenir = {
    type: $('#souvenirType').val(),
    description: $('#souvenirDescription').val(),
    imageUrl: $('#souvenirImageUrl').val(),
    price: $('#souvenirPrice').val() * 1,
    location: $('#souvenirLocation').val(),
    isAvaliable: $('#souvenirAvailability').val(),
    uid: utils.getMyUid(),
  };
  souvenirsData.addSouvenirs(newSouvenir)
    .then(() => {
      $('#souvenirs-modal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllSouvenirs();
    })
    .catch((err) => console.error('Save New Souvenir Item failed', err));
};
const buildAllSouvenirs = () => {
  souvenirsData.getSouvenirs()
    .then((souvenirs) => {
      let domString = '';
      domString += '<div class="text-center souvenirsContainer">';
      domString += '<h2 class="mt-3"> Souvenirs </h2>';
      domString += '<h3> Make the memories last forever </h3>';
      const user = firebase.auth().currentUser;
      if (user !== null) {
        domString += '<button class="align-item-center souvenirs-add-btn btn btn-lg" id="souvenirs-add-btn"> <i class="fas fa-dragon"></i> Add New Souvenir </button>';
      }
      domString += '</div>';
      domString += '<div class="styling-columns card-columns justify-content-center">';
      souvenirs.forEach((souvenir) => {
        domString += souvenirComponent.buildSouvenirsCards(souvenir);
      });
      domString += '</div>';
      utils.printToDom('souvenirs', domString);
    })
    .catch((err) => console.error('no souvenirs for you', err));
};
const souvenirsEvents = () => {
  $('body').on('click', '.souvenirs-delete-btn', removeSouvenirCard);
  $('body').on('click', '.souvenirs-edit-btn', editSouvenirs.editSouvenirsForm);
  $('body').on('click', '.souvenirs-add-btn', souvenirForm.newSouvenirForm);
  $('body').on('click', '#save-new-souvenir-btn', saveNewSouvenirItem);
  $('body').on('click', '#update-souvenir-btn', editSouvenirCard);
};
export default { buildAllSouvenirs, souvenirsEvents };
