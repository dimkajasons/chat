import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', () => {
    const userName = ref('');

    const setUserName = (name: string) => {
        userName.value = name;
    };

    return { userName, setUserName };
});
