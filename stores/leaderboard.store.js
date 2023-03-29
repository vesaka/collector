import { defineStore } from 'pinia';
import api from '$core/services/laravel-api.js';
import { aprintf } from '$core/utils/string.js';

export const useLeaderboardStore = defineStore('$leaderboard$', {
    state: () => ({
        players: []
    }),
    actions: {
        updatePlayers: async (params) => {
            const result = await api.get('top-players', {params})
            this.players = result.data;
        }
    }

});