import config from '../../../config';
import spriteScaler from './spriteScaler';
import { Tilemaps } from 'phaser';

export default function createStage(platforms) {
	const tileUnit = config.height / 18;

	const indexGenerator = () => {
		const indexArr = [];
		const newIndexNr = () => {
			let indexNr = Math.floor(Math.random() * 10);
			if (indexNr === 10) indexNr = 9;

			if (indexNr === 9 || indexNr === 0) {
				if (
					indexNr === 9 &&
					indexArr.length < 3 &&
					indexArr.every(e => e !== 0 && e !== 2) &&
					indexArr.every(e => e !== indexNr && Math.abs(e - indexNr) !== 2)
				) {
					indexArr.push(0);
					indexArr.push(indexNr);
				}
				if (
					indexNr === 0 &&
					indexArr.length < 3 &&
					indexArr.every(e => e !== 9 && Math.abs(e - 9) !== 2) &&
					indexArr.every(e => e !== indexNr && Math.abs(e - indexNr) !== 2)
				) {
					indexArr.push(indexNr);
					indexArr.push(9);
				}
			} else {
				if (indexArr.every(e => e !== indexNr && Math.abs(e - indexNr) !== 2)) {
					indexArr.push(indexNr);
				}
			}
		};
		while (indexArr.length < 4) {
			newIndexNr();
		}
		return indexArr;
	};

	const platformLevel1 = indexGenerator();
	const platformLevel2 = indexGenerator();
	const platformLevel3 = indexGenerator();
	const groundTiles = 0 + 6 * Math.floor(Math.random() * 6 - 0.0000001);
	const platformTiles = (() => {
		const res = 0 + 6 * Math.floor(Math.random() * 6 - 0.0000001);
		if (res === groundTiles && res === 0) {
			return res + 6;
		}
		if (res === groundTiles) {
			return res - 6;
		}
		return res;
	})();

	function platformFrameSetter(platform, platformArr, tileMapSpectrum) {
		if (
			platformArr.includes(platform + 1) &&
			platformArr.includes(platform - 1)
		) {
			return tileMapSpectrum + 3;
		}
		if (platformArr.includes(platform + 1)) {
			return platform === 0 ? tileMapSpectrum + 3 : tileMapSpectrum + 2;
		}
		if (platformArr.includes(platform - 1)) {
			return platform === 9 ? tileMapSpectrum + 3 : tileMapSpectrum + 4;
		}
		return platform === 0
			? tileMapSpectrum + 4
			: platform === 9
			? tileMapSpectrum + 2
			: tileMapSpectrum + 5;
	}

	// building base level
	for (let i = 0; i < 10; i++) {
		platforms
			.create(
				tileUnit * i + tileUnit / 2,
				config.height - tileUnit * 1.5,
				'groundTiles'
			)
			.setFrame(groundTiles)
			.setSize(tileUnit, tileUnit);
		platforms
			.create(
				tileUnit * i + tileUnit / 2,
				config.height - tileUnit * 0.5,
				'groundTiles'
			)
			.setFrame(groundTiles + 1)
			.setSize(tileUnit, tileUnit);
	}

	//building top platform level
	for (let i = 0; i < platformLevel1.length; i++) {
		platforms
			.create(
				tileUnit * platformLevel1[i] + tileUnit / 2,
				tileUnit * 4 + tileUnit / 2,
				'groundTiles'
			)
			.setFrame(
				platformFrameSetter(platformLevel1[i], platformLevel1, platformTiles)
			)
			.setSize(tileUnit, tileUnit);
	}

	for (let i = 0; i < platformLevel2.length; i++) {
		platforms
			.create(
				tileUnit * platformLevel2[i] + tileUnit / 2,
				tileUnit * 8 + tileUnit / 2,
				'groundTiles'
			)
			.setFrame(
				platformFrameSetter(platformLevel2[i], platformLevel2, platformTiles)
			)
			.setSize(tileUnit, tileUnit);
	}

	for (let i = 0; i < platformLevel3.length; i++) {
		platforms
			.create(
				tileUnit * platformLevel3[i] + tileUnit / 2,
				tileUnit * 12 + tileUnit / 2,
				'groundTiles'
			)
			.setFrame(
				platformFrameSetter(platformLevel3[i], platformLevel3, platformTiles)
			)
			.setSize(tileUnit, tileUnit);
	}

	platforms.children.each(e => spriteScaler(e));
}
