const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
module.exports = {
	name: 'suggest',
	description: 'Send a suggestion to the staff so they can check it',
	aliases: ['sugerir', 'suggestion', 'sugerencia'],
	cooldown: config.cooldown.suggest,
	execute(client, message, args) {
		if (!args[0]) return message.channel.send(config.strings.no_suggestion);
		const suggestion = args.join(' ');

		const embed = new MessageEmbed()
			.setTitle(config.strings.new_suggestion)
			.setColor('YELLOW')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(suggestion)
			.setTimestamp();

		client.channels.cache.get(config.pre_channel).send(embed);
		message.channel.send(config.strings.suggestion_received);
	}
};
