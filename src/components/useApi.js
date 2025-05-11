import axios from 'axios';

const useApi = () => {
  const sendRequest = async (apiUrl, method = 'GET', data = null, id = null) => {
    try {
      let url = apiUrl;
      
      // If an ID is provided for PUT or DELETE, append it to the URL
      if (id && (method === 'PUT' || method === 'DELETE')) {
        url = `${apiUrl}?id=${id}`;
      }

      const response = await axios({
        url,
        method,
        data: method === 'GET' || method === 'DELETE' ? null : data, // GET & DELETE don't send data
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data; // Return response to be used in components
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return { sendRequest };
};

export default useApi;
