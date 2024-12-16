import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Footer() {
  return (
    <>
      <br />
      <footer className="bg-primary text-white py-3 mt-auto">
        
        <Container className="d-flex justify-content-between align-items-center">
          <p className="mb-0">&copy; 2024 Grupo-#</p>
          <nav>
            <a href="/home" className="text-white text-decoration-none mx-2">Inicio</a>
            <a 
              href="https://www.frc.utn.edu.ar/" 
              className="text-white text-decoration-none mx-2" 
              target='_blank' 
              rel="noopener noreferrer"
            >
              Contacto
            </a>
            <a 
              href="https://www.youtube.com/watch?v=qoYtC8T0lyE&list=PLgymYbQ4Ewf9Yys2e-YXIJav71SdPbCYH&index=1" 
              className="text-white text-decoration-none mx-2" 
              target='_blank' 
              rel="noopener noreferrer"
            >
              Sobre Nosotros
            </a>
          </nav>
        </Container>
      </footer>
    </>
  );
}
