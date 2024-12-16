const express = require("express");
const router = express.Router();
const {  VideoClip, Cancion } = require('../base-orm/sequelize-init.js');
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los recitales cargados en db
router.get('/videos', async (req, res) => {
    try {
        const videos = await VideoClip.findAll({include: 
            {
                model: Cancion, 
                as: 'Cancion',
                attributes: ['Nombre'], 
            }
        });
        res.json(videos);
    } catch (error) {
        console.error('Error al obtener los VideoClips:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener un tour por id
router.get('/videos/:id', async(req,res) => {
    try {
        const videoId = req.params.id;
        const videos = await VideoClip.findByPk(videoId);
        if (videos) {
            res.json(videos);
        } else {
            res.status(404).json({ error: 'Video no encontrados' });
        }
    } catch (error) {
        console.error('Error al obtener el video:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un nuevo tour
router.post('/videos', async (req, res) => {
    try {
        const {  Titulo, Link, FechaLanzamiento, IdCancion } = req.body; 

        const nuevoVideo = await VideoClip.create({
          
            Titulo,
            Link,
            FechaLanzamiento,
            IdCancion

        });

        res.status(201).json(nuevoVideo);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al querer cargar un nuevo video:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar
router.put('/videos/:id', async (req, res) => {
    try {
        const idVideo = req.params.id;
        const videos = await VideoClip.findByPk(idVideo);

        if (!videos) {
            return res.status(404).json({ error: 'VideoClip no encontrado' });
        }

        const {  Titulo, Link, FechaLanzamiento, IdCancion } = req.body;
         // Actualizar los tours con el where adecuado
        await VideoClip.update(
            {  Titulo, Link, FechaLanzamiento, IdCancion },
            { where: { IdVideoClip: idVideo } }
        );

        // Obtener el registro actualizado
        const videoActualizado = await VideoClip.findByPk(idVideo);

        res.status(204).json(videoActualizado);

        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el video:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar
router.delete('/videos/:id', async (req, res) => {
    try {
        const videoId = req.params.id;

        const videos = await VideoClip.findByPk(videoId);

        if (!videos) {
            return res.status(404).json({ error: 'VideoClip no encontrado' });
        }

        await VideoClip.update(
            { Eliminado: true},
            { where: { IdVideoClip: videoId, Eliminado: false } }
        )
        res.json({ message: 'VideoClip eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el video:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;