export default function handleInput(player, cursors, flame, mouse, config) {
	const unit = config.width / 10;

	if (
		(cursors.up.isDown || mouse.isDown) &&
		player.body.velocity.y > -unit * 10
	) {
		flame.setVisible(true);
		player.body.velocity.y -= unit / 2;
	} else {
		flame.setVisible(false);
	}

	if (player.body.touching.down) {
		if (cursors.right.isDown || deviceTilt > 15) {
			player.body.velocity.x = unit * 3;
			player.faceDir = 'right';
		} else if (cursors.left.isDown || deviceTilt < -15) {
			player.body.velocity.x = unit * -3;
			player.faceDir = 'left';
		} else {
			player.setVelocityX(0);
		}
	} else {
		if (
			(cursors.right.isDown || deviceTilt > 15) &&
			player.body.velocity.x < unit * 3.5
		) {
			player.body.velocity.x += unit * 0.25;
			player.faceDir = 'right';
		}
		if (
			(cursors.left.isDown || deviceTilt < -15) &&
			player.body.velocity.x > unit * -3.5
		) {
			player.body.velocity.x -= unit * 0.25;
			player.faceDir = 'left';
		}
	}

	player.body.touching.down && player.body.velocity.x > 0
		? player.anims.play('right', true)
		: player.body.touching.down && player.body.velocity.x < 0
		? player.anims.play('left', true)
		: !player.body.touching.down && player.faceDir === 'right'
		? player.anims.play('floatRight', true)
		: !player.body.touching.down && player.faceDir === 'left'
		? player.anims.play('floatLeft', true)
		: player.faceDir === 'right'
		? player.anims.play('stillRight', true)
		: player.anims.play('stillLeft', true);

	flame.y = player.y + (14 * unit) / 20;
	flame.x = player.x + (player.faceDir === 'right' ? -3 : 3);
	flame.body.velocity.y = player.body.velocity.y;
	flame.body.velocity.x = player.body.velocity.x;

	if (player.x < unit / -2) player.x = config.width + unit / 2;
	if (player.x > config.width + unit / 2) player.x = unit / -2;
	if (player.y < 0) player.setVelocityY(unit * 10);
}
