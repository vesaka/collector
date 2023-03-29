import Button from './button';
import router from '$collector/bootstrap/router';
import { SIGNUP_PATH } from '$collector/bootstrap/paths';
class RegisterButton extends Button {
    constructor(options) {
        super(options);
        this.toggleEvents();
    }
    
    toggleEvents(bind = true) {
        const { sprite } = this;

        if (bind) {
            sprite.on('pointertap', this.goToRegister, this);
            sprite.on('pointerover', this.on, this);
            sprite.on('pointerout', this.out, this);
        } else {
            sprite.off('pointertap', this.goToRegister, this);
            sprite.off('pointerover', this.on, this);
            sprite.off('pointerout', this.out, this);
        }
    }
    
    goToRegister() {
        this.$emit('game_destroy');
        //window.location.href = SIGNUP_PATH;
        router.push(SIGNUP_PATH);
    }
}

export default RegisterButton;