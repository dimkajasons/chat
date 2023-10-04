import { reactive } from 'vue';
import { io } from 'socket.io-client';

const mockUsers = [{ userName: 'testUser1' }, { userName: 'testUser4' }, { userName: 'testUser7' }];

export const state = reactive<any>({
    connected: false,
    activeUsers: mockUsers,
    messages: {},
    socketManager: null,
});

// const URL = process.env.NODE_ENV === 'production' ? null : 'http://localhost:3000'

export const createSocketService = (userName: string) => {
    const socket = io(`http://localhost:3000/${userName}`, {
        autoConnect: false,
        transports: ['websocket'],
    });

    state.socket = socket;

    socket.on('connect', () => {
        state.connected = true;
    });

    socket.on('disconnect', () => {
        state.connected = false;
    });

    socket.on('connected', (message) => {
        state.activeUsers = message.activeUsers;
    });

    socket.on('user-connected', (user: any) => {
        state.activeUsers.push(user);
    });
    socket.on('user-disconnected', (user: any) => {
        state.activeUsers = state.activeUsers.filter(
            (storedUser: any) => storedUser.name !== user.name,
        );
    });

    socket.on('chat-message', (message: any) => {
        if (state.messages[message.userFrom]) {
            state.messages[message.userFrom] = [message];
        } else {
            state.messages[message.userFrom].push(message);
        }
    });

    return socket; // TODO remove and use store
};
