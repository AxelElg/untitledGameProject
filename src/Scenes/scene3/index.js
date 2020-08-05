import Phaser from 'phaser';
import config from '../../config';

const nextScene = game => {
	game.scene.start('playGame', { level: game.level });
};

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
		this.time.addEvent({
			delay: 3000,
			callback: nextScene,
			args: [this],
			callbackScope: this,
			loop: false,
		});
	}
}
