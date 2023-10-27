<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { partial } from 'lodash';
import {
    useDialog,
    NInput,
    NButton,
    NForm,
    NFormItem,
    NCard,
    NTabs,
    NTabPane,
    type FormInst,
    type FormItemRule,
    type FormRules,
} from 'naive-ui';
import { useUserStore } from '../stores/user';
import { ref, reactive } from 'vue';

enum FormTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
}

type FormData = {
    userName: string;
    password: string;
    reenteredPassword?: string;
};

const initialFormData: FormData = { userName: '', password: '', reenteredPassword: '' };

const formRef = ref<FormInst | null>(null);
const currentForm = ref<FormTypes>(FormTypes.SIGN_IN);
const formData = ref<FormData>({ ...initialFormData });

const userStore = useUserStore();
const { isAuthorized, isLoading } = storeToRefs(userStore);

const handleSubmit = async () => {
    const isValid = await formRef.value?.validate();
    if (!isValid) return;

    if (currentForm.value === FormTypes.SIGN_IN) {
        userStore.login(formData.value);
    } else {
        userStore.register(formData.value);
    }
};

const handleTabChange = (nextTab: FormTypes) => {
    formData.value = { ...initialFormData };

    currentForm.value = nextTab;
};

const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
    return value === formData.value.password;
};
const loginRules: FormRules = {
    userName: [
        {
            required: true,
            message: 'User Name is required',
        },
    ],
    password: [
        {
            required: true,
            message: 'Password is required',
        },
    ],
};
const registerRules = {
    ...loginRules,
    reenteredPassword: [
        {
            required: true,
            message: 'Re-entered password is required',
            trigger: ['input', 'blur'],
        },
        {
            validator: validatePasswordSame,
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input'],
        },
    ],
};
</script>

<template>
    <!-- move to separate component -->
    <div v-if="!isAuthorized" class="overlay"></div>
    <div class="dialog">
        <div class="body">
            <NCard>
                <NTabs
                    class="card-tabs"
                    :default-value="currentForm"
                    size="large"
                    animated
                    pane-wrapper-style="margin: 0 -4px"
                    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
                    :on-update:value="handleTabChange"
                >
                    <NTabPane :name="FormTypes.SIGN_IN" tab="Sign in">
                        <NForm class="form" ref="formRef" :model="formData" :rules="loginRules">
                            <NFormItem class="form-item" path="userName" label="User name">
                                <NInput
                                    class="form-input"
                                    placeholder="Enter UserName"
                                    v-model:value="formData.userName"
                                    @keydown.enter.prevent
                                />
                            </NFormItem>
                            <NFormItem class="form-item" path="password" label="Password">
                                <NInput
                                    v-model:value="formData.password"
                                    placeholder="Enter Password"
                                    type="password"
                                    @keydown.enter.prevent
                                />
                            </NFormItem>
                            <NButton
                                class="submit-btn"
                                :loading="isLoading"
                                :on-click="handleSubmit"
                                type="primary"
                            >
                                Login
                            </NButton>
                        </NForm>
                    </NTabPane>
                    <NTabPane :name="FormTypes.SIGN_UP" tab="Sign up">
                        <NForm class="form" ref="formRef" :model="formData" :rules="registerRules">
                            <NFormItem class="form-item" path="userName" label="User name">
                                <NInput
                                    class="form-input"
                                    placeholder="Enter UserName"
                                    v-model:value="formData.userName"
                                    @keydown.enter.prevent
                                />
                            </NFormItem>
                            <NFormItem class="form-item" path="password" label="Password">
                                <NInput
                                    v-model:value="formData.password"
                                    placeholder="Enter Password"
                                    type="password"
                                    @keydown.enter.prevent
                                />
                            </NFormItem>
                            <NFormItem
                                class="form-item"
                                path="reenteredPassword"
                                label="Reenter Password"
                            >
                                <NInput
                                    v-model:value="formData.reenteredPassword"
                                    placeholder="Reenter Password"
                                    type="password"
                                    @keydown.enter.prevent
                                />
                            </NFormItem>
                            <NButton
                                class="submit-btn"
                                :loading="isLoading"
                                :on-click="handleSubmit"
                                type="primary"
                            >
                                Register
                            </NButton>
                        </NForm>
                    </NTabPane>
                </NTabs>
            </NCard>
        </div>
        <div class="footer"></div>
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
    width: 400px;
    position: fixed;
    background-color: var(--secondary);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 15px;
}
.form {
    display: flex;
    flex-direction: column;
}
.footer {
    display: flex;
    justify-content: flex-end;
}
.submit-btn {
    float: right;
}
</style>
