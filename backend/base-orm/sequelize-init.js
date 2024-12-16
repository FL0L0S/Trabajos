// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/datos.db");

// Definición del modelo de datos para Bandas


// Definición del modelo de datos para Album
const Album = sequelize.define(
  "Album",
  {
    IdAlbum: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [3, 30], msg: "Nombre debe ser tipo caracteres, entre 3 y 30 de longitud" },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    IdBanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { args: true, msg: "IdBanda es requerido" } },
    },
    IdDiscografica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { args: true, msg: "IdDiscografica es requerido" } },
      references: {
        model: 'Discograficas', // Este debe coincidir con el nombre del modelo definido
        key: 'IdDiscografica'
      }
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }

  },
  { indexes: [
    {
      unique: true,
      fields: ['Nombre', 'IdBanda'], // Restricción UNIQUE compuesta
    },
  ],
  timestamps: false,
    freezeTableName: true 
   }
);

// Definición del modelo de datos para Artistas
const Artistas = sequelize.define(
  "Artistas",
  {
    IdArtista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [3, 30], msg: "Nombre debe ser tipo caracteres, entre 3 y 30 de longitud" },
      },
    },
    FechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },

    Mail: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { args: true, msg: "Mail es requerido" },
        len: { args: [5, 30], msg: "Mail debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  { timestamps: false, freezeTableName: true }
);


const Bandas = sequelize.define(
  "Bandas",
  {
    IdBanda: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [2, 30], msg: "Nombre debe ser tipo caracteres, entre 2 y 30 de longitud" },
      },
    },
    IdVocalista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { args: true, msg: "IdVocalista es requerido" } },
      references: {
        model: 'Artistas', // Referencia correcta
        key: 'IdArtista'
    }

    },
    FechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  { timestamps: false, freezeTableName: true }
);

// Definición del modelo de datos para Cancion
const Cancion = sequelize.define(
  "Cancion",
  {
    IdCancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [5, 30], msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    IdAlbum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Album', key: 'IdAlbum' },
      validate: { notNull: { args: true, msg: "IdAlbum es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['Nombre', 'IdAlbum'], // Restricción UNIQUE compuesta
      },
    ],
    timestamps: false,
    freezeTableName: true,
  }
);

// Definición del modelo de datos para Discograficas
const Discograficas = sequelize.define(
  "Discograficas",
  {
    IdDiscografica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [5, 30], msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    FechaUnion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  {
   
    timestamps: false,
    freezeTableName: true,
  }
);

// Definición del modelo de datos para Recital
const Recital = sequelize.define(
  "Recital",
  {
    IdRecital: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Lugar: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Lugar es requerido" },
        len: { args: [5, 30], msg: "Lugar debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    IdTour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Tour', key: 'IdTour' },
      validate: { notNull: { args: true, msg: "IdTour es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  { indexes: [
    {
      unique: true,
      fields: ['Lugar', 'Fecha'], // Restricción UNIQUE compuesta
    },
  ],
  timestamps: false, freezeTableName: true }
);

// Definición del modelo de datos para Tour
const Tour = sequelize.define(
  "Tour",
  {
    IdTour: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { args: true, msg: "Nombre es requerido" },
        len: { args: [5, 30], msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    FechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    FechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    IdBanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Bandas', key: 'IdBanda' },
      validate: { notNull: { args: true, msg: "IdBanda es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
    
  },
  { timestamps: false, freezeTableName: true }
);

// Definición del modelo de datos para Videoclip
const VideoClip = sequelize.define(
  "VideoClip",
  {
    IdVideoClip: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Titulo es requerido" },
        len: { args: [5, 150], msg: "Titulo debe ser tipo caracteres, entre 5 y 30 de longitud" },
      },
    },
    Link: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { args: true, msg: "Link es requerido" },
        len: { args: [5, 150], msg: "Link debe ser tipo caracteres, entre 5 y 100 de longitud" },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { notNull: { args: true, msg: "Fecha es requerido" } },
    },
    IdCancion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Cancion', key: 'IdCancion' },
      validate: { notNull: { args: true, msg: "IdCancion es requerido" } },
    },
    Eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
          notEmpty: {
              args: true,
              msg: 'El estado eliminado es requerido.'
          }
      }
    }
  },
  { timestamps: false, freezeTableName: true }
);
const Usuarios = sequelize.define(
  'Usuarios',
  {
    Username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'El nombre de usuario es requerido',
        },
        len: {
          args: [3, 35],
          msg: 'El nombre de usuario debe tener entre 3 y 35 caracteres',
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'La contraseña es requerida',
        },
        len: {
          args: [8, 100],
          msg: 'La contraseña debe tener entre 8 y 100 caracteres',
        },
      },
    },
    Rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'miembro', 
      validate: {
        isIn: {
          args: [['admin', 'miembro']], 
          msg: 'El rol debe ser "admin" o "miembro"',
        },
      },
    },
  },
  {
    timestamps: false, 
  }
);

// Definición de relaciones
Artistas.hasMany(Bandas, { foreignKey: 'IdVocalista', sourceKey: 'IdArtista',});
Bandas.belongsTo(Artistas, { foreignKey: 'IdVocalista', targetKey: 'IdArtista'});

Bandas.hasMany(Album, { foreignKey: 'IdBanda' });
Album.belongsTo(Bandas, { foreignKey: 'IdBanda' });

Discograficas.hasMany(Album, { foreignKey: 'IdDiscografica' });
Album.belongsTo(Discograficas, { foreignKey: 'IdDiscografica' });

Tour.hasMany(Recital, { foreignKey: 'IdTour' });
Recital.belongsTo(Tour, { foreignKey: 'IdTour' });

Bandas.hasMany(Tour, { foreignKey: 'IdBanda' });
Tour.belongsTo(Bandas, { foreignKey: 'IdBanda' });

Cancion.hasMany(VideoClip, { foreignKey: 'IdCancion' });
VideoClip.belongsTo(Cancion, { foreignKey: 'IdCancion' });

Album.hasMany(Cancion, { foreignKey: 'IdAlbum' });
Cancion.belongsTo(Album, { foreignKey: 'IdAlbum' });



// Exportación de modelos y sequelize
module.exports = {
  sequelize,
  Album,
  Bandas,
  Artistas,
  Cancion,
  Discograficas,
  Recital,
  Tour,
  VideoClip,
  Usuarios
};
