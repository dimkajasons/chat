<script setup lang="ts">
import { state } from '@/socket';
import { CheckmarkCircle } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <n-icon size="40">
            <checkmark-circle />
        </n-icon>
        <p>State: {{ state.connected }}</p>
        <p>User: {{ userStore.userName }}</p>
    </div>
</template>
