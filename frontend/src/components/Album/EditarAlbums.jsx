import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { bandasService } from '../../service/bandas.service';
import { discograficasService} from '../../service/discografica.service';
import { albumsService } from '../../service/album.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarAlbums() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [discograficas, setDiscograficas] = useState([])
    const [bandas, setBandas] = useState([]);
    const [albums, setAlbums] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getAlbumId();
            await getBandas();
            await getDiscograficas();
        };
        getInicialData();
    }, []);

    const getAlbumId = async () => {
        const p = await albumsService.getById(params.id);
        setAlbums(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaLanzamiento", p.FechaLanzamiento); // Ajuste para formato de fecha
        setValue("IdBanda", p.IdBanda);
        setValue("IdDiscografica", p.IdDiscografica);
    };

    const getBandas = async () => {
        const bandas = await bandasService.getBandas();
        setBandas(bandas);
    };
    const getDiscograficas = async () => {
        const disco = await discograficasService.getDiscograficas();
        setDiscograficas(disco);
    };

    const onSubmit = async (data) => {
        try{
            const datosParaEnviar = {
            IdAlbum: albums.IdAlbum,
            Nombre: data.Nombre, 
            FechaLanzamiento: data.FechaLanzamiento,
            IdBanda: data.IdBanda,
            IdDiscografica: data.IdDiscografica
            };
            console.log("Datos enviados:", datosParaEnviar);
            await albumsService.put(datosParaEnviar);
            setMensaje("Album editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el album:", error);
            setMensaje("El nombre del album para dicha banda se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/albums');
    };

    return (
        <div className='container_app'>
            {albums && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Album</h5>
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
                        <label htmlFor="fechaLanzamiento">Fecha Lanzamiento:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaCreacion"
                            {...register("FechaLanzamiento", { required: 'Este campo es requerido' })}
                        />
                        {errors.fechaLanzamiento && <Alert key='danger' variant='danger'>
                            {errors.fechaLanzamiento.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idBanda">Banda:</label>
                        <select 
                            className="form-control" 
                            id="idBanda" 
                            {...register("IdBanda", { required: 'Este campo es requerido' })}
                        >
                            {bandas.map((x) => (
                                <option value={x.IdBanda} key={'idBanda-' + x.IdBanda}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.idBanda && <Alert key='danger' variant='danger'>
                            {errors.idBanda.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idDiscografica">Discografica:</label>
                        <select 
                            className="form-control" 
                            id="idDiscografica" 
                            {...register("IdDiscografica", { required: 'Este campo es requerido' })}
                        >
                            {discograficas.map((x) => (
                                <option value={x.IdDiscografica} key={'idDiscografica-' + x.IdDiscografica}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.idDiscografica && <Alert key='danger' variant='danger'>
                            {errors.idDiscografica.message}
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
