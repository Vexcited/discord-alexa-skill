const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.info("[ErrorHandler] -> Handled an error.");
    console.error(error);

    const sayAgainSpeechText = "An error occured, can you say your command again ?";

    console.info("[ErrorHandler] <- Sent try again message.");
    return handlerInput.responseBuilder
      .speak(sayAgainSpeechText)
      .reprompt(sayAgainSpeechText)
      .getResponse();
  }
};

module.exports = ErrorHandler;