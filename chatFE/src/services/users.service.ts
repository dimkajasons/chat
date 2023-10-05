import axios from 'axios';

export const loginUser = async (name: string) => {
    const response = await axios.post(`http://${import.meta.env.VITE_ASSET_URL}:3000/users/login`, {
        name,
    });
    return response;
};
