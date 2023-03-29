import UI from '$core/2d/display/ui';
import { Container, Graphics, Sprite, Ticker } from 'pixi.js';
import { extend } from '$core/utils/object';
import { fixed } from '$core/utils/math';
import { RECYCLED, MISPLACED } from '$collector/models/waste';

let loaded = false;
class Label extends UI {
    constructor(options) {
        super(options);

        this.$listen({
            hud: ['loaded'],
        });

        this.texts = {};

        this.normalizePlacement();
        this.setPosition();

    }

    createLabel() {
        const {texture, x, y, width, height, scale} = this;
        const sprite = new Sprite(texture);
        sprite.scale.set(width / sprite.width, height / sprite.height);

        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(x, y);
        sprite.visible = true;
        return sprite;
    }

    setPosition() {
        const label = this.createLabel();

        this.text = this.createText();
        this.text.anchor.set(0.5, 0.5);

        this.text.position.set(this.position.x, this.position.y);
        label.position.set(
                label.position.x + label.width / 2,
                label.position.y + label.height / 2
                );
        label.addChild(this.text);

        this.label = label;
    }

    addText(text, name) {
        this.texts[name] = text;
        this.label.addChild(text);
    }
}

export default Label;