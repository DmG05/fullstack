const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Conexion a MongoDB
mongoose.connect('mongodb://localhost:27017/ouramovies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const movieSchema = new mongoose.Schema({
  // ... (tus definiciones del esquema aquí, como se discutió anteriormente)
});

const Movie = mongoose.model('Movie', movieSchema);

app.get('/populateMovies', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c2525d0edb9b982c034d6f755a582ad4');
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      const movies = response.data.results.slice(0, 30); // Tomar solo las primeras 30 películas
      await Movie.insertMany(movies); // Insertar todas las películas en la base de datos
      res.status(200).send('Películas añadidas correctamente.');
    } else {
      res.status(400).send('Error al recuperar películas de la API.');
    }
  } catch (error) {
    console.error('Error al comunicarse con la API o guardar en MongoDB:', error.message);
    res.status(500).send('Error interno del servidor.');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
