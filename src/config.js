import Phaser from 'phaser';
import titleScene from './Scenes/scene1';
import loadGame from './Scenes/scene2';
import nextLevel from './Scenes/scene3';
import playGame from './Scenes/scene4';
import gameOver from './Scenes/scene5';

export default {
	type: Phaser.AUTO,
	// width: 200,
	// height: 360,
	width: window.innerHeight * (5 / 9),
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: (window.innerHeight * 5) / 6 },
			debug: false,
		},
	},
	scene: [titleScene, loadGame, nextLevel, playGame, gameOver],
	pixelArt: true,
	scale: {
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};
