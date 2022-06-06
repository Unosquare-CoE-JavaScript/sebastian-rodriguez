'use strict';

const { $fetch } = require('ohmyfetch');

const URI_FILMS = 'https://swapi.dev/api/films';

(async () => {
  try {
    const filmsData = await $fetch(URI_FILMS, { parseResponse: JSON.parse });
    const films = filmsData.results.map((film) => film.title);

    console.log(films);
    console.log(filmsData);

    let planetsPromises = filmsData.results.map((film) => film.url);

    for await (let url of planetsPromises) {
      console.log(url);
    }
  } catch (error) {
    console.error(error);
  }
})();
