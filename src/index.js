const { ExpressAdapter } = require("ask-sdk-express-adapter");
const Alexa = require("ask-sdk-core");
const express = require("express");

// Check for environment variables.
require("dotenv").config();
if (!process.env.ALEXA_SKILL_ID) throw Error(
	"You didn't configured `ALEXA_SKILL_ID` in your `.env` file."
);

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

const skillBuilder = Alexa.SkillBuilders.custom()
	.withSkillId(process.env.ALEXA_SKILL_ID)
	.addRequestHandlers(
		// Start.
		LaunchRequestHandler,

		// Custom.
		LastMentionMarkAsReadHandler,
		GetLastMentionHandler,
		CreateMessageHandler,

		// System.
		SessionEndedRequestHandler,
		CancelAndStopHandler,
		HelpHandler
	)
	.addErrorHandlers(
		ErrorHandler
	);
	
// We create the skill adapter with Express.
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(
	skill,
	true, // Verify signature.
	true // Verify timestamp
);
		
// Create Express application and show
// a default success message (GET /)
const app = express();
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Skill Alexa for Discord is ready !",
		endpoint: req.url
	})
});

// Endpoint for Alexa (POST /)
app.post("/", adapter.getRequestHandlers());

// Start skills handler.
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.info(
		"[Deploy] Serving Alexa endpoint for unofficial Discord API skill.\n"
		+ `\tAvailable on port ${PORT}.`
	);
});