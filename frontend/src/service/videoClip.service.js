import axios from 'axios'
const urlResource = "http://localhost:3000/videos";

async function getVideos() {
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
            return p.Titulo.toLocaleLowerCase().includes(filtros.Titulo.toLocaleLowerCase());
        });
        console.log(resultado);
        
        return resultado;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
};

const borrar = async (IdVideoClip) => {
  const url = `${urlResource}/${IdVideoClip}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (IdVideoClip) => {
    const url = `${urlResource}/${IdVideoClip}`
    const result = await axios.get(url)
    return result.data
}

const put = async (video) => {
    const url = `${urlResource}/${video.IdVideoClip}`;
    console.log("Datos en service", video);
    
    const result = await axios.put(url, video);
    console.log("Respuesta del servidor:", result.data); // Confirma que los datos se actualizaron
    return result.data;
};

export const videosService = {
    getVideos,
    getByFilters,
    save,
    getById,
    put,
    borrar
};
