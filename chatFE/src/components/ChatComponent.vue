<script setup lang="ts">
import { ref } from 'vue';
import { NInputGroup, NInput, NButton } from 'naive-ui';
import { socket } from '@/socket';

const message = ref('');

const handleSend = () => {
    console.log(message.value);

    socket.emit('chat-message', message.value);
};
const handleUpdateValue = (value: string) => {
    message.value = value;
};
</script>

<template>
    <n-input-group class="input-group">
        <n-input :value="message" @update:value="handleUpdateValue" :style="{ width: '50%' }" />
        <n-button @click="handleSend" type="primary" ghost> Send </n-button>
    </n-input-group>
</template>

<style>
.input-group {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
