import axios from 'axios';

export const loginUser = async (name: string) => {
    const response = await axios.post('http://localhost:3000/users/login', { name });
    return response;
};
