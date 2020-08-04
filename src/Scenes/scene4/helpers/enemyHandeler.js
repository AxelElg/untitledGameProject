export default function enemyHandler(player, enemy) {
	const maxSpeed = 50;
	const acceleration = 3;
	const type = enemy.enemyType;

	if (enemy.x > 209) enemy.x = -9;
	if (enemy.x < -9) enemy.x = 209;
	switch (type) {
		case 'chaser':
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
			break;

		case 'ambusher':
			if (player.y > enemy.y && enemy.body.velocity.y < maxSpeed) {
				enemy.setVelocityY(enemy.body.velocity.y + acceleration);
			} else if (player.y < enemy.y && enemy.body.velocity.y > -maxSpeed) {
				enemy.setVelocityY(enemy.body.velocity.y - acceleration);
			}

			if (player.x > enemy.x) {
				if (player.x - enemy.x < 100) {
					enemy.anims.play(`${type}Right`, true);
					if (enemy.body.velocity.x < maxSpeed) {
						enemy.setVelocityX(enemy.body.velocity.x + acceleration);
					}
				} else {
					enemy.anims.play(`${type}Left`, true);
					if (enemy.body.velocity.x > -maxSpeed) {
						enemy.setVelocityX(enemy.body.velocity.x - acceleration);
					}
				}
			} else {
				if (enemy.x - player.x < 100) {
					enemy.anims.play(`${type}Left`, true);
					if (enemy.body.velocity.x > -maxSpeed) {
						enemy.setVelocityX(enemy.body.velocity.x - acceleration);
					}
				} else {
					enemy.anims.play(`${type}Right`, true);
					if (enemy.body.velocity.x < maxSpeed) {
						enemy.setVelocityX(enemy.body.velocity.x + acceleration);
					}
				}
			}
			break;
	}
}
