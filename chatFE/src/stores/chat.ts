import { defineStore } from 'pinia';

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        activeChatUser: '',
    }),
    getters: {
        getActiveChatUser: (state) => state.activeChatUser,
    },
    actions: {
        setActiveChatUser(userName: string) {
            this.activeChatUser = userName;
        },
    },
});
