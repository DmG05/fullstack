const express = require('express')
const router = express.Router()
const { getMovies, setMovie, updateMovie, deleteMovie, increaseLikes } = require('../controllers/moviesControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getMovies)
router.post('/', protect, setMovie)

router.put('/:id', protect, updateMovie)
router.patch('/like/:id', protect, increaseLikes) // Agregada la ruta para aumentar likes
router.delete('/:id', protect, deleteMovie)

module.exports = router
