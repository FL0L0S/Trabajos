import axios from 'axios'
const urlResource = "http://localhost:3000/recitales";

async function getRecital() {
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
            return p.Lugar.toLocaleLowerCase().includes(filtros.Lugar.toLocaleLowerCase());
        });
        console.log(resultado);
        
        return resultado;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
};

const borrar = async (idRecital) => {
  const url = `${urlResource}/${idRecital}`
  const result = await axios.delete(url)
  return result.data
}

const getById = async (idRecital) => {
    const url = `${urlResource}/${idRecital}`
    const result = await axios.get(url)
    return result.data
}

const put = async (recital) => {
    const url = `${urlResource}/${recital.IdRecital}`;
    console.log("Datos en service", recital);
    
    const result = await axios.put(url, recital);
    console.log("Respuesta del servidor:", result.data); // Confirma que los datos se actualizaron
    return result.data;
};

export const recitalService = {
    getRecital,
    getByFilters,
    save,
    getById,
    put,
    borrar
};


