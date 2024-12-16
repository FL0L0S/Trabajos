import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { recitalService } from '../../service/recital.service';
import { toursService } from '../../service/tour.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegistrarRecital() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [tour, setTour] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTour();
    }, [])

    const getTour = async () => {
        const tour = await toursService.getTours()
        console.log(tour);
        setTour(tour);
    }

    const onSubmit = async (data) => {
        try {
            await recitalService.save(data);
            setMensaje("Recital registrado exitosamente");
        } catch (error) {
            console.error("Error al registrar el Recital:", error);
            setMensaje("Ocurrió un error al registrar el recital");
        }
    }

    const onVolver = () => {
        navigate('/recitales');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Recital</h5>
                {mensaje && <Alert variant={mensaje.includes("exitosamente") ? 'success' : 'danger'}>
                    {mensaje}
                </Alert>}
                <div className="form-group">
                    <label htmlFor="lugar">Lugar:</label>
                    <input type="text" className="form-control" id="lugar"  {...register("Lugar", { required: 'Este campo es requerido' })} />
                    {errors.lugar && <Alert key='danger' variant='danger'>
                        {errors.lugar.message}
                    </Alert>}
                </div>
                <div className="form-group" >
                    <label htmlFor="idTour">Tour:</label>
                    <select className="form-control" id="idTour" {...register("IdTour", { required: 'Este campo es requerido' })}>
                        {tour && tour.map((x) => (
                            <option value={x.IdTour} key={'idTour-' + x.IdTour}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idTour && <span className='error'>{errors.idTour.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha:</label>
                    <input type="date" className="form-control" id="fecha" {...register("Fecha")} />
                    {errors.Fecha && <span className='error'>{errors.Fecha.message}</span>}
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