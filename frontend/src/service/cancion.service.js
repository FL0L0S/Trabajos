import axios from 'axios'
const urlResource = "http://localhost:3000/canciones";

async function getCancion() {
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

const borrar = async (idCancion) => {
  const url = `${urlResource}/${idCancion}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (idCancion) => {
    const url = `${urlResource}/${idCancion}`
    const result = await axios.get(url)
    return result.data
}

const put = async (cancion) => {
    const url = `${urlResource}/${cancion.IdCancion}`;
    console.log("Datos en service", cancion);
    
    const result = await axios.put(url, cancion);
    console.log("Respuesta del servidor:", result.data); // Confirma que los datos se actualizaron
    return result.data;
};





export const cancionService = {
    getCancion,
    getByFilters,
    save,
    getById,
    put,
    borrar
};


