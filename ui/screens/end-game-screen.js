import Screen from './screen';
import Text from '../texts/text';
import gsap, { Power3 } from 'gsap';
import Socials from '../socials';

class EndGameScreen extends Screen {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'stop']
        });
        
        this.page.pivot.set(0, 0);
        this.page.visible = false;
    }
    
    filter_parts(parts) {
        parts.score.view = '000';
        return parts;
    }
    
    write() {
        this.addImage('menu',this.menu);
        this.addImage('good_job',this.title);
        this.addImage('try_again',this.tryAgain);
        this.addButtons('leaderboard', 'retry', 'home', 'share');
        const socials = new Socials(this.options.ui.socials);
        this.page.addChild(socials.view);
        super.write();
    }
    
    game_over(reason) {
        const timeup = 'timeup' === reason;

        this.toggleImages('good_job', !timeup);
        this.toggleImages('try_again', timeup);
        const texts = Object.keys(this.texts);
        if (timeup) {
            this.toggleButtons(['retry', 'home'], true);
            this.toggleButtons(['leaderboard', 'share'], false);
            this.toggleTexts(texts, false);
        } else {
            this.toggleTexts(texts, true);
            this.toggleButtons(['leaderboard', 'retry', 'home', 'share'], true);
        }
        this.align();
        this.show();
        this.updateText('score', this.$store.score);
    }
    
    game_start() {
        this.hide();
    }
    
    game_stop() {
        
        this.hide();
    }

}


export default EndGameScreen;