'use strict'

const express = require('express')
const bodyParser = require('body-parser')

// Constants
const PORT = 3500
const spawn = require('child_process').spawn

// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.post('/', (req, res) => {
	var task = req.body.task
	var identifier = req.body.identifier
	var annotationDBsFromBody = req.body.annotationDBs || ['ucsc', 'refseq', 'ccds']
	var args = [task]

	annotationDBsFromBody.forEach(db => {
		args.push('--' + db)
	})

	args.push('-i')
	args.push(identifier)

	var out = spawn('transvar', args)
	if (!out) {
		return res.status(500).send('Error running transvar task')
	}

	var responseText = ''
	var errorText = ''
	out.stdout.on('data', data => {
		responseText += data.toString()
	})

	out.stderr.on('data', data => {
		errorText += data.toString()
	})

	out.on('close', () => {
		if (errorText) return res.status(500).send(errorText)
		return res.status(200).send(responseText)
	})
})

app.listen(PORT)
console.log('Running on port:' + PORT)