import UI from '$core/2d/display/ui';
import { Sprite } from 'pixi.js';
import { fixed } from '$core/utils/math';

class Image extends UI {
    constructor(options) {
        super(options);
        this.normalizePlacement();
        
        this.view = this.createView();
        
    }
    
    
    createView() {
        const { x, y, texture, scale } = this;
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(x, y);
        sprite.scale.set(scale.x, scale.y);
        sprite.visible = this.visible;

        if (this.add) {
            this.ui.addChild(sprite);
        }
        
        return sprite;
    }
}

export default Image;