<script setup lang="ts">
import { useDialog, NInput } from 'naive-ui';
import { useUserStore } from '../stores/user';
import { ref, onMounted, h } from 'vue';

const { setUserName } = useUserStore();
const userName = ref('');

const handleUserNameChange = (value: string) => {
    userName.value = value;
};
const handlePositiveClick = () => {
    setUserName(userName.value);
};

const dialog = useDialog();
onMounted(() => {
    dialog.create({
        title: 'Choose User name',
        positiveText: 'Continue',
        content: () => h(NInput, { value: userName.value, onUpdateValue: handleUserNameChange }),
        onPositiveClick: handlePositiveClick,
    });
});
</script>

<template><div></div></template>
