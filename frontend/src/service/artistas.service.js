import axios from 'axios'
const urlResource = "http://localhost:3000/artistas";

async function getArtistas() {
    const resp = await axios.get(`${urlResource}`);
    return resp.data;
}

async function save(item) {
  
      await axios.post(urlResource, item);
  
  }
  

  const getByFilters = async (filtros) => {
    try {
        const response = await axios.get(`${urlResource}`);
        console.log("Datos recibidos:", response.data); // Verifica los datos recibidos
        
        const resultado = response.data.filter((p) => {
            return p.Nombre.toLocaleLowerCase().includes(filtros.Nombre.toLocaleLowerCase());
        });
        console.log(resultado);
        
        return resultado;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
};

const borrar = async (idArtista) => {
  const url = `${urlResource}/${idArtista}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (idArtista) => {
    const url = `${urlResource}/${idArtista}`
    const result = await axios.get(url)
    return result.data
}

const put = async (artista) => {
    const url = `${urlResource}/${artista.IdArtista}`
    const result = await axios.put(url, artista)
    return result.data
}



export const artistasService = {
    getArtistas,
    getByFilters,
    getById,
    save,
    put,
    borrar
};
