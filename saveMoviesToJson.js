const axios = require('axios');
const fs = require('fs');

axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c2525d0edb9b982c034d6f755a582ad4')
  .then(response => {
    if (response.data && response.data.results) {
      const movies = response.data.results.slice(0, 30); // Tomamos solo las primeras 30 películas
      fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2)); // Guardamos las películas en un archivo llamado "movies.json"
      console.log('Películas guardadas en movies.json');
    } else {
      console.error('Error al recuperar películas de la API.');
    }
  })
  .catch(error => {
    console.error('Error al comunicarse con la API:', error.message);
  });
