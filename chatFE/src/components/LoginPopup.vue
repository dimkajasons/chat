<script setup lang="ts">
import { object, string } from 'yup';
import { storeToRefs } from 'pinia';
import { partial } from 'lodash';
import {
    useDialog,
    NInput,
    NButton,
    NForm,
    NFormItem,
    type FormInst,
    type FormItemRule,
    type FormRules,
} from 'naive-ui';
import { useUserStore } from '../stores/user';
import { ref, onMounted, h, markRaw, reactive } from 'vue';

enum FormTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
}

type FormData = {
    userName: string;
    firstName?: string;
    lastName?: string;
    password: string;
};

const formRef = ref<FormInst | null>(null);

const validateForm = (field) => {};

const userStore = useUserStore();
const { isAuthorized } = storeToRefs(userStore);

const userName = ref('');
const currentForm = ref<FormTypes>();
const formData = reactive<FormData>({ userName: '', password: '' });

const setFormData = (key: keyof FormData, value: string) => {
    formData[key] = value;
};

const handleUserNameChange = (value: string) => {
    userName.value = value;
};
const handleSubmit = () => {
    console.log(formData);
    userStore.register(formData);
};
</script>

<template>
    <!-- move to separate component -->
    <div v-if="!isAuthorized" class="overlay"></div>
    <div class="dialog">
        <div class="header">
            {{ currentForm === FormTypes.SIGN_IN ? 'Login' : 'Sign up' }}
        </div>
        <div class="body">
            <n-form ref="formRef" :model="formData">
                <n-form-item class="form-item" path="userName" label="User name">
                    <n-input
                        class="form-input"
                        placeholder="Enter UserName"
                        v-model:value="formData.userName"
                        @keydown.enter.prevent
                    />
                </n-form-item>
                <n-form-item class="form-item" path="password" label="Password">
                    <n-input
                        v-model:value="formData.password"
                        placeholder="Enter Password"
                        type="password"
                        @keydown.enter.prevent
                    />
                </n-form-item>
            </n-form>
            <!-- <n-input class="form-input" name="userName" :on-change="partial(setFormData, 'userName')"></n-input>
            <n-input  class="form-input"
                v-if="currentForm === FormTypes.SIGN_UP"
                name="firstName"
                :on-change="partial(setFormData, 'firstName')"
            ></n-input>
            <n-input  class="form-input"
                v-if="currentForm === FormTypes.SIGN_UP"
                name="lastName"
                :on-change="partial(setFormData, 'lastName')"
            ></n-input>
            <n-input placeholder="Enter Password" class="form-input" name="password" :on-change="partial(setFormData, 'password')"></n-input> -->
        </div>
        <div class="footer">
            <n-button :on-click="handleSubmit" type="primary">{{
                currentForm === FormTypes.SIGN_IN ? 'Login' : 'Sign up'
            }}</n-button>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: #fff;
    opacity: 0.3;
}
.dialog {
    width: 300px;
    position: fixed;
    background-color: var(--secondary);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 15px;
}
.footer {
    display: flex;
    justify-content: flex-end;
}
</style>
