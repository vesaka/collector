import Button from './button';
import { toggleFullscreen, isFullscreen } from '$core/utils/fullscreen';

const FULLSCREEN = 'fullscreen';
const SMALLSCREEN = 'smallscreen';
class FullscreenButton extends Button {
    constructor(options) {
        super(options);
        this.$listen({
            fullscreen: ['toggle']
        });
        this.toggleEvents();
        
    }
    
    toggleEvents(bind = true) {
        super.toggleEvents(bind);
        this.sprite[bind ? 'on' : 'off']('pointertap', this.toggle, this);
    }
    
    toggle() {
        toggleFullscreen(this.app.view.parentNode.parentNode);
        this.$emit('fullscreen_toggle');
    }
    
    fullscreen_toggle() {
        this.sprite.visible = this.type === (isFullscreen() ? SMALLSCREEN : FULLSCREEN); 
    }
}

export default FullscreenButton;