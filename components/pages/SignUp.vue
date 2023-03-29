<template>
        <AuthForm
                  title-image="Register-H.svg"
                  :submit="onSubmit">
            <div class="form-group">
                <input type="text" :placeholder="t('register.username.placeholder', 'Enter your username')" v-model="auth.username"/>
                <input type="email" placeholder="youremail@email.com" v-model="auth.email" autocomplete=""/>
            </div>
            <div class="form-group">
                <input type="password" :placeholder="t('register.password.placeholder', 'Create a password')" v-model="auth.password" autocomplete="new-password"/>
                <input type="password" :placeholder="t('register.confirm-password.placeholder', 'Confirm your password')" v-model="auth.password_confirmation" autocomplete="new-password"/>
            </div>
            <div class="form-group checkbox-group">
                <input type="checkbox" value="1" v-model="auth.accept">
                <span class="checkmark"></span>
                <label>
                    <span class="mr-1" v-html="t('register.accept')"></span> 
                    <a :href="TERMS_EXTERNAL" v-html="t('register.terms', 'terms & conditions')" target="_blank"></a>
                </label>
            </div>
            <template #footer>
                <p>
                    <span class="mr-1" v-html="t('register.continue', 'Continue as a')"></span>
                    <RouterLink class="mr-1" :to="PLAY_PATH" v-html="t('register.guest', 'guest ')"></RouterLink>
                    <span class="mr-1" v-html="t('register.or', 'or ')"></span>
                    <RouterLink class="mr-1" :to="LOGIN_PATH" v-html="t('register.login', 'login ')"></RouterLink>
                </p>
            </template>
            <template #redirect>
                <ImageTitle src="thank-you.png" class="w-50 mx-auto"/>
                <p class="text-center" v-html="t('register.check-email', 'Please check you email to confirm your registration')"></p>
            </template>
        </AuthForm>
</template>
<script setup>
    import { reactive, ref, computed, watch } from 'vue';
    import AuthForm from '$collector/components/ui/AuthForm.vue';
    import ImageTitle from '$collector/components/ui/ImageTitle.vue';
    import api from '$core/services/laravel-api.js';
    import { useRouter } from 'vue-router';
    import { svg, PLAY_PATH, LOGIN_PATH, TERMS_EXTERNAL } from '$collector/bootstrap/paths.js'
    import { t } from '$core/utils/i18n';


//    const auth = reactive({
//        username: 'vesakahotmail',
//        email: 'vesaka_bgr@hotmail.com',
//        password: '12345678',
//        password_confirmation: '12345678',
//        accept: '',
//        recycling: true
//    });
    
    const auth = reactive({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        accept: '',
        recycling: true
    });
    
    const onSubmit = () => {
//        return new Promise((done, fail) => {
//            setTimeout(done, 2000);
//        }).then(() => {
//            console.log('SUBMITED');
//        }).catch(() => {
//            console.log('FAIL');
//        });
        return api.register(auth);
    };

</script>
