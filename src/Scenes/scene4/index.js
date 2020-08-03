import Phaser from 'phaser';
import config from '../../config';
import handleInput from './helpers/player.js';
import enemyHandler from './helpers/enemyHandeler';
import initialEnemyAdder from './helpers/enemyMaker';
import createStage from './helpers/createStage';

let player;
let flame;
let enemy;
let cursors;
let platforms;

function enemyStartPos(playerPos) {
	let nr = Math.random() * config.width;
	if (nr < playerPos - 75 || nr > playerPos + 75) {
		return nr;
	}
	return enemyStartPos(playerPos);
}

export default class playGame extends Phaser.Scene {
	constructor() {
		super('playGame');
	}

	init({ level }) {
		this.level = level;
	}

	create() {
		cursors = this.input.keyboard.createCursorKeys();
		flame = this.physics.add.sprite(0, 0, 'jetFlame');
		flame.body.setAllowGravity(false);
		platforms = this.physics.add.staticGroup();
		createStage(platforms);
		player = this.physics.add.sprite(
			config.width / 3,
			config.height - 60,
			'dude'
		);
		player.faceDir = 'right';
		enemy = this.add.group();

		initialEnemyAdder(this.level, player, enemy, this);
		// for (let i = 0; i < this.level; i++) {
		// 	let newEnemy = this.physics.add.sprite(
		// 		i % 2 ? 0 : 200,
		// 		enemyStartPos(player.y),
		// 		'chaser'
		// 	);
		// 	newEnemy.enemyType = 'chaser';
		// 	enemy.add(newEnemy);
		// }
		enemy.children.each(e => {
			e.body.setAllowGravity(false);
			e.body.setBounce(1);
			e.body.setSize(10, 10, true);
		});

		this.physics.add.collider(player, platforms);
		this.physics.add.collider(enemy, enemy);

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 7,
				end: 10,
			}),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 1,
				end: 4,
			}),
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
		player.anims.play('stillRight', true);
		this.anims.create({
			key: 'flameOn',
			frames: this.anims.generateFrameNumbers('jetFlame', { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1,
		});
		flame.anims.play('flameOn', true);

		this.anims.create({
			key: 'chaserLeft',
			frames: this.anims.generateFrameNumbers('chaser', {
				start: 0,
				end: 1,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'chaserRight',
			frames: this.anims.generateFrameNumbers('chaser', {
				start: 2,
				end: 3,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'ambusherLeft',
			frames: this.anims.generateFrameNumbers('ambusher', {
				start: 0,
				end: 1,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'ambusherRight',
			frames: this.anims.generateFrameNumbers('ambusher', {
				start: 2,
				end: 3,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'stalkerLeft',
			frames: this.anims.generateFrameNumbers('stalker', {
				start: 0,
				end: 1,
			}),
			frameRate: 3,
			repeat: -1,
		});
		this.anims.create({
			key: 'stalkerRight',
			frames: this.anims.generateFrameNumbers('stalker', {
				start: 2,
				end: 3,
			}),
			frameRate: 3,
			repeat: -1,
		});
	}

	update() {
		flame.body.setAllowGravity(false);
		flame.x = player.x + (player.faceDir === 'right' ? -3 : 3);
		flame.setVelocityX(player.body.velocity.x);
		flame.y = player.y + 14;
		flame.setVelocityY(player.body.velocity.y);
		if (!cursors.up.isDown) {
			flame.setVisible(false);
		} else {
			flame.setVisible(true);
		}
		if (enemy.children.entries.length > 0) {
			enemy.children.each(e => {
				enemyHandler(player, e);
				if (this.physics.overlap(e, flame) && flame.visible) {
					e.destroy();
				}

				if (this.physics.overlap(e, player) && e.visible) {
					this.scene.start('gameOver', { level: this.level });
				}
			});
			handleInput(player, cursors);
		} else {
			this.scene.start('nextLevel', { level: this.level + 1 });
		}
	}
}
