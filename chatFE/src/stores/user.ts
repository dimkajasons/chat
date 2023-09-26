import { defineStore } from 'pinia';

// export const useUserStore = defineStore('userStore', () => {
//     const userName = ref('');

//     const setUserName = (name: string) => {
//         userName.value = name;
//     };

//     return { userName, setUserName };
// });

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userName: '',
    }),
    getters: {
        getUserName: (state) => state.userName,
    },
    actions: {
        setUserName(userName: string) {
            this.userName = userName;
        },
    },
});
