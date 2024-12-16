const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

let db;

// Función para abrir la base de datos
async function abrirBaseDatos() {
    db = await sqlite.open({
        filename: './.data/datos.db',
        driver: sqlite3.Database
    });
}

// Definición del modelo de bandas
const Bandas = {
    nombre: "Bandas",
    sql: `CREATE TABLE Bandas (
        IdBanda INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL UNIQUE,
        IdVocalista INTEGER NOT NULL,
        FechaCreacion DATE NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdVocalista) REFERENCES Artistas(IdArtista)
    );`,
    datos: `INSERT INTO Bandas (Nombre, IdVocalista, FechaCreacion, Eliminado) VALUES
        ('La Renga', 1, '1988-01-10', FALSE),
        ('La Vela Puerca', 2, '1996-10-10', FALSE),
        ('La Beriso', 3, '1998-09-13', FALSE),
        ('AC/DC', 4, '1973-11-04', FALSE),
        ('Callejeros', 5, '1995-06-24', FALSE),
        ('AlmaFuerte', 6, '1995-01-29', FALSE),
        ('Guns N Roses', 7, '1985-03-10', FALSE),
        ('Intoxicados', 8, '2000-11-07', FALSE),
        ('Los piojos', 9, '1986-09-21', FALSE),
        ('Airbag', 10, '1999-02-24', FALSE) ;`
};

// Definición del modelo de Artistas
const Artistas = {
    nombre: "Artistas",
    sql: `CREATE TABLE Artistas (
        IdArtista INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL ,
        FechaNacimiento DATE NOT NULL,
        Mail TEXT NOT NULL UNIQUE,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE
    );`,
    datos: `INSERT INTO Artistas (Nombre, FechaNacimiento, Mail, Eliminado) VALUES
        ('Gustavo', '1967-04-01', 'gustavo1967@gmail.com', FALSE),
    ('Sebastian', '1973-06-03', 'sebastian1973@hotmail.com', FALSE),
    ('Rolando', '1973-01-27', 'rolando1973@gmail.com', FALSE),
    ('Brian', '1947-10-05', 'brian1947@yahoo.com', FALSE),
    ('Patricio', '1979-06-16', 'patricio1979@gmail.com', FALSE),
    ('Iorio', '1962-06-25', 'iorio1962@hotmail.com', FALSE),
    ('Axel', '1962-02-06', 'axel1962@gmail.com', FALSE),
    ('Pity', '1972-06-28', 'pity1972@yahoo.com', FALSE),
    ('Andres Ciro', '1968-01-11', 'andresciro1968@gmail.com', FALSE),
    ('Patricio', '1986-01-26', 'patricio1986@hotmail.com', FALSE);`
};

// Definición del modelo de Discograficas
const Discograficas = {
    nombre: "Discograficas",
    sql: `CREATE TABLE Discograficas (
        IdDiscografica INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL UNIQUE,
        FechaUnion DATE NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE
    );`,
    datos: `INSERT INTO Discograficas (Nombre, FechaUnion, Eliminado) VALUES
        ('La renga discos', '2002-03-15', FALSE),
    ('Obligado Records', '2000-09-08', FALSE),
    ('Sony Music Argentina', '2013-02-22', FALSE),
    ('Albert Productions', '1974-01-01', FALSE),
    ('Pelo Music', '2004-10-05', FALSE),
    ('DBN', '1995-01-29', FALSE),
    ('Geffen Records', '1986-04-16', FALSE),
    ('Universal Music', '2000-12-07', FALSE),
    ('El farolito Discos', '1998-12-20', FALSE),
    ('Warner Music', '2004-01-24', FALSE);`
};

// Definición del modelo de Cancion
const Cancion = {
    nombre: "Cancion",
    sql: `CREATE TABLE Cancion (
        IdCancion INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        FechaLanzamiento DATE NOT NULL,
        IdAlbum INTEGER NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdAlbum) REFERENCES Album(IdAlbum),
        UNIQUE(Nombre, IdAlbum)
    );`,
    datos: `INSERT INTO Cancion (Nombre, FechaLanzamiento, IdAlbum, Eliminado) VALUES
         ('El monstruo que crece', '2006-12-12', 1, FALSE),
    ('Alta magia', '1998-03-01', 2, FALSE),
    ('No me olvides', '2014-08-07', 3, FALSE),
    ('TNT', '1975-12-01', 4, FALSE),
    ('Bufón', '1997-07-20', 5, FALSE),
    ('Dijo el droguero al drogador', '1995-02-13', 6, FALSE),
    ('Paradise city', '1987-07-21', 7, FALSE),
    ('Religion', '2001-07-24', 8, FALSE),
    ('Desde lejos no se ve', '1998-05-17', 9, FALSE),
    ('La partida de la gitana', '2004-01-24', 10, FALSE);`  
};

