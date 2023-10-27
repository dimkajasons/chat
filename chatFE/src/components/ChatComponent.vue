<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { NInputGroup, NInput, NButton } from 'naive-ui';
import { state as socketState } from '@/socket';
import ChatMessage from './ChatMessage.vue';
import { useUserStore } from '../stores/user';
import { useChatStore } from '../stores/chat';

const userStore = useUserStore();
const chatStore = useChatStore();
const { activeChatUser, getChatByActiveChatUser } = storeToRefs(chatStore);
const { addChatMessage } = chatStore;

const messageText = ref('');
const activeChat = getChatByActiveChatUser;

const handleSend = () => {
    if (!messageText.value) return;
    console.log(messageText.value);
    const message = {
        userFrom: userStore.userName,
        messageText: messageText.value,
        userTo: activeChatUser.value,
        isMineMessage: true,
    };

    addChatMessage(message);
    socketState.socket.emit('chat-message', message);
    messageText.value = '';
};
</script>

<template>
    <div class="chat-component">
        <div class="chat-container">
            <ul class="message-list">
                <template v-bind:key="chatMessage.timestamp" v-for="chatMessage in activeChat">
                    <ChatMessage :chatMessage="chatMessage" />
                </template>
            </ul>
        </div>
        <div class="input-component">
            <n-input-group class="input-group">
                <n-input
                    type="textarea"
                    v-model:value="messageText"
                    @keypress.prevent.enter="handleSend"
                    :autosize="{
                        maxRows: 3,
                    }"
                />
                <n-button @click="handleSend" type="primary" ghost> Send </n-button>
            </n-input-group>
        </div>
    </div>
</template>

<style>
.chat-component {
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: column;
}
.chat-container {
    flex-grow: 1;
}
.message-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.input-component {
    margin-bottom: 10px;
}
.input-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>
