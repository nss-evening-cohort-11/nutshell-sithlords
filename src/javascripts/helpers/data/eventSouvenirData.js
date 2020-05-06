import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEventSouvenirByEventId = (eventId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/eventSouvenir.json?orderBy="eventId"&equalTo="${eventId}"`)
    .then((response) => {
      const allEventSouvenirItems = response.data;
      const eventSouvenirList = [];
      Object.keys(allEventSouvenirItems).forEach((eventSouvenirId) => {
        allEventSouvenirItems[eventSouvenirId].id = eventSouvenirId;
        eventSouvenirList.push(allEventSouvenirItems[eventSouvenirId]);
      });
      resolve(eventSouvenirList);
    })
    .catch((error) => reject(error));
});

const getEventSouvenir = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/eventSouvenir.json`)
    .then((response) => {
      const allEventSouvenirItems = response.data;
      const eventSouvenirList = [];
      Object.keys(allEventSouvenirItems).forEach((eventSouvenirId) => {
        allEventSouvenirItems[eventSouvenirId].id = eventSouvenirId;
        eventSouvenirList.push(allEventSouvenirItems[eventSouvenirId]);
      });
    })
    .catch((error) => reject(error));
});

const addEventSouvenir = (newEventSouvenir) => axios.post(`${baseUrl}/eventSouvenir.json`, newEventSouvenir);

const getSingleEventSouvenir = (eventSouvenirId) => axios.get(`${baseUrl}/eventSouvenir/${eventSouvenirId}.json`);

const deleteEventSouvenir = (eventSouvenirId) => axios.delete(`${baseUrl}/eventSouvenir/${eventSouvenirId}.json`);

export default {
  getEventSouvenirByEventId,
  deleteEventSouvenir,
  getSingleEventSouvenir,
  getEventSouvenir,
  addEventSouvenir,
};
