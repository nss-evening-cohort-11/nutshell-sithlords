import utils from '../../helpers/utils';
import foodData from '../../helpers/data/foodData';

const editFoodForm = (e) => {
  const foodId = e.target.closest('.card').id;
  $('#foodModal').modal('show');
  foodData.getFoodInfo(foodId)
    .then((resp) => {
      const foodPlaceholder = resp.data;
      let domString = '';
      domString += `<form class="editFoodForm" data-id="${foodId}" id="editFoodForm">`;
      domString += '<div class="form-group">';
      domString += '<label for="edit-foodType">Type of Food</label>';
      domString += `<input type="text" class="form-control" id="edit-foodType" placeholder="${foodPlaceholder.type}" value="${foodPlaceholder.type}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-foodDescription">Description of Food</label>';
      domString += `<input type="text" class="form-control" id="edit-foodDescription" placeholder="${foodPlaceholder.description}" value="${foodPlaceholder.description}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-foodImageUrl">Image Url of Food</label>';
      domString += `<input type="text" class="form-control" id="edit-foodImageUrl" placeholder="Update Image Url" value="${foodPlaceholder.imageUrl}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-foodPrice">Price of Food</label>';
      domString += `<input type="number" class="form-control" id="edit-foodPrice" placeholder="${foodPlaceholder.price}" value="${foodPlaceholder.price}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-availabilityOfFood">Availability Of Food:</label>';
      domString += `<select id="edit-availabilityOfFood" class="form-control" placeholder="" value="${foodPlaceholder.isAvailable}">`;
      domString += `<option value="${foodPlaceholder.isAvailable}">${foodPlaceholder.isAvailable}</option>`;
      console.error('avail status in edit form', `${foodPlaceholder.isAvailable}`);
      domString += '<option value="Available">Available</option>';
      domString += '<option value="Not Available">Not Available</option>';
      domString += '</select>';
      domString += '</div>';
      domString += '</div>';
      domString += '</form>';
      utils.printToDom('modalFoodForm', domString);
      $('#editFoodSubmit').removeClass('hide');
      $('#newFoodSubmit').addClass('hide');
    })
    .catch((err) => console.error('editFoodForm', err));
};

export default { editFoodForm };
