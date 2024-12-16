import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import FiltrosVideos from "./shared/FiltrosVideos";
import TablaVideos from "./shared/TablaVideos";
import {videosService} from "../../service/videoClip.service";
import {useNavigate} from 'react-router-dom'

export default function ConsultarVideoClip() {
    const [videos, setVideos] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        
        getVideos();
    }, [])

    const getVideos = async () => {
        const videos = await videosService.getVideos()
        console.log(videos);
        setVideos(videos);
    }

    const onConsultar = async (filtros) => {
        const videos = await videosService.getByFilters(filtros)
        console.log(videos);
        setVideos(videos);
    }
    
    const onEliminar = async (IdVideoClip) => {
        await videosService.borrar(IdVideoClip)
        getVideos()
    }
    const onEditar = (IdVideoClip) => {
        console.log('onEditar', IdVideoClip);
        navigate(`/Videos/editar/${IdVideoClip}`)   
    }
 
    return (
        <>
            <div className="row">
                <br></br>
                <div className="col-12">
                    <FiltrosVideos
                        onConsultarVideoClip={onConsultar}>
                    </FiltrosVideos>

                    
                    
                </div>
                
                <br></br>
                <br></br>
                <div className="col-12">
                    <TablaVideos items={videos} 
                    onEliminar={onEliminar}
                    onEditar={onEditar}
                    >
                    </TablaVideos>
                </div>
            </div>
        </>
    )
}