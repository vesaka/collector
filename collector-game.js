import GameBase from '$core/2d/game-base';
import { Container, Graphics, Text } from 'pixi.js';
import {raw, extend} from '$core/utils/object';

import Log from './system/log';
import BasketCollection from './models/baskets-collection';
import WasteCollection from './models/wastes-collection';
import Matrix from '$core/2d/grids/matrix';

/**
 * In Game Screens
 */ 
import Screen from './ui/screens/screen';
import IntroScreen from './ui/screens/intro-screen';
import PlayScreen from './ui/screens/play-screen';
import LevelScreen from './ui/screens/level-screen';
import EndGameScreen from './ui/screens/end-game-screen';
/**
 * UI Elements
 */
import { useDefaultStyle } from '$core/2d/display/ui';
import Buttons from './ui/buttons';
import Labels from './ui/labels';
import Environment from './ui/environment';
import Socials from './ui/socials';

import LayersMixin from '$core/mixins/layers-mixin';

class RecyclingGame extends GameBase {

    constructor(options) {
        super(options);

        this.$listen({
            game: ['start', 'over'],
            level: ['next'],
            player: ['picks', 'dragging', 'drops', 'scores'],
            loader: ['complete', 'progress'],
            title: ['loaded'],
            menu: ['loaded'],
            misc: ['loaded'],
            social: ['loaded']
        });

        this.$set('scene', new Container());
        this.$set('ui', new Container());


        this.ui.interactive = true;
        this.scene.interactive = true;

        this.ui.sortableChildren = true;
        this.scene.sortableChildren = true;
        this.app.stage.visible = false;
        this.app.stage.addChild(this.scene);
        this.app.stage.addChild(this.ui);
        
        useDefaultStyle(this.options.ui.style);

        const log = new Log();
        
        const { labels, buttons, environment, socials } = this.options.ui;
        
        this.$set('environment', new Environment(environment));
        this.$set('buttons', new Buttons(buttons));
        this.$set('labels', new Labels(labels));
        
        this.baskets = new BasketCollection(this.options.models.basket);
        this.wastes = new WasteCollection(this.options.models.wastes);
        this.$emit('game_init');
        
        window.addEventListener('beforeunload', this.$store.resetAll);
        return this;
    }
    
    createScreens() {
        const { screens, socials } = this.options.ui;
        
        const introScreen = new IntroScreen(extend(screens.def, screens.intro));
        const playScreen = new PlayScreen(extend(screens.def, screens.play));
        const levelScreen = new LevelScreen(extend(screens.def, screens.level));
        const endGameScreen = new EndGameScreen(extend(screens.def, screens.end));
    }

    build() {
        this.createScreens();
        
        this.$emit('game_ready');
        this.app.stage.visible = true;
        if (this.autoStart) {
            this.$emit('game_start');
            this.$set('autoStart', false);
        }
    }
    
    resizeCanvas(ev) {
        const {app, container, options} = this;
        const {clientWidth: w, clientHeight: h} = container;
        const ratio = (app.renderer.width / app.renderer.height).toFixed(2);
        
        const nw = Math.min((window.innerHeight*ratio).toFixed(), window.innerWidth);
        const nh = window.innerHeight;
        app.view.style.width = `${nw}px`;
        app.view.style.height = `${nh}px`;
        this.$emit('window_resize', ev);
    }
    
    loader_progress({ progress }) {
        this.$store.loaded = Math.round(progress);
    }
    
    title_loaded(asset) {
        Screen.loadTitles(asset.textures);
    }
    
    misc_loaded(asset) {
        this.$set('misc', asset.textures)
    }
    
    menu_loaded(asset) {
        Screen.addTexture(asset);
    }
    
    social_loaded(asset) {
        Socials.textures = asset.textures;
    }
    
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

export default RecyclingGame;