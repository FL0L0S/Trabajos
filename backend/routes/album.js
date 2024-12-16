const express = require("express");
const router = express.Router();
const { Album, Bandas, Discograficas } = require('../base-orm/sequelize-init.js');
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los álbumes cargados en db
router.get('/albums', async (req, res) => {
    try {
        const albumes = await Album.findAll({include: [
            {
                model: Bandas, 
                as: 'Banda',
                attributes: ['Nombre'], 
            },
            {
                model: Discograficas, 
                as: 'Discografica',
                attributes: ['Nombre'],
            }
        ]});
        res.json(albumes);
    } catch (error) {
        console.error('Error al obtener los álbumes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener un álbum por id
router.get('/albums/:id', async(req,res) => {
    try {
        const albumId = req.params.id;
        const albumes = await Album.findByPk(albumId);
        if (albumes) {
            res.json(albumes);
        } else {
            res.status(404).json({ error: 'álbumes no encontrados' });
        }
    } catch (error) {
        console.error('Error al obtener el álbum:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un nuevo álbum
router.post('/albums', async (req, res) => {
    try {
        const { Nombre, FechaLanzamiento, IdBanda, IdDiscografica} = req.body; 

        const nuevoAlbum = await Album.create({
            Nombre,
            FechaLanzamiento,
            IdBanda, 
            IdDiscografica
        });

        res.status(201).json(nuevoAlbum);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al querer cargar un nuevo album:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar
router.put('/albums/:id', async (req, res) => {
    try {
        const idAlbum = req.params.id;
        const album = await Album.findByPk(idAlbum);

        if (!album) {
            return res.status(404).json({ error: 'álbum no encontrado' });
        }

        const { Nombre, FechaLanzamiento, IdBanda, IdDiscografica } = req.body;
         // Actualizar los álbumes con el where adecuado
        await Album.update(
            {  Nombre, FechaLanzamiento, IdBanda, IdDiscografica },
            { where: { IdAlbum: idAlbum } }
        );

        // Obtener el registro actualizado
        const albumActualizado = await Album.findByPk(idAlbum);

        res.status(204).json(albumActualizado);

        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar un álbum:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar
router.delete('/albums/:id', async (req, res) => {
    try {
        const albumId = req.params.id;

        const album = await Album.findByPk(albumId);

        if (!album) {
            return res.status(404).json({ error: 'álbum no encontrado' });
        }

        await Album.update(
            { Eliminado: true},
            { where: { IdAlbum: albumId, Eliminado: false } }
        )
        res.json({ message: 'álbum eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar un álbum:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
