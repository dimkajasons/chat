<script setup lang="ts">
import { defineProps } from 'vue';
import type { ChatMessage } from '@/stores/chat';

const { chatMessage } = defineProps<{ chatMessage: ChatMessage }>();
const { isMineMessage, userFrom, messageText } = chatMessage;

const messageInfo = isMineMessage ? '' : userFrom;
</script>

<template>
    <div :class="['chat-message-wrapper', isMineMessage ? 'alighn-right' : 'align-left']">
        <div class="chat-message">
            <div class="message-info">{{ messageInfo }}</div>
            <div :class="['message-text', isMineMessage ? 'alighn-right' : 'align-left']">
                {{ messageText }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-message-wrapper {
    width: 100%;
    display: flex;
    &.alighn-right {
        justify-content: flex-end;
    }
    &.alighn-left {
        justify-content: flex-start;
    }
}
.chat-message {
    width: 80%;
    overflow: hidden;
}
.message-info {
    padding: 0 10px;
    font-style: italic;
    font-size: 12px;
}
.message-text {
    border: solid var(--border) 1px;
    border-radius: 10px;
    padding: 10px;
    &.alighn-right {
        text-align: right;
    }
    &.alighn-left {
        text-align: left;
    }
}
</style>
