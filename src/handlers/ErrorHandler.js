const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`[ErrorHandler] Error handled.`, error);

    const sayAgainSpeechText = "Sorry, can you say your command again, I didn\'t understand it.";

    return handlerInput.responseBuilder
      .speak(sayAgainSpeechText)
      .reprompt(sayAgainSpeechText)
      .getResponse();
  }
};

module.exports = ErrorHandler;