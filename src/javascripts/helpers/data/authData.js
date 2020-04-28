import firebase from 'firebase/app';
import 'firebase/auth';

import souvenirs from '../../components/souvenirs/souvenirs';
import food from '../../components/foods/food';
import shows from '../../components/shows/shows';
import staff from '../../components/staff/staff';
import animals from '../../components/animals/animals';
import eventsContainer from '../../components/eventsContainer/eventsContainer';

const loginButton = $('#loginButton');
const logoutButton = $('#logoutButton');
const eventsButton = $('#eventsLink');
const eventsDiv = $('#events');
const singleViewDiv = $('#single-view-event');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.addClass('hide');
      logoutButton.removeClass('hide');
      eventsButton.removeClass('hide');
      eventsDiv.removeClass('hide');
      singleViewDiv.removeClass('hide');
      // events
      shows.showEvents();
    } else {
      loginButton.removeClass('hide');
      logoutButton.addClass('hide');
      eventsButton.addClass('hide');
      eventsDiv.addClass('hide');
      singleViewDiv.addClass('hide');
    }
    food.foodEvents();
    food.buildAllFoods();
    animals.animalEvents();
    animals.buildAllAnimals();
    eventsContainer.buildAllEvents();
    eventsContainer.eventActions();
    staff.staffEvents();
    staff.buildAllStaff();
    shows.buildAllShows();
    souvenirs.souvenirsEvents();
    souvenirs.buildAllSouvenirs();
  });
};

export default { checkLoginStatus };
