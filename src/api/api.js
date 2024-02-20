import axios from 'axios';

const baseApi = axios.create({
  baseURL: `https://mocki.io/v1`,
});

const getFormData = async () => {
  try {
    const response = await baseApi.get('/77a3df71-02b1-4fb2-b3bc-d006652a36f7');

    return response;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export default { getFormData };
