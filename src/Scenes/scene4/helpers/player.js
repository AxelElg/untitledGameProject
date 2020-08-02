export default function handleInput(player, cursors) {
	if (player.body.touching.down) {
		if (cursors.left.isDown) {
			player.setVelocityX(-60);
			player.faceDir = 'left';
			player.anims.play('left', true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(60);
			player.faceDir = 'right';
			player.anims.play('right', true);
		} else {
			player.setVelocityX(0);
			if (player.faceDir === 'right') {
				player.anims.play('stillRight', true);
			} else {
				player.anims.play('stillLeft', true);
			}
		}
	} else {
		if (cursors.left.isDown && player.body.velocity.x > -100) {
			player.setVelocityX(player.body.velocity.x - 5);
			player.faceDir = 'left';
			player.anims.play('floatLeft', true);
		} else if (cursors.right.isDown && player.body.velocity.x < 100) {
			player.setVelocityX(player.body.velocity.x + 5);
			player.faceDir = 'right';
			player.anims.play('floatRight', true);
		} else {
			if (player.faceDir === 'right') {
				player.anims.play('floatRight', true);
			} else {
				player.anims.play('floatLeft', true);
			}
		}
	}

	if (cursors.up.isDown && player.body.velocity.y > -200) {
		player.setVelocityY(player.body.velocity.y - 10);
	}

	if (player.x < -9) {
		player.x = 209;
	}
	if (player.x > 209) {
		player.x = -9;
	}
	if (player.y < 0) {
		player.setVelocityY(200);
	}
}
