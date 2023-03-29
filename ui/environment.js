import Collection from '$core/models/collection';
import { Texture, Sprite, Graphics } from 'pixi.js';
import { extend } from '$core/utils/object';

class Environment extends Collection {
    activeFrame = -1;
    constructor(options) {
        super(options);
        this.$listen({
            game: ['ready', 'start', 'over'],
            background: ['loaded'],
            window: ['resize'],
            level: ['start']
        });
    }
    
    background_loaded(asset) {
        const { frames} = this;
        const { textures, key, name } = asset;
        
        for (let name in textures) {
            const frame = new Sprite(textures[name]);
            frame.visible = false;
            this.scene.addChild(frame);
            this.add(frame);
        }
    }

    game_ready() {
        this.shuffle();
        this.changeBackground();
    }
    
    level_start() {
        this.changeBackground();
    }
    
    changeBackground() {
        
        const currentFrame = this.get(this.activeFrame);
        if (currentFrame) {
            currentFrame.visible = false;
        }
        this.activeFrame++;
        //this.activeFrame = Math.min(Math.max(0, this.activeFrame), this.count() - 1);
        
        if (this.activeFrame < 0 || (this.activeFrame === this.count())) {
            this.activeFrame = 0;
        }
        const nextFrame = this.get(this.activeFrame);
        if (nextFrame) {
            nextFrame.visible = true;
        }
    }
    
}

export default Environment;