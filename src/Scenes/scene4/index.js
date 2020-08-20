import Phaser from 'phaser';
import config from '../../config';
import handleInput from './helpers/player.js';
import enemyHandler from './helpers/enemyHandeler';
import enemyAdder from './helpers/enemyMaker';
import createStage from './helpers/createStage';

export default class playGame extends Phaser.Scene {
	constructor() {
		super('playGame');
	}

	init({ level }) {
		this.level = level;
	}

	create() {
		this.flame = this.physics.add.sprite(0, 0, 'jetFlame');
		this.flame.body.setAllowGravity(false);
		this.flame.anims.play('flameOn', true);

		this.platforms = this.physics.add.staticGroup();
		createStage(this.platforms);

		this.player = this.physics.add.sprite(
			config.width / 3,
			config.height - 60,
			'dude'
		);
		this.player.faceDir = 'right';

		this.enemy = this.add.group();
		enemyAdder(this);

		this.enemiesLeft = Number(this.level);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.mouse = this.input.activePointer;

		this.physics.add.collider(this.enemy);
		this.physics.add.collider(this.player, this.platforms);
	}

	update() {
		handleInput(this.player, this.cursors, this.flame, this.mouse);

		if (this.enemiesLeft > 0) {
			this.enemy.children.each(e => {
				enemyHandler(this.player, e);
				if (this.physics.overlap(e, this.flame) && this.flame.visible) {
					e.destroy();
					this.enemiesLeft -= 1;
				}
				if (this.physics.overlap(e, this.player) && e.visible) {
					this.scene.start('gameOver', { level: this.level });
				}
			});
		} else {
			this.scene.start('nextLevel', { level: this.level + 1 });
		}
	}
}
