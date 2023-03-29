import Label from './label';

import { Text } from 'pixi.js';
import gsap from 'gsap';
import { hex2bin } from '$core/utils/colors'


class Progress extends Label {
    
    static name = 'progress';
    
    constructor(options) {
        super(options);
        this.$listen();
        //this.label.tint = hex2bin(this.tint);
    }
}

export default Progress;