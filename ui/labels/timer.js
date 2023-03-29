import Label from './label';
import { Text, Ticker } from 'pixi.js';

import gsap, { Power3 } from 'gsap';

class Timer extends Label {
    
    static name = 'timer';
    
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['start', 'over', 'stop', 'reset'],
            level: ['start', 'end']
        });
        
        this.current = this.max;

        this.$store.initTime({
            current: this.max,
            max: this.max,
            min: this.min,
            reduceByLevel: this.reduceByLevel,
            increaseByLevel: this.increaseByLevel
        });
        
        this.ticker = new Ticker;
    }
    
    createText() {
        return new Text(
                this.formatTime(this.$store.time.current || 300),
                this.style
        );
    }
    
    tick(delta) {
        const { time } = this.$store;
        const now = this.timeToSeconds();
        const elapsedTime = now - time.start;
        
        const timeRemain = Math.max(time.min, time.max - elapsedTime);
        if (!isNaN(timeRemain)) {
            this.text.text = this.formatTime(timeRemain);
        }
        
        if ((timeRemain <= time.min) && time.start) {
            //this.$emit('game_stop');
            this.$emit('game_over', 'timeup');
            this.$emit('game_reset');
            time.start = null;
            this.ticker.stop();
            this.ticker.remove(this.tick, this);
        }
        

    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        return  `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    
    game_stop() {
        this.stop();
        this.resetTimer();
    }
    
    game_start() {
        this.start();
    }
    
    game_reset() {
        this.$store.time.max = this.current;
        this.stop();
    }
    
    game_over(reason = 'timeup') {
        this.$store.time.max = this.current;
        this.stop();
    }
    
    level_start() {
        this.start();
    }
    
    level_end() {
        this.$store.time.max += this.increaseByLevel;
        this.stop();
        this.resetTimer();
    }
    
    start() {
        this.ticker.add(this.tick, this);
        this.ticker.start();
        this.$store.time.start = this.timeToSeconds();
    }
    
    stop() {

        if (this.ticker) {
            this.ticker.remove(this.tick, this);
            this.ticker.stop();
            this.ticker.started = false;
            this.$store.time.end = this.timeToSeconds();
        }
    }
    
    resetTimer() {
        const obj = { now: this.$store.time.current};
        const { $store, text, formatTime } = this;
        gsap.to(obj, {
            now: this.$store.time.max,
            roundProps: {now: 1},
            duration: 1,
            repeat: 0,
            ease: Power3.easeIn,
            onUpdate() {
                const remain = Math.round(($store.time.max - $store.time.current) * this.progress());                
                text.text = formatTime($store.time.max - remain);
            }
        });
    }
    
    timeToSeconds() {
        return Math.round(new Date().getTime() / 1000);
    }
}

export default Timer;