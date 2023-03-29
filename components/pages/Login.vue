<template>
    <AuthForm name="login-form"
              title-image="Login.svg"
              :submit="onSubmit">
        <div class="form-group">
            <input type="text" name="username" :placeholder="t('login.username.placeholder')" v-model="auth.username">
            <input type="password" name="password" :placeholder="t('login.password.placeholder')" v-model="auth.password">
        </div>
        <template #footer>
            <p><RouterLink class="reg-play-link" :to="FORGOT_PASSWORD_PATH" v-html="t('login.forgot-password', 'Forgot your password?')"></RouterLink></p>
        </template>
    </AuthForm>
</template>
<script setup>
    import { reactive  } from 'vue';
    import AuthForm from '$collector/components/ui/AuthForm.vue';
    import api from '$core/services/laravel-api.js';
    import { raw }from '$core/utils/object.js';

    import { t } from '$core/utils/i18n';
    import { asset, FORGOT_PASSWORD_PATH, BASE, PLAY_PATH } from '$collector/bootstrap/paths';
    import { useAuthStore } from '$collector/stores/auth.store.js';
    import { useRouter } from 'vue-router';
    const authStore = useAuthStore();

//    const auth = reactive({
//        username: 'vesakabgr',
//        password: '12345678'
//    });
    
    const auth = reactive({
        username: '',
        password: ''
    });

    const router = useRouter();

    const onSubmit = () => {
        return api.login(raw(auth))
                .then(({data}) => {
                    authStore.login(data);
                    api.updateCsrf(data.csrf);
                    //router.push(BASE);
                    window.location.href = PLAY_PATH;
                });
    };
</script>



