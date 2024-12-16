import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"

export default function FiltrosTours({onConsultarTours}) {
    const [tours, setTours] = useState('') 
    const navigate = useNavigate();

    const onFiltrarClick = () => {
        onConsultarTours({Nombre: tours})
    }

    const onRegistrarClick = () => {
        navigate(`/tours/registrar`)
    }

    
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 fs-3">
                            <label htmlFor="staticEmail2"
                                className="visually-hidden">Tours</label>
                            <input type="text"
                                readOnly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="Tour">
                            </input>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword2"
                                className="visually-hidden">Tour</label>
                            <input type="text"
                                className="form-control"
                                id="inputPassword2" 
                                placeholder="Tour"
                                onChange={(event) => {setTours(event.target.value)}}>
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
