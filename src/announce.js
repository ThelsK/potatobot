const { loadGoogleDocument, loadGoogleWorksheet } = require("./googleSheet")
const { getClient } = require("./discordBot")
const { reportError } = require("./error")

async function checkAnnounce() {
	let nextAnnounce = 86400000

	// Load the general configuration from the Google Sheet.
	const config = await loadGoogleDocument(reportError)
	if (!config) {
		return
	}

	// Check all rows.
	Object.keys(config).forEach(async key => {
		const configRow = config[key]

		// Check if the mandatory cells are populated.
		const mandatoryConfigs = ["serverid", "channel", "worksheet", "videolinkcolumn", "postedcolumn"]
		for (let i in mandatoryConfigs) {
			const mandatoryConfig = mandatoryConfigs[i]
			if (!configRow[mandatoryConfig]) {
				reportError(`Error: Cannot find configuration property '${mandatoryConfig}' for '${configRow.description}'.`, configRow.ownertag)
				return
			}
		}

		// Load the matching worksheet.
		const worksheet = await loadGoogleWorksheet(configRow, reportError)
		if (!worksheet) {
			return
		}

		// Check if the headers are available.
		const headerConfigs = ["posttimecolumn", "streamercolumn", "videolinkcolumn", "messagecolumn", "postedcolumn", "alertedcolumn"]
		for (let i in headerConfigs) {
			const headerConfig = headerConfigs[i]
			if (configRow[headerConfig] && !worksheet.headerValues.find(value => value === configRow[headerConfig])) {
				reportError(`Error: Cannot find column header '${configRow[headerConfig]}' for '${configRow.description}'.`, configRow.ownertag)
				return
			}
		}
	})
}

module.exports = { checkAnnounce }