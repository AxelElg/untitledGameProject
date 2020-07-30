import Phaser from 'phaser';
import dude from '../../assets/dude.png';
import flame from '../../assets/flame.png';
import flame3 from '../../assets/flame3.png';
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
		this.load.spritesheet('jetFlame', flame3, {
			frameWidth: 6,
			frameHeight: 16,
		});
		this.load.spritesheet('enemy', enemy, {
			frameWidth: 20,
			frameHeight: 20,
		});
	}
	update() {
		this.scene.start('playGame');
	}
}