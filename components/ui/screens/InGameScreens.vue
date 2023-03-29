<template>
    <component :is="currentScreen" class="flex flex-column position-absolute top-0 left-0 bottom-0 right-0 w-100 h-100"></component>
</template>
<script setup>
    import { computed } from 'vue';
    import Blank from './Blank.vue';
    import Loading from './Loading.vue';
    import Intro from './Intro.vue';
    import Rotate from './Rotate.vue';
    import PauseGame from './PauseGame.vue';
    import EndLevel from './EndLevel.vue';
    import GameOver from './GameOver.vue';
    
    const map = {
        loading: Loading,
        intro: Intro,
        pause: PauseGame,
        endLevel: EndLevel,
        gameOver: GameOver,
        rotate: Rotate
    };
    
    const props = defineProps({
        screen: {
            type: String,
            default: ''
        }
    });
    
    const currentScreen = computed(() => {
        if (map[props.screen]) {
            return map[props.screen];
        }
        
        return Blank;
    });
    
    
</script>
 