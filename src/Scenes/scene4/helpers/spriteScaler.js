import config from '../../../config';

export default function spriteScaler(sprite) {
	sprite.displayWidth = config.height / 18;
	sprite.displayHeight = config.height / 18;
}
