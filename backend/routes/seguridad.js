const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");
const { Usuarios } = require("../base-orm/sequelize-init");
const bcrypt = require('bcryptjs');

let refreshTokens = [];

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

        
        const user = await Usuarios.findOne({ where: { Username: username } });

        if (user) {            
            const isPasswordValid = await bcrypt.compare(password, user.Password);

            if (isPasswordValid) {
                
                const accessToken = jwt.sign(
                    { usuario: user.Username, rol: user.Rol },
                    auth.accessTokenSecret,
                    { expiresIn: "20m" }
                );
                const refreshToken = jwt.sign(
                    { usuario: user.Username, rol: user.Rol },
                    auth.refreshTokenSecret
                );
                refreshTokens.push(refreshToken);

                return res.json({
                    accessToken,
                    refreshToken,
                    message: `Bienvenido ${user.Username}!`,
                });
            }
        }
        else {
            res.json({ message: "usuario or clave incorrecto" });
    }
});

router.post("/logout", (req, res) => {
let message = "Logout inválido!";
const { token } = req.body;
if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado!";
}
refreshTokens = refreshTokens.filter((t) => t !== token);
res.json({ message });
});

router.post("/token", (req, res) => {

    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { usuario: user.Username, rol: user.Rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );
        res.json({
            accessToken,
        });
    });
});
module.exports = router;