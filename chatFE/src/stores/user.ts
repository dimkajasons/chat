import { defineStore } from 'pinia';
import { loginUser, registerUser } from '../services/users.service';
import { createSocketService } from '@/socket';
import { type UserModel } from '../types/users';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userName: '',
        isAuthorized: false,
        isLoading: false,
    }),
    getters: {
        getUserName: (state) => state.userName,
    },
    actions: {
        async login(userData: UserModel) {
            const { userName } = userData;
            this.isLoading = true;
            try {
                const response = await loginUser(userName);
                createSocketService(userName);
                this.userName = userName;
                console.log(response);
            } catch (error) {
                // handle error
            } finally {
                this.isLoading = false;
            }
        },
        async register(userData: UserModel) {
            this.isLoading = true;
            try {
                const response = await registerUser(userData);
                console.log(response);
            } catch (error) {
                // handle error
            } finally {
                this.isLoading = false;
            }
        },
    },
});
