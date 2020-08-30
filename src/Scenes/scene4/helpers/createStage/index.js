import config from '../../../../config';
import spriteScaler from '../spriteScaler';
import { platformsIndexGenerator, platformFrameSetter } from './Functions';

export default function createStage(platforms) {
	const tileUnit = config.height / 18;
	const groundTiles = 0 + 6 * Math.floor(Math.random() * 6 - 0.0000001);
	const platformTiles = (() => {
		const res = 0 + 6 * Math.floor(Math.random() * 6 - 0.0000001);
		if (res === groundTiles) {
			return res === 0 ? res + 6 : res - 6;
		}
		return res;
	})();

	// building ground
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 10; j++) {
			platforms
				.create(
					tileUnit * j + tileUnit / 2,
					config.height - tileUnit * (1.5 - i),
					'groundTiles'
				)
				.setFrame(groundTiles + i)
				.setSize(tileUnit, tileUnit);
		}
	}

	//building top platform levels
	for (let i = 0; i < 3; i++) {
		const xPositions = platformsIndexGenerator();
		for (let j = 0; j < xPositions.length; j++) {
			platforms
				.create(
					tileUnit * xPositions[j] + tileUnit / 2,
					tileUnit * (1 + i) * 4 + tileUnit / 2,
					'groundTiles'
				)
				.setFrame(platformFrameSetter(xPositions[j], xPositions, platformTiles))
				.setSize(tileUnit, tileUnit);
		}
	}

	platforms.children.each(e => spriteScaler(e));
}
