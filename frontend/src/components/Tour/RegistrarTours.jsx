import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { toursService } from '../../service/tour.service';
import { bandasService } from '../../service/bandas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegistrarTour() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [banda, setBanda] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getBanda();
    }, [])

    const getBanda = async () => {
        const banda = await bandasService.getBandas()
        console.log(banda);
        setBanda(banda);
    }

    const onSubmit = async (data) => {
        try {
            await toursService.save(data);
            setMensaje("Tour registrado exitosamente");
        } catch (error) {
            console.error("Error al registrar el tour:", error);
            setMensaje("Ocurrió un error al registrar el tour");
        }
    }

    const onVolver = () => {
        navigate('/tours');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Tour</h5>
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
                    <label htmlFor="idBanda">Banda:</label>
                    <select className="form-control" id="idBanda" {...register("IdBanda", { required: 'Este campo es requerido' })}>
                        {banda && banda.map((x) => (
                            <option value={x.IdBanda} key={'idBanda-' + x.IdBanda}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idBanda && <span className='error'>{errors.idBanda.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaInicio">Fecha Inicio:</label>
                    <input type="date" className="form-control" id="fechaInicio" {...register("FechaInicio")} />
                    {errors.FechaInicio && <span className='error'>{errors.FechaInicio.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaFin">Fecha Fin:</label>
                    <input type="date" className="form-control" id="fechaFin" {...register("FechaFin")} />
                    {errors.FechaInicio && <span className='error'>{errors.FechaInicio.message}</span>}
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
