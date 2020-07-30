import Phaser from 'phaser';
import titleScene from './Scenes/scene1';
import loadGame from './Scenes/scene2';
import playGame from './Scenes/scene3';

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
	scene: [titleScene, loadGame, playGame],
	pixelArt: true,
};
