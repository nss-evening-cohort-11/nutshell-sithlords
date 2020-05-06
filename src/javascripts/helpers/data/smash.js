import eventData from './eventData';
import eventFoodData from './eventFoodData';
import foodData from './foodData';
import eventSouvenirData from './eventSouvenirData';
import souvenirsData from './souvenirsData';
import animalData from './animalData';
import eventAnimalData from './eventAnimalData';
import showData from './showData';
import eventShowData from './eventShowData';
import eventStaffData from './eventStaffData';
import staffData from './staffData';

const getEventFood = (eventId) => new Promise((resolve, reject) => {
  eventFoodData.getEventFoodByEventId(eventId)
    .then((eventFoods) => {
      foodData.getFoods().then((allFoods) => {
        const selectedEventFoodItems = [];
        eventFoods.forEach((eventFoodItem) => {
          const foundEventFoodItem = allFoods.find((x) => x.id === eventFoodItem.foodId);
          foundEventFoodItem.parentEventFoodId = eventFoodItem.id;
          foundEventFoodItem.parentQuantity = eventFoodItem.quantity;
          foundEventFoodItem.parentEventId = eventFoodItem.eventId;
          foundEventFoodItem.rowTotal = foundEventFoodItem.parentQuantity * foundEventFoodItem.price;
          selectedEventFoodItems.push(foundEventFoodItem);
        });
        resolve(selectedEventFoodItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventFoodTotal = (eventId) => new Promise((resolve, reject) => {
  eventFoodData.getEventFoodByEventId(eventId)
    .then((eventFoods) => {
      foodData.getFoods().then((allFoods) => {
        const rowTotalsArray = [];
        eventFoods.forEach((eventFoodItem) => {
          const foundEventFoodItem = allFoods.find((x) => x.id === eventFoodItem.foodId);
          foundEventFoodItem.parentQuantity = eventFoodItem.quantity;
          foundEventFoodItem.rowTotal = foundEventFoodItem.parentQuantity * foundEventFoodItem.price;
          rowTotalsArray.push(foundEventFoodItem.rowTotal);
        });
        const foodTotal = rowTotalsArray.reduce((total, num) => total + num, 0);
        resolve(foodTotal);
      });
    })
    .catch((error) => reject(error));
});

const getFoodNotInEvent = (eventId) => new Promise((resolve, reject) => {
  eventFoodData.getEventFoodByEventId(eventId)
    .then((eventFood) => {
      foodData.getFoods().then((allFoods) => {
        const unselectedEventFoodItems = [];
        allFoods.forEach((food) => {
          const exists = eventFood.find((x) => food.id === x.foodId);
          if (exists === undefined) {
            unselectedEventFoodItems.push(food);
          }
        });
        resolve(unselectedEventFoodItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventSouvenirs = (eventId) => new Promise((resolve, reject) => {
  eventSouvenirData.getEventSouvenirByEventId(eventId)
    .then((eventSouvenir) => {
      souvenirsData.getSouvenirs().then((allSouvenirs) => {
        const selectedEventSouvenirItems = [];
        eventSouvenir.forEach((eventSouvenirItem) => {
          const foundEventSouvenirItem = allSouvenirs.find((x) => x.id === eventSouvenirItem.souvenirId);
          foundEventSouvenirItem.parentEventSouvenirId = eventSouvenirItem.id;
          foundEventSouvenirItem.parentQuantity = eventSouvenirItem.quantity;
          foundEventSouvenirItem.parentEventId = eventSouvenirItem.eventId;
          selectedEventSouvenirItems.push(foundEventSouvenirItem);
        });
        resolve(selectedEventSouvenirItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventShow = (eventId) => new Promise((resolve, reject) => {
  eventShowData.getEventShowByEventId(eventId)
    .then((eventShows) => {
      showData.getShows().then((allShows) => {
        const selectedEventShowItems = [];
        eventShows.forEach((eventShowItem) => {
          const foundEventShowItem = allShows.find((x) => x.id === eventShowItem.showId);
          foundEventShowItem.parentEventShowId = eventShowItem.id;
          foundEventShowItem.parentEventId = eventShowItem.eventId;
          foundEventShowItem.parentQuantity = eventShowItem.quantity;
          foundEventShowItem.rowTotal = foundEventShowItem.parentQuantity * foundEventShowItem.cost;
          selectedEventShowItems.push(foundEventShowItem);
        });
        resolve(selectedEventShowItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventShowTotal = (eventId) => new Promise((resolve, reject) => {
  eventShowData.getEventShowByEventId(eventId)
    .then((eventShows) => {
      showData.getShows().then((allShows) => {
        const rowTotalsArray = [];
        eventShows.forEach((eventShowItem) => {
          const foundEventShowItem = allShows.find((x) => x.id === eventShowItem.showId);
          foundEventShowItem.parentQuantity = eventShowItem.quantity;
          foundEventShowItem.rowTotal = foundEventShowItem.parentQuantity * foundEventShowItem.cost;
          rowTotalsArray.push(foundEventShowItem.rowTotal);
        });
        const showTotal = rowTotalsArray.reduce((total, num) => total + num, 0);
        resolve(showTotal);
      });
    })
    .catch((error) => reject(error));
});
const getShowsNotInEvent = (eventId) => new Promise((resolve, reject) => {
  eventShowData.getEventShowByEventId(eventId)
    .then((eventShows) => {
      showData.getShows().then((allShows) => {
        const unselectedEventShowItems = [];
        allShows.forEach((show) => {
          const exists = eventShows.find((x) => show.id === x.showId);
          if (exists === undefined) {
            unselectedEventShowItems.push(show);
          }
        });
        resolve(unselectedEventShowItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventStaff = (eventId) => new Promise((resolve, reject) => {
  eventStaffData.getEventStaffByEventId(eventId)
    .then((eventStaff) => {
      staffData.getStaff().then((allStaff) => {
        const selectedEventStaffMembers = [];
        eventStaff.forEach((eventStaffMember) => {
          const foundEventStaffMember = allStaff.find((x) => x.id === eventStaffMember.staffId);
          foundEventStaffMember.parentEventStaffId = eventStaffMember.id;
          foundEventStaffMember.parentEventId = eventStaffMember.eventId;
          selectedEventStaffMembers.push(foundEventStaffMember);
        });
        resolve(selectedEventStaffMembers);
      });
    })
    .catch((error) => reject(error));
});

const getStaffNotInEvent = (eventId) => new Promise((resolve, reject) => {
  eventStaffData.getEventStaffByEventId(eventId)
    .then((eventStaff) => {
      staffData.getStaff().then((allStaff) => {
        const unselectedEventStaffMembers = [];
        allStaff.forEach((staff) => {
          const exists = eventStaff.find((x) => staff.id === x.staffId);
          if (exists === undefined) {
            unselectedEventStaffMembers.push(staff);
          }
        });
        resolve(unselectedEventStaffMembers);
      });
    })
    .catch((error) => reject(error));
});

const getEventStaffTotal = (eventId) => new Promise((resolve, reject) => {
  eventStaffData.getEventStaffByEventId(eventId)
    .then((eventStaff) => {
      staffData.getStaff().then((allStaff) => {
        const rowTotalsArray = [];
        eventStaff.forEach((eventStaffMember) => {
          const foundEventStaffMember = allStaff.find((x) => x.id === eventStaffMember.staffId);
          rowTotalsArray.push(foundEventStaffMember.pay);
        });
        const staffTotal = rowTotalsArray.reduce((total, num) => total + num, 0);
        resolve(staffTotal);
      });
    })
    .catch((error) => reject(error));
});

const getEventAnimals = (eventId) => new Promise((resolve, reject) => {
  eventAnimalData.getEventAnimalByEventId(eventId)
    .then((eventAnimals) => {
      animalData.getAnimals().then((allAnimals) => {
        const selectedEventAnimalItems = [];
        eventAnimals.forEach((eventAnimalItem) => {
          const foundEventAnimalItem = allAnimals.find((x) => x.id === eventAnimalItem.animalId);
          foundEventAnimalItem.parentEventAnimalId = eventAnimalItem.id;
          foundEventAnimalItem.parentEventId = eventAnimalItem.eventId;
          selectedEventAnimalItems.push(foundEventAnimalItem);
        });
        resolve(selectedEventAnimalItems);
      });
    })
    .catch((error) => reject(error));
});

const getAnimalsNotInEvent = (eventId) => new Promise((resolve, reject) => {
  eventAnimalData.getEventAnimalByEventId(eventId)
    .then((eventAnimals) => {
      animalData.getAnimals().then((allAnimals) => {
        const unselectedEventAnimalItems = [];
        allAnimals.forEach((animal) => {
          const exists = eventAnimals.find((x) => animal.id === x.animalId);
          if (exists === undefined) {
            unselectedEventAnimalItems.push(animal);
          }
        });
        resolve(unselectedEventAnimalItems);
      });
    })
    .catch((error) => reject(error));
});

const getEventAnimalsTotal = (eventId) => new Promise((resolve, reject) => {
  eventAnimalData.getEventAnimalByEventId(eventId)
    .then((eventAnimals) => {
      animalData.getAnimals().then((allAnimals) => {
        const rowTotalsArray = [];
        eventAnimals.forEach((eventAnimalItem) => {
          const foundEventAnimalItem = allAnimals.find((x) => x.id === eventAnimalItem.animalId);
          rowTotalsArray.push(foundEventAnimalItem.cost);
        });
        const animalsTotal = rowTotalsArray.reduce((total, num) => total + num, 0);
        resolve(animalsTotal);
      });
    })
    .catch((error) => reject(error));
});

const getCompleteEvent = (eventId) => new Promise((resolve, reject) => {
  eventData.getEventById(eventId)
    .then((event) => {
      getEventSouvenirs(eventId).then((eventSouvenirs) => {
        getEventStaff(eventId).then((eventStaff) => {
          getEventShow(eventId).then((eventShows) => {
            getEventShowTotal(eventId).then((showTotal) => {
              getEventAnimals(eventId).then((eventAnimals) => {
                getEventFood(eventId).then((eventFood) => {
                  getEventFoodTotal(eventId).then((foodTotal) => {
                    getEventStaffTotal(eventId).then((staffTotal) => {
                      getEventAnimalsTotal(eventId).then((animalsTotal) => {
                        const finalEvent = { ...event };
                        finalEvent.food = eventFood;
                        finalEvent.foodTotalAmount = foodTotal;
                        finalEvent.souvenirs = eventSouvenirs;
                        finalEvent.shows = eventShows;
                        finalEvent.showTotalAmount = showTotal;
                        finalEvent.staff = eventStaff;
                        finalEvent.staffTotalAmount = staffTotal;
                        finalEvent.animals = eventAnimals;
                        finalEvent.animalsTotalAmount = animalsTotal;
                        finalEvent.id = eventId;
                        resolve(finalEvent);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      })
        .catch((error) => reject(error));
    });
});

export default {
  getEventFood,
  getFoodNotInEvent,
  getCompleteEvent,
  getEventStaff,
  getAnimalsNotInEvent,
  getShowsNotInEvent,
  getStaffNotInEvent,
};
