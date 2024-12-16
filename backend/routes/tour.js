const express = require("express");
const router = express.Router();
const { Tour, Bandas } = require('../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");
const { TOOBIG } = require("sqlite3");

// Endpoint para obtener todos los datos
router.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.findAll({include: 
            {
                model: Bandas, 
                as: 'Banda',
                attributes: ['Nombre'], 
            }
        });
        res.json(tours);
    } catch (error) {
        console.error('Error, tours no encontrados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener por id
router.get('/tours/:id', async(req,res) => {
    try {
        const IdTour = req.params.id;
        const tour = await Tour.findByPk(IdTour);
        if (tour) {
            res.json(tour);
        } else {
            res.status(404).json({ error: 'el tour buscado no fue encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el tour:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar 
router.post('/tours', async (req, res) => {
    try {
        const { Nombre, FechaInicio, FechaFin, IdBanda } = req.body; 

        const nuevoTour = await Tour.create({
         
            Nombre, 
            FechaInicio, 
            FechaFin, 
            IdBanda
        });

        res.status(201).json(nuevoTour);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar un nuevo tour a la base de datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar 
router.put('/tours/:id', async (req, res) => {
    try {
        const tourId = req.params.id;
        const tour = await Tour.findByPk(tourId);

        if (!tour) {
            return res.status(404).json({ error: 'el tour no fue encontrado' });
        }

        const { Nombre, FechaInicio, FechaFin, IdBanda } = req.body;
         // Actualizar los tours con el where adecuado
        await Tour.update(
            { Nombre, FechaInicio, FechaFin, IdBanda },
            { where: { Idtour: tourId } }
        );

        // Obtener el registro actualizado
        const tourActualizado = await Tour.findByPk(tourId);

        res.status(204).json(tourActualizado);

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar los datos de un tour:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar 
router.delete('/tours/:id', async (req, res) => {
    try {
        const idTour = req.params.id;
        const tour = await Tour.findByPk(idTour);

        if (!tour) {
            return res.status(404).json({ error: 'tour no encontrado' });
        }

        await Tour.update(
            { Eliminado: true},
            { where: { IdTour: idTour, Eliminado: false } }
        )
        res.json({ message: 'el tour fue eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar los datos de un tour:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;