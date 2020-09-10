const { GoogleSpreadsheet } = require("google-spreadsheet")
const { clientEmail, privateKey, documentId, botConfig } = require("./environment")

const document = new GoogleSpreadsheet(documentId)

async function authServiceWorker(reportError) {

	// Authorize the Service Worker.
	await document.useServiceAccountAuth({
		client_email: clientEmail,
		private_key: privateKey
	}).catch(error => {
		reportError(`Error: Unable to authorize the Google service worker.`)
		throw error
	})

	return true
}

async function loadGoogleSheet(reportError) {

	// Load the Document.
	await document.loadInfo().catch(error => {
		reportError(`Error: Unable to load the Google Sheets document.`)
		throw error
	})
	const sheets = document.sheetsByTitle

	// Load the Configuration.
	if (!sheets[botConfig]) {
		reportError(`Error: Cannot find configuration worksheet with title '${botConfig}'.`)
		return
	}
	const configRows = await sheets[botConfig].getRows().catch(error => {
		reportError(`Error: Unable to load configuration from the Google Sheets document.`)
		throw error
	})

	return true
}

module.exports = { authServiceWorker, loadGoogleSheet }