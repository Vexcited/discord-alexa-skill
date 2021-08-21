const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require("ask-sdk-core");
const express = require('express');
const path = require("path");
require("dotenv").config();

// Clear console when restarting skill.
console.clear();

// Handlers.
const {
	// Start Handler.
	LaunchRequestHandler,

	// Custom Intents.
	LastMentionMarkAsReadHandler,
	GetLastMentionHandler,
	CreateMessageHandler,

	SessionEndedRequestHandler,
	CancelAndStopHandler,
	HelpHandler,

	// Error Handler.
	ErrorHandler
} = require("./handlers");

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom()
	.withSkillId(process.env.ALEXA_SKILL_ID)
	.addRequestHandlers(
		SessionEndedRequestHandler,
		LaunchRequestHandler,
		LastMentionMarkAsReadHandler,
		GetLastMentionHandler,
		CreateMessageHandler,
		CancelAndStopHandler,
		HelpHandler,
	)
	.addErrorHandlers(ErrorHandler);

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

// Serve static HTML on "GET /*". 
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