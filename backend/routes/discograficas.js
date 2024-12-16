const express = require("express");
const router = express.Router();
const { Discograficas } = require( '../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");

// Endpoint para obtener todos los datos
router.get('/discograficas', async (req, res) => {
    try {
        const discograficas = await Discograficas.findAll();
        res.json(discograficas);
    } catch (error) {
        console.error('Error al obtener las discograficas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para obtener por id
router.get('/discograficas/:id', async(req,res) => {
    try {
        const idDiscografica = req.params.id;
        const discografica = await Discograficas.findByPk(idDiscografica);
        if (discografica) {
            res.json(discografica);
        } else {
            res.status(404).json({ error: 'la discografica no fue encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener los datos de la discografica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar 
router.post('/discograficas', async (req, res) => {
    try {
        const {Nombre, FechaUnion } = req.body; 

        const nuevaDiscografica = await Discograficas.create({
           
            Nombre, 
            FechaUnion
        });

        res.status(201).json(nuevaDiscografica);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar una nueva discografica a la base de datos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar 
router.put('/discograficas/:id', async (req, res) => {
    try {
        const discograficaId = req.params.id;
        const discografica = await Discograficas.findByPk(discograficaId);

        if (!discografica) {
            return res.status(404).json({ error: 'discografica no encontrada'});
        }

        const {  Nombre, FechaUnion } = req.body;
        await Discograficas.update(
            {  Nombre, FechaUnion},
            { where: { IdDiscografica: discograficaId }}
        );

        // Obtener el registro actualizado
        const discograficaActualizada = await Discograficas.findByPk(discograficaId);
        res.status(204).json(discograficaActualizada);

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar los datos de una discografica:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar 
router.delete('/discograficas/:id', async (req, res) => {
    try {
        const idDiscografica = req.params.id;
        const discografica = await Discograficas.findByPk(idDiscografica);

        if (!discografica) {
            return res.status(404).json({ error: 'discografica no encontrada'});
        }

        await Discograficas.update(
            { Eliminado: true},
            { where: { IdDiscografica: idDiscografica, Eliminado: false } }
        )
        res.json({ message: 'la discografica fue eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar los datos de una discografica:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
