import UI from '$core/2d/display/ui';
import { Graphics, Text } from 'pixi.js';
import { fixed } from '$core/utils/math';
import gsap, { Power3 } from 'gsap';
import { t } from '$core/utils/i18n';

class Button extends UI {

    constructor(options) {
        super(options);
        this.normalizePlacement();
        this.display = new Graphics;
        this.display.zIndex = this.zIndex || 1;
        this.setPosition();

        this.defaultScale = {
            x: this.sprite.scale.x,
            y: this.sprite.scale.y,
        };

        this.hold = false;
    }

    filter_title(title) {
        if (Array.isArray(title)) {
            title = t(title[0], title[1]);
        } else if (typeof title === 'string') {
            title = t(title, title.toUpperCase());
        }

        const text = new Text(title, this.style);
        text.anchor.set(0.5, 0.5);
        return text;
    }

    setPosition() {
        const {x, y, width, height, sprite, scale, titleTop} = this;
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(x, y);
        sprite.visible = this.visible;
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.scale.set(scale);
        this.display.addChild(sprite);

        if (this.title) {
            this.title.position.set(x, (titleTop || 0) + y + (height / 2));
            this.display.addChild(this.title);
        }
        if (this.add) {
            this.ui.addChild(this.display);
        }
    }

    toggleEvents(bind = true) {
        const {sprite} = this;
        const action = bind ? 'on' : 'off';
        sprite[action]('pointerdown', this.press, this);
        sprite[action]('pointerup', this.release, this);
        sprite[action]('pointerout', this.checkIfHold, this);
        
        if (this.scaleUpOnHover) {
            sprite[action]('pointerover', this.on, this);
            sprite[action]('pointerout', this.out, this);
        }
    }

    press() {
        const {sprite} = this;
        this.hold = true;
        sprite.position.set(sprite.position.x - 1, sprite.position.y + 1);
    }

    release() {
        const {sprite} = this;
        this.hold = false;
        sprite.position.set(sprite.position.x + 1, sprite.position.y - 1);
    }

    checkIfHold() {
        if (this.hold) {
            this.release();
        }
    }

    show() {
        const {sprite, defaultScale} = this;
        const {x, y} = defaultScale;
        sprite.scale.set(0, 0);
        sprite.visible = true;
        gsap.to(sprite.scale, {
            x, y,
            duration: 0.2,
            repeat: 0,
            ease: Power3.easeOut,
        });
    }

    hide() {
        const {sprite, defaultScale} = this;
        const {x, y} = defaultScale;

        gsap.to(sprite.scale, {
            x: 0,
            y: 0,
            duration: 0.2,
            repeat: 0,
            ease: Power3.easeIn,
            onComplete() {
                sprite.visible = false;
                sprite.scale.set(x, y);
            }
        });
    }

    on() {
        const {sprite, scaleOn, defaultScale: {x, y}} = this;
        gsap.to(sprite.scale, {
            x: x + scaleOn,
            y: y + scaleOn,
            duration: 0.2,
            repeat: 0,
            ease: Power3.easeOut
        });
    }

    out() {
        const {sprite, defaultScale: {x, y}, scaleOn} = this;
        gsap.to(sprite.scale, {
            x, y,
            duration: 0.2,
            repeat: 0,
            ease: Power3.easeOut,
        });
    }

    updateTitle(title) {
        if (this.title) {
            if (Array.isArray(title)) {
                title = t(title[0], title[1]);
            } else if (typeof title === 'string') {
                title = t(title, title.toUpperCase());
            }
            this.title.text = title;
            
        }
    }

}

export default Button;
