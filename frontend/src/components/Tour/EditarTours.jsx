import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { toursService } from '../../service/tour.service';
import { bandasService } from '../../service/bandas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarTour() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [banda, setBanda] = useState([]);
    const [tour, setTour] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getTourID();
            await getBanda();
        };
        getInicialData();
    }, []);

    const getTourID = async () => {
        const p = await toursService.getById(params.id);
        setTour(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaInicio", p.FechaInicio); // Ajuste para formato de fecha
        setValue("FechaFin", p.FechaFin);
        setValue("IdBanda", p.IdBanda);
    };

    const getBanda = async () => {
        const banda = await bandasService.getBandas();
        setBanda(banda);
    };

    const onSubmit = async (data) => {
        try {
            const datosParaEnviar = {
            IdTour: tour.IdTour,
            Nombre: data.Nombre, 
            Fechainicio: data.Fechainicio,
            FechaFIn: data.FechaFIn,
            IdBanda: data.IdBanda
            };
            console.log("Datos enviados:", datosParaEnviar);
            await toursService.put(datosParaEnviar);
            setMensaje("Tour editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el tour:", error);
            setMensaje("El nombre del tour para dicha banda se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/tours');
    };

    return (
        <div className='container_app'>
            {tour && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Tour</h5>
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
                        <label htmlFor="fechaInicio">Fecha Inicio:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaInicio"
                            {...register("FechaInicio", { required: 'Este campo es requerido' })}
                        />
                        {errors.FechaInicio && <Alert key='danger' variant='danger'>
                            {errors.FechaInicio.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaFin">Fecha Fin:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaFin"
                            {...register("FechaFIn", { required: 'Este campo es requerido' })}
                        />
                        {errors.FechaFIn && <Alert key='danger' variant='danger'>
                            {errors.FechaFIn.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idBanda">Banda:</label>
                        <select 
                            className="form-control" 
                            id="idBanda" 
                            {...register("IdBanda", { required: 'Este campo es requerido' })}
                        >
                            {banda.map((x) => (
                                <option value={x.IdBanda} key={'idBanda-' + x.IdBanda}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.IdBanda && <Alert key='danger' variant='danger'>
                            {errors.IdBanda.message}
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
