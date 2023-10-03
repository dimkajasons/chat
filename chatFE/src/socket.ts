import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive<any>({
    connected: false,
    activeUsers: [],
    messages: {},
});

// const URL = process.env.NODE_ENV === 'production' ? null : 'http://localhost:3000'

export const socket = io('http://localhost:3000', {
    autoConnect: false,
    transports: ['websocket'],
});

socket.on('connect', () => {
    state.connected = true;
});

socket.on('disconnect', () => {
    state.connected = false;
});

socket.on('user-connected', (user: any) => {
    state.activeUsers.push(user);
});
socket.on('user-disconnected', (user: any) => {
    state.activeUsers = state.activeUsers.filter(
        (storedUser: any) => storedUser.name !== user.name,
    );
});

socket.on('msg-received', (message: any) => {
    if (state.messages[message.user]) {
        state.messages[message.user] = [message];
    } else {
        state.messages[message.user].push(message);
    }
});
