import Phaser from 'phaser';
import dude from '../../assets/dude.png';
import chaser from '../../assets/chaser.png';
import ambusher from '../../assets/ambusher.png';
import stalker from '../../assets/stalker.png';
import flame from '../../assets/flame.png';
import groundTiles from '../../assets/groundTiles.png';
import config from '../../config';

export default class loadGame extends Phaser.Scene {
	constructor() {
		super('loadGame');
	}
	create() {
		this.add
			.text(config.width / 2, config.height / 2, 'loading')
			.setScale(0.75);
	}
	preload() {
		this.load.spritesheet('groundTiles', groundTiles, {
			frameWidth: 20,
			frameHeight: 20,
		});
		this.load.spritesheet('dude', dude, {
			frameWidth: 20,
			frameHeight: 20,
		});
		this.load.spritesheet('jetFlame', flame, {
			frameWidth: 8,
			frameHeight: 24,
		});
		this.load.spritesheet('chaser', chaser, {
			frameWidth: 20,
			frameHeight: 20,
		});
		this.load.spritesheet('ambusher', ambusher, {
			frameWidth: 20,
			frameHeight: 20,
		});
		this.load.spritesheet('stalker', stalker, {
			frameWidth: 20,
			frameHeight: 20,
		});
	}

	create() {
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
		this.anims.create({
			key: 'flameOn',
			frames: this.anims.generateFrameNumbers('jetFlame', { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1,
		});
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
		this.scene.start('nextLevel');
	}
}
