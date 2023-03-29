import Button from './button';

class LevelButton extends Button {
    constructor(options) {
        super(options);
        
        this.toggleEvents();
    }
    
    toggleEvents(bind = true) {
        super.toggleEvents();
        const { sprite } = this;
        const action = bind ? 'on' : 'off';
        sprite[action]('pointertap', this.playNextLevel, this);
    }
    
    playNextLevel() {
        this.$store.level++;
        this.$emit('level_start');
        this.$emit('game_start');
    }
}

export default LevelButton;