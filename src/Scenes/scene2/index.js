import Phaser from 'phaser';
import dude from '../../assets/dude.png';
import enemy from '../../assets/enemy.png';
import ground from '../../assets/ground.png';
import ground21 from '../../assets/ground2-1.png';
import ground22 from '../../assets/ground2-2.png';
import ground23 from '../../assets/ground2-3.png';
import ground3 from '../../assets/ground3.png';
import platform from '../../assets/platform.png';
import platform21 from '../../assets/platform2-1.png';
import platform22 from '../../assets/platform2-2.png';
import platform3 from '../../assets/platform3.png';
import config from '../../config';
import handleInput from './helpers/player.js';
import enemyHandler from './helpers/enemyHandeler';
import createStage from './helpers/createStage';

export default class scene2 extends Phaser.Scene {
	preload() {
		this.load.image('ground', ground);
		this.load.image('ground2-1', ground21);
		this.load.image('ground2-2', ground22);
		this.load.image('ground2-3', ground23);
		this.load.image('ground3', ground3);
		this.load.image('platform', platform);
		this.load.image('platform2-1', platform21);
		this.load.image('platform2-2', platform22);
		this.load.image('platform3', platform3);
		this.load.spritesheet('dude', dude, {
			frameWidth: 20,
			frameHeight: 20,
		});
		this.load.spritesheet('enemy', enemy, {
			frameWidth: 20,
			frameHeight: 20,
		});
	}

	create() {
		this.platforms = this.physics.add.staticGroup();

		createStage(this.platforms);

		// this.platforms.create(config.width / 2, config.height - 20, 'ground');
		// this.platforms.create(
		// 	config.width / 4,
		// 	(config.height - 20) / 2,
		// 	'platform'
		// );
		// this.platforms.create(
		// 	(config.width / 4) * 3,
		// 	(config.height - 20) / 4,
		// 	'platform'
		// );
		// this.platforms.create(
		// 	config.width / 2,
		// 	((config.height - 20) / 4) * 3,
		// 	'platform'
		// );

		this.player = this.physics.add.sprite(
			config.width / 2,
			config.height - 60,
			'dude'
		);
		this.player.checkWorldBounds = true;
		this.player.faceDir = 'right';

		this.enemy1 = this.physics.add.sprite(
			config.width / 2,
			(config.height / 3) * 2,
			'enemy'
		);

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 7, end: 10 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'floatLeft',
			frames: [{ key: 'dude', frame: 0 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'floatRight',
			frames: [{ key: 'dude', frame: 11 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'stillRight',
			frames: [{ key: 'dude', frame: 6 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'stillLeft',
			frames: [{ key: 'dude', frame: 5 }],
			frameRate: 10,
		});
		this.player.anims.play('stillRight', true);

		this.anims.create({
			key: 'enemyLeft',
			frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'enemyRight',
			frames: this.anims.generateFrameNumbers('enemy', { start: 2, end: 3 }),
			frameRate: 3,
			repeat: -1,
		});
		this.enemy1.anims.play('enemyLeft', true);
		this.enemy1.body.setAllowGravity(false);

		this.physics.add.collider(this.player, this.platforms);
	}

	update() {
		let cursors = this.input.keyboard.createCursorKeys();
		const { player, enemy1 } = this;
		handleInput(player, cursors);
		enemyHandler(player, enemy1);
	}
}
