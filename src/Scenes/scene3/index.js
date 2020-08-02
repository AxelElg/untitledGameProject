import Phaser from 'phaser';
import config from '../../config';

export default class nextLevel extends Phaser.Scene {
	constructor() {
		super('nextLevel');
	}

	init({ level }) {
		this.level = level ? level : 1;
	}

	create() {
		this.add
			.text(config.width / 2, config.height / 2, `Level ${this.level}`)
			.setScale(0.75);
	}
	update() {
		if (this.input.keyboard.createCursorKeys().up.isDown) {
			this.scene.start('playGame', { level: this.level });
		}
	}
}
