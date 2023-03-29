import Collection from '$core/models/collection';
import Basket from './basket';
import { Spritesheet } from 'pixi.js';
import { extend, raw } from '$core/utils/object';
import { RECYCLED, MISPLACED } from './waste';

class BasketCollection extends Collection {
    constructor(options) {
        super(options);
        this.items = [];

        this.$listen({
            basket: ['loaded'],
            game: ['init', 'ready', 'start'],
            waste: ['release']
        });
    }
    
    filter_yOffset(val) {
        return Math.round(this.options.game.height * val);
    }
    
    basket_loaded(asset) {
        const { def, offset } = this;
        const { types } = this.options.models.wastes;
        const { textures } = asset;

        for (let name in textures) {
            const key = name.replace(/\.[^/.]+$/, "");
            const options = extend(def, types[key] || {});
            options.key = key;
            options.texture = textures[name];
            const basket = new Basket(options);
            this.add(basket);
            this.scene.addChild(basket.model);
        }
    }
    
    game_start() {
        const { items, def, yOffset } = this;
        const { width, height } = this.options.game;
        
        const totalWidth = this.sum('totalWidth');
        const start = (width - totalWidth) / 2 + def.offset;
        this.shuffle().each((basket, i) => {
            basket.setX(start + (Number(i) * basket.totalWidth + basket.model.width/2))
                    .setY(yOffset + basket.offset + basket.model.height/2);
        });
        
        this.$emit('baskets_ready', this);
    }
    
    
    
    
}

export default BasketCollection;