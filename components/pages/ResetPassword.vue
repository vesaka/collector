<template>
    <AuthForm
        name="login-form"
        title-image="forgot-password-1.png"
        :submit="onSubmit"
        :auth="auth">
        <div class="form-group">
                <input type="hidden" v-model="auth.email"/>
                <input type="hidden" v-model="auth.token"/>
                <input type="password" :placeholder="t('reset-password.password.placeholder')" v-model="auth.password" autocomplete="new-password"/>
                <input type="password" :placeholder="t('reset-password.password.placeholder')" v-model="auth.password_confirmation" autocomplete="new-password"/>
            </div>
        <template #footer>
            <p><RouterLink class="reg-play-link" :to="LOGIN_PATH" v-html="t('forgot-password.login', 'Login')"></RouterLink></p>
        </template>
        <template #redirect>
            <h2 class="text-center" v-html="t('reset-password.onSucess')"></h2>
            <p><RouterLink class="reg-play-link" :to="LOGIN_PATH" v-html="t('forgot-password.login', 'Login')"></RouterLink></p>
        </template>
    </AuthForm>
</template>
<script setup>

    import { reactive } from 'vue';
    import AuthForm from '$collector/components/ui/AuthForm.vue';
    import { LOGIN_PATH } from '$collector/bootstrap/paths.js';
    import api from '$core/services/laravel-api';
    import { t } from '$core/utils/i18n';
    import { useRoute } from 'vue-router'

    const route = useRoute();

    const auth = reactive({
        email: route.query.email,
        token: route.params.token,
        password: '',
        password_confirmation: ''
    });
    
    const onSubmit = () => {
        return api.post('reset-password', auth);
    };

</script>