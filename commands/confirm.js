const { MessageEmbed } = require('discord.js');
const config = require('../config.json')
module.exports = {
    name: 'confirm',
    description: 'Confirm a suggestion (send it to the suggestions channel)',
    aliases: ['confirmar'],
    cooldown: config.cooldown.confirm,
    execute(client, message, args) {
        if(config.manager_roles.some(r => message.member.roles.cache.has(r)) || message.member.hasPermission('MANAGE_GUILD')) {
        let id = args[0]
        if(!id) return message.channel.send(config.strings.no_suggestion_found);
        let reason = args.slice(1).join(' ');

        client.channels.cache.get(config.pre_channel).messages.fetch(id).then(async(msg) => {
            if(msg.embeds[0].fields[0]) return message.channel.send(config.strings.already_confirmed);
            msg.embeds[0].color = 'BLUE'
            let sentMsg = await client.channels.cache.get(config.channel).send(new MessageEmbed(msg.embeds[0]))
            sentMsg.react(config.emojis.upvote);
            sentMsg.react(config.emojis.downvote);

            msg.embeds[0].color = 'BLUE'
            msg.embeds[0].fields.push(
                {
                    "name": "Status", 
                    "value": `${config.strings.confirmed_by.replace('{{user}}', message.author.tag)}`
                }
                )
            msg.edit(new MessageEmbed(msg.embeds[0]).addField(config.strings.reason, reason || 'No')).then(() => {
                message.channel.send(config.strings.confirmed);
            })
        }).catch(err => {message.channel.send(`${config.strings.no_suggestion_found}\nError: ${err.message}`)});
    } else message.channel.send(config.strings.no_perms);
}
}