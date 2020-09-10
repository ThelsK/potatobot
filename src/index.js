const { checkEnvironments } = require("./environment")
const { reportError } = require("./error")

async function initialize() {

	// Check Environment variables.
	if (!checkEnvironments(reportError)) {
		process.exit()
	}
	console.log("Initialization completed.")
}
initialize()