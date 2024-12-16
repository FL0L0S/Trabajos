import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltrosBandas from "./shared/FiltrosBandas";
import TablaBandas from "./shared/TablaBandas";
import {bandasService} from "../../service/bandas.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarBandas() {
    const [bandas, setBandas] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getBandas();
    }, [])

    const getBandas = async () => {
        const bandas = await bandasService.getBandas()
        console.log(bandas);
        setBandas(bandas);
    }

    const onConsultar = async (filtros) => {
        const bandas = await bandasService.getByFilters(filtros)
        console.log(bandas);
        setBandas(bandas);
    }
    

    

    
    
    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosBandas
                        onConsultarBandas={onConsultar}>
                    </FiltrosBandas>

                    
                    
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaBandas items={bandas} 
                    
                    >
                    </TablaBandas>
                </div>
            </div>
        </>
    )
}