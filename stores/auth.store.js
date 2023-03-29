import { defineStore } from 'pinia';
import api from '$core/services/laravel-api.js';
import { raw, extend } from '$core/utils/object.js';
import gsap, { Power3 } from 'gsap';
import localforage from 'localforage';

export const useAuthStore = defineStore('$auth$', {
    state: () => ({
        user: {
            id: '',
            name: '',
            token: ''
        }
    }),
    actions: {
        login(user) {
            for (let key in this.user) {
                if (user[key]) {
                    this.user[key] = user[key];
                }
            }
        },
        async logout() {
            this.$reset();
        }
    },
    getters: {
        loggedIn: (state) => {
            return !!state.user.token;
        }
    },
    persist: {
        enabled: true,
        paths: ['user']
    }
});

const tween = {
    duration: 1,
    delay: 0.5,
    repeat: 0,
    ease: Power3.easeOut
};

export const useGameStore = defineStore('game', {
    state: () => ({
            score: 0,
            bestScore: 0,
            level: 1,
            moves: {
                correct: 0,
                incorrect: 0
            },
            audio: false,
            time: {},
            log: [],
            loaded: 0,
            socialsActive: false
        }),
    actions: {
        logLevel() {
            const level = {
                score: this.score,
                start: this.time.start,
                end: Math.round(new Date().getTime() / 1000),
                duration: this.time.end - this.time.start,
                moves: this.moves
            };
        },
        endGame() {
            //this.$reset();
        },
        initTime(time) {
            this.time = extend(this.time, time);
        },
        updateTime(delta) {
            const {current, max, min} = this.time;
            if (this.time.current >= this.time.min) {
                this.time.current -= delta;
                if (this.time.current < this.time.min) {
                    this.time.current = this.time.min;
                }
            }
        },
        updateBestScore() {

        },
        resetAll() {
            this.level = 1;
            this.score = 0;
            this.time = {};
            this.moves = {
                correct: 0,
                incorrect: 0
            };
        },
        setState(state) {
            this.state = state;
        }
    },
    getters: {
        levelTime(state) {
            return state.time.end - state.time.start;
        },
        currentTime(state) {
            return Math.round(state.time.current / 1000).toFixed(0);
        },
        getTimeProgress(state) {
            return (state.time.current / state.time.max).toFixed(2) * 100;
        },
        timeOver(state) {
            return state.time.current <= state.time.min;
        },
        gameIs(state) {
            return (status) => {
                return state.state === status;
            };
        },
        maxTime(state) {
            return state.time.max - (state.level - 1) * state.time.reduceByLevel;
        }
    },
    persist: {
        enabled: true,
        key: '$game$',
        storage: localforage,
        paths: ['audio', 'bestScore']
    }
});