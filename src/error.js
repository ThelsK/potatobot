async function reportError(text) {
	console.error(`\x1b[31m${text}\x1b[00m`) // Apply red color to errors.
}

module.exports = { reportError }