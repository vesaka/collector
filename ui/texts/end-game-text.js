import Text from './text';

class EndGameText extends Text {
    constructor(options) {
        super(options);
        this.$listen({
            game: ['start']
        });
    }
}

export default EndGameText;