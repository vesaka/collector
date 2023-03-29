import RectModel from './rect-model';
import { Graphics } from 'pixi.js';
import { fixed, between, radians, rand } from '$core/utils/math';
import { randomHex } from '$core/utils/colors';
import gsap, { Power2 } from 'gsap';
export const OUT = 'out';
export const IN = 'in';
export const DRAGGED = 'dragged';
export const RECYCLED = 'recycled';
export const MISPLACED = 'misplaced';
const bounds = {};
class Waste extends RectModel {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start', 'over', 'ready', 'stop', 'reset'],
            waste: ['pick', 'move', 'release', 'recycled', 'misplaced']
        });
        this.drag = false;
        this.states = [];

        this.model.anchor.set(0.5, 0.5);
        this.model.zIndex = this.zIndex;
        

        this.setup();
    }

    setup() {
        this.setState(IN);
        const {width, height} = this.model;
        const offsetScale = 0.05;
        const scaleX = width > bounds.width ? ((bounds.width / width) - offsetScale).toFixed(2) : 1;
        const scaleY = height > bounds.height ? ((bounds.height / height) - offsetScale).toFixed(2) : 1;

        const scale = Math.min(scaleX, scaleY) + this.scaling;
        this.model.scale.set(scale, scale);
        this.model.rotation = between(0, Math.PI * 2);
        this.defaultScale = scale;


    }

    game_start() {
        if (this.isThrown()) {
            this.show();
        }
    }

    game_reset() {
        if (!this.isCollected()) {
            this.collect(IN);
        }
    }

    game_stop(reason) {
        if ('restart' === reason) {
            if (!this.isCollected()) {
                this.collect(IN);
            }
            return;
        }
        if (this.is(DRAGGED)) {
            this.release();
        }
        this.setState(IN);
        this.model.interactive = false;
        this.toggleEvents(false);
        this.hide();
    }

    throwOut(at) {
        const {model} = this;
        this.setState(OUT);
        model.interactive = true;
        model.position.set(fixed(at.x, 2), fixed(at.y, 2));
        this.toggleEvents();


    }

    collect(state) {
        this.setState(state);
        this.hide();
        this.model.interactive = false;
        this.toggleEvents(false);
    }

    show() {
        const {model} = this;
        const {x, y} = model.scale;
        model.scale.set(0, 0);
        model.visible = true;
        gsap.to(model.scale, {
            x: x,
            y: y,
            duration: fixed(between(0.3, 0.8), 2),
            repeat: 0,
            ease: Power2.easOut
        });
    }

    hide() {
        const {model} = this;
        const {x, y} = model.scale;
        gsap.to(model.scale, {
            x: 0,
            y: 0,
            duration: fixed(between(0.3, 0.8), 2),
            repeat: 0,
            ease: Power2.easOut,
            onComplete() {
                model.visible = false;
                model.scale.set(x, y);
                model.position.set(0, 0);
            }
        });
    }

    isThrown() {
        return this.is(OUT);
    }

    isCollected() {
        return this.is(IN, RECYCLED, MISPLACED);
    }

    wasCollected() {
        return this.is(RECYCLED, MISPLACED);
    }

    static setBounds(box) {
        bounds.width = box.width;
        bounds.height = box.height;
    }

    pick(ev) {
        this.$emit('waste_pick', this, ev);
    }

    move(ev) {
        this.$emit('waste_move', this, ev);
    }

    release(ev) {
        this.$emit('waste_release', this, ev);
    }

    toggleEvents(bind = true) {
        const {model} = this;
        const action = bind ? 'on' : 'off';
        model[action]('pointerdown', this.pick, this);
        model[action]('pointerup', this.release, this);
        model[action]('pointermove', this.move, this);
    }

    waste_pick(waste) {
        const {model, defaultScale, activeZIndex} = waste;
        const newScale = defaultScale + 0.15;
        model.zIndex = activeZIndex;
        gsap.to(model.scale, {
            x: newScale,
            y: newScale,
            duration: 1,
            repeat: 0
        });
        waste.setState(DRAGGED);
    }

    waste_move(waste, ev) {
        if (waste.is(DRAGGED)) {
            waste.model.x = ev.data.global.x;
            waste.model.y = ev.data.global.y;
        }
    }

    waste_release(waste) {

        if (waste.isNot(DRAGGED)) {
            return;
        }

        const {model, defaultScale, zIndex} = waste;
        model.zIndex = zIndex;
        waste.setState(OUT);

        gsap.to(model.scale, {
            x: defaultScale,
            y: defaultScale,
            duration: 1,
            repeat: 0
        });
    }

    removeEvents(ev, waste) {
        this.model.removeAllListeners();
    }
}

export default Waste;