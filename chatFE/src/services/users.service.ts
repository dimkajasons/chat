import type { UserModel } from '@/types/users';
import axios from 'axios';

export const loginUser = async (name: string) => {
    const response = await axios.post(`http://${import.meta.env.VITE_ASSET_URL}:3000/users/login`, {
        name,
    });
    return response;
};
export const registerUser = async (user: UserModel) => {
    const response = await axios.post(
        `http://${import.meta.env.VITE_ASSET_URL}:3000/users/register`,
        {
            name: user.userName,
            password: user.password,
        },
    );
    return response;
};
