import Phaser from 'phaser';
import config from '../../config';

export default class titleScene extends Phaser.Scene {
	constructor() {
		super('titleScene');
	}
	create() {
		this.add
			.text(config.width / 2, config.height / 2, 'Space-Dude')
			.setScale(0.75);
	}
	update() {
		if (
			this.input.keyboard.createCursorKeys().up.isDown ||
			this.input.activePointer.isDown
		) {
			this.scene.start('loadGame');
		}
	}
}
