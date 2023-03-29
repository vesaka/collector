import UI from '$core/2d/display/ui';

import { Container, Sprite } from 'pixi.js';
import Text from '../texts/text';
import Image from '../images/image';
import { extend } from '$core/utils/object';
import { fixed } from '$core/utils/math';
import gsap, { Power3 } from 'gsap';

class Screen extends UI {
    
    static textures = {};
    
    //actions = {}
    
    
    map = {};
        
    constructor(options) {
        super(options);
        this.page = new Container;
        this.page.sortableChildren = true;
        this.page.pivot.set(0, 0);
        this.$name = this.$name.replace(/screen$/i, '');
        this.$listen({
            screen: ['change']
        });
        this.ui.addChild(this.page);
        this.texts = {};

        if (!this.lines) {
            this.lines = [];
        }
        
        if (!this.actions) {
            this.actions = [];
        }
        
        this.images = {};
        this.layers = {};
        this.$buttons = {};
        this.write();
    }

    isSame(screen) {
        if (typeof screen === 'string') {
            return this.$name === screen;
        }

        return screen.$name === this.$name;
    }

    screen_change(screen) {
        const isSameScreen = this.isSame(screen);
        const {visible} = this.page;

        if (isSameScreen && !visible) {
            this.onEnter();
        }

        visible === isSameScreen;
    }
    
    addButton(button) {
        if (typeof button === 'string') {
            const $button = this.buttons.get(button);
            if ($button) {
                this.page.addChild($button.sprite);
            }
        } else {
            this.page.addChild(button.sprite);
        }
    }
    
    addButtonFrom(name) {
        const button = this.buttons.createButton(name, this.actions[name] || {});
 
        if (button && button.display) {
            this.$buttons[name] = button;
            this.page.addChild(button.display);
            return button;
        }
        
        return null;
        
    }
    
    addButtons(...names) {
        names.forEach(name => {
            this.addButtonFrom(name);
        });
    }
    
    addLabels(labels, layer = null) {
        for (let i in labels) {
            this.add(this.labels.get(labels[i]).label, layer);
        }
    }

    addText(text, name, layer = null) {
        this.texts[name] = text;
        this.add(text.display, layer);
    }

    updateText(name, value) {
        if (typeof name === 'object') {
            for (let key in name) {
                const text = this.texts[key];
                if (text) {
                    text.display.text = name[key];
                }
            }
        } else {
            const text = this.texts[name];
            if (text) {
                text.display.text = value;
            }
        }

    }

    add(part, layer = null) {
        if (typeof layer === 'string') {
            if (!this.layers[layer]) {
                this.layers[layer] = new Container;
                this.page.addChild(this.layers[layer]);
            }

            this.layers[layer].addChild(part);
        } else {
            this.page.addChild(part);
        }
    }

    filter_lines(lines) {
        lines.forEach(line => {
            const {top, align, space, texts} = Object.assign({
                top: 0,
                align: 'center',
                space: 10,
                texts: []
            }, line);

            if (top >= -1 || top <= 2) {
                line.top = fixed(this.app.screen.height * top, 2);
            }

            if (['center', 'left', 'right'].indexOf(align) === -1) {
                line.align = 'center';
            }

            line.texts = texts.filter(t => typeof t === 'string');
        });
        return lines;
    }

    write() {
        const {def, parts, lines, style} = this;
        for (let name in parts) {
            parts[name].style = extend(style, parts[name].style || {});           
            this.addText(new Text(extend(def, parts[name])), name, parts[name].layer);
        }

        this.align();
    }
    
    align() {
        this.lines.forEach(line => {
            let start = 0, totalWidth = line.space;
            const parts = line.texts.map(key => {
                if (this.texts[key]) {
                    totalWidth += this.texts[key].display.width + line.space;
                    return this.texts[key];
                }
                return null;
            }).filter(p => null !== p);

            if ('center' === line.align) {
                start = (this.app.screen.width - totalWidth) / 2;
            } else if ('left' === line.align) {
                start = 0;
            } else {
                start = this.app.screen.width - totalWidth;
            }

            let next = start;
            parts.forEach(({ display }) => {
                display.position.set(next + display.width / 2, line.top + display.height / 2);
                next += (display.width) + line.space;
            });

        });
    }
    
    clear() {
        this.page.children.forEach(el => this.page.removeChild(el));
    }
    
    redraw() {
        this.clear();
        this.write();
        this.show();
    }

    show() {
        const {page} = this;
        if (page.visible) {
            return;
        }
        page.scale.set(0, 0);
        page.visible = true;
        const {width, height} = this.app.screen;
        page.position.set(width / 2, height / 2);

        gsap.to(page.scale, {
            x: 1,
            y: 1,
            duration: 0.5,
            repeat: 0,
            ease: Power3.easeIn
        });

        gsap.to(page.position, {
            x: 0,
            y: 0,
            duration: 0.5,
            repeat: 0,
            ease: Power3.easeIn,
        });
    }

    hide() {

        const {page, app} = this;
        const {width, height} = app.screen;

        gsap.to(page.scale, {
            x: 0,
            y: 0,
            duration: 0.5,
            repeat: 0,
            ease: Power3.easeIn,
            onComplete() {
                page.visible = false;
            }
        });

        gsap.to(page.position, {
            x: app.screen.width / 2,
            y: app.screen.height / 2,
            duration: 0.5,
            repeat: 0,
            ease: Power3.easeIn
        });
    }

    onEnter() {

    }

    onLeave() {

    }
    
    createImage(name, options) {
        if (Screen.textures[name]) {
            options.texture = Screen.textures[name];
            return new Image(options);
        }
        
        throw new Error(`Title ${name} not found`);
    }
    
    addImage(name, options) {
        const image = this.createImage(name, options);
        image.view.visible = true;
        this.images[name] = image;
        this.page.addChild(image.view);
    }
    
    toggleImages(names, visible) {
        if (typeof names === 'string') {
            names = [names];
        }
        
        for (let i in names) {
            const image = this.images[names[i]];
            if (image) {
                image.view.visible = visible;
            }
        }
    }
    
    toggleButtons(names, visible) {
        if (typeof names === 'string') {
            names = [names];
        }
        for (let i in names) {
            const button = this.$buttons[names[i]];
            if (button) {
                button.display.visible = visible;
            }
        }
    }
    
    toggleTexts(names, visible) {
        if (typeof names === 'string') {
            names = [names];
        }
        for (let i in names) {
            const text = this.texts[names[i]];
            if (text) {
                text.display.visible = visible;
            }
        }
    }  
    
    static loadTitles(textures) {
        Object.assign(Screen.textures, textures);
    }
    
    static addTexture(asset) {
        Screen.textures[asset.key] = asset.texture;
    }

}


export default Screen;