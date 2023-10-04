<script setup lang="ts">
import { state as socketState } from '@/socket';
import { NButton } from 'naive-ui';

const connect = () => socketState.socket.connect();

const disconnect = () => socketState.socket.disconnect();
</script>

<template>
    <n-button type="success" @click="connect()">Connect</n-button>
    <n-button type="error" @click="disconnect()">Disconnect</n-button>
</template>
