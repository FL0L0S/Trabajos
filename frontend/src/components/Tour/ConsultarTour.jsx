import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltrosTours from "./shared/FiltrosTours";
import TablaTours from "./shared/TablaTours";
import {toursService} from "../../service/tour.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarTours() {
    const [tours, setTours] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getTours();
    }, [])

    const getTours = async () => {
        const tours = await toursService.getTours()
        console.log(tours);
        setTours(tours);
    }

    const onConsultar = async (filtros) => {
        const tours = await toursService.getByFilters(filtros)
        console.log(tours);
        setTours(tours);
    }
    
    const onEliminar = async (idTour) => {
        await toursService.borrar(idTour)
        getTours()
    }
    const onEditar = (idTour) => {
        console.log('onEditar', idTour);
        navigate(`/Tours/editar/${idTour}`)   
    }

    

    

    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosTours
                        onConsultarTours={onConsultar}>
                    </FiltrosTours>

                    
                    
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaTours items={tours} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaTours>
                </div>
            </div>
        </>
    )
}