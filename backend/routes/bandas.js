const express = require("express");
const router = express.Router();
const auth = require('../seguridad/auth.js')
const { Bandas, Artistas } = require('../base-orm/sequelize-init.js'); 
const { ValidationError } = require("sequelize");
const {authenticateJWT} = require("../seguridad/auth.js")

// Endpoint para todas las Bandas
router.get('/bandas', async (req, res) => {
    try {
        const bandas = await Bandas.findAll({include: {
            model: Artistas,
            as: 'Artista',
            attributes: ['Nombre'] // Aquí solo incluimos el campo Nombre
        }});
        res.json(bandas);
    } catch (error) {
        console.error('Error al obtener las Bandas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/bandasJWT',auth.authenticateJWT, async (req, res,  next) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    try {
        const bandas = await Bandas.findAll({include: {
            model: Artistas,
            as: 'Artista',
            attributes: ['Nombre'] // Aquí solo incluimos el campo Nombre
        }});
        res.json(bandas);
    } catch (error) {
        console.error('Error al obtener las Bandas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para Bandas por id
router.get('/bandas/:id', async(req,res) => {
    try {
        const bandasId = req.params.id;
        const bandas = await Bandas.findByPk(bandasId);
        if (bandas) {
            res.json(bandas);
        } else {
            res.status(404).json({ error: 'banda no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Banda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/bandasJWT/:id', auth.authenticateJWT, async (req, res,next) =>  {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }
    try {
        const bandasId = req.params.id;
        const bandas = await Bandas.findByPk(bandasId);
        if (bandas) {
            res.json(bandas);
        } else {
            res.status(404).json({ error: 'banda no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener la Banda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// endopoint para buscar por nombre
router.get('/bandasNombre/:nombre', async (req, res) => {
    try {
        const bandasNombre = req.params.nombre;
        const banda = await Bandas.findOne({
            where: {
                Nombre: bandasNombre
            }
        });
        
        if (banda) {
            res.json(banda);
        } else {
            res.status(404).json({ error: 'Banda no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la Banda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Endpoint para agregar una Bandas


router.post('/bandas', async (req, res) => {
    try {
        const { Nombre, IdVocalista, FechaCreacion } = req.body; 

        const nuevaBanda = await Bandas.create({
            Nombre,
            IdVocalista,
            FechaCreacion 
        });

        res.status(201).json(nuevaBanda);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar una nueva banda:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

router.post('/bandasJWT', auth.authenticateJWT, async (req, res,next) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }
    try {
        const { Nombre, IdVocalista, FechaCreacion } = req.body; 

        const nuevaBanda = await Bandas.create({
            Nombre,
            IdVocalista,
            FechaCreacion 
        });

        res.status(201).json(nuevaBanda);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al cargar una nueva banda:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar
router.put('/bandas/:id', async (req, res) => {
    try {
        const bandasId = req.params.id;
        const bandas = await Bandas.findByPk(bandasId);

        if (!bandas) {
            return res.status(404).json({ error: 'banda no encontrada' });
        }

        const { Nombre, IdVocalista, FechaCreacion } = req.body;
         // Actualizar la banda con el where adecuado
        await Bandas.update(
            { Nombre, IdVocalista, FechaCreacion},
            { where: { IdBanda: bandasId } }
        );

        // Obtener el registro actualizado
        const bandaActualizada = await Bandas.findByPk(bandasId);

        res.status(204).json(bandaActualizada);

        
        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar una banda:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

router.put('/bandasJWT/:id',auth.authenticateJWT, async (req, res,next) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }
    try {
        const bandasId = req.params.id;
        const bandas = await Bandas.findByPk(bandasId);

        if (!bandas) {
            return res.status(404).json({ error: 'banda no encontrada' });
        }

        const { Nombre, IdVocalista, FechaCreacion } = req.body;
         // Actualizar la banda con el where adecuado
        await Bandas.update(
            { Nombre, IdVocalista, FechaCreacion},
            { where: { IdBanda: bandasId } }
        );

        // Obtener el registro actualizado
        const bandaActualizada = await Bandas.findByPk(bandasId);

        res.status(204).json(bandaActualizada);

        
        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar una banda:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});


// Endpoint para "eliminar" una banda (cambiar Eliminado a true)
router.delete('/bandas/:id', async (req, res) => {
    try {
        const bandasId = req.params.id;

        // Buscar la banda por ID
        const banda = await Bandas.findByPk(bandasId);

        // Validar si la banda existe
        if (!banda) {
            return res.status(404).json({ error: 'Banda no encontrada' });
        }

        // Actualizar el atributo Eliminado a true
        

        await Bandas.update(
            { Eliminado: true},
            { where: { IdBanda: bandasId, Eliminado: false } }
        )

        res.json({ message: 'Banda marcada como eliminada correctamente' });
    } catch (error) {
        console.error('Error al "eliminar" la banda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/bandasJWT/:id',auth.authenticateJWT, async (req, res,next) => {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }
    try {
        const bandasId = req.params.id;

        // Buscar la banda por ID
        const banda = await Bandas.findByPk(bandasId);

        // Validar si la banda existe
        if (!banda) {
            return res.status(404).json({ error: 'Banda no encontrada' });
        }

        // Actualizar el atributo Eliminado a true
        

        await Bandas.update(
            { Eliminado: true},
            { where: { IdBanda: bandasId, Eliminado: false } }
        )

        res.json({ message: 'Banda marcada como eliminada correctamente' });
    } catch (error) {
        console.error('Error al "eliminar" la banda:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
