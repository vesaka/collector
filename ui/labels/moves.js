import Label from './label';

import { Text, Graphics, Sprite } from 'pixi.js';
import { raw, extend } from '$core/utils/object';
import { TweenMax, Back, Bounce } from 'gsap';

const CORRECT = 'correct';
const INCORRECT = 'incorrect';
const TYPES = [CORRECT, INCORRECT];
const ZERO = 0;

class Moves extends Label {
        
    static name = 'moves';
    
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'stop', 'ready', 'reset'],
            waste: ['recycled', 'misplaced'],
            level: ['start', 'end']
        });
    }
    
    create(type) {
        const { def, offset, types, app } = this;
        const { width } = app.screen;
        const { direction, x, y } = extend(def, types[type]);
        const view = super.createLabel();
        view.anchor.set(0, 0);
        
        const text = new Text(0, this.style);
        text.position.set(view.width / 2 + 50, view.height / 2 + 2);
        text.anchor.set(0.5, 0.5);
        view.addChild(text);
        this.texts[type] = text;
        view.position.set(width/2 + direction*(view.width + offset)/2 - 300, y+50);
        this[type] = view;
        
        return this[type];
    }
    
    createLabel() {
        const box = new Graphics;

        for (let i in TYPES) {
            const label = this.create(TYPES[i]);
            box.addChild(label);
        }
        
        for (let i in TYPES) {
            
        }
        return box;
    }
    
    game_ready() {
        for (let i in TYPES) {
            const type = TYPES[i];
            const sign = new Sprite(this.misc[type]);
            const view = this[type];
            view.addChild(sign);
            sign.position.set(65, view.height / 2 + 5);
            sign.anchor.set(0.5, 0.5);

        }
    }
    
    game_reset() {
        this.reset();
    }
    
    game_stop() {
        this.reset();
    }
    
    game_over() {
        this.reset();
    }
    
    reset() {
        this.$store.moves.correct = ZERO;
        this.$store.moves.incorrect = ZERO;
        this.updateText('correct', ZERO);
        this.updateText('incorrect', ZERO);
    }
    
    waste_recycled() {
        this.updateText('correct', this.$store.moves.correct);
    }
    
    waste_misplaced() {
        this.updateText('incorrect', this.$store.moves.incorrect);
    }
    
    updateText(name, value) {
        const text = this[name].children[0];
        const { x, y } = text.scale;
        TweenMax.to(text.scale, 0.3, {
            x: x + 0.3,
            y: y + 0.3,
            onComplete() {
                text.text = value;
            }
        });
        TweenMax.to(text.scale, 0.3, {
            x: x,
            y: y,
            delay:0.3
        });
        
    }
    
}

export default Moves;