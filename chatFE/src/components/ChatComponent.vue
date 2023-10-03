<script setup lang="ts">
import { ref } from 'vue';
import { NInputGroup, NInput, NButton } from 'naive-ui';
import { socket } from '@/socket';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const message = ref('');

const handleSend = () => {
    console.log(message.value);

    socket.emit('chat-message', { userName: userStore.userName, message: message.value });
};
const handleUpdateValue = (value: string) => {
    message.value = value;
};
</script>

<template>
    <div class="chat-component">
        <div class="chat-container"></div>
        <div class="input-component">
            <n-input-group class="input-group">
                <n-input
                    type="textarea"
                    :autosize="{
                        maxRows: 1,
                    }"
                    :value="message"
                    @update:value="handleUpdateValue"
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
.input-component {
    height: 70px;
}
.input-group {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
