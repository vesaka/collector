import Screen from './screen';
import Socials from '../socials';

class LevelScreen extends Screen {
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['start'],
            level: ['start', 'end']
        });
        this.page.pivot.set(0, 0);
        this.page.visible = false;
    }
    
    write() {
        
        this.addImage('menu',this.menu);
        this.addImage('good_job',this.title);
        this.addButtons('level');
        
        const socials = new Socials(this.options.ui.socials);
        this.page.addChild(socials.view);
        super.write();
    }
    
    level_end() {
        const { $store } = this;
        $store.logLevel();
        this.updateText({
            time: $store.levelTime,
            currentLevel: $store.level
        });
        this.align();
        this.show();
    }
    
    level_start() {
        this.hide();
    }
}


export default LevelScreen;