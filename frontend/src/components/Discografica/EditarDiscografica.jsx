import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { discograficasService } from '../../service/discografica.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarDiscografica() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [discograficas, setDiscografica] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getDiscograficaID();
        };
        getInicialData();
    }, []);

    const getDiscograficaID = async () => {
        const p = await discograficasService.getById(params.id);
        setDiscografica(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaUnion", p.FechaUnion); // Ajuste para formato de fecha
    };

    

    const onSubmit = async (data) => {
        try {
            const datosParaEnviar = {
            IdDiscografica: discograficas.IdDiscografica,
            Nombre: data.Nombre, 
            FechaUnion: data.FechaUnion,
            };
            console.log("Datos enviados:", datosParaEnviar);
            await discograficasService.put(datosParaEnviar);
            setMensaje("Discográfica editada exitosamente.");
        } catch (error) {
            console.error("Error al editar la discográfica:", error);
            setMensaje("El nombre de la discográfica se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/discograficas');
    };

    return (
        <div className='container_app'>
            {discograficas && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Discografica</h5>
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
                        <label htmlFor="fechaUnion">Fecha Union:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaUnion"
                            {...register("FechaUnion", { required: 'Este campo es requerido' })}
                        />
                        {errors.fechaUnion && <Alert key='danger' variant='danger'>
                            {errors.fechaUnion.message}
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
