<script setup lang="ts">
import { state as socketState } from '@/socket';
</script>

<template>
    <div class="active-users-list">
        <div>Active Users</div>
        <li v-bind:key="activeUser" v-for="activeUser in socketState.activeUsers">
            {{ activeUser }}
        </li>
    </div>
</template>

<style scoped></style>
