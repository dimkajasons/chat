<script setup lang="ts">
import { state as socketState } from '@/socket';
import { CheckmarkCircle } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
</script>

<template>
    <div class="connection-state">
        <n-icon size="40" :color="socketState.connected ? '#0e7a0d' : undefined">
            <checkmark-circle />
        </n-icon>
        <!-- <p>State: {{ socketState.connected }}</p> -->
        <p>User: {{ userStore.userName }}</p>
    </div>
</template>

<style>
.connection-state {
    display: flex;
    align-items: center;
}
</style>
