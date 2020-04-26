import firebase from 'firebase/app';
import animalData from '../../helpers/data/animalData';

import animalCard from './animalCard';
import animalNewForm from './animalNewForm';
import animalEdit from './animalEditForm.js/animalEditForm';

import utils from '../../helpers/utils';

const editNewAnimal = (e) => {
  e.preventDefault();
  const animalId = e.target.closest('.card').id;
  $('#animalmodal').modal('show');
  animalEdit.editAnimalForm(animalId);
};

const updateAnimalCard = (e) => {
  e.preventDefault();
  const animalId = $('.edit-animal-form').data('id');
  const editAnimal = {
    type: $('#edit-animalType').val(),
    description: $('#edit-animalDescription').val(),
    imageUrl: $('#edit-animalImage').val(),
    name: $('#aniamlLocation').val(),
    cost: $('#edit-animalPrice').val() * 1,
    isAvaliable: $('#edit-animalAvailability').val(),
    uid: utils.getMyUid(),
  };
  animalData.updateAnimals(animalId, editAnimal)
    .then(() => {
      $('#animalModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllAnimals();
    })
    .catch((err) => console.error('update failed', err));
};

const removeAnimalCard = (e) => {
  e.preventDefault();
  const animalId = e.target.closest('.card').id;
  animalData.deleteAnimal(animalId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllAnimals();
    })
    .catch((err) => console.error('delete animals failed', err));
};

const makeNewAnimal = (e) => {
  e.preventDefault();
  const newAnimal = {
    name: $('#animalName').val(),
    type: $('#animalType').val(),
    description: $('#animalDescription').val(),
    imageUrl: $('#animalImageUrl').val(),
    cost: $('#animalCost').val() * 1,
    isAvailable: $('#availabilityOfAnimal').val(),
    uid: utils.getMyUid(),
  };
  animalData.addAnimal(newAnimal)
    .then(() => {
      document.getElementById('animalForm').reset();
      $('#animalModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildAllAnimals();
    })
    .catch((error) => console.error('could not add a new animal', error));
};

const buildAllAnimals = () => {
  let domString = '';
  animalData.getAnimals()
    .then((animals) => {
      domString += '<div class="text-center" id="animalTitle">';
      domString += '<h2 class="mt-3">Animal Rides</h2>';
      domString += '<h3>Come on the ride of your dreams!</h3>';
      const user = firebase.auth().currentUser;
      if (user !== null) {
        domString += '<button class="btn btn-lg addAnimalBtn" id="addAnimalBtn"><i class="fas fa-plus"></i> Add a new animal ride</button>';
      }
      domString += '</div>';
      domString += '<div class="container-fluid d-flex flex-wrap col-md-9 col-sm-10">';
      animals.forEach((animal) => {
        domString += animalCard.buildAnimalCard(animal);
      });
      domString += '</div>';
      utils.printToDom('animals', domString);
    })
    .catch((err) => console.error('build all animals has failed you', err));
};

const animalEvents = () => {
  $('body').on('click', '#deleteAnimalBtn', removeAnimalCard);
  $('body').on('click', '#editAnimalBtn', editNewAnimal);
  $('body').on('click', '#addAnimalBtn', animalNewForm.showAddAnimalModalForm);
  $('body').on('click', '#newAnimalSubmit', makeNewAnimal);
  $('body').on('click', '#update-animal-btn', updateAnimalCard);
};

export default { buildAllAnimals, animalEvents };
