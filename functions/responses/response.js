const stateStore = require('../state_store')
const colors = require('colors/safe');

function sendGoogleResponse(responseToUser, endConversation = false) {
    // if (stateStore.hasAudio && responseToUser.ssml) {
    //     responseToUser.speech = responseToUser.ssml
    // }
    // If speech or displayText is defined use it to respond
    // let googleResponse = responseToUser.googleRichResponse || stateStore.app.buildRichResponse().addSimpleResponse({
    //     speech: responseToUser.speech || responseToUser.displayText,
    //     displayText: responseToUser.displayText || responseToUser.speech
    // })

    // if (stateStore.hasAudio && responseToUser.googleRichResponse) {
    //     googleResponse = responseToUser.googleRichResponse
    // }

    // Optional: add contexts (https://dialogflow.com/docs/contexts)
    // if (responseToUser.googleOutputContexts) {
    //     console.log('yes there is context', responseToUser.googleOutputContexts)
    //     stateStore.app.setContext(...responseToUser.googleOutputContexts);
    // }
    if (endConversation) {
        stateStore.app.tell(googleResponse)
    } else if (responseToUser.googleListResponse && stateStore.hasScreen) {
        stateStore.app.askWithList(responseToUser.speech || responseToUser.displayText, responseToUser.googleListResponse)
    } else {
        stateStore.app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
    }

}
// addItem
// Function to send correctly formatted responses to Dialogflow which are then sent to the user
function sendResponse(responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
        let responseJson = {};
        responseJson.speech = responseToUser; // spoken response
        responseJson.displayText = responseToUser; // displayed response
        stateStore.response.json(responseJson); // Send response to Dialogflow
    } else {
        // If the response to the user includes rich responses or contexts send them to Dialogflow
        let responseJson = {};

        // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
        responseJson.speech = responseToUser.speech || responseToUser.displayText;
        responseJson.displayText = responseToUser.displayText || responseToUser.speech;

        // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
        responseJson.data = responseToUser.richResponses;

        // Optional: add contexts (https://dialogflow.com/docs/contexts)
        responseJson.contextOut = responseToUser.outputContexts;

        stateStore.response.json(responseJson); // Send response to Dialogflow
    }
}

module.exports = {
    sendGoogleResponse, sendResponse
}