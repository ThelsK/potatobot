const { GoogleSpreadsheet } = require("google-spreadsheet")
const { clientEmail, privateKey, documentId, botConfig } = require("./environment")

const document = new GoogleSpreadsheet(documentId)
let sheets = []

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

async function loadGoogleDocument(reportError) {

	// Load the Document.
	await document.loadInfo().catch(error => {
		reportError(`Error: Unable to load the Google Sheets document.`)
		throw error
	})
	sheets = document.sheetsByTitle

	// Load the Configuration.
	if (!sheets[botConfig]) {
		reportError(`Error: Cannot find configuration worksheet with title '${botConfig}'.`)
		return
	}
	const configRows = await sheets[botConfig].getRows().catch(error => {
		reportError(`Error: Unable to load configuration from the Google Sheets document.`)
		throw error
	})
	const config = []
	configRows.forEach(row => {
		if (row._rowNumber > 2 && row.description) {
			config[row.description] = row
		}
	})

	return config
}

async function loadGoogleWorksheet(configRow, reportError) {
	if (!sheets[configRow.worksheet]) {
		reportError(`Error: Cannot find worksheet with title '${configRow.worksheet}' for '${configRow.description}'.`, configRow.ownertag)
		return
	}

	// Populate the Header values.
	await sheets[configRow.worksheet].loadHeaderRow()
	return sheets[configRow.worksheet]
}

module.exports = { authServiceWorker, loadGoogleDocument, loadGoogleWorksheet }