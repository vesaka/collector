import Button from './button';
import router from '$collector/bootstrap/router';
import { LEADERBOARD_PATH } from '$collector/bootstrap/paths';

class LeaderboardButton extends Button {
    constructor(options) {
        super(options);
        
        this.toggleEvents();
    }
    
    toggleEvents(bind = true) {
        super.toggleEvents();
        const { sprite } = this;
        const action = bind ? 'on' : 'off';
        sprite[action]('pointertap', this.goToLeaderboard, this);
        
    }
    
    goToLeaderboard() {
        this.$store.level++;
        this.$emit('game_stop');
        router.push(LEADERBOARD_PATH);
    }
}

export default LeaderboardButton;