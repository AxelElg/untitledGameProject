export default function enemyHandler(player, enemy) {
	const maxSpeed = 50;
	const acceleration = 3;
	const type = enemy.enemyType;

	if (player.y > enemy.y && enemy.body.velocity.y < maxSpeed) {
		enemy.setVelocityY(enemy.body.velocity.y + acceleration);
	} else if (player.y < enemy.y && enemy.body.velocity.y > -maxSpeed) {
		enemy.setVelocityY(enemy.body.velocity.y - acceleration);
	}

	if (player.x > enemy.x && enemy.body.velocity.x < maxSpeed) {
		enemy.anims.play(`${type}Right`, true);
		enemy.setVelocityX(enemy.body.velocity.x + acceleration);
	} else if (player.x < enemy.x && enemy.body.velocity.x > -maxSpeed) {
		enemy.anims.play(`${type}Left`, true);
		enemy.setVelocityX(enemy.body.velocity.x - acceleration);
	}
	if (enemy.x > 209) enemy.x = -9;
	if (enemy.x < -9) enemy.x = 209;
}
