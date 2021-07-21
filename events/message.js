const Discord = require('discord.js');
const config = require('../config.json');

const cooldowns = new Discord.Collection();
module.exports = (client, message) => {
	const prefix = config.prefix;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName === 'help') {
		const commands = client.commands.map((c) => c.name + ': ' + c.description);
		const embed = new Discord.MessageEmbed()
			.setTitle('Commands')
			.setColor('RANDOM')
			.setDescription(commands.join('\n'));
		message.channel.send(embed);
	}

	const command =
		client.commands.get(commandName) ||
		client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	if (command.cooldown != 0) {
		if (!cooldowns.has(command.name))
			cooldowns.set(command.name, new Discord.Collection());

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = command.cooldown * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					config.cooldown.string.replace('{{time}}', timeLeft.toFixed(1))
				);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.log(error);
	}
};
