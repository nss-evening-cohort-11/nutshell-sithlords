import animalData from '../../../helpers/data/animalData';
import utils from '../../../helpers/utils';

const editAnimalForm = (e) => {
  const animalId = e.target.closest('.card').id;
  $('#animalModal').modal('show');
  animalData.getSingleAnimal(animalId)
    .then((response) => {
      const animal = response.data;
      let domString = '';
      domString += `<form class="editAnimalForm" data-id="${animalId}">`;
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalType">Animal Type:</label>';
      domString += `<input type="text" class="form-control" id="edit-animalType" placeholder="Ocarina" value="${animal.type}"`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalDescription">animal Description:</label>';
      domString += `<input type="text" class="form-control" id="edit-animalDescription" placeholder="A small wind instrument" value="${animal.description}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalImage">Image:</label>';
      domString += `<input type="text" class="form-control" id="edit-animalImage" placeholder="Image Link" value="${animal.imageUrl}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalName">Name:</label>';
      domString += `<input type="text" class="form-control" id="edit-animalName" placeholder="$20" value="${animal.name}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalCost">Price:</label>';
      domString += `<input type="text" class="form-control" id="edit-animalCost" placeholder="$20" value="${animal.cost}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-animalAvailability">Avaliability Of animal:</label>';
      domString += `<select id="edit-animalAvailability" class="form-control" placeholder="" value="${animal.isAvailable}">`;
      domString += `<option value="${animal.isAvailable}">${animal.isAvailable}</option>`;
      console.error('avail status in edit form', `${animal.isAvailable}`);
      domString += '<option value="Available">Avaliable</option>';
      domString += '<option value="Not Available">Not Avaliable</option>';
      domString += '</select>';
      domString += '</div>';
      domString += '</div>';
      domString += '</form>';
      utils.printToDom('modalAnimalForm', domString);
      $('#editAnimalSubmit').removeClass('hide');
      $('#newAnimalSubmit').addClass('hide');
    })
    .catch((err) => console.error('could not get single animal', err));
};

export default { editAnimalForm };
