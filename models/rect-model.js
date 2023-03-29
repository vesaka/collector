import Model from '$core/2d/models/pixi-model';
import { Sprite, Graphics } from 'pixi.js';
import { rectOverlapsRect } from '$core/2d/utils/intersections';

class RectModel extends Model {
    constructor(options) {
        super(options);
        this.box = null;
    }
    
    
    createModel() {
        const { texture, key } = this;
        const sprite = new Sprite(texture);
        this.type = key.replace(/\/.*$/, '');
        
        sprite.visible = false;
        
        return sprite;
    }
    
    getBox() {
        const {x, y} = this.model.position;
        const {width, height, rotation} = this.model;
        const [w, h] = [width/2, height/2];
        const radius = Math.sqrt(w*w + h*h);
        const theta = Math.tan(rotation);
        const [rx, ry] = [Math.cos(theta)*radius, Math.sin(theta)*radius];

//        return {
//            x1: x - w + rx,
//            y1: y - h + ry,
//            x2: x + w + rx,
//            y2: y + h + ry
//        };
        
        return {
            x1: x - w,
            y1: y - h,
            x2: x + w,
            y2: y + h
        };
    }
    
    overlaps(rect) {
        return rectOverlapsRect(this.getBox(), rect);
    }
    
    
}

export default RectModel;