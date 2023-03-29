import Collection from '$core/models/collection';
import { Sprite } from 'pixi.js';
import { extend } from '$core/utils/object';

import PlayButton from './buttons/play-button';
import FullscreenButton from './buttons/fullscreen-button';
import LevelButton from './buttons/level-button';
import AudioButton from './buttons/audio-button';
import HomeButton from './buttons/home-button';
import RetryButton from './buttons/retry-button';
import RegisterButton from './buttons/register-button';
import LeaderboardButton from './buttons/leaderboard-button';
import ShareButton from './buttons/share-button';
import * as PIXI from 'pixi.js';
const MAP = {
    play: PlayButton,
    retry: RetryButton,
    level: LevelButton,
    sound_on: AudioButton,
    sound_off: AudioButton,
    home: HomeButton,
    fullscreen: FullscreenButton,
    smallscreen: FullscreenButton,
    register: RegisterButton,
    leaderboard: LeaderboardButton,
    share: ShareButton
};

class Buttons extends Collection {
    constructor(options) {
        super(options);
        this.$listen({
            button: ['loaded'],
            audio: ['loaded', 'theme_ready']
        });
    }

    button_loaded(asset) {
        const {textures} = asset;
        const {def} = this;
        for (let name in textures) {

            const key = name.replace(/^btn\-/, '').replace(/\.[^/.]+$/, '').replace('-', '_');
            if (MAP[key]) {
                const preset = this[key] && this[key].preset ? this[this[key].preset] : def;

                const options = extend(preset, this[key]);
                options.sprite = new Sprite(textures[name]);
                options.type = key;
                this.add(new MAP[key](options));
            }
        }
    }

    createButton(key, config) {
        if (MAP[key]) {
            const preset = this[key] && this[key].preset ? this[this[key].preset] : this.def;
            const options = extend(preset, extend(this[key], config));
            options.sprite = new Sprite(this.get(key).sprite.texture);
            options.type = key;

            return new MAP[key](options);
        }

        return null;
    }

    get(type) {
        return this.first(button => {
            return type === button.type;
        });
    }

    audio_loaded(asset) {
        if (!this.sounds) {
            this.$set('sounds', {});
        }

        const {key, url} = asset;
        const {media} = this.options;

        const options = extend(media.def, media[key] || {});

//        sound.Sound.from({
//            url,
//            loaded: asset => {
//                for (let attr in options) {
//                    asset.sound[attr] = options[attr];
//                }
//
//                asset.sound.muted = this.$store.audio;
//                this.sounds[key] = asset.sound;
//
//                this.$emit(`audio_${key}_ready`, asset.sound);
//            }
//        });



    }

    audio_theme_ready(sound) {
        sound.play();
    }

}

export default Buttons;