<template>
    <Transition class="col-md-12 home-title" name="scale-in">
        <div class="socials-back" @click="() => store.socialsActive = false" v-if="areSocialsDisplayed">
            <div class="socials-pop" @click.stop="fn">
                <img :src="asset('Visit-Our-Socials.png')">
                    <button class="btn-close position-absolute" @click="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42.246" height="45.389" viewBox="0 0 42.246 45.389">
                            <g id="Wrong-answer" transform="translate(5540.717 20873.768)">
                                <rect id="Rectangle_12178" data-name="Rectangle 12178" width="48.991" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5533.94, -20870.164)" fill="#5e0b17"/>
                                <rect id="Rectangle_12177" data-name="Rectangle 12177" width="48.991" height="9.421" transform="translate(-5498.471 -20863.504) rotate(135)" fill="#5e0b17"/>
                                <rect id="Rectangle_12179" data-name="Rectangle 12179" width="48.991" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5533.94, -20873.768)" fill="#e50019"/>
                                <rect id="Rectangle_12183" data-name="Rectangle 12183" width="5.24" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5506.747, -20845.504)" fill="#ee5640"/>
                                <rect id="Rectangle_12184" data-name="Rectangle 12184" width="5.24" height="9.421" transform="translate(-5526.498 -20865.994) rotate(47)" fill="#ee5640"/>
                                <rect id="Rectangle_12180" data-name="Rectangle 12180" width="5.24" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5513.535, -20852.875)" fill="#ee5640"/>
                                <rect id="Rectangle_12181" data-name="Rectangle 12181" width="5.24" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5510.201, -20849.271)" fill="#f3795c"/>
                                <rect id="Rectangle_12185" data-name="Rectangle 12185" width="5.24" height="9.421" transform="matrix(0.695, 0.719, -0.719, 0.695, -5530.29, -20869.852)" fill="#f3795c"/>
                                <rect id="Rectangle_12182" data-name="Rectangle 12182" width="48.991" height="9.421" transform="translate(-5499.413 -20867.105) rotate(135)" fill="#e50019"/>
                            </g>
                        </svg>
                    </button>
                    <a class="btn-img" href="https://www.facebook.com/EnvironmentAbuDhabi/" target="_blank"><img :src="svg('FB')"></a>
                    <a class="btn-img" href="https://www.instagram.com/environmentabudhabi/?hl=en" target="_blank"><img :src="svg('Instagram')"></a>
                    <a class="btn-img" href="https://twitter.com/EADTweets" target="_blank"><img :src="svg('Twitter')"></a>
                    <a class="btn-img" href="https://www.linkedin.com/company/environment-agency-abu-dhabi/" target="_blank"><img :src="svg('LinkeIn')"></a>
            </div>
        </div>
    </Transition>
</template>
<script setup>
    import { reactive, ref, computed } from 'vue';
    import { asset, svg, PLAY_PATH, LOGIN_PATH, BASE } from '$collector/bootstrap/paths.js';
    import { useGameStore } from '$collector/stores/auth.store.js';
    import router from '$collector/bootstrap/router';

    const store = useGameStore();
    const socialToggler = document.querySelector('footer .social-toggler');
    const areSocialsDisplayed = computed(() => store.socialsActive);

    const fn = () => {};

    const close = () => {
        store.socialsActive = !store.socialsActive;
    };
    if (socialToggler) {
        socialToggler.addEventListener('click', close);
    }

    const logo = document.querySelector('main > a.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            router.push(BASE);
        });
    }
</script>
