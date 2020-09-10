const { checkEnvironments } = require("./environment")
const { authServiceWorker, loadGoogleSheet } = require("./googleSheet")
const { reportError } = require("./error")

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

	// Load the Google Sheets document.
	success = await loadGoogleSheet(reportError)
	if (!success) {
		process.exit()
	}

	console.log("Initialization completed.")
}
initialize()