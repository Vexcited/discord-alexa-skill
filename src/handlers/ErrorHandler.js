const ErrorHandler = {
  canHandle() {
    return true;
  },

  handle(handlerInput, error) {
    console.info("[ErrorHandler] -> Handled an error.");
    console.error(error);

    // Get Alexa locale language.
    const languageForSpeech = alexaLocale.split("-")[0];
    const { speechText } = require(`../languages/${languageForSpeech}.json`)["ErrorHandler"];

    console.info("[ErrorHandler] <- Sent try again message.");
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

module.exports = ErrorHandler;