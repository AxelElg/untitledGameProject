import Phaser from 'phaser';
import dude from './assets/dude.png';
import enemy from './assets/enemy.png';
import ground from './assets/ground.png';
import platform from './assets/platform.png';

const config = {
	type: Phaser.AUTO,
	width: 200,
	height: 360,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
	pixelArt: true,
};

const game = new Phaser.Game(config);

function preload() {
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

let platforms;
let player;
let enemy1;
let cursors;

function create() {
	platforms = this.physics.add.staticGroup();
	platforms.create(config.width / 2, config.height - 20, 'ground');
	platforms.create(config.width / 4, (config.height - 20) / 2, 'platform');
	platforms.create(
		(config.width / 4) * 3,
		(config.height - 20) / 4,
		'platform'
	);
	platforms.create(
		config.width / 2,
		((config.height - 20) / 4) * 3,
		'platform'
	);

	player = this.physics.add.sprite(
		config.width / 2,
		config.height - 60,
		'dude'
	);
	player.checkWorldBounds = true;
	player.faceDir = 'right';

	enemy1 = this.physics.add.sprite(
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
	player.anims.play('stillRight', true);

	this.anims.create({
		key: 'enemyLeft',
		frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
		frameRate: 3,
		repeat: -1,
	});
	enemy1.anims.play('enemyLeft', true);

	this.physics.add.collider(player, platforms);
}

function update() {
	cursors = this.input.keyboard.createCursorKeys();

	if (cursors.left.isDown) {
		player.setVelocityX(-60);
		player.faceDir = 'left';
		if (player.body.touching.down) {
			player.anims.play('left', true);
		} else {
			player.anims.play('floatLeft', true);
		}
	} else if (cursors.right.isDown) {
		player.setVelocityX(60);
		player.faceDir = 'right';
		if (player.body.touching.down) {
			player.anims.play('right', true);
		} else {
			player.anims.play('floatRight', true);
		}
	} else {
		player.setVelocityX(0);
		if (player.faceDir === 'right') {
			player.anims.play('stillRight', true);
		} else {
			player.anims.play('stillLeft', true);
		}
	}
	if (!player.body.touching.down) {
		if (player.faceDir == 'right') {
			player.anims.play('floatRight', true);
		} else {
			player.anims.play('floatLeft', true);
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

	enemy1.setVelocityY(-1);
}

console.log('hello world');
