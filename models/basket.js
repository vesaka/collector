import Model from '$core/2d/models/pixi-model';
import { Sprite, Graphics } from 'pixi.js';
import { rectOverlapsRect } from '$core/2d/utils/intersections';
import RectModel from './rect-model';
import { RECYCLED, MISPLACED, DRAGGED } from './waste';
import gsap, { Power2, TweenMax, TweenLite, Sine, Elastic } from 'gsap';

class Basket extends RectModel {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'reset', 'stop'],
            waste: ['pick', 'release', 'move']
        });

        this.box = null;
        this.totalWidth = this.model.width + this.offset * 2;
        this.ready = false;
        this.active = false;
        this.moment = null;
        
    }

    createModel() {
        const {texture, key} = this;
        const sprite = new Sprite(texture);
        this.type = key;
        sprite.visible = false;
        sprite.zIndex = 10;
        sprite.anchor.set(0.5, 0.5);
        
        
//        sprite.position.set(
//                sprite.position.x + sprite.texture.width / 2,
//                sprite.position.y + sprite.texture.height / 2
//        );
        
        return sprite;
    }
    
    game_start() {
        this.show();
    }
    
    game_stop() {
        if (this.ready) {
            this.ready = false;
        }
        this.hide();
    }
    
    game_over() {
        this.ready = false;
    }
    
    game_reset() {
        this.ready = false;
    }

    waste_pick() {
        this.ready = true;
    }

    waste_release(waste) {
        this.ready = false;
        if (!this.overlaps(waste.getBox())) {
            return;
        }

        if (this.lastOverlap && (this.lastOverlap > this.moment)) {
//            this.restoreScale();
//            return;
        }
        this.deactivate();
        console.log(this.type, waste.type);
        const newState = this.type === waste.type ? RECYCLED : MISPLACED;
        waste.collect(newState);
        if (MISPLACED === newState) {
            this.shake();
        }
        
        this.$emit(`waste_${newState}`, waste, this);
    }

    waste_move(waste) {
        if (!this.ready || waste.isNot(DRAGGED)) {
            return;
        }
        const {model, activeScale} = this;
        if (this.overlaps(waste.getBox())) {
            this.active = true;
            if (!this.moment) {
                this.moment = new Date().getTime();
                this.$set('lastOverlap', this.moment);
            }
            
            gsap.to(this.model.scale, {
                x: activeScale,
                y: activeScale,
                duration: 0.5,
                repeat: 0,
                ease: Power2.easeOut
            });
        } else if (this.active) {
            this.moment = null;
            this.deactivate();
        }
    }
    
    deactivate() {
        if (this.active) {
            this.restoreScale();
            this.active = false;
            this.moment = null;
        }
    }

    restoreScale() {
        gsap.to(this.model.scale, {
            x: 1,
            y: 1,
            duration: 0.5,
            repeat: 0,
            ease: Power2.easeOut
        });
    }

    shake() {
        const {model, shakeDistance} = this;
        const start = model.x;
        
        TweenLite.fromTo(model, 0.5,
            { rotation: -0.4},
            {
                rotation: 0,
                yoyo: true,
                ease:Elastic.easeOut.config( 2, 0.2)
            });
    }

}

export default Basket;