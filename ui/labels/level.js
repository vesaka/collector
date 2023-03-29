import Label from './label';

import { Text } from 'pixi.js';
import { raw } from '$core/utils/object';
import { t } from '$core/utils/i18n';


class Level extends Label {
    
    static name = 'level';
    
    
    
    constructor(options) {
        super(options);
        
        this.$listen({
            game: ['start', 'over', 'stop', 'reset', 'destroy'],
            level: ['up', 'start'],
            
        });
        
        this.format = t('level.view');
        
        this.$store.levels = raw(this.options.game.levels);
        
        
    }
    
    createText() {
        return new Text('', this.style);
    }
    
    updateLevel() {
        this.text.text = this.format.replace('{level}', this.$store.level);
    }
    
    level_start() {
        this.updateLevel();
    }
    

    game_start() {
        this.updateLevel();
    }
    
    game_over() {
        this.updateLevel();
    }
    
    game_reset() {
        this.updateLevel();
    }
    
    game_destroy() {
        this.$store.level = 1;
    }
}

export default Level;