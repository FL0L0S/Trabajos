import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltrosRecital from './shared/FiltrosRecital';
import TablaRecital from './shared/TablaRecital';
import { recitalService } from '../../service/recital.service';
import {useNavigate} from 'react-router-dom'

export default function ConsultarRecital() {
    const [recital, setRecital] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getRecital();
    }, [])

    const getRecital = async () => {
        const recital = await recitalService.getRecital()
        console.log(recital);
        setRecital(recital);
    }

    const onConsultar = async (filtros) => {
        const recital = await recitalService.getByFilters(filtros)
        console.log(recital);
        setRecital(recital);
    }
    
    const onEliminar = async (idRecital) => {
        await recitalService.borrar(idRecital)
        getRecital()
    }
    const onEditar = (idRecital) => {
        console.log('onEditar', idRecital);
        navigate(`/recitales/editar/${idRecital}`)   
    } 
 

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosRecital
                        onConsultarRecital={onConsultar}>
                    </FiltrosRecital>               
                </div>
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaRecital items={recital} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaRecital>
                </div>
            </div>
        </>
    )
}