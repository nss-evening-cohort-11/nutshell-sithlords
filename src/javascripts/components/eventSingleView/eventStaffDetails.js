import firebase from 'firebase/app';

import './eventSingleView.scss';
import '../../../styles/main.scss';

const getEventStaffDetails = (singleEvent) => {
  let domString = '';
  const user = firebase.auth().currentUser;
  domString += '<div id="eventStaffSection" class="quad col-md-4 col-sm-12">';
  domString += '<h4 class="eventSectionTitle">Staff Details</h4>';
  if (user.uid === singleEvent.uid) {
    domString += '<button class="btn btn-default btn-lg d-flex ml-auto" id="add-eventStaff"><i class="fas fa-plus"></i></button>';
  }
  domString += '<table class="table-responsive table-dark">';
  domString += '<thead>';
  domString += '<tr>';
  domString += '<th scope="col">Staff Member</th>';
  domString += '<th scope="col">Wage</th>';
  domString += '<th scope="col">Hrs</th>';
  domString += '<th scope="col">Cost</th>';
  domString += '</tr>';
  domString += '</thead>';
  domString += '<tbody>';
  singleEvent.staff.forEach((staffMember) => {
    domString += `<tr class="eventStaffMember staffRow"id="${staffMember.parentEventId}" data-id="${staffMember.id}" data-parent="${staffMember.parentEventStaffId}" data-container="${staffMember.parentEventId}">`;
    domString += `<th scope="row" class="cell-width">${staffMember.name}</th>`;
    domString += `<td class="cell-width">$${staffMember.pay}/hr</td>`;
    domString += `<td class="cell-width">${staffMember.parentQuantity}</td>`;
    domString += `<td class="cell-width">$${staffMember.rowTotal}</td>`;
    if (user.uid === singleEvent.uid) {
      domString += `<td class="cell-width"><button id="${staffMember.parentEventStaffId}" value="${staffMember.parentEventStaffId}" class="btn btn-default deleteEventBtn deleteEventStaffBtn"><i class="far fa-trash-alt"></i></button></td>`;
    }
    domString += '</tr>';
  });
  domString += '</tbody>';
  domString += '</table>';
  domString += '</tbody>';
  domString += '</table>';
  domString += '<div class="input-group mb-3">';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">Total Event Staff Costs:</span>';
  domString += '</div>';
  domString += '<div class="input-group-prepend">';
  domString += '<span class="input-group-text">$</span>';
  domString += '</div>';
  domString += `<input id="staffTotalCost" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" readonly value="${singleEvent.staffTotalAmount}">`;
  domString += '<div class="input-group-append">';
  domString += '<span class="input-group-text">.00</span>';
  domString += '</div>';
  domString += '</div>';

  domString += '</div>';

  return domString;
};


export default { getEventStaffDetails };
