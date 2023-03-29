import Text from './text';
import { Text as PixiText } from 'pixi.js';

class TitleText extends Text {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'stop']
        });
    }
    
    game_start() {
        this.display.visible = false;
    }
    
    game_stop() {
        this.display.visible = true;
    }
}

export default TitleText;