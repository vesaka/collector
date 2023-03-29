import Button from './button';
import router from '$collector/bootstrap/router';
import { LEADERBOARD_PATH } from '$collector/bootstrap/paths';
import { isFullscreen, toggleFullscreen } from '$core/utils/fullscreen';

class ShareButton extends Button {
    constructor(options) {
        super(options);
        this.toggleEvents();
    }
    
    toggleEvents(bind = true) {
        super.toggleEvents();
        const action = bind ? 'on' : 'off';
        this.sprite[action]('pointertap', this.showShareScreen, this);
    }
    
    showShareScreen() {
        if (isFullscreen()) {
            const fullscreenContainer = this.app.view.parentNode.parentNode;

            if (fullscreenContainer) {
                toggleFullscreen(fullscreenContainer);
            }
        }
        this.$store.socialsActive = !this.$store.socialsActive;
    }
}

export default ShareButton;