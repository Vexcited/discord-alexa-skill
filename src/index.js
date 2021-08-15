const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require("ask-sdk-core");
const express = require('express');
const path = require("path");
require("dotenv").config();

// Clear console when restarting skill.
console.clear();

// Start Discord API client.
require("./discordApi");

// Handlers.
const {
	SessionEndedRequestHandler,
	LaunchRequestHandler,
	GetUnreadPingsHandler,
	CancelAndStopHandler,
	HelpHandler,
	ErrorHandler
} = require("./handlers");

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		SessionEndedRequestHandler,
		LaunchRequestHandler,
		GetUnreadPingsHandler,
		CancelAndStopHandler,
		HelpHandler,
	)
	.addErrorHandlers(ErrorHandler);

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

// HTML
app.use("/",
	express.static(
		path.resolve(`${__dirname}/public`)
	)
);

// Alexa endpoint
app.post("/", adapter.getRequestHandlers());

// Start skills handler.
app.listen(8080, () => {
	console.info("[Endpoint] Unofficial Discord API Alexa skill endpoint deployed.");
});