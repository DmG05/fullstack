require('dotenv').config(); // Importante: esto debe ir al inicio de tu script
const mongoose = require('mongoose');
const fs = require('fs');


// Definición del esquema y modelo
const movieSchema = new mongoose.Schema({
  // Aquí deberías poner la estructura que discutimos anteriormente.
  // Por simplicidad, dejaremos el esquema sin restricciones específicas.
});


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
  console.log('Conectado a MongoDB.');
  // Insertar datos
  return Movie.insertMany(moviesData);
})
.then(() => {
  console.log('Películas insertadas con éxito.');
  mongoose.connection.close(); // Cerrar la conexión a MongoDB
})
.catch(error => {
  console.error('Error:', error);
  mongoose.connection.close();
});

// Definición del esquema y modelo
// ... (misma definición que antes)

const Movie = mongoose.model('Movie', movieSchema);

// Leer el archivo JSON
const moviesData = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

// Conexión a MongoDB usando la variable de entorno

// ... (resto del script sin cambios)
