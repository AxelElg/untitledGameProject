import Phaser from 'phaser';
import dude from '../assets/dude.png';
import enemy from '../assets/enemy.png';
import ground from '../assets/ground.png';
import platform from '../assets/platform.png';
import { config } from '../';

export default class scene2 extends Phaser.Scene {
	preload() {
		this.load.image('ground', ground);
		this.load.image('platform', platform);
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
		this.platforms.create(config.width / 2, config.height - 20, 'ground');
		this.platforms.create(
			config.width / 4,
			(config.height - 20) / 2,
			'platform'
		);
		this.platforms.create(
			(config.width / 4) * 3,
			(config.height - 20) / 4,
			'platform'
		);
		this.platforms.create(
			config.width / 2,
			((config.height - 20) / 4) * 3,
			'platform'
		);

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

		this.physics.add.collider(this.player, this.platforms);
	}
	update() {
		let cursors = this.input.keyboard.createCursorKeys();
		const { player, enemy1 } = this;

		if (player.body.touching.down) {
			if (cursors.left.isDown) {
				player.setVelocityX(-60);
				player.faceDir = 'left';
				player.anims.play('left', true);
			} else if (cursors.right.isDown) {
				player.setVelocityX(60);
				player.faceDir = 'right';
				player.anims.play('right', true);
			} else {
				player.setVelocityX(0);
				if (player.faceDir === 'right') {
					player.anims.play('stillRight', true);
				} else {
					player.anims.play('stillLeft', true);
				}
			}
		} else {
			if (cursors.left.isDown) {
				player.setVelocityX(-60);
				player.faceDir = 'left';
				player.anims.play('floatLeft', true);
			} else if (cursors.right.isDown) {
				player.setVelocityX(60);
				player.faceDir = 'right';
				player.anims.play('floatRight', true);
			} else {
				player.setVelocityX(0);
				if (player.faceDir === 'right') {
					player.anims.play('floatRight', true);
				} else {
					player.anims.play('floatLeft', true);
				}
			}
		}

		if (cursors.up.isDown && player.body.velocity.y > -200) {
			player.setVelocityY(player.body.velocity.y - 10);
		}

		if (player.x < -10) {
			player.x = 210;
		}
		if (player.x > 210) {
			player.x = -10;
		}
		if (player.y < 0) {
			player.setVelocityY(200);
		}

		if (player.y > enemy1.y) {
			enemy1.setVelocityY(40);
		} else {
			enemy1.setVelocityY(-40);
		}
		if (player.x - enemy1.x > 5) {
			enemy1.anims.play('enemyRight', true);
			enemy1.setVelocityX(40);
		} else if (enemy1.x - player.x > 5) {
			enemy1.anims.play('enemyLeft', true);
			enemy1.setVelocityX(-40);
		}
	}
}
