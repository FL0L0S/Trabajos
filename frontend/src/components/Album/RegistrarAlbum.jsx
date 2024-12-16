import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form'
import { bandasService } from '../../service/bandas.service';
import { albumsService } from '../../service/album.service';
import { discograficasService } from '../../service/discografica.service';
import { useNavigate } from 'react-router-dom';

export default function RegistrarAlbums() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [discograficas, setDiscograficas] = useState([])
    const [bandas, setBandas] = useState([])
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getDiscos();
        getBandas();
    }, [])

    const getDiscos = async () => {
        const discograficas = await discograficasService.getDiscograficas()
        console.log(discograficas);
        setDiscograficas(discograficas);
    }

    const getBandas = async () => {
        const bandas = await bandasService.getBandas()
        console.log(bandas);
        setBandas(bandas);
    }

    const onSubmit = async (data) => {
        try {
            await albumsService.save(data);
            setMensaje("Album registrada exitosamente");
        } catch (error) {
            console.error("Error al registrar la banda:", error);
            setMensaje("Ocurrió un error al registrar la banda");
        }
    }

    const onVolver = () => {
        navigate('/albums');
    };

    return (
        <div className='container_app'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Registrar Album</h5>
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
                    <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
                    <input type="date" className="form-control" id="fechaLanzamiento" {...register("FechaLanzamiento")} />
                    {errors.fechaLanzamiento && <span className='error'>{errors.fechaLanzamiento.message}</span>}
                </div>  
                <div className="form-group" >
                    <label htmlFor="idBanda">Bandas:</label>
                    <select className="form-control" id="idBanda" {...register("IdBanda", { required: 'Este campo es requerido' })}>
                        {bandas && bandas.map((x) => (
                            <option value={x.IdBanda} key={'idBanda-' + x.IdBanda}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idBanda && <span className='error'>{errors.idBanda.message}</span>}
                </div>
                <div className="form-group" >
                    <label htmlFor="idDiscografica">Discograficas:</label>
                    <select className="form-control" id="idDiscografica" {...register("IdDiscografica", { required: 'Este campo es requerido' })}>
                        {discograficas && discograficas.map((x) => (
                            <option value={x.IdDiscografica} key={'idDiscografica-' + x.IdDiscografica}>
                                {x.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idDiscografica && <span className='error'>{errors.idDiscografica.message}</span>}
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
