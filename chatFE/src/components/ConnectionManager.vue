<script setup lang="ts">
import { socket } from '@/socket';
import { NButton } from 'naive-ui';

const connect = () => socket.connect();

const disconnect = () => socket.disconnect();
</script>

<template>
    <n-button type="success" @click="connect()">Connect</n-button>
    <n-button type="error" @click="disconnect()">Disconnect</n-button>
</template>
