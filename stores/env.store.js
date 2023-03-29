import { defineStore } from 'pinia';
import api from '$core/services/laravel-api.js';
import { deepGet } from '$core/utils/object.js';
import { aprintf } from '$core/utils/string.js';
export const useEnvStore = defineStore('$env$', {
    state: () => ({
        env: null
    }),
    getters: {
        t: (state) => {
            return (path, def = '') => {
                try {
                    return deepGet(state.env.i18n, path) || def;
                } catch(ex) {
                    return def;
                }
                if (state.env && state.env.i18n) {
                    return deepGet(state.env.i18n, path) || def;
                }
                
                return def;
            };
        }
    },
    persist: {
        enabled: true,
    }
    
});