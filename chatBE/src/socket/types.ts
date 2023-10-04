import { EnumFromKeys } from '../utilities/type.utilities';

export const SocketEvents = {
	CONNECTION: 'connection',
	CONNECTED: 'connected',
	DISCONNECTED: 'disconnected',
	USER_CONNECTED: 'user-connected',
	USER_DISCONNECTED: 'user-disconnected',
	CHAT_MESSAGE: 'chat-message',
} as const;

export type SocketEvents = EnumFromKeys<typeof SocketEvents>;
