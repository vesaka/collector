<template>
    <button class="btn btn-light" @click="logout()" style="z-index: 100">
        Logout
    </button>
</template>
<script setup>
    import { useAuthStore } from '$collector/stores/auth.store.js';
    import { useRouter } from 'vue-router';
    import { LOGIN_PATH } from '$collector/bootstrap/paths';
    import api from '$core/services/laravel-api';
    
    const store = useAuthStore();
    const router = useRouter();
    
    const logout = () => {
        store.logout();
                    
        api.post('logout')
                .then(({data}) => {
                    router.push(LOGIN_PATH);
                    api.updateCsrf(data.csrf)
                });
        
    };
</script>