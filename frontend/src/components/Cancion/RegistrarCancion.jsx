import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { cancionService } from '../../service/cancion.service';
import { albumsService } from '../../service/album.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegistrarCancion() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [albums, setAlbum] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAlbum();
    }, [])

    const getAlbum = async () => {
        const albums = await albumsService.getAlbums()
        console.log(albums);
        setAlbum(albums);
    }

    const onSubmit = async (data) => {
        try {
            await cancionService.save(data);
            setMensaje("Cancion registrada exitosamente");
        } catch (error) {
            console.error("Error al registrar la cancion:", error);
            setMensaje("Ocurrió un error al registrar la cancion");
        }
    }

    const onVolver = () => {
        navigate('/canciones');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Cancion</h5>
                {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                    {mensaje}
                </Alert>}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" className="form-control" id="nombre"  {...register("Nombre", { required: 'Este campo es requerido' })} />
                    {errors.nombre && <Alert key='danger' variant='danger'>
                        {errors.nombre.message}
                    </Alert>}
                </div>
                <div className="form-group" >
                    <label htmlFor="idAlbum">Album:</label>
                    <select className="form-control" id="idAlbum" {...register("IdAlbum", { required: 'Este campo es requerido' })}>
                        {albums && albums.map((x) => (
                            <option value={x.IdAlbum} key={'idAlbum-' + x.IdAlbum}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idAlbum && <span className='error'>{errors.idAlbum.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
                    <input type="date" className="form-control" id="fechaLanzamiento" {...register("FechaLanzamiento")} />
                    {errors.FechaLanzamiento && <span className='error'>{errors.FechaLanzamiento.message}</span>}
                </div>     
                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Registrar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                    <button type="button" className="btn btn-dark mx-1" onClick={onVolver}>Volver</button>
                </div>
            </form>
        </div >
    )
}
