const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
module.exports = {
	name: 'deny',
	description: 'Mark a suggestion as denied',
	aliases: ['denegar', 'rechazar'],
	cooldown: config.cooldown.deny,
	execute(client, message, args) {
		if (
			config.manager_roles.some((r) => message.member.roles.cache.has(r)) ||
			message.member.hasPermission('MANAGE_GUILD')
		) {
			const id = args[0];
			if (!id) return message.channel.send(config.strings.no_suggestion_found);
			const reason = args.slice(1).join(' ');

			client.channels.cache
				.get(config.channel)
				.messages.fetch(id)
				.then((msg) => {
					const upvotes =
						parseInt(msg.reactions.cache.get(config.emojis.upvote).count) - 1;
					const downvotes =
						parseInt(msg.reactions.cache.get(config.emojis.downvote).count) - 1;
					const upvotePercent = Math.floor((upvotes / (upvotes + downvotes)) * 100);
					const downvotePercent = Math.floor((downvotes / (upvotes + downvotes)) * 100);

					msg.embeds[0].color = 'RED';
					msg.embeds[0].fields = [
						{
							name: 'Status',
							value: `${config.strings.denied_by.replace('{{user}}', message.author.tag)}`
						}
					];
					msg
						.edit(
							new MessageEmbed(msg.embeds[0])
								.addField(config.strings.reason, reason || 'No')
								.addField(
									config.strings.votes,
									`${upvotes} ${config.emojis.upvote} (${upvotePercent}%)\n${downvotes} ${
										config.emojis.downvote
									} (${downvotePercent}%)\nTotal: ${Math.floor(upvotes + downvotes)}`
								)
						)
						.then(() => {
							message.channel.send(config.strings.denied);
						});
				})
				.catch((err) => {
					message.channel.send(
						`${config.strings.no_suggestion_found}\nError: ${err.message}`
					);
				});
		} else message.channel.send(config.strings.no_perms);
	}
};