// Definición del modelo de Recital
const Recital = {
    nombre: "Recital",
    sql: `CREATE TABLE Recital (
        IdRecital INTEGER PRIMARY KEY AUTOINCREMENT,
        Lugar TEXT NOT NULL,
        Fecha DATE NOT NULL,
        IdTour INTEGER NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdTour) REFERENCES Tour(IdTour),
        UNIQUE(Lugar, Fecha)
    );`,
    datos: `INSERT INTO Recital (Fecha, Lugar, IdTour, Eliminado) VALUES
        ('2002-11-30', 'Estadio Monumental', 1, FALSE),
    ('2005-11-26', 'Velódromo municipal de Montevideo', 2, FALSE),
    ('2015-05-16', 'Cosquín Rock', 3, FALSE),
    ('2009-12-08', 'Estadio Monumental', 4, FALSE),
    ('1997-07-20', 'República Cromañón', 5, FALSE),
    ('2015-11-22', 'Estadio Malvinas Argentinas', 6, FALSE),
    ('1985-06-06', 'The Troubadour', 7, FALSE),
    ('2005-10-22', 'Estadio Obras Sanitarias', 8, FALSE),
    ('2007-05-20', 'River Plate', 9, FALSE),
    ('2022-09-24', 'Argentinos Juniors', 10, FALSE);`
};

// Definición del modelo de Videoclip
const VideoClip = {
    nombre: "Videoclip",
    sql: `CREATE TABLE VideoClip (
        IdVideoClip INTEGER PRIMARY KEY AUTOINCREMENT,
        Titulo TEXT NOT NULL,
        Link TEXT NOT NULL UNIQUE,
        FechaLanzamiento DATE NOT NULL,
        IdCancion INTEGER NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdCancion) REFERENCES Cancion(IdCancion)
    );`,
    datos: `INSERT INTO VideoClip (Titulo, Link, FechaLanzamiento, IdCancion, Eliminado) VALUES
            ('La Renga - El Monstruo Que Crece - Truenotierra', 'https://www.youtube.com/watch?v=L79NrsBYQ8M', '2006-12-12', 1, FALSE),
    ('La Vela Puerca - Alta magia (DVD "Festejar para sobrevivir, 20 Años")', 'https://www.youtube.com/watch?v=uFruqqI5w5k', '1998-03-01', 2, FALSE),
    ('La Beriso - No Me Olvides (Official Video)', 'https://www.youtube.com/watch?v=-2oZk8h0Rmw', '2014-08-07', 3, FALSE),
    ('AC/DC - T.N.T. (Live At River Plate, December 2009)', 'https://www.youtube.com/watch?v=NhsK5WExrnE', '1975-12-01', 4, FALSE),
    ('Bufón - Callejeros (Solo x hoy)', 'https://www.youtube.com/watch?v=X_B0V0ZRSlM', '1997-07-20', 5, FALSE),
    ('Almafuerte - Dijo el droguero al drogador (Estadio River Plate - 14/07/1999)', 'https://www.youtube.com/watch?v=oVQ9QNbY47k', '1995-02-13', 6, FALSE),
    ('Guns N Roses - Paradise City (Official Music Video)', 'https://www.youtube.com/watch?v=Rbm6GXllBiw', '1987-07-21', 7, FALSE),
    ('Intoxicados - Religión (En Vivo 2002)', 'https://www.youtube.com/watch?v=VZ-F8OHcsLc', '2001-07-24', 8, FALSE),
    ('Desde lejos no se ve - Los Piojos', 'https://www.youtube.com/watch?v=wLbkcmA4k80', '1998-05-17', 9, FALSE),
    ('Airbag - La Partida De La Gitana (si te vas)', 'https://www.youtube.com/watch?v=FtlDJrzRNko', '2004-01-24', 10, FALSE);`
};

// Definición del modelo de Tour
const Tour = {
    nombre: "Tour",
    sql: `CREATE TABLE Tour (
        IdTour INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL UNIQUE,
        FechaInicio DATE NOT NULL,
        FechaFin DATE NOT NULL,
        IdBanda INTEGER NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdBanda) REFERENCES Bandas(IdBanda)
    );`,
    datos: `INSERT INTO Tour (Nombre, FechaInicio, FechaFin, IdBanda, Eliminado) VALUES
        ('Insoportablemente Vivo Tour', '2001-05-19', '2002-12-14',1, FALSE),
        ('A Contraluz Tour', '2004-10-01', '2004-12-17',2, FALSE),
        ('Historias Tour', '2014-12-20', '2016-11-12',3, FALSE), 
        ('Black Ice World Tour', '2008-10-28', '2010-06-28',4, FALSE), 
        ('Señales Tour', '2004-04-03', '2004-12-30',5, FALSE),
        ('La Máquina Tour', '1999-12-23', '2002-12-21',6, FALSE),
        ('Appetite for Destruction', '1987-03-06', '1987-06-06',7, FALSE),
        ('Gira Nacional', '2005-04-03', '2005-10-22',8, FALSE),
        ('Ritual Piojoso', '2007-05-20', '2007-12-15',9, FALSE),
        ('Jinetes Cromados Tour', '2022-06-10', '2022-09-24',10, FALSE);`
};

