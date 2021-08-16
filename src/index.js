const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require("ask-sdk-core");
const express = require('express');
const path = require("path");
require("dotenv").config();

// Clear console when restarting skill.
console.clear();

// Start Discord API client.
const DiscordClient = require("./DiscordClient");

// Handlers.
const {
	SessionEndedRequestHandler,
	LaunchRequestHandler,
	GetLatestPingsHandler,
	CancelAndStopHandler,
	HelpHandler,
	ErrorHandler
} = require("./handlers");

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		SessionEndedRequestHandler,
		new LaunchRequestHandler(DiscordClient),
		GetLatestPingsHandler,
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