<template>
    <div class="position-relative">
        <img class="lead-img-title" :src="svg('Leaderboard')" alt="Leaderboard">
        <div class="col-md-12 home-title">
            <div class="leaderboard-results">
                <table class="leaderboard-tbl" v-if="players && players.length > 0">
                    <thead>                    
                        <tr>
                            <th v-html="t('leaderboard.headers.rank')"></th>
                            <th v-html="t('leaderboard.headers.name')"></th>
                            <th v-html="t('leaderboard.headers.score')"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(player, i) in players">
                            <td v-html="`#${i+1}`"></td>
                            <td v-html="player.name"></td>
                            <td v-html="player.score"></td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="my-5 text-center" v-else>
                    No results yet
                </h3>
            </div>
            <div class="col-md-12">
                <RouterLink :to="PLAY_PATH" class="reg-play-link">
                    <img :src="svg('Play-btn')">
                    <p class="mt-2" v-html="t('leaderboard.play-again', 'Play again')"></p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { svg, PLAY_PATH, LOGIN_PATH } from '$collector/bootstrap/paths.js'
    import { t } from '$core/utils/i18n';
    import { rand } from '$core/utils/math';
    import api from '$core/services/laravel-api';

    const props = defineProps({
        limit: {
            type: Number,
            default: 10
        },
        refreshTime: {
            type: Number,
            default: 3
        }
    });


    const players = computed(() => {
        return window.players;
    });
    
    


</script>
<style>
    .leaderboard .row, .leaderboard #app {
        width: 100%;
    }

    .leaderboard img.lead-img-title {
        top: -7%;
    }

    .leaderboard .leaderboard-results {
        padding-top: 3rem;
    }
</style>