<script setup lang="ts">
import { useDialog, NInput } from 'naive-ui';
import { useUserStore } from '../stores/user';
import { ref, onMounted, h } from 'vue';
import { createSocketService } from '@/socket';

const userStore = useUserStore();
const userName = ref('');

const handleUserNameChange = (value: string) => {
    userName.value = value;
};
const handlePositiveClick = () => {
    userStore.login(userName.value);
    createSocketService(userName.value);
};

const dialog = useDialog();
onMounted(() => {
    dialog.create({
        title: 'Choose User name',
        positiveText: 'Continue',
        content: () => h(NInput, { value: userName.value, onUpdateValue: handleUserNameChange }),
        onPositiveClick: handlePositiveClick,
        closable: false,
        closeOnEsc: false,
        maskClosable: false,
    });
});
</script>

<template><div></div></template>
