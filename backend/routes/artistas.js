const express = require("express");
const router = express.Router();
const { Artistas } = require('../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los datos
router.get('/artistas', async (req, res) => {
    try {
        const artistas = await Artistas.findAll();
        res.json(artistas);
    } catch (error) {
        console.error('Error al obtener los artistas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener por id
router.get('/artistas/:id', async(req,res) => {
    try {
        const idArtista = req.params.id;
        const artistas = await Artistas.findByPk(idArtista);
        if (artistas) {
            res.json(artistas);
        } else {
            res.status(404).json({ error: 'el artista no fue encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el artista:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar 
router.post('/artistas', async (req, res) => {
    try {
        const {Nombre, FechaNacimiento, Mail } = req.body; 

        const nuevoArtista = await Artistas.create({
            Nombre, 
            FechaNacimiento,
            Mail
        });

        res.status(201).json(nuevoArtista);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar un nuevo artista a la base de datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar 
router.put('/artistas/:id', async (req, res) => {
    try {
        const artistasId = req.params.id;
        const artistas = await Artistas.findByPk(artistasId);

        if (!artistas) {
            return res.status(404).json({ error: 'artista no encontrado' });
        }

        const {  Nombre, FechaNacimiento, Mail } = req.body;
         // Actualizar los artistas con el where adecuado
        await Artistas.update(
            {  Nombre, FechaNacimiento, Mail },
            { where: { IdArtista: artistasId } }
        );

        // Obtener el registro actualizado
        const artistaActualizado = await Artistas.findByPk(artistasId);

        res.status(204).json(artistaActualizado);

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar los datos de un artista:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar 
router.delete('/artistas/:id', async (req, res) => {
    try {
        const artistaId = req.params.id;
        const artista = await Artistas.findByPk(artistaId);

        if (!artista) {
            return res.status(404).json({ error: 'artista no encontrado' });
        }

        await Artistas.update(
            { Eliminado: true},
            { where: { IdArtista: artistaId, Eliminado: false } }
        )
        res.json({ message: 'artista eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar los datos de un artista:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
