import Phaser from 'phaser';
import config from '../../config';
import handleInput from './helpers/player.js';
import enemyHandler from './helpers/enemyHandeler';
import createStage from './helpers/createStage';

export default class playGame extends Phaser.Scene {
	constructor() {
		super('playGame');
	}

	create() {
		const enemies = [];
		this.flame = this.physics.add.sprite(0, 0, 'jetFlame');
		this.platforms = this.physics.add.staticGroup();
		createStage(this.platforms);
		this.player = this.physics.add.sprite(
			config.width / 3,
			config.height - 60,
			'characterSprites'
		);
		this.player.faceDir = 'right';
		this.enemies = [];

		enemies.push();
		this.enemy1 = this.physics.add.sprite(
			Math.random() * config.width,
			Math.random() * config.height,
			'characterSprites'
		);
		this.enemy1.body.setAllowGravity(false);
		this.physics.add.collider(this.player, this.platforms);

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('characterSprites', {
				start: 7,
				end: 10,
			}),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('characterSprites', {
				start: 1,
				end: 4,
			}),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'floatLeft',
			frames: [{ key: 'characterSprites', frame: 0 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'floatRight',
			frames: [{ key: 'characterSprites', frame: 11 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'stillRight',
			frames: [{ key: 'characterSprites', frame: 6 }],
			frameRate: 10,
		});
		this.anims.create({
			key: 'stillLeft',
			frames: [{ key: 'characterSprites', frame: 5 }],
			frameRate: 10,
		});
		this.player.anims.play('stillRight', true);
		this.anims.create({
			key: 'flameOn',
			frames: this.anims.generateFrameNumbers('jetFlame', { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1,
		});
		this.flame.anims.play('flameOn', true);

		this.anims.create({
			key: 'enemyLeft',
			frames: this.anims.generateFrameNumbers('characterSprites', {
				start: 16,
				end: 17,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'enemyRight',
			frames: this.anims.generateFrameNumbers('characterSprites', {
				start: 18,
				end: 19,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.enemy1.anims.play('enemyLeft', true);
	}

	update() {
		let cursors = this.input.keyboard.createCursorKeys();
		const { player, enemy1, flame } = this;
		flame.body.setAllowGravity(false);
		flame.x = player.x + (player.faceDir === 'right' ? -2 : 2);
		flame.setVelocityX(player.body.velocity.x);
		flame.y = player.y + 9;
		flame.setVelocityY(player.body.velocity.y);
		if (!cursors.up.isDown) {
			flame.setVisible(false);
		} else {
			flame.setVisible(true);
		}
		if (this.physics.overlap(flame, enemy1) && flame.visible) {
			enemy1.setVisible(false);
		}
		if (this.physics.overlap(enemy1, player) && enemy1.visible)
			this.scene.start('titleScene');

		handleInput(player, cursors);
		enemyHandler(player, enemy1);
	}
}
