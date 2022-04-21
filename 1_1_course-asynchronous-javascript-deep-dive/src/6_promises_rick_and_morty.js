'use strict';

// IMPORTS
require('dotenv').config();
const { $fetch } = require('ohmyfetch');

// Get URL's from env
const { RM_CHARACTERS, RM_LOCATIONS, RM_EPISODES } = process.env;

// Define types search. Just like an enum
const rmTypes = {
  character: 'character',
  location: 'location',
  episode: 'episode',
};

// Basic function to get data base on the URL
const getRickAndMortyData = (URI) => {
  // Basic implementation with error handling
  return $fetch(URI, { parseResponse: JSON.parse }).catch((error) =>
    console.error(error)
  );
};

// Show default information
getRickAndMortyData(RM_CHARACTERS).then(({ info }) =>
  console.log('INFO ==>', info)
);
getRickAndMortyData(RM_EPISODES).then(({ info }) =>
  console.log('INFO ==>', info)
);
getRickAndMortyData(RM_LOCATIONS).then(({ info }) =>
  console.log('INFO ==>', info)
);

// Utils functions to get specific types
const getRickAndMortyCharacter = (id) => {
  if (id < 1 || id > 826) {
    throw new Error('Invalid character id');
  }
  const URI = `${RM_CHARACTERS}/${id}`;
  getRickAndMortyData(URI).then((response) =>
    console.log('character =>', response)
  );
};

const getRickAndMortyEpisode = (id) => {
  if (id < 1 || id > 51) {
    throw new Error('Invalid character id');
  }
  const URI = `${RM_EPISODES}/${id}`;
  getRickAndMortyData(URI).then((response) =>
    console.log('episode =>', response)
  );
};

const getRickAndMortyLocation = (id) => {
  if (id < 1 || id > 126) {
    throw new Error('Invalid character id');
  }
  const URI = `${RM_LOCATIONS}/${id}`;
  getRickAndMortyData(URI).then((response) =>
    console.log('location =>', response)
  );
};

// Implementation of the code that search data about Rick & Morty
const rickAndMorty = (type, id) => {
  if (typeof type !== 'string') {
    throw new Error('The type should be an string');
  }

  if (typeof id !== 'number') {
    throw new Error('The id should be a number or number string');
  }

  switch (type) {
    case rmTypes.character:
      getRickAndMortyCharacter(id);
      break;
    case rmTypes.episode:
      getRickAndMortyEpisode(id);
      break;
    case rmTypes.location:
      getRickAndMortyLocation(id);
      break;
    default:
      throw new Error('We cannot retrieve the data');
      break;
  }
};

rickAndMorty(rmTypes.character, 1);
rickAndMorty(rmTypes.episode, 1);
rickAndMorty(rmTypes.location, 1);

// Error
// rickAndMorty('otra cosa', 0);
