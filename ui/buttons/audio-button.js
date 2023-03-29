import Button from './button';
import { Sprite, Ticker } from 'pixi.js';
import { sound } from '@pixi/sound';
const ON = 'sound_on';
const OFF = 'sound_off';

const sounds = {};

class AudioButton extends Button {

    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'reset', 'destroy'],
            audio: ['play'],
            waste: ['recycled', 'misplaced'],
        });

        this.toggleEvents();
        this.audio_play();
    }

    toggleEvents(bind = true) {
        super.toggleEvents(bind);
        const {sprite} = this;


        if (bind) {
            sprite.on('pointertap', this.play, this);
        } else {
            sprite.off('pointertap', this.play, this);
        }
    }
    
    play(ev) {
        this.$store.audio = !this.$store.audio;
        for (let key in this.sounds) {
            this.sounds[key].muted = this.$store.audio;
        }
        this.$emit('audio_play', this, ev);
    }

    audio_play() {
        const state = this.$store.audio ? OFF : ON;
        this.sprite.visible = state === this.type;
    }

    toggleMute(state) {
        for (let key in this.sounds) {
            this.sounds[key].muted = !this.sounds[key].muted;
        }
    }

    waste_recycled() {
        //this.sounds.correct.play();
    }

    waste_misplaced() {
        //this.sounds.incorrect.play();
    }
    
    game_destroy() {        
        this.$set('sounds', {});
        sound.removeAll();
    }
    
    

}

export default AudioButton;