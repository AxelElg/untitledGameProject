import config from '../../../config';

const randomEnemyType = nr => {
	const rnj = Math.floor(Math.random() * nr);
	console.log(nr, rnj);
	switch (rnj + 1) {
		case 3:
			return 'stalker';
		case 2:
			return 'ambusher';
		default:
			return 'chaser';
	}
};

const enemyStartPos = playerPos => {
	let nr = Math.random() * config.width;
	if (nr < playerPos - 75 || nr > playerPos + 75) {
		return nr;
	}
	return enemyStartPos(playerPos);
};

export default function initialEnemyAdder(level, player, enemy, game) {
	switch (level) {
		case 1:
			for (let i = 0; i < level; i++) {
				let newEnemy = game.physics.add.sprite(
					i % 2 ? 0 : 200,
					enemyStartPos(player.y),
					'chaser'
				);
				newEnemy.enemyType = 'chaser';
				enemy.add(newEnemy);
			}
			break;

		default:
			for (let i = 0; i < 2; i++) {
				let type = randomEnemyType(2);
				console.log(type);
				let newEnemy = game.physics.add.sprite(
					i % 2 ? 0 : 200,
					enemyStartPos(player.y),
					type
				);
				newEnemy.enemyType = type;
				enemy.add(newEnemy);
			}
			break;
	}
}
