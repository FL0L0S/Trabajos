const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/configJWT');
const { Usuarios } = require('../base-orm/sequelize-init');

const registerUser = async (req, res) => {
    const { username, password, rol } = req.body;
    console.log(username);

    try {
        const existingUser = await Usuarios.findOne({ where: { Username: username } });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario se encuentra en uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuarios.create({ 
            Username: username, 
            Password: hashedPassword, 
            Rol: rol || 'miembro' 
        });

        res.status(201).json({ message: 'El usuario se registró con éxito.' });
    } catch (error) {
        if (error.errors) {
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ error: validationErrors });
        }
        console.error('Error al registrar el nuevo usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    

    try {
        const user = await Usuarios.findOne({ where: { Username: username } });
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        // Incluir el rol en el token
        const token = jwt.sign(
            { username: user.Username, rol: user.Rol },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        res.json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', error: error.message });
    }
};

const logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ error: 'Token no proporcionado.' });
    }

    // Bloquea el token con una blacklist
    blacklistedTokens.add(token);

    res.status(200).json({ message: 'Sesión cerrada con éxito.' });
};

module.exports = {
    registerUser,
    login,
    logout
};