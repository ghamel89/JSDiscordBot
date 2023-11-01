// make sure required discord.js classes are present

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

// New instance of bot client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) { // line acts like 'for file in commmandFiles'
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Ping on bot ready
client.once(Events.ClientReady, c => {
    console.log(`JSSound is Ready! Logged in as ${c.user.tag}`);
});


client.login(token);