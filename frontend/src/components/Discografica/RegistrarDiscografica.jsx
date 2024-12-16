import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { discograficasService } from '../../service/discografica.service';
import {useNavigate} from 'react-router-dom'

export default function RegistrarDiscografica() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [discografica, setDiscografica] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getDiscograficas();
    }, [])

    const getDiscograficas = async () => {
        const discograficas = await discograficasService.getDiscograficas()
        console.log(discograficas);
        setDiscografica(discograficas);
    }

    const onSubmit = async (data) => {
        try {
            await discograficasService.save(data);
            setMensaje("Discografica registrado exitosamente");
        } catch (error) {
            console.error("Error al registrar la discografica:", error);
            setMensaje("El nombre de la discografica con el que intenta registrar ya existe");
        }
    }

    const onVolver = () => {
        navigate('/discograficas');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Discografica</h5>
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
                <div className="form-group">
                    <label htmlFor="fechaUnion">Fecha Union:</label>
                    <input type="date" className="form-control" id="fechaUnion" {...register("FechaUnion")} />
                    {errors.fechaUnion && <span className='error'>{errors.fechaUnion.message}</span>}
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
