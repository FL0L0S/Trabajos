import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { bandasService } from '../../service/bandas.service';
import { artistasService } from '../../service/artistas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarBandas() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [artistas, setArtistas] = useState([]);
    const [bandas, setBandas] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getBandaID();
            await getArtistas();
        };
        getInicialData();
    }, []);

    const getBandaID = async () => {
        const p = await bandasService.getById(params.id);
        setBandas(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaCreacion", p.FechaCreacion); // Ajuste para formato de fecha
        setValue("IdVocalista", p.IdVocalista);
    };

    const getArtistas = async () => {
        const artistas = await artistasService.getArtistas();
        setArtistas(artistas);
    };

    const onSubmit = async (data) => {
        try {
            const datosParaEnviar = {
                IdBanda: bandas.IdBanda,
                Nombre: data.Nombre, 
                FechaCreacion: data.FechaCreacion,
                IdVocalista: data.IdVocalista
            };
            console.log("Datos enviados:", datosParaEnviar);
            await bandasService.put(datosParaEnviar);
            setMensaje("Banda editada exitosamente.");
        } catch (error) {
            console.error("Error al editar la banda:", error);
            setMensaje("El nombre de la banda se enceuntra en uso.");
        }
        
    };

    const onVolver = () => {
        navigate('/bandas');
    };

    return (
        <div className='container_app'>
            {bandas && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Banda</h5>
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
                        <label htmlFor="fechaCreacion">Fecha creación:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaCreacion"
                            {...register("FechaCreacion", { required: 'Este campo es requerido' })}
                        />
                        {errors.FechaCreacion && <Alert key='danger' variant='danger'>
                            {errors.FechaCreacion.message}
                        </Alert>}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="idVocalista">Vocalista:</label>
                        <select 
                            className="form-control" 
                            id="idVocalista" 
                            {...register("IdVocalista", { required: 'Este campo es requerido' })}
                        >
                            {artistas.map((x) => (
                                <option value={x.IdArtista} key={'idArtista-' + x.IdArtista}>
                                    {x.Nombre}
                                </option>
                            ))}
                        </select>
                        {errors.IdVocalista && <Alert key='danger' variant='danger'>
                            {errors.IdVocalista.message}
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
