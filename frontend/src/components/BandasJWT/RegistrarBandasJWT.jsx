import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { bandasJWTService } from '../../service/bandasJWT.service';
import { artistasService } from '../../service/artistas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegistrarBandasJWT() {
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
            await bandasJWTService.save(data);
            setMensaje("Banda registrada exitosamente.");
        } catch (error) {
            console.error("Error al registrar la banda:", error);
            setMensaje("La banda que intenta registrar ya existe.");
        }
    }

    const onVolver = () => {
        navigate('/bandasJWT');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Banda</h5>
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
                    <label htmlFor="idVocalista">Vocalista:</label>
                    <select className="form-control" id="idVocalista" {...register("IdVocalista", { required: 'Este campo es requerido' })}>
                        {artistas && artistas.map((x) => (
                            <option value={x.IdArtista} key={'idArtista-' + x.IdArtista}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idVocalista && <span className='error'>{errors.idVocalista.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="fechaCreacion">Fecha creación:</label>
                    <input type="date" className="form-control" id="fechaCreacion" {...register("FechaCreacion")} />
                    {errors.fechaCreacion && <span className='error'>{errors.fechaCreacion.message}</span>}
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
