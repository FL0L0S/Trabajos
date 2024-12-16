import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltrosCancion from './shared/FiltrosCancion';
import TablaCancion from './shared/TablaCancion';
import { cancionService } from '../../service/cancion.service';
import {useNavigate} from 'react-router-dom'

export default function ConsultarCancion() {
    const [cancion, setCancion] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getCancion();
    }, [])

    const getCancion = async () => {
        const cancion = await cancionService.getCancion()
        console.log(cancion);
        setCancion(cancion);
    }

    const onConsultar = async (filtros) => {
        const cancion = await cancionService.getByFilters(filtros)
        console.log(cancion);
        setCancion(cancion);
    }
    
    const onEliminar = async (idCancion) => {
        await cancionService.borrar(idCancion)
        getCancion()
    }
    const onEditar = (idCancion) => {
        console.log('onEditar', idCancion);
        navigate(`/canciones/editar/${idCancion}`)   
    }

    

    

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosCancion
                        onConsultarCancion={onConsultar}>
                    </FiltrosCancion>

                    
                    
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaCancion items={cancion} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaCancion>
                </div>
            </div>
        </>
    )
}