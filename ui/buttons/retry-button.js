import Button from './button';

class RetryButton extends Button {
    constructor(options) {
        super(options);
        this.toggleEvents();
    }
    
    toggleEvents(bind = true) {
        const action = bind ? 'on' : 'off';
        this.sprite[action]('pointertap', this.start, this);

    }
    
    start(ev) {
        this.$emit('game_stop', 'restart');
        this.$emit('game_reset');
        this.$emit('game_start', this, ev);
    }
}

export default RetryButton;