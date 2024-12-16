import { useEffect, useState } from "react";
import FiltrosDiscografica from "./shared/FiltrosDiscografica";
import TablaDiscografica from "./shared/TablaDiscografica";
import { discograficasService } from "../../service/discografica.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarDiscografica() {
    const [discograficas, setDiscografica] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getDiscograficas();
    }, [])

    const getDiscograficas = async () => {
        const discograficas = await discograficasService.getDiscograficas()
        console.log(discograficas);
        setDiscografica(discograficas);
    }

    const onConsultar = async (filtros) => {
        const discografica = await discograficasService.getByFilters(filtros)
        console.log(discografica);
        setDiscografica(discografica);
    }
    
    const onEliminar = async (IdDiscografica) => {
        await discograficasService.borrar(IdDiscografica)
        getDiscograficas()
    }
    const onEditar = (IdDiscografica) => {
        console.log('onEditar', IdDiscografica);
        navigate(`/discograficas/editar/${IdDiscografica}`)
        
        
    }

    return (
        <>

    
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosDiscografica
                        onConsultarDiscografica={onConsultar}>
                    </FiltrosDiscografica>
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaDiscografica items={discograficas} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaDiscografica>
                </div>
            </div>
        </>
    )
}