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
	console.log('hello');
	const nr = Math.random() * config.width;
	if (nr < playerPos - 75 || nr > playerPos + 75) {
		return nr;
	}
	return enemyStartPos(playerPos);
};

export const initialEnemyAdder = (game, player, enemy) => {
	const { level } = game;
	const secondWaveEnemyNr = level - Math.ceil(level / 3);
	const enemyRange = level < 3 ? 0 : level < 12 ? 2 : 2;
	for (let i = 0; i < Math.ceil(level / 3); i++) {
		const type = randomEnemyType(enemyRange);
		const newEnemy = game.physics.add.sprite(
			Math.floor(Math.random() * config.width),
			enemyStartPos(player.y),
			type
		);
		newEnemy.enemyType = type;
		enemy.add(newEnemy);
	}
	if (secondWaveEnemyNr > 0) {
		game.time.addEvent({
			delay: 2500,
			callback: continuedEnemyAdder,
			args: [game, player, enemy],
			repeat: secondWaveEnemyNr - 1,
		});
	}
};

export const continuedEnemyAdder = (game, player, enemy) => {
	const { level } = game;
	const enemyRange = level < 3 ? 0 : level < 12 ? 2 : 2;
	const type = randomEnemyType(enemyRange);
	const newEnemy = game.physics.add.sprite(
		Math.random() > 0.5 ? config.width : 0,
		enemyStartPos(player.y),
		type
	);
	newEnemy.body.setAllowGravity(false);
	newEnemy.body.setBounce(1);
	newEnemy.body.setSize(10, 10, true);
	newEnemy.enemyType = type;
	enemy.add(newEnemy);
};
