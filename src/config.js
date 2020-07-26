import Phaser from 'phaser';
import scene2 from './Scenes/scene2';

export default {
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
	scene: scene2,
	pixelArt: true,
};
