# Discord Suggestions Bot

This repo is a Discord.js Suggestions Bot.

## Installation

First you need to install [Node](https://nodejs.org/). Once installed run the following command:

```bash
npm install
```
Now you need to create a file named `.env` and copy your token there (Example: TOKEN=WIDEJAWalsdw.12532AASDW), edit the file config.json and then you will be able to run the bot with:
```bash
node index.js
```
## Usage
People can make suggestions using the `suggest` command. When someone sends a suggestion, it will be sent to the channel set in `config.json` as pre_channel, and the server staff (people with MANAGE_GUILD permission or that has some manager_role on config.json) will decide (confirm) if the suggestion should be sent to the public suggestions channel, set in `config.json` as channel. Once a suggestion is confirmed and in the public suggestions channel, people will be able to vote, and the server staff will be able to use the accept or deny commands.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

