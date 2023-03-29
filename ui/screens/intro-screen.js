import Screen from './screen';

import Text from '../texts/text';
import { Graphics } from 'pixi.js';
import TextButton from '../buttons/text-button';

class IntroScreen extends Screen {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'stop'],
            user: ['login', 'logout']
        });
        
        this.page.visible = !this.autoStart;

        this.map = {
            play: TextButton,
            register: TextButton
        };
    }
    
    write() {
        const loggedIn = this.$auth.loggedIn;

        if (this.$auth.loggedIn) {
            this.addButtons('play', 'leaderboard');
        } else {
            this.addButtons('play', 'register');
        }
        
        const title = this.createImage('game',this.title);
        title.view.visible = true;
        this.page.addChild(title.view);
    }
    
    game_start() {
        this.hide();
    }
    
    game_stop() {
        this.show();
    }
}


export default IntroScreen;