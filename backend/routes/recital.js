const express = require("express");
const router = express.Router();
const { Recital, Tour } = require('../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los datos
router.get('/recitales', async (req, res) => {
    try {
        const recitales = await Recital.findAll({include: {
            model: Tour,
            as: 'Tour',
            attributes: ['Nombre'] // Aquí solo incluimos el campo Nombre
        }});
        res.json(recitales);
    } catch (error) {
        console.error('Error al obtener los recitales:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener por id
router.get('/recitales/:id', async(req,res) => {
    try {
        const IdRecital = req.params.id;
        const recital = await Recital.findByPk(IdRecital);
        if (recital) {
            res.json(recital);
        } else {
            res.status(404).json({ error: 'el recital buscado no fue encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el recital:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar 
router.post('/recitales', async (req, res) => {
    try {
        const {  Lugar, Fecha, IdTour } = req.body; 

        const nuevoRecital = await Recital.create({
           
            Lugar, 
            Fecha, 
            IdTour
        });

        res.status(201).json(nuevoRecital);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar un nuevo recital a la base de datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar 
router.put('/recitales/:id', async (req, res) => {
    try {
        const recitalId = req.params.id;
        const recital = await Recital.findByPk(recitalId);

        if (!recital) {
            return res.status(404).json({ error: 'el recital no fue encontrado' });
        }

        const { Lugar, Fecha, IdTour } = req.body;
         // Actualizar los recitales con el where adecuado
        await Recital.update(
            {  Lugar, Fecha, IdTour },
            { where: { IdRecital: recitalId } }
        );

        // Obtener el registro actualizado
        const recitalActualizado = await Recital.findByPk(recitalId);

        res.status(204).json(recitalActualizado);

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar los datos de un recital:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar 
router.delete('/recitales/:id', async (req, res) => {
    try {
        const idRecital = req.params.id;
        const recital = await Recital.findByPk(idRecital);

        if (!recital) {
            return res.status(404).json({ error: 'recital no encontrado' });
        }

        await Recital.update(
            { Eliminado: true},
            { where: { IdRecital: idRecital, Eliminado: false } }
        )
        res.json({ message: 'el recital fue eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar los datos de un recital:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;