const config = require('../config.json');
module.exports = {
	name: 'ping',
	description: 'Pong',
	cooldown: config.cooldown.ping,
	execute(client, message) {
		message.channel.send('Pinging...').then((sent) => {
			sent.edit(`Pong! ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	}
};
