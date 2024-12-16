import React from 'react';
import Container from 'react-bootstrap/Container';
 // Archivo CSS para estilos adicionales

export default function Inicio() {
  return (
    <div>
      <Container className="text- inicio-container">
        <h1 className='text-center'>Información real de música</h1>
        <div className="text-center image-container-center">
          <img 
            src="/descarga.png" 
            alt="Imagen de Rock" 
            className="imagen-con-fondo" 
          />
          <img src="/UTN.png" 
            alt="Imagen de Rock" 
            className="imagen-con-fondo"></img>
        </div>
        <h2 className='text-center'>Trabajo practico integrador de Desarrollo de software</h2>
        <div class="accordion" id="accordionExample" >
            <div class="accordion-item ">
                <h2 class="accordion-header" className="text-danger">
                <button class="accordion-button text-bg-secondary  " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Integrantes
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul>
                    <li>Roman Medina</li>
                    <li>Nahuel Bria</li>
                    <li>Francisco Sanchez</li>
                    <li>Gonzalo Montes</li>
                  </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button text-bg-secondary  " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Informacion
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <p>Este proyecto de desarrollo de software consistió en la creación de una página web interactiva que muestra registros de bandas de rock. Para su implementación, se utilizaron HTML y CSS para estructurar y estilizar la interfaz, mientras que JavaScript y la librería React permitieron el desarrollo de componentes dinámicos y funcionales. Además, se incorporaron tecnologías adicionales para gestionar los datos de las bandas y asegurar una experiencia de usuario atractiva y eficiente.</p> </div>
                </div>
            </div>
            
            </div>
            
      </Container>
      <br />
    </div>
    
  );
}
