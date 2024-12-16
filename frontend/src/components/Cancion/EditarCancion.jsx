import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { cancionService } from '../../service/cancion.service';
import { albumsService } from '../../service/album.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCancion() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [album, setAlbum] = useState([]);
    const [canciones, setCancion] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getCancionID();
            await getAlbums();
        };
        getInicialData();
    }, []);

    const getCancionID = async () => {
        const p = await cancionService.getById(params.id);
        setCancion(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaLanzamiento", p.FechaLanzamiento); // Ajuste para formato de fecha
        setValue("IdAlbum", p.IdAlbum);
    };

    const getAlbums = async () => {
        const albums = await albumsService.getAlbums();
        setAlbum(albums);
    };

    const onSubmit = async (data) => {
        try {
            const datosParaEnviar = {
            IdCancion: canciones.IdCancion,
            Nombre: data.Nombre, 
            FechaLanzamiento: data.FechaLanzamiento,
            IdAlbum: data.IdAlbum
            };
            console.log("Datos enviados:", datosParaEnviar);
            await cancionService.put(datosParaEnviar);
            setMensaje("Canción editada exitosamente.");
        } catch (error) {
            console.error("Error al editar la canción:", error);
            setMensaje("El nombre de la canción para dicho album se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/canciones');
    };

    return (
        <div className='container_app'>
            {canciones && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Cancion</h5>
                    {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                        {mensaje}
                    </Alert>}
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre"  
                            {...register("Nombre", { required: 'Este campo es requerido' })} 
                        />
                        {errors.Nombre && <Alert key='danger' variant='danger'>
                            {errors.Nombre.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaLanzamiento"
                            {...register("FechaLanzamiento", { required: 'Este campo es requerido' })}
                        />
                        {errors.FechaLanzamiento && <Alert key='danger' variant='danger'>
                            {errors.FechaLanzamiento.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idAlbum">Album:</label>
                        <select 
                            className="form-control" 
                            id="idAlbum" 
                            {...register("IdAlbum", { required: 'Este campo es requerido' })}
                        >
                            {album.map((x) => (
                                <option value={x.IdAlbum} key={'idAlbum-' + x.IdAlbum}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.IdAlbum && <Alert key='danger' variant='danger'>
                            {errors.IdAlbum.message}
                        </Alert>}
                    </div>
                    <div className="form-group text-center mt-3">
                        <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                        <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                        <button type="button" className="btn btn-dark mx-1" onClick={onVolver}>Volver</button>
                    </div>
                </form>
            )}
        </div>
    );
}
