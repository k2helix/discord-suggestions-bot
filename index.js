const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
client.commands = new Discord.Collection();

const fs = require('fs');
require('dotenv').config();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const evt = require(`./events/${file}`);
		const evtName = file.split('.')[0];
		client.on(evtName, evt.bind(null, client));
	});
});

client.login(process.env.TOKEN);
