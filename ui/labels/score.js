import Label from './label';

import { Graphics, Text } from 'pixi.js';
import gsap, { Power3 } from 'gsap';

class Score extends Label {
    
    static name = 'score';
    
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['start', 'over', 'stop', 'reset'],
            waste: ['recycled', 'misplaced']
        });
        
        this.$store.score = 0;
    }
    
    createText() {
        const box = new Text;
        this.scoreCount = new Text(this.$store.score, this.style);
        this.scoreCount.anchor.set(0.5, 0.5);        
        box.addChild(this.scoreCount);
        box.anchor.set(0.5, 0.5);
        return box;
    }
    
    game_start() {
        this.label.visible = true;
    }
    
    game_stop() {
        this.resetScore();
    }
    
    game_reset() {
        this.resetScore();
    }
    
    resetScore() {
        const { $store, scoreCount } = this;
        $store.score = 0;
        gsap.to(scoreCount, {
            text: $store.score,
            roundProps: {text: 1},
            duration: 1,
            repeat: 0,
            ease: Power3.easeIn
        });
    }
    
    waste_recycled(waste) {
        this.$store.score += waste.score;        
        this.updateText(this.$store.score);
    }
    
    waste_misplaced(waste) {
        const newScore = Math.max(this.$store.score - waste.penalty, 0);
        this.$store.score = newScore;
        this.updateText(this.$store.score);
    }
    
    updateText(newScore) {
        const { scoreCount } = this;
        gsap.to(scoreCount, {
            text: newScore,
            duration: 1,
            repeat: 0,
            roundProps: {text: 1}
        });
    }
}

export default Score;