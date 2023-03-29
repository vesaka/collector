import Container from '$core/container.js';
import api from '$core/services/laravel-api.js';
import { encrypt } from '$core/utils/crypto';
import { raw } from '$core/utils/object';

let $this = null;

class Log extends Container {

    data = {};
    sid = '';
    secret = '';
    level = {};
    sessions = [];

    constructor() {
        super();
        this.$listen({
            game: ['over', 'start', 'reset', 'destroy'],
            level: ['start', 'end'],
            waste: ['recycled', 'misplaced']
        });
        $this = this;
        window.addEventListener('beforeunload', this.handleUnload);
        this.$auth.login(window.user);
    }

    getTimestamp() {
        return Math.floor(new Date().getTime() / 1000);
    }

    game_start() {
        //this.$store.resetAll();
        this.level_start();
        this.data = this.getDefaultData();

//        if (this.$store.level === 1) {
//            api.post('recycling/score/start', {
//                id: this.$auth.user.id
//            }).then((res) => {
//                const { sid, secret } = res.data;
//                this.secret = secret;
//                this.sid = sid;
//            });
//        }
    }
    
    level_start() {
        this.level = {
            start: this.getTimestamp(),
            end: '',
            entries: []
        };
    }
    
    level_end() {
        const { level, levels, data } = this;
        level.end = this.getTimestamp();
        level.number = data.levels.length + 1;
        level.duration = level.end - level.start;
        data.levels.push(raw(level));
    }
    
    waste_recycled(waste, basket) {
        
        this.$store.moves.correct++;
        //console.log({correct: this.$store.moves.correct});
        this.collect(waste, basket);
    }
    
    waste_misplaced(waste, basket) {
        this.$store.moves.incorrect++;
        this.collect(waste, basket);
    }

    collect(waste, basket) {
        const recycled = waste.type === basket.type;
        this.level.entries.push({
            time: this.getTimestamp(),
            waste: waste.type,
            basket: basket.type,
            score: recycled ? waste.score : -waste.penalty,
            recycled
        });
    }

    game_over() {
        this.$store.level = 1;
        this.complete('completed');
    }
    
    game_stop() {
        this.complete('stopped');
    }
    
    complete(status) {
        this.data.end = this.getTimestamp();
        let payload = {};
//        try {
//            payload = encrypt(this.data, this.secret);
//        } catch (e) {}
        
//        api.post('recycling/score/save', {
//            id: this.$auth.user.id,
//            sid: this.sid,
//            score: this.$store.score,
//            payload,
//            status
//        }).then((res) => {
//            //console.log(res);
//        });
    }

    game_reset() {
        this.data = {};
    }
    
    game_destroy() {
        window.removeEventListener('beforeunload', this.handleUnload);
    }

    getDefaultData() {
        return {
            start: this.getTimestamp(),
            end: '',
            levels: []
        };
    }
    
    handleUnload(ev) {
        if ($this) {
            $this.complete('stopped');
        }
    }

}

export default Log;