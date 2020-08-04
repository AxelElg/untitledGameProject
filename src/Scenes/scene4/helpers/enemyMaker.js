import config from '../../../config';

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

export const initialEnemyAdder = (level, player, enemy, game) => {
	const enemyRange = level < 3 ? 0 : level < 12 ? 2 : 2;
	for (let i = 0; i < Math.ceil(level / 3); i++) {
		const type = randomEnemyType(enemyRange);
		const newEnemy = game.physics.add.sprite(
			i % 2 ? 0 : 200,
			enemyStartPos(player.y),
			type
		);
		newEnemy.enemyType = type;
		enemy.add(newEnemy);
	}
};

export const continuedEnemyAdder = () => {};
