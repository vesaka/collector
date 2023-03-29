<template>
    <RouterView v-slot="{ Component, route }">
        <component :is="Component" />
    </RouterView>
</template>
<script setup>
    import { useAuthStore } from '$collector/stores/auth.store.js';
    import { setLocales } from '$core/utils/i18n';
    import en from './assets/i18n/en.json';
    import './assets/styles/transitions.css';
    setLocales({en});

    const store = useAuthStore();
    if (window.user.token) {
        store.login(window.user);
    }



</script>