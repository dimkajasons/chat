<script setup lang="ts">
import ConnectionState from './ConnectionState.vue';
import ConnectionManager from './ConnectionManager.vue';
import ActiveUsers from './ActiveUsers.vue';
</script>

<template>
    <div>
        <div class="top-panel">
            <ConnectionState />
            <ConnectionManager />
            <ActiveUsers />
        </div>
    </div>
</template>

<style scoped></style>
