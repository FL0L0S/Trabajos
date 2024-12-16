import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { videosService } from '../../service/videoClip.service';
import { cancionService } from '../../service/cancion.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarVideos() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [canciones, setCanciones] = useState([]);
    const [videos, setVideos] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await geVideoID();
            await getCanciones();  // Esto debería invocar el método correcto
        };
        getInicialData();
    }, []);

    const geVideoID = async () => {
        const p = await videosService.getById(params.id);
        setVideos(p);

        // Asigna valores iniciales al formulario
        setValue("Titulo", p.Titulo);
        setValue("Link", p.Link);
        setValue("FechaLanzamiento", p.FechaLanzamiento); // Ajuste para formato de fecha
        setValue("IdCancion", p.IdCancion);
    };

    // Aquí es donde haces la llamada a tu servicio. 
    // Cambié 'getCanciones()' por el método correcto si es necesario (reemplaza getCanciones por el nombre real).
    const getCanciones = async () => {
        try {
            const canciones = await cancionService.getCancion();  // Cambia este nombre si es otro
            setCanciones(canciones);
        } catch (error) {
            console.error('Error al obtener canciones:', error);
        }
    };

    const onSubmit = async (data) => {
        try{
            const datosParaEnviar = {
            IdVideoClip: videos.IdVideoClip,
            Titulo: data.Titulo, 
            Link: data.Link,
            FechaLanzamiento: data.FechaLanzamiento,
            IdCancion: data.IdCancion
            };
            console.log("Datos enviados:", datosParaEnviar);
            await videosService.put(datosParaEnviar);
            setMensaje("VideoClip editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el videoClip:", error);
            setMensaje("El link del videoClip se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/videos');
    };

    return (
        <div className='container_app'>
            {videos && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar VideoClip</h5>
                    {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                        {mensaje}
                    </Alert>}
                    <div className="form-group">
                        <label htmlFor="titulo">Titulo:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="titulo"  
                            {...register("Titulo", { required: 'Este campo es requerido' })} 
                        />
                        {errors.Titulo && <Alert key='danger' variant='danger'>
                            {errors.Titulo.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="link">Link:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="link"  
                            {...register("Link", { required: 'Este campo es requerido' })} 
                        />
                        {errors.Link && <Alert key='danger' variant='danger'>
                            {errors.Link.message}
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
                        <label htmlFor="idCancion">Discografica:</label>
                        <select 
                            className="form-control" 
                            id="idCancion" 
                            {...register("IdCancion", { required: 'Este campo es requerido' })}
                        >
                            {canciones.map((x) => (
                                <option value={x.IdCancion} key={'idCancion-' + x.IdCancion}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.idCancion && <Alert key='danger' variant='danger'>
                            {errors.idCancion.message}
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
