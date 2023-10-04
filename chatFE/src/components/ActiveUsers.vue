<script setup lang="ts">
import { state as socketState } from '@/socket';
import UserCard from './UserCard.vue';
</script>

<template>
    <div class="active-users">
        <div>Active Users</div>
        <ul class="users-list">
            <template v-bind:key="activeUser" v-for="activeUser in socketState.activeUsers">
                <UserCard :user-name="activeUser.userName" />
            </template>
        </ul>
    </div>
</template>

<style scoped>
.active-users {
    margin-top: 15px;
}
.users-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
