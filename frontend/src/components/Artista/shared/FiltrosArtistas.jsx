import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"

export default function FiltrosArtistas({onConsultarArtistas}) {
    const [artistas, setArtistas] = useState('') 
    const navigate = useNavigate();

    const onFiltrarClick = () => {
        onConsultarArtistas({Nombre: artistas})
    }

    const onRegistrarClick = () => {
        navigate(`/artistas/registrar`)
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 fs-3">
                            <label htmlFor="staticEmail2"
                                className="visually-hidden">Artistas</label>
                            <input type="text"
                                readOnly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="Artista">
                            </input>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2"
                                className="visually-hidden">Artistas</label>
                            <input type="text"
                                className="form-control"
                                id="inputPassword2" 
                                placeholder="Artista"
                                onChange={(event) => {setArtistas(event.target.value)}}>
                            </input>
                        </div>
                        <div  className="col-auto">
                           
                                <Button variant="primary"
                                        onClick={()=>onFiltrarClick()}>
                                            Consultar
                                </Button>
                                
                                
                        </div>
                        <div className="col-auto ">
                            <Button variant="success"
                                    onClick={()=>onRegistrarClick()}>
                                        Registrar
                            </Button></div>
                    </div>
                </div>
            </div>
        </>
    )
}