<template>
    <div class="d-flex flex-column align-items-center">
        <div class="col-md-12 home-title">
            <img :src="svg('EAD-Recycling')">
        </div>
        <div class="col-md-12 reg-play" v-if="false === loggedIn">
            <RouterLink :to="SIGNUP_PATH">
                <img :src="svg('Register')">
                <span v-html="t('intro.register', 'Register')"></span>
            </RouterLink>

            <RouterLink :to="PLAY_PATH">
                <img :src="svg('Play-btn')">
                <span v-html="t('intro.as-guest', 'Play as guest')"></span>
            </RouterLink>
        </div>
        <div class="col-md-12 reg-play" v-else>
            <RouterLink :to="LEADERBOARD_PATH">
                <img :src="svg('Leaderboard-button')" style="width: 98px; height: 98px;">
                <span v-html="t('intro.leaderboard', 'Leaderboard')"></span>
            </RouterLink>

            <RouterLink :to="PLAY_PATH">
                <img :src="svg('Play-btn')">
                <span v-html="t('intro.play', 'Play as guest')"></span>
            </RouterLink>
        </div>
        <div class="col-md-12">
            <RouterLink :to="LOGIN_PATH" class="reg-play-link" v-if="false === loggedIn">
                <span v-html="t('intro.with-account', 'already have an account?')"></span>
            </RouterLink>
        </div>
        <div class="col-md-12 click-to-play">
            <div class="d-none d-sm-block">
                <img :src="svg('mouse-left-click')">
                <p v-html="t('tutorial.desktop')"></p>
            </div>
            <div class=" d-sm-none">
                <img :src="svg('mob-indi')">
                <p v-html="t('tutorial.mobile')"></p>
            </div>
        </div>
        <Logout v-if="false"/>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { svg, SIGNUP_PATH, PLAY_PATH, LOGIN_PATH, LEADERBOARD_PATH} from '$collector/bootstrap/paths';
    import { t } from '$core/utils/i18n';
    import Logout from '../ui/Logout.vue';
    import { useAuthStore } from '$collector/stores/auth.store.js';
    const store = useAuthStore();
    
    const loggedIn = computed(() => {
        return true === store.loggedIn;
    });
        
</script>
