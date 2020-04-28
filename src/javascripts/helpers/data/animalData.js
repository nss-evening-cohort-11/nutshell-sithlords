import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const getAnimals = () => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/animals.json`)
    .then((response) => {
      const allAnimals = response.data;
      const animals = [];
      if (animals) {
        Object.keys(allAnimals).forEach((animalId) => {
          allAnimals[animalId].id = animalId;
          animals.push(allAnimals[animalId]);
        });
      }
      resolve(animals);
    })
    .catch((err) => reject(err));
});
const getSingleAnimal = (animalId) => axios.get(`${baseURL}/animals/${animalId}.json`);

const deleteAnimal = (animalId) => axios.delete(`${baseURL}/animals/${animalId}.json`);

const addAnimal = (newAnimal) => axios.post(`${baseURL}/animals.json`, newAnimal);

const updateAnimals = (animalId, editedAnimal) => axios.put(`${baseURL}/animals/${animalId}.json`, editedAnimal);

export default {
  getAnimals,
  getSingleAnimal,
  addAnimal,
  deleteAnimal,
  updateAnimals,
};
