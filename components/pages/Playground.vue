<template>
    <div id="fullscreen-container" class="d-flex align-items-center position-relative">
        <div ref="container" :class="classList"></div>
        <div :class="rotateClass">
            <img :src="svg('mob-indi')">
            <p v-html="t('tutorial.enjoy')"></p>
            <p v-html="t('tutorial.rotate')"></p>
        </div>
        <InGameScreens ref="inGameScreen" :screen="screen" @action="emit" :class="classList"/>
    </div>
</template>
<script>
    import { computed, ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
    import InGameScreens from '../ui/screens/InGameScreens.vue';
    import CollectorGame from '$collector/collector-game';
    import ResizeMixin from '$core/mixins/resize-mixin.js';
    import StatesMixin from '$core/mixins/states-mixin.js';
    import options from '$collector/config/options.json';
    import assets from '$collector/config/assets.json';
    import { isLandscape, isHorizontal, getOrientation } from '$core/utils/window.js';
    import { isMobile } from '$core/utils/agent';
    import { useGameStore, useAuthStore } from '$collector/stores/auth.store.js';
    import { asset, svg } from '$collector/bootstrap/paths';
    import { t } from '$core/utils/i18n';
    import { TweenMax } from 'gsap';

    export default {
        data() {
            return {
                isDomLandscape: true,
                screen: 'loading',
                autoStart: false,
                game: {}
            };
        },
        components: {InGameScreens},
        methods: {
            svg(path) {
                return svg(path);
            },
            t(path, def = '') {
                return t(path, def);
            },
            checkOrientation() {
                this.isDomLandscape = (isLandscape() || isHorizontal());
            },
            emit(...params) {
                const action = params.shift();
                params.shift(this.game);
                this.game.$emit(action, params);
                
            },
            changeScreen() {
                
            }
        },
        computed: {
            classList() {
                const orientation = getOrientation();
                return {
                    'd-flex position-relative flex-grow-1 ': true,
                    'justify-content-center align-items-center': true,
                    [orientation]: true,
                    visible: this.isDomLandscape,
                    invisible: !this.isDomLandscape
                };
            },
            rotateClass() {
                return {
                    'd-flex flex-column flex-grow-1': true,
                    'position-absolute top-0': true,
                    'justify-content-center align-items-center': true,
                    'w-100 h-100': true,
                    visible: !this.isDomLandscape,
                    invisible: this.isDomLandscape
                };
            }
        },
        watch: {
            'store.loggedIn': (state) => {
                const action = state ? 'login' : 'logout';
                this.game.$emit(`user_${state}`);
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.autoStart = !!from.meta.autoStart;
            });
            
        },
        beforeRouteLeave(to, from) {
            this.game.destroy();
        },
        beforeMount() {

            window.addEventListener('orientationchange', this.checkOrientation);
            window.addEventListener('resize', this.checkOrientation);
//            if (isMobile()) {
//                setTimeout(function(){
//                    window.scrollTo(0, 300);
//                    this.checkOrientation()
//                }, 1000);
//            }
        },
        beforeUnmount() {
            window.removeEventListener('orientationchange', this.checkOrientation);
            window.removeEventListener('resize', this.checkOrientation);
            
        },
        mounted() {
            this.game = new CollectorGame({
                container: this.$refs.container,
                options, assets,
                $store: useGameStore(),
                $auth: useAuthStore(),
                mixins: [ResizeMixin, StatesMixin],
                autoStart: this.autoStart
            });
            this.game.load();
            this.checkOrientation();
        }
    }

</script>
<style>
/*    .playground {
        overflow: hidden;
    }*/
    .playground #app {width: 100vw;}
    
    .playground main {
        height: 100vh;
        padding-top: 0;
        display: flex;
        flex-direction: column;
    }
    
    .playground main .logo {
        display: none;
    }
    
    .playground footer {
        display: none;
    }
    
    .playground footer .bins-footer {
        display: none;
    }
    
    .playground .container {
        padding-left: 0;
        padding-right: 0;
        max-width: 100vw;
    }
    
    .playground .main-container {
        margin-bottom: 0;
        flex-grow: 1;
    }
    
    .playground .main-container .row {
        margin-left: 0;
        margin-right: 0;
        max-width: 100vw;
        height: 100%;
        align-items: center;
    }
    
    .playground .social-toggler {
        display: none;
    }
    
    
</style>