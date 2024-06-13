import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
 
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
   
} 
 

const getAll = async () => {
  
  try {
    // Configurar los encabezados de la solicitud con el token de autorización
    const config = {
      headers: {
        Authorization: token,
      },
    };
    // Realizar una solicitud GET a la URL base con la configuración de los encabezados
    const response = await axios.get(baseUrl, config);

    // Devolver los datos de la respuesta  
    return response.data;
  } catch (error) {
    // Manejar errores aquí (por ejemplo, si la solicitud falla)
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

 

const create = async (newObject) => {
  try {
    // Configurar los encabezados de la solicitud con el token de autorización
    const config = {
      headers: {
        Authorization: token,
      },
    };

    
    const response = await axios.post(baseUrl, newObject, config);

    // Devolver los datos de la respuesta
    return response.data;
  } catch (error) {
    // Manejar errores aquí (por ejemplo, si la solicitud falla)
    console.error("Error al crear el objeto:", error);
    throw error;
  }
};
 

const update = async (id, updatedBlog) => {
  
  try {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar:", error);
    throw error; // Puedes manejar el error aquí o propagarlo hacia arriba
  }
};


const deleteObject = async (id) => {
     try{
      const config = {
        headers: { Authorization: token },
      };
       

      const response = await axios.delete(`${baseUrl}/${id}`, config)
      return response.data;
     }catch{
      console.error("Error al hacer la eliminacion:");
     }
}


export default { getAll, setToken, create,update, deleteObject }