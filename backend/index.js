const express = require("express");
const cors = require('cors');
const bandas = require('./routes/bandas')
const album = require('./routes/album')
const artista = require('./routes/artistas')
const cancion = require('./routes/cancion')
const discografica = require('./routes/discograficas')
const recital = require('./routes/recital')
const tour = require('./routes/tour')
const videoClip = require('./routes/videoClip')
const seguridad = require('./routes/seguridad')
const login = require('./routes/login.js')

// crear servidor
const app = express();

app.use(express.json());
app.use(cors());



app.use(bandas);
app.use(album);
app.use(artista);
app.use(cancion);
app.use(discografica);
app.use(recital);
app.use(tour);
app.use(videoClip);
app.use(seguridad)
app.use(login);

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});




// levantar servidor
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing
