export default function enemyHandler(player, enemy) {
	const maxSpeed = 85;
	const acceleration = 5;

	if (player.y > enemy.y && enemy.body.velocity.y < maxSpeed) {
		enemy.setVelocityY(enemy.body.velocity.y + acceleration);
	} else if (player.y < enemy.y && enemy.body.velocity.y > -maxSpeed) {
		enemy.setVelocityY(enemy.body.velocity.y - acceleration);
	}

	if (player.x > enemy.x && enemy.body.velocity.x < maxSpeed) {
		enemy.anims.play('enemyRight', true);
		enemy.setVelocityX(enemy.body.velocity.x + acceleration);
	} else if (player.x < enemy.x && enemy.body.velocity.x > -maxSpeed) {
		enemy.anims.play('enemyLeft', true);
		enemy.setVelocityX(enemy.body.velocity.x - acceleration);
	}
}
