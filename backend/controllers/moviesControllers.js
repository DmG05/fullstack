const asyncHandler = require('express-async-handler');
const Movie = require('../models/moviesModel');

const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.movie });
    res.status(200).json(movies);
});

const setMovie = asyncHandler(async (req, res) => {
    const {
        adult,
        backdrop_path,
        genre_ids,
        movieId,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count
    } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Por favor teclea una pelicula');
    }

    // Asegurarse de que todos los campos necesarios estén presentes. Si no, enviar una respuesta 400.
    if (
        typeof adult !== 'boolean' || 
        !backdrop_path || 
        !Array.isArray(genre_ids) || 
        typeof movieId !== 'number' || 
        !original_language ||
        !original_title || 
        !overview || 
        typeof popularity !== 'number' || 
        !poster_path ||
        !release_date || 
        !title || 
        typeof video !== 'boolean' || 
        typeof vote_average !== 'number' || 
        typeof vote_count !== 'number'
    ) {
        res.status(400);
        throw new Error('Faltan algunos campos requeridos.');
    }

    const movie = await Movie.create({
        adult,
        backdrop_path,
        genre_ids,
        movieId,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count
    });

    res.status(201).json(movie);
});



const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('La pelicula no fué encontrada');
    }

    if (movie.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Acceso no autorizado');
    } else {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMovie);
    }
});

const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('La pelicula no fué encontrada');
    }
    if (movie && movie.user && req.user && movie.user.toString() !== req.user.id) {

        res.status(401);
        throw new Error('Acceso no autorizado');
    } else {
        movie.deleteOne();
        res.status(200).json({ id: movie._id });
    }
});

const increaseLikes = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('La película no fue encontrada');
    }

    if (movie && movie.user && req.user && movie.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Acceso no autorizado');
    } else {
        movie.vote_count += 1; // Incrementa el vote_count (likes) en 1.
        await movie.save(); // Guarda los cambios en la base de datos.
        res.status(200).json(movie);
    }
});


module.exports = {
    getMovies,
    setMovie,
    updateMovie,
    deleteMovie,
    increaseLikes
};
