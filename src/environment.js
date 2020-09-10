const discordToken = process.env.POTATOBOT_DISCORD_TOKEN || process.env.potatobot_discord_token
	|| process.env.DISCORD_TOKEN || process.env.discord_token
const clientEmail = process.env.POTATOBOT_GOOGLE_CLIENT_EMAIL || process.env.potatobot_google_client_email
	|| process.env.GOOGLE_CLIENT_EMAIL || process.env.google_client_email
const privateKey = `${process.env.POTATOBOT_GOOGLE_PRIVATE_KEY || process.env.potatobot_google_private_key
	|| process.env.GOOGLE_PRIVATE_KEY || process.env.google_private_key || ""}`.replace(/\\n/gi, "\n")
const documentId = process.env.POTATOBOT_GOOGLE_DOCUMENT_ID || process.env.potatobot_google_document_id
	|| process.env.GOOGLE_DOCUMENT_ID || process.env.google_document_id
const botConfig = process.env.POTATOBOT_GOOGLE_BOT_CONFIG || process.env.potatobot_google_bot_config
	|| process.env.GOOGLE_BOT_CONFIG || process.env.google_bot_config || "botconfig"

function checkEnvironments(reportError) {
	const environments = [
		{ key: "POTATOBOT_DISCORD_TOKEN", value: discordToken },
		{ key: "POTATOBOT_GOOGLE_CLIENT_EMAIL", value: clientEmail },
		{ key: "POTATOBOT_GOOGLE_PRIVATE_KEY", value: privateKey },
		{ key: "POTATOBOT_GOOGLE_DOCUMENT_ID", value: documentId },
	]
	for (let i in environments) {
		const environment = environments[i]
		if (!environment.value) {
			reportError(`Error: Cannot find environment variable '${environment.key}'.`)
			return
		}
	}

	return true
}

module.exports = { discordToken, clientEmail, privateKey, documentId, botConfig, checkEnvironments }