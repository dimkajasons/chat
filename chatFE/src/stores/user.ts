import { defineStore } from 'pinia';
import { loginUser, registerUser } from '../services/users.service';
import { createSocketService } from '@/socket';
import { type UserModel } from '../types/users';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userName: '',
        isAuthorized: false,
    }),
    getters: {
        getUserName: (state) => state.userName,
    },
    actions: {
        async login(userData: UserModel) {
            const { userName, password } = userData;
            try {
                const response = await loginUser(userName);
                createSocketService(userName);
                this.userName = userName;
                console.log(response);
            } catch (error) {
                // handle error
            }
        },
        async register(userData: UserModel) {
            const { userName, password } = userData;
            try {
                const response = await registerUser(userData);
                this.userName = userName;
                console.log(response);
            } catch (error) {
                // handle error
            }
        },
    },
});
