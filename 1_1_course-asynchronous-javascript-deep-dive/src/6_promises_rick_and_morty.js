'use strict';

require('dotenv').config();
const { fetch } = require('ohmyfetch');

const { RM_CHARACTERS, RM_LOCATIONS, RM_EPISODES } = process.env;

fetch(RM_CHARACTERS)
  // Convert the response into json object
  .then((response) => response.json())
  // Get real data
  .then(({ info, results }) => console.log('INFO =>', info))
  // Catch any error
  .catch((error) => console.error(error));
