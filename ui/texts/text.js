import UI from '$core/2d/display/ui';
import { Text as PixiText, Container } from 'pixi.js';
import { fixed } from '$core/utils/math';
import { extend } from '$core/utils/object';
class Text extends UI {
    
    parts = {};
    
    constructor(options) {
        super(options);
        this.normalizePlacement();
        this.display = this.createText();
        return this;
    }
    
    filter_view(text) {
        if (Array.isArray(text)) {
            return this.translate.apply(this, text) 
        }
        
        return text;
    }

    createText() {
        const {x, y, width, height, i18n} = this;
        const display = new PixiText(this.view, this.style);
        display.anchor.set(0.5, 0.5);
        display.position.set(x, y);
        display.visible = true;
        return display;
    }
    
}

export default Text;