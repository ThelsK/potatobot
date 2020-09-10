const Discord = require("discord.js")
const { discordToken } = require("./environment")

const client = new Discord.Client()
const getClient = () => client

async function loginDiscordClient(reportError) {
	await client.login(discordToken).catch(error => {
		reportError(`Error: Unable to log in to the Discord client.`)
		throw error
	})

	return true
}

module.exports = { loginDiscordClient, getClient }