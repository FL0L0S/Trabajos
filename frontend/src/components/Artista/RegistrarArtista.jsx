import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { artistasService } from '../../service/artistas.service';
import {useNavigate} from 'react-router-dom'

export default function RegistrarArtista() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [artistas, setArtistas] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getArtistas();
    }, [])

    const getArtistas = async () => {
        const artistas = await artistasService.getArtistas()
        console.log(artistas);
        setArtistas(artistas);
    }

    const onSubmit = async (data) => {
        try {
            await artistasService.save(data);
            setMensaje("Artista registrado exitosamente");
        } catch (error) {
            console.error("Error al registrar el artista:", error);
            setMensaje("El mail con el que intena registrar ya existe");
        }
    }

    const onVolver = () => {
        navigate('/artistas');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Artista</h5>
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
                    <label htmlFor="fechaNacimineto">Fecha Nacimiento:</label>
                    <input type="date" className="form-control" id="fechaNacimineto" {...register("FechaNacimiento")} />
                    {errors.fechaNacimineto && <span className='error'>{errors.fechaNacimineto.message}</span>}
                </div>    
                <div className="form-group">
                    <label htmlFor="mail">Mail:</label>
                    <input type="text" className="form-control" id="mail"  {...register("Mail", { required: 'Este campo es requerido' })} />
                    {errors.mail && <Alert key='danger' variant='danger'>
                        {errors.mail.message}
                    </Alert>}
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
