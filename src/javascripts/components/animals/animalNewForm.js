import './animals.scss';
import utils from '../../helpers/utils';

const showAddAnimalModalForm = () => {
  $('#animalModal').modal('show');
  let domString = '';
  domString += '<form id="animalForm">';
  domString += '<div class="form-group">';
  domString += '<label for="animalName">Name of Animal</label>';
  domString += '<input type="text" class="form-control" id="animalName" placeholder="Name">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="animalType">Type of Animal</label>';
  domString += '<input type="text" class="form-control" id="animalType" placeholder="Type">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="animalDescription">Description of Animal</label>';
  domString += '<input type="text" class="form-control" id="animalDescription" placeholder="Description">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="animalImageUrl">Photo of Animal</label>';
  domString += '<input type="text" class="form-control" id="animalImageUrl" placeholder="Image Url">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="animalCost">Price of Animal</label>';
  domString += '<input type="number" class="form-control" id="animalCost" placeholder="Price">';
  domString += '</div>';
  domString += '<div class="form-group">';
  domString += '<label for="availabilityOfAnimal">Availability Of Animal:</label>';
  domString += '<select id="availabilityOfAnimal" class="form-control" placeholder="Is it available today?">';
  domString += '<option value="">Select your option</option>';
  domString += '<option value="Available">Available</option>';
  domString += '<option value="Not Available">Not Available</option>';
  domString += '</select>';
  domString += '</form>';

  $('#newAnimalSubmit').addClass('hide');
  $('#editAnimalSubmit').removeClass('hide');
  utils.printToDom('modalAnimalForm', domString);
};

export default { showAddAnimalModalForm };
