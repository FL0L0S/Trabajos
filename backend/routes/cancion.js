const express = require("express");
const router = express.Router();
const { Cancion, Album } = require( '../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los datos
router.get('/canciones', async (req, res) => {
    try {
        const canciones = await Cancion.findAll({include: {
            model: Album,
            as: 'Album',
            attributes: ['Nombre'] // Aquí solo incluimos el campo Nombre
        }});
        res.json(canciones);
    } catch (error) {
        console.error('Error al obtener las canciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener por id
router.get('/canciones/:id', async(req,res) => {
    try {
        const idCancion = req.params.id;
        const cancion = await Cancion.findByPk(idCancion);
        if (cancion) {
            res.json(cancion);
        } else {
            res.status(404).json({ error: 'la canción no fue encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener los datos de una canción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar 
router.post('/canciones', async (req, res) => {
    try {
        const { Nombre, FechaLanzamiento, IdAlbum} = req.body; 

        const nuevaCancion = await Cancion.create({
           
            Nombre, 
            FechaLanzamiento, 
            IdAlbum
        });

        res.status(201).json(nuevaCancion);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar una nueva canción a la base de datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar 
router.put('/canciones/:id', async (req, res) => {
    try {
        const cancionId = req.params.id;
        const cancion = await Cancion.findByPk(cancionId);

        if (!cancion) {
            return res.status(404).json({ error: 'canción no encontrada'});
        }

        const {  Nombre, FechaLanzamiento, IdAlbum} = req.body;
        await Cancion.update(
            {  Nombre, FechaLanzamiento, IdAlbum },
            { where: { IdCancion: cancionId }}
        );

        // Obtener el registro actualizado
        const cancionActualizada = await Cancion.findByPk(cancionId);
        res.status(204).json(cancionActualizada);

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar los datos de una canción:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar 
router.delete('/canciones/:id', async (req, res) => {
    try {
        const idCancion = req.params.id;
        const cancion = await Cancion.findByPk(idCancion);

        if (!cancion) {
            return res.status(404).json({ error: 'canción no encontrada'});
        }

        await Cancion.update(
            { Eliminado: true},
            { where: { IdCancion: idCancion, Eliminado: false } }
        )
        res.json({ message: 'la canción fue eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar los datos de una canción:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
module.exports = router;
