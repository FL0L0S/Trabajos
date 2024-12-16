import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { videosService } from '../../service/videoClip.service';
import { cancionService } from '../../service/cancion.service';
import { useNavigate } from 'react-router-dom';

export default function RegistrarVideo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cancion, setCancion] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCancion();
    }, []);

    const getCancion = async () => {
        const cancion = await cancionService.getCancion();
        console.log(cancion);
        setCancion(cancion);
    };

    const onSubmit = async (data) => {
        try {
            await videosService.save(data);
            setMensaje("VideoClip registrada exitosamente");
        } catch (error) {
            console.error("Error al registrar el video clip:", error);
            setMensaje("Ocurrió un error al registrar el video clip");
            console.log(data)
        }
    };

    const onVolver = () => {
        navigate('/videos'); // Ruta de retorno
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar VideoClip</h5>
                {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                    {mensaje}
                </Alert>}
                <div className="form-group">
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" className="form-control" id="titulo"  {...register("Titulo", { required: 'Este campo es requerido' })} />
                    {errors.titulo && <Alert key='danger' variant='danger'>
                        {errors.titulo.message}
                    </Alert>}
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link:</label>
                    <input type="text" className="form-control" id="link"  {...register("Link", { required: 'Este campo es requerido' })} />
                    {errors.link && <Alert key='danger' variant='danger'>
                        {errors.link.message}
                    </Alert>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
                    <input type="date" className="form-control" id="fechaLanzamiento" {...register("FechaLanzamiento")} />
                    {errors.FechaLanzamiento && <span className='error'>{errors.FechaLanzamiento.message}</span>}
                </div> 
                <div className="form-group" >
                    <label htmlFor="idCancion">Cancion:</label>
                    <select className="form-control" id="IdCancion" {...register("IdCancion", { required: 'Este campo es requerido' })}>
                        {cancion && cancion.map((x) => (
                            <option value={x.IdCancion} key={'idCancion-' + x.IdCancion}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.IdCancion && <span className='error'>{errors.IdCancion.message}</span>}
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
