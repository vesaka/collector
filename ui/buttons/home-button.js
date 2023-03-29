import Button from './button';

class HomeButton extends Button {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'reset', 'stop']
        });
        this.toggleEvents();
    }
    
    goToHome() {
        this.$emit('game_stop');
    }
    
    toggleEvents(bind = true) {
        super.toggleEvents(bind);
        const { sprite } = this;
        sprite[bind ? 'on' : 'off']('pointertap', this.goToHome, this);
    }
    
    game_start() {
        if (!this.local) {
            this.show();
        }
    }
    
    game_stop() {
        if (!this.local) {
            this.hide();
        }
    }
}

export default HomeButton;