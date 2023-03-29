import Collection from '$core/models/collection';
import Waste, { RECYCLED, MISPLACED, IN, OUT } from './waste';
import { Spritesheet, Graphics, Text } from 'pixi.js';
import { extend, raw } from '$core/utils/object';
import { rand, between } from '$core/utils/math';
import Matrix from '$core/2d/grids/matrix';
import StateMixin from '$core/mixins/states-mixin';
//import * as dat from 'dat.gui';
class WasteCollection extends Collection {
    matrix = {};
    constructor(options) {
        super(options);
        this.$listen({
            game: ['reset', 'stop', 'start', 'over', 'destroy'],
            waste: ['loaded', 'picked', 'recycled', 'misplaced'],
            baskets: ['ready'],
            level: ['end', 'start']
        });


        const gridOptions = extend(this.options.grid, this.options.game);
        this.matrix = new Matrix(gridOptions);
        this.matrix.eachSlot(slot => {
            if (slot.y < (gridOptions.columns / 2)+1 || (0 === slot.x) || (slot.x >= slot.rows-2)) {
                this.matrix.bookSlot(slot.x, slot.y);
                slot.locked = true;
            }
        });
        Waste.setBounds(this.matrix.getDefaultSlotSize());
        this.uniqueItems = 0;
        this.startActiveCount = this.activeCount;
        return this;
    }
    
    waste_loaded(asset) {
        this.asset = asset;

        const { textures } = asset;
        this.uniqueItems += Object.values(textures).length;
        
        this.addMore();
    }
    
    addMore(count = null) {
        const { def, types, asset } = this;
        const { textures } = asset;
        
        for (let name in textures) {
            const key = name.replace(/\-[1-9]$/, '');
            if (null === count) {
                count = rand(1,2);
            }
                        
            for (let i = 0; i < count; i++) {
                const options = extend({}, def, types[key] || {});
                options.key = key;
                options.texture = textures[name].clone();
                options.mixins = [StateMixin];
                const waste = new Waste(options);
                console.log(waste.key, waste.type, asset.name);
                this.add(waste);
                this.scene.addChild(waste.model);
                
            }
            
        }
    }
    
    baskets_ready(baskets) {
        const { matrix } = this;
        matrix.eachSlot(slot => {
            const box = {
                x1: slot.ax,
                y1: slot.ay,
                x2: slot.ax + slot.width,
                y2: slot.ay + slot.height
            };

            baskets.each(basket => {
                if (basket.overlaps(box)) {
                    matrix.bookSlot(slot.x, slot.y);
                    slot.locked = true;
                }
            });
        });
        
        this.throwGarbage();
    }
    
    throwGarbage() {
        const { matrix, activeCount } = this;
        const items = this.shuffle().all().slice(0, activeCount);
        let slots = [];
        matrix.eachSlot((slot) => {
            if (!slot.locked && slot.available) {
                slots.push(slot);
            }   
        });
        items.forEach(waste => {
            const index = rand(0, slots.length - 1);
            const slot = slots[index];

            waste.throwOut({
                x: between(slot.ax, slot.ax + slot.width),
                y: between(slot.ay, slot.ay + slot.height)
            });
            
            slot.available = false;
            slots.splice(index, 1);
        });
        
        if (this.debug) {
            setTimeout(() => {
                this.test_release();
            }, 3000);
        }
    }
    
    game_start() {
        this.__end = false;
        
    }
    
    game_stop() {
        this.each(waste => {
            if (waste.wasCollected()) {
                waste.setState(IN);
            }
        });
        this.reset();
    }
    
    game_reset() {
        this.each(waste => {
            if (waste.wasCollected()) {
                waste.setState(IN);
            }
        });
        this.reset();
    }
    
    reset() {
        this.releaseSlots();
        this.activeCount = this.startActiveCount;
    }
    
    game_over() {
        this.reset();
    }
    
    game_destroy() {
        this.reset();
    }
    
    level_end() {
        this.each(waste => {
            if (waste.wasCollected()) {
                waste.setState(IN);
            }
        });
        this.releaseSlots();
        this.activeCount += this.inreaseByLevel;
    }
    
    releaseSlots() {
        this.matrix.eachSlot(slot => {
            slot.available = true;
        });
    }
    
    waste_recycled(waste) {
        waste.collect(RECYCLED);
        this.checkIfAllIsCollected();
    }
    
    waste_misplaced(waste) {
        waste.collect(MISPLACED);
        this.checkIfAllIsCollected();
    }
    
    checkIfAllIsCollected() {
        const { activeCount } = this;
        let collected = 0;
        this.each(waste => {
            collected += waste.wasCollected() ? 1 : 0;
        });

        if (collected >= activeCount && !this.__end) {
            if (this.$store.level < this.$store.levels.max) {
                this.$emit('level_end');
            } else {
                this.$emit('game_over');
            }
            this.__end = true;
        }
    }
    
    test_release() {
        let newState;
        this.each(waste => {
            if (waste.isNot(OUT)) {
                return;
            }

            newState = Math.random() > 0.5 ? RECYCLED : MISPLACED;
            waste.collect(newState);

            let type = '';
            if (RECYCLED === newState) {
                const types = Object.keys(this.options.models.wastes.types);
                const index = types.indexOf(waste.type);
                types.splice(index, 1);
                type = rand(0, types.length - 1);
            } else {
                type = waste.type;
            }
            
            this.$emit(`waste_${newState}`, waste, { type });
            this.checkIfAllIsCollected();
        });
    }
}

export default WasteCollection;