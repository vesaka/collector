import UI from '$core/2d/display/ui';
import { Sprite, Container } from 'pixi.js';
import { t } from '$core/utils/i18n';
class TextButton extends UI {
    
    constructor(options) {
        super(options);
    }
    
    filter_button(button) {
        if (typeof button === 'string') {
            button = this.buttons.get(button);
        }
        
        return button;
    }
    
    filter_text(text) {
        
    }
    
    setPosition() {
        const { x, y, width, height, button: { sprite } } = this;
        
        const display = new Container();
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(x, y);        
        sprite.visible = true;
        sprite.interactive = true;
        sprite.buttonMode = true;
        
        display.addChild(sprite);
        
        if (this.add) {
            this.ui.addChild(display);
        }
        
        this.display = display;
    }
    
    setText() {
        
    }
}

export default TextButton;