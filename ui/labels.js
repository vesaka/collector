import Collection from '$core/models/collection';

import { Sprite } from 'pixi.js';
import { extend } from '$core/utils/object';

import Timer from './labels/timer';
import Score from './labels/score';
import Level from './labels/level';
import Moves from './labels/moves';
import Progress from './labels/progress';

const MAP = {
    timer: Timer,
    score: Score,
    level: Level,
    moves: Moves,
};

class Labels extends Collection {
    constructor(options) {
        super(options);

        this.$listen({
            game: ['destroy'],
            label: ['loaded'],
        });
    }

    get(type) {
        return this.first(label => type === label.$name);
    }

    label_loaded(asset) {
        const {textures} = asset;
        const {def} = this;
        for (let name in textures) {

            const [str, key] = name.match(/^ui-(\w+)$/);
            let list = MAP[key];
            if (!list) {
                continue;
            }

            const $key = list.name || key;
            const preset = this[$key] && this[$key].preset ? this[this[$key].preset] : def;
            const options = extend(preset, this[$key]);
            options.texture = textures[name];
            this.add(new list(options));


        }
    }
    game_destroy() {

    }
}

export default Labels;