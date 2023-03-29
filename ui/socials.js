import Collection from '$core/models/collection';

import { Container, Sprite, Text } from 'pixi.js';
import { extend } from '$core/utils/object';
import { t } from '$core/utils/i18n';
import { fixed } from '$core/utils/math';
class Socials extends Collection {
    
    static textures = {};
    constructor(options) {
        super(options);
        
        this.$listen({
            social: ['loaded']
        });
        this.links = [];
        this.view = this.createView();
    }
    
    createView() {
        const { def, items, style, title, links, app: {screen} } = this;
        const textures = Socials.textures;
        const view = new Container;
        const text = new Text(t('buttons.socials'), extend(this.options.ui.style, style));
        view.addChild(text);
        text.anchor.set(0.5, 0.5);
        
        text.position.set(fixed(screen.width * title.position.x), fixed(screen.height * title.position.y));
        
        let totalWidth = 0;
        for (let key in items) {
            
            if (!textures[key]) {
                continue;
            }
            const options = extend(def, items[key]);
            const link = new Sprite(textures[key]);
            link.interactive = true;
            link.buttonMode = true;
            
            link.on('click', ev => {
                window.open(options.link, '_blank').focus();
            });
            totalWidth += options.offset.x * 2 + link.texture.width;
            links.push(link);
            
        }
        
        const start = (screen.width - totalWidth) / 2; 
        const x = totalWidth / links.length;
        for (let n in links) {
            links[n].position.set(start + n*x, text.position.y + text.height*0.8);
            view.addChild(links[n]);
        }
        
        return view;
    }
}

export default Socials;