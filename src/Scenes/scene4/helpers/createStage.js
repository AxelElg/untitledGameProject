import config from '../../../config';

export default function createStage(platforms) {
	function buildStage1() {
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
	}

	function buildStage2() {
		platforms.create(config.width / 2, config.height - 20, 'ground2-1');
		platforms.create(config.width / 2, config.height - 70, 'ground2-2');
		platforms.create(config.width / 2, config.height - 130, 'ground2-3');
		platforms.create(30, config.height / 3, 'platform2-1');
		platforms.create(config.width - 30, config.height / 3, 'platform2-2');
	}

	function buildStage3() {
		platforms.create(config.width / 2, config.height - 20, 'ground3');
		platforms.create(config.width / 5, (config.height - 20) / 5, 'platform3');
		platforms.create(
			(config.width / 5) * 3,
			(config.height - 20) / 5,
			'platform3'
		);
		platforms.create(
			(config.width / 5) * 2,
			((config.height - 20) / 5) * 2,
			'platform3'
		);
		platforms.create(
			(config.width / 5) * 4,
			((config.height - 20) / 5) * 2,
			'platform3'
		);
		platforms.create(
			config.width / 5,
			((config.height - 20) / 5) * 3,
			'platform3'
		);
		platforms.create(
			(config.width / 5) * 3,
			((config.height - 20) / 5) * 3,
			'platform3'
		);
		platforms.create(
			(config.width / 5) * 2,
			((config.height - 20) / 5) * 4,
			'platform3'
		);
		platforms.create(
			(config.width / 5) * 4,
			((config.height - 20) / 5) * 4,
			'platform3'
		);
	}
	let rNJ = Math.floor(Math.random() * 3);
	switch (rNJ) {
		case 0:
			buildStage1();
			break;
		case 1:
			buildStage2();
			break;
		default:
			buildStage3();
			break;
	}
}
