import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Inicio from './components/Inicio';
import ConsultarBandas from './components/Bandas/ConsultarBandas';
import RegistrarBandas from './components/Bandas/RegistrarBanda'; 
//import EditarBandas from './components/Bandas/EditarBandas';
import ConsultarArtista from './components/Artista/ConsultarArtista';
import RegistrarArtista from './components/Artista/RegistrarArtista';
import EditarArtista from './components/Artista/EditarArtistas';
import ConsultarAlbums from './components/Album/ConsultarAlbums';
import RegistrarAlbums from './components/Album/RegistrarAlbum';
import EditarAlbums from './components/Album/EditarAlbums';
import ConsultarCancion from './components/Cancion/ConsultarCancion';
import RegistrarCancion from './components/Cancion/RegistrarCancion';
import EditarCancion from './components/Cancion/EditarCancion';
import ConsultarDiscografica from './components/Discografica/ConsultarDiscografica';
import RegistrarDiscografica from './components/Discografica/RegistrarDiscografica';
import EditarDiscografica from './components/Discografica/EditarDiscografica';
import ConsultarTours from './components/Tour/ConsultarTour';
import RegistrarTours from './components/Tour/RegistrarTours';
import EditarTours from './components/Tour/EditarTours';
import ConsultarVideoClip from './components/VideoClip/ConsultarVideoClip';
import RegistrarVideos from './components/VideoClip/RegistrarVideos';
import EditarVideos from './components/VideoClip/EditarVideos';
import ConsultarRecital from './components/Recital/ConsultarRecital';
import RegistrarRecital from './components/Recital/RegistrarRecital';
import EditarRecital from './components/Recital/EditarRecital';
import EditarBandasJWT from './components/BandasJWT/EditarBandasJWT';
import RegistrarBandasJWT from './components/BandasJWT/RegistrarBandasJWT';
import { ConsultarBandasJWT } from './components/BandasJWT/ConsultarBandasJWT';
import { RequireAuth } from './components/Login/RequiereAuth';
import { Login } from './components/Login/Login';
import Keycloak from 'keycloak-js';
import { useEffect } from 'react';


function App() {
  
  return (
    <div className='container'>
      <Menu></Menu>
      
      
      <div className='row'>
        <div className='col-12'>
          <Router>
            <div>
              <Routes>
              <Route path='/login' element={<Login />} />
                <Route path='/' element={<Inicio />} />
                <Route path='/home' element={<Inicio />} />
                <Route path='/bandas' element={<ConsultarBandas />} />
                <Route path='/bandas/registrar' element={<RegistrarBandas />} />
                <Route path='/artistas' element={<ConsultarArtista />} />
                <Route path='/artistas/registrar' element={<RegistrarArtista />} />
                <Route path='/artistas/editar/:id' element={<EditarArtista />} />
                <Route path='/albums' element={<ConsultarAlbums />} />
                <Route path='/albums/registrar' element={<RegistrarAlbums />} />
                <Route path='/albums/editar/:id' element={<EditarAlbums />} />
                <Route path='/canciones' element={<ConsultarCancion />} />
                <Route path='/canciones/registrar' element={<RegistrarCancion />} />
                <Route path='/canciones/editar/:id' element={<EditarCancion />} />
                <Route path='/discograficas' element={<ConsultarDiscografica />} />
                <Route path='/discograficas/registrar' element={<RegistrarDiscografica />} />
                <Route path='/discograficas/editar/:id' element={<EditarDiscografica />} />
                <Route path='/tours' element={<ConsultarTours />} />
                <Route path='/tours/registrar' element={<RegistrarTours />} />
                <Route path='/tours/editar/:id' element={<EditarTours />} />
                <Route path='/videos' element={<ConsultarVideoClip />} />
                <Route path='/videos/registrar' element={<RegistrarVideos />} />
                <Route path='/videos/editar/:id' element={<EditarVideos />} />
                <Route path='/recitales' element={<ConsultarRecital />} />
                <Route path='/recitales/registrar' element={<RegistrarRecital />} />
                <Route path='/recitales/editar/:id' element={<EditarRecital />} />
                <Route path='/bandasJWT' element={
                  <RequireAuth>
                    <ConsultarBandasJWT />
                  </RequireAuth>}></Route>
                  <Route path='/bandasJWT/editar/:id' element={
                  <RequireAuth>
                    <EditarBandasJWT />
                  </RequireAuth>}></Route>
                  <Route path='/bandasJWT/registrar' element={
                  <RequireAuth>
                    <RegistrarBandasJWT />
                  </RequireAuth>}></Route>
                  
              
              </Routes>
              
            </div>
          </Router>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
