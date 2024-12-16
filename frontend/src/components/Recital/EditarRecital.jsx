import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { recitalService } from '../../service/recital.service';
import { toursService } from '../../service/tour.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarRecital() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [tour, setTour] = useState([]);
    const [recital, setRecital] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getRecitalID();
            await getTour();
        };
        getInicialData();
    }, []);

    const getRecitalID = async () => {
        const p = await recitalService.getById(params.id);
        setRecital(p);

        // Asigna valores iniciales al formulario
        setValue("Lugar", p.Lugar);
        setValue("Fecha", p.Fecha); // Ajuste para formato de fecha
        setValue("IdTour", p.IdTour);
    };

    const getTour = async () => {
        const tour = await toursService.getTours();
        setTour(tour);
    };

    const onSubmit = async (data) => {
        try {
            const datosParaEnviar = {
            IdRecital: recital.IdRecital,
            Lugar: data.Lugar, 
            Fecha: data.Fecha,
            IdTour: data.IdTour
            };
            console.log("Datos enviados:", datosParaEnviar);
            await recitalService.put(datosParaEnviar);
            setMensaje("Recital editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el recital:", error);
            setMensaje("El nombre del recital para dicho tour se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/recitales');
    };

    return (
        <div className='container_app'>
            {recital && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Recital</h5>
                    {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                        {mensaje}
                    </Alert>}
                    <div className="form-group">
                        <label htmlFor="lugar">Lugar:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="lugar"  
                            {...register("Lugar", { required: 'Este campo es requerido' })} 
                        />
                        {errors.Lugar && <Alert key='danger' variant='danger'>
                            {errors.Lugar.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            {...register("Fecha", { required: 'Este campo es requerido' })}
                        />
                        {errors.Fecha && <Alert key='danger' variant='danger'>
                            {errors.Fecha.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idTour ">Tour:</label>
                        <select 
                            className="form-control" 
                            id="idTour" 
                            {...register("IdTour", { required: 'Este campo es requerido' })}
                        >
                            {tour.map((x) => (
                                <option value={x.IdTour} key={'idTour-' + x.IdTour}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.IdTour && <Alert key='danger' variant='danger'>
                            {errors.IdTour.message}
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
