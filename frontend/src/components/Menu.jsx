import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../service/auth.service';

export default function Menu() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(
        AuthService.getUsuarioLogueado()
    );

    function CambioUsuarioLogueado(_usuarioLogueado) {
        setUsuarioLogueado(_usuarioLogueado);
    }

    useEffect(() => {
        AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
        return () => {
            AuthService.subscribeUsuarioLogueado(null);
        }
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setUsuarioLogueado(null);
    };

    return (
        <Navbar bg="primary" data-bs-theme="white">
            <Container>
                <Navbar.Brand href="/home" className="text-white">Inicio</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/bandas" className="text-white border-end">Bandas</Nav.Link>
                    <Nav.Link href="/artistas" className="text-white border-end">Artistas</Nav.Link>
                    <Nav.Link href="/albums" className="text-white border-end">Albums</Nav.Link>
                    <Nav.Link href="/canciones" className="text-white border-end">Canciones</Nav.Link>
                    <Nav.Link href="/tours" className="text-white border-end">Tours</Nav.Link>
                    <Nav.Link href="/recitales" className="text-white border-end">Recitales</Nav.Link>
                    <Nav.Link href="/discograficas" className="text-white border-end">Discográficas</Nav.Link>
                    <Nav.Link href="/videos" className="text-white border-end">VideoClips</Nav.Link>
                    <Nav.Link href="/bandasJWT" className="text-white">BandasJWT</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {usuarioLogueado ? (
                        <>
                            <Nav className="text-white"><span className="badge text-bg-success mt-2 h-75 fs-6 lh-base">Bienvenido: {usuarioLogueado}</span></Nav>
                            
                            <Nav.Link href="/login">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="/login">
                            <button className="btn btn-success">Inicio de sesión</button>
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
