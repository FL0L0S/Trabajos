import React, { useState, useEffect } from 'react'; 
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import { artistasService } from '../../service/artistas.service';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarArtista() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [artistas, setArtistas] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getInicialData = async () => {
            await getArtistaID();
        };
        getInicialData();
    }, []);

    const getArtistaID = async () => {
        const p = await artistasService.getById(params.id);
        setArtistas(p);

        // Asigna valores iniciales al formulario
        setValue("Nombre", p.Nombre);
        setValue("FechaNacimiento", p.FechaNacimiento); // Ajuste para formato de fecha
        setValue("Link", p.Mail);
    };

    

    const onSubmit = async (data) => {
        try{
            const datosParaEnviar = {
            IdArtista: artistas.IdArtista,
            Nombre: data.Nombre, 
            FechaNacimiento: data.FechaNacimiento,
            Mail: data.Mail
            };
            console.log("Datos enviados:", datosParaEnviar);
            await artistasService.put(datosParaEnviar);
            setMensaje("Artista editado exitosamente.");
        } catch (error) {
            console.error("Error al editar el artista:", error);
            setMensaje("El mail del artista se encuentra en uso.");
        }
    };

    const onVolver = () => {
        navigate('/artistas');
    };

    return (
        <div className='container_app'>
            {artistas && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Editar Artista</h5>
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
                        <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaNacimiento"
                            {...register("FechaNacimiento", { required: 'Este campo es requerido' })}
                        />
                        {errors.fechaNacimiento && <Alert key='danger' variant='danger'>
                            {errors.fechaNacimiento.message}
                        </Alert>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Mail:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="mail"  
                            {...register("Mail", { required: 'Este campo es requerido' })} 
                        />
                        {errors.mail && <Alert key='danger' variant='danger'>
                            {errors.mail.message}
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
