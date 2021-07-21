const { activities } = require('../config.json');
module.exports = (client) => {
	console.log(
		`el bot ha sido iniciado para ${client.guilds.cache.size} servidores y ${client.users.cache.size} usuarios`
	);

	const status = Math.floor(Math.random() * activities.length);
	client.user.setPresence({
		status: 'online',
		activity: {
			name: activities[status][0],
			type: activities[status][1]
		}
	});
};
