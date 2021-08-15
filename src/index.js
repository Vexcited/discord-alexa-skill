const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require("ask-sdk-core");
const express = require('express');
const path = require("path");

// Handlers.
const {
	LaunchRequestHandler,
	ErrorHandler
} = require("./handlers");

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler
	)
	.addErrorHandlers(ErrorHandler);

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

// HTML
app.use(
	"/",
	express.static(
		path.resolve(`${__dirname}/public`)
	)
);

// Alexa endpoint
app.post("/", adapter.getRequestHandlers());

// Start skills handler.
app.listen(443, () => {
	console.info("Alexa Skills deployed.");
});