const { checkEnvironments } = require("./environment")
const { authServiceWorker } = require("./googleSheet")
const { loginDiscordClient } = require("./discordBot")
const { reportError } = require("./error")
const { checkAnnounce } = require("./announce")

async function initialize() {

	// Check Environment variables.
	if (!checkEnvironments(reportError)) {
		process.exit()
	}

	// Authorize the Google service worker.
	let success = await authServiceWorker(reportError)
	if (!success) {
		process.exit()
	}

	// Initialize the Discord client.
	success = await loginDiscordClient(reportError)
	if (!success) {
		process.exit()
	}

	// Check for upcoming announcements every 10 minutes.
	checkAnnounce()
	setInterval(checkAnnounce, 600000)
	console.log("Initialization completed.")
}
initialize()