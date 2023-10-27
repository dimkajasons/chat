<script setup lang="ts">
import { NDialogProvider, NConfigProvider } from 'naive-ui';
import LoginPopup from './components/LoginPopup.vue';
import ChatComponent from './components/ChatComponent.vue';
import SidePanel from './components/SidePanel.vue';
import { darkTheme } from 'naive-ui';
</script>

<template>
    <div class="wrapper">
        <n-config-provider :abstract="true" :theme="darkTheme">
            <n-dialog-provider>
                <div class="side-panel">
                    <SidePanel />
                </div>
                <div class="chat-panel">
                    <ChatComponent />
                </div>
                <LoginPopup />
            </n-dialog-provider>
        </n-config-provider>
    </div>
</template>

<style scoped>
.wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
}
.side-panel {
    min-width: 250px;
    width: 250px;
}
.chat-panel {
    overflow: hidden;
    flex-grow: 1;
}
</style>
