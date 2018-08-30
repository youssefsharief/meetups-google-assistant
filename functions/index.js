const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const { dialogflow } = require('actions-on-google'); // Google Assistant helper library
const commonIntents = require('./intents/common_intents')
const otherIntents = require('./intents/other_intents')
const displayMeetupItents = require('./intents/display_meetup_intents')


const app = dialogflow()

app.intent('Default Welcome Intent', conv => commonIntents.welcomeIntent(conv))
app.intent('Default Fallback Intent', conv => commonIntents.unknownIntent(conv))
app.intent('panic attack', conv => otherIntents.panic(conv))
app.intent('showmeetups', conv => displayMeetupItents.inputShowMeetups(conv))
app.intent('showmeetups - next', conv => displayMeetupItents.showMeetupsNext(conv))
app.intent('showmeetups - previous', conv => displayMeetupItents.showMeetupsPrevious(conv))
app.intent('showmeetups - repeat', conv => displayMeetupItents.showMeetupsRepeat(conv))
app.intent('show meetup list', conv => displayMeetupItents.showMeetupsList(conv))
app.intent('show meetup list - select.number', conv => displayMeetupItents.showNumber(conv))



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)