// Definición del modelo de Album
const Album = {
    nombre: "Album",
    sql: `CREATE TABLE Album (
        IdAlbum INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        FechaLanzamiento DATE NOT NULL,
        IdBanda INTEGER NOT NULL,
        IdDiscografica INTEGER NOT NULL,
        Eliminado BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (IdBanda) REFERENCES Bandas(IdBanda),
        FOREIGN KEY (IdDiscografica) REFERENCES Discograficas(IdDiscografica),
        UNIQUE(Nombre, IdBanda)
    );`,
    datos: `INSERT INTO Album (Nombre, FechaLanzamiento, IdBanda, IdDiscografica, Eliminado) VALUES
        ('TruenoTierra ', '2006-12-12', 1, 1, FALSE),
        ('Deskarado', '1998-03-02', 2, 2, FALSE),
        ('Historias', '2014-08-07', 3, 3, FALSE),
        ('T.N.T', '1975-12-01', 4, 4, FALSE),
        ('Solo x hoy', '1997-07-20', 5, 5, FALSE),
        ('Mundo Guanaco', '1995-02-13', 6, 6, FALSE),
        ('Appetite for Destruction',  '1987-07-21', 7, 7, FALSE),
        ('¡¡Buen día!!', '2001-07-24', 8, 8, FALSE),
        ('Azul', '1998-05-17', 9, 9, FALSE),
        ('Airbag', '2004-24-01', 10, 10, FALSE);`
};
const Usuarios = {
    nombre: "Usuarios",
    sql: `CREATE TABLE Usuarios (
        Username TEXT PRIMARY KEY,
        Password TEXT NOT NULL,
        Rol TEXT NOT NULL DEFAULT 'member' -- Agregar columna Rol con valor predeterminado
  );`
};


// Función para crear una tabla si no existe
async function crearTablaSiNoExiste(modelo) {
    const tablaExiste = await db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [modelo.nombre]
    );

    if (!tablaExiste) {
        await db.run(modelo.sql);
        console.log(`Tabla '${modelo.nombre}' creada.`);
    }
}

// Función para limpiar la tabla
async function limpiarTabla(modelo) {
    await db.run(`DELETE FROM ${modelo.nombre}`);
}

// Función para agregar datos iniciales si la tabla está vacía
async function agregarDatosIniciales(modelo) {
    const cantidadRegistros = await db.get(`SELECT COUNT(*) as count FROM ${modelo.nombre}`);
    if (cantidadRegistros.count === 0) {
        await db.run(modelo.datos);
        console.log(`Datos iniciales agregados a la tabla '${modelo.nombre}'.`);
    }
}

async function CrearBaseSiNoExiste() {
    try {
        // abrir base, si no existe el archivo/base lo crea
        await abrirBaseDatos();

        // Crear tablas si no existen
        await Promise.all([
            crearTablaSiNoExiste(Bandas),
            crearTablaSiNoExiste(Artistas),
            crearTablaSiNoExiste(Discograficas),
            crearTablaSiNoExiste(Cancion),
            crearTablaSiNoExiste(Recital),
            crearTablaSiNoExiste(VideoClip),
            crearTablaSiNoExiste(Tour),
            crearTablaSiNoExiste(Album),
            crearTablaSiNoExiste(Usuarios)
        ]);

        // Limpiar y luego insertar los datos iniciales
        await Promise.all([
            limpiarTabla(Bandas),
            limpiarTabla(Artistas),
            limpiarTabla(Discograficas),
            limpiarTabla(Cancion),
            limpiarTabla(Recital),
            limpiarTabla(VideoClip),
            limpiarTabla(Tour),
            limpiarTabla(Album),
            limpiarTabla(Usuarios)
        ]);

        await Promise.all([
            agregarDatosIniciales(Bandas),
            agregarDatosIniciales(Artistas),
            agregarDatosIniciales(Discograficas),
            agregarDatosIniciales(Cancion),
            agregarDatosIniciales(Recital),
            agregarDatosIniciales(VideoClip),
            agregarDatosIniciales(Tour),
            agregarDatosIniciales(Album)
            
        ]);

        console.log('Base de datos y tablas creadas correctamente.');
    } catch (error) {
        console.error('Error al crear la base de datos y tablas:', error);
    }
}

// Ejecutar función principal para crear la base de datos y las tablas
CrearBaseSiNoExiste();

// Exportar la base de datos para su uso en otros módulos
module.exports = db;
