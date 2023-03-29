import Button from './button';
import { Sprite } from 'pixi.js';
import gsap, { Power3 } from 'gsap';
import { raw } from '$core/utils/object';

class PlayButton extends Button {
    
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'stop', 'destroy'],
            play: ['on', 'out', 'start'],
            user: ['login', 'logout']
        });
        this.toggleEvents();
        
        if (this.title) {
            this.user_login();
        }
    }
    
    toggleEvents(bind = true) {
        const { sprite } = this;

        if (bind) {
            sprite.on('pointertap', this.start, this);
            sprite.on('pointerover', this.on, this);
            sprite.on('pointerout', this.out, this);
        } else {
            sprite.off('pointertap', this.start, this);
            sprite.off('pointerover', this.on, this);
            sprite.off('pointerout', this.out, this);
        }
        
    }
    
    start(ev) {
        this.$emit('game_start', this, ev);
    }
    
    game_start() {
        this.hide();
    }
    
    game_stop() {
        this.show();
    }
    
    game_destroy() {
        this.toggleEvents(false);
    }
    
    
    user_login() {
        this.updateTitle(['intro.play', 'Play']);
    }
    
    user_logout() {
        this.updateTitle(['intro.as-guest', 'Play as guest']);
    }

    
}

export default PlayButton;
