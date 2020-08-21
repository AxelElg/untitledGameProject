import config from '../../../config';
import spriteScaler from './spriteScaler';

const randomEnemyType = nr => {
	switch (Math.floor(Math.random() * nr)) {
		case 2:
			return 'stalker';
		case 1:
			return 'ambusher';
		default:
			return 'chaser';
	}
};

const enemyStartPos = playerPos => {
	const nr = Math.random() * config.width;
	if (nr < playerPos - 75 || nr > playerPos + 75) {
		return nr;
	}
	return enemyStartPos(playerPos);
};

export default function enemyAdder(game, firstWave = true) {
	const { level, player, enemy } = game;
	const secondWaveEnemyNr = level - Math.ceil(level / 3);
	const enemyRange = level < 3 ? 0 : level < 6 ? 2 : 3;

	if (firstWave) {
		for (let i = 0; i < Math.ceil(level / 3); i++) {
			const type = randomEnemyType(enemyRange);
			const newEnemy = game.physics.add.sprite(
				Math.floor(Math.random() * config.width),
				enemyStartPos(player.y),
				type
			);
			newEnemy.body.setAllowGravity(false);
			newEnemy.body.setBounce(1.5);
			newEnemy.body.setSize(10, 10, true);
			newEnemy.enemyType = type;
			spriteScaler(newEnemy);
			enemy.add(newEnemy);
		}
		if (secondWaveEnemyNr > 0) {
			game.time.addEvent({
				delay: 2500,
				callback: enemyAdder,
				args: [game, false],
				repeat: secondWaveEnemyNr - 1,
			});
		}
	} else {
		const type = randomEnemyType(enemyRange);
		const newEnemy = game.physics.add.sprite(
			Math.random() > 0.5 ? config.width : 0,
			enemyStartPos(player.y),
			type
		);
		newEnemy.body.setAllowGravity(false);
		newEnemy.body.setBounce(1.5);
		newEnemy.body.setSize(10, 10, true);
		newEnemy.enemyType = type;
		spriteScaler(newEnemy);
		enemy.add(newEnemy);
	}
}
