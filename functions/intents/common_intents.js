// const responses = require('../responses/response')
// const constants = require('../config/constants')
const stateStore = require('../state_store')

function welcomeIntent() {
    stateStore.app.ask('Hello, Welcome to my Dialogflow agent!')
}


function unknownIntent() {
    stateStore.app.ask('I\'m having trouble, can you try that again?')
    // if (stateStore.requestSource === constants.googleAssistantRequest) {
    //     responses.sendGoogleResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
    // } else {
    //     responses.sendResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
    // }
}

function defaultIntent() {
    stateStore.app.ask('This message is from Dialogflow\'s Cloud Functions for Firebase editor!')
    // if (stateStore.requestSource === constants.googleAssistantRequest) {
    //     let responseToUser = {
    //         //googleRichResponse: googleRichResponse, // Optional, uncomment to enable
    //         //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
    //         speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
    //         displayText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
    //     };
    //     responses.sendGoogleResponse(responseToUser);
    // } else {
    //     let responseToUser = {
    //         //richResponses: richResponses, // Optional, uncomment to enable
    //         //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
    //         speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
    //         displayText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
    //     };
    //     responses.sendResponse(responseToUser);
    // }
}


module.exports = {
    welcomeIntent, unknownIntent, defaultIntent
}