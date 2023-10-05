import { defineStore } from 'pinia';

export type ChatMessage = {
    messageText: string;
    userFrom: string;
    userTo: string;
    isMineMessage: boolean;
    timeStamp?: number;
};

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        activeChatUser: '',
        chatMapByUser: {} as Record<string, ChatMessage[]>,
    }),
    getters: {
        getActiveChatUser: (state) => state.activeChatUser,
        getChatByActiveChatUser: (state) => state.chatMapByUser[state.activeChatUser],
    },
    actions: {
        setActiveChatUser(userName: string) {
            this.activeChatUser = userName;
        },
        addChatMessage(chatMessage: ChatMessage) {
            const { isMineMessage, userFrom, userTo } = chatMessage;
            const chatUserKey = isMineMessage ? userTo : userFrom;
            if (this.chatMapByUser[chatUserKey]) {
                this.chatMapByUser[chatUserKey] = [...this.chatMapByUser[chatUserKey], chatMessage];
            } else {
                this.chatMapByUser[chatUserKey] = [chatMessage];
            }
        },
    },
});
