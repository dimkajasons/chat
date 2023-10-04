import { defineStore } from 'pinia';
import { loginUser } from '../services/users.service';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userName: '',
    }),
    getters: {
        getUserName: (state) => state.userName,
    },
    actions: {
        async login(userName: string) {
            try {
                const response = await loginUser(userName);
                this.userName = userName;
                console.log(response);
            } catch (error) {
                // handle error
            }
        },
    },
});
