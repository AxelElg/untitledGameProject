import Phaser from 'phaser';
import config from '../../config';

export default class gameOver extends Phaser.Scene {
	constructor() {
		super('gameOver');
	}

	init({ level }) {
		this.level = level;
	}

	create() {
		this.add
			.text(config.width / 2, config.height / 2, 'Game Over')
			.setScale(0.75);

		this.add
			.text(
				config.width / 2,
				config.height / 2 + 20,
				`you reached level ${this.level}`
			)
			.setScale(0.5);
	}
	update() {
		if (this.input.keyboard.createCursorKeys().up.isDown) {
			this.scene.start('nextLevel', { level: null });
		}
	}
}
