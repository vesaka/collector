import Screen from './screen';
import { TweenMax, Back } from 'gsap';

class PlayScreen extends Screen {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'stop', 'over'],
            level: ['start', 'end']
        });
        
        this.$store.levels = this.options.game.levels;
        this.addLabels(['timer', 'level', 'score', 'moves'], 'hud');
        
        this.addButtons('home');
        this.page.visible = false;
    }
    
    game_start() {
        this.show();
    }
    
    level_end() {
        this.game_stop();
    }
    
    game_stop() {        
        this.hide();
    }
    
    game_over() {
        this.game_stop();        
    }
    
    show() {
        const {
            layers: { hud },
            page, app
        } = this;

        page.visible = true;
        
        TweenMax.to(hud.position, 0.5, {
            y: 0,
            ease: Back.easeOut.config(1.4)
        });
    }
    
    hide() {
        const {
            layers: { progress, hud },
            page, app
        } = this;
        
        TweenMax.to(hud.position, 0.5, {
            y: hud.position.y - hud.height*2,
            ease: Back.easeIn.config(1.4)
        });
    }
    
}


export default PlayScreen;