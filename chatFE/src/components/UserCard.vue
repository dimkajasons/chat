<script setup lang="ts">
import { capitalize } from 'lodash';
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue';
import { ChatboxEllipses, Person } from '@vicons/ionicons5';
import { NIcon, NButton } from 'naive-ui';
import { useChatStore } from '@/stores/chat';

const { userName } = defineProps<{ userName: string }>();

const chatStore = useChatStore();
const { activeChatUser } = storeToRefs(chatStore);

const goToChat = () => {
    chatStore.setActiveChatUser(userName);
};
// const isActiveUserChat = ref(activeChatUser === userName);
</script>

<template>
    <div :class="['user-card', activeChatUser === userName ? 'active' : '']">
        <div class="user-info">
            <n-icon class="user-icon" size="30" color="#0e7a0d">
                <Person />
            </n-icon>
            <div class="user-name">{{ capitalize(userName) }}</div>
        </div>
        <n-button @click="goToChat" tertiary circle type="success">
            <template #icon>
                <n-icon><chatbox-ellipses /></n-icon>
            </template>
        </n-button>
    </div>
</template>

<style scoped>
.user-card {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--backgroundVariant);
    border: solid var(--border) 1px;
    border-radius: 10px;
    &.active {
        background-color: var(--intentPrimary);
    }
}
.user-info {
    display: flex;
    align-items: center;
}
.user-icon {
    width: 50px;
}
.user-name {
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
