<script setup lang="ts">
import { state } from '@/socket';
import { CheckmarkCircle } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
</script>

<template>
    <div>
        <n-icon size="40">
            <checkmark-circle />
        </n-icon>
        <p>State: {{ state.connected }}</p>
    </div>
</template>
