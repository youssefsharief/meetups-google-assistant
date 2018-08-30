
function welcomeIntent(conv) {
    conv.ask('Hello, Welcome to my Dialogflow agent!')
}

function testingIntent(conv) {
    conv.ask('Hello, Welcome to my s!')
}

function unknownIntent(conv) {
    conv.ask('I\'m having trouble, can you try that again?')
}

function defaultIntent(conv) {
    conv.ask('This message is from Dialogflow\'s Cloud Functions for Firebase editor!')
}


module.exports = {
    welcomeIntent, unknownIntent, defaultIntent, testingIntent
}