const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const stateStore = require('./state_store')
const commonIntents = require('./intents/common_intents')
const otherIntents = require('./intents/other_intents')
const displayMeetupItents = require('./intents/display_meetup_intents')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
	// console.log('Request headers: ' + JSON.stringify(request.headers));
	// console.log('Request body: ' + JSON.stringify(request.body));
	let action = request.body.result.action;
	// const parameters = request.body.result.parameters; 
	// const inputContexts = request.body.result.contexts;
	// Get the request source (Google Assistant, Slack, API, etc) and initialize DialogflowApp
	const requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
	stateStore.saveRequestSource(requestSource)
	const app = new DialogflowApp({ request: request, response: response });
	app.data.meetupData = app.data.meetupData || []
	app.data.meetupCount = app.data.meetupCount || 0
	stateStore.saveApp(app)
	stateStore.saveResponse(response)
	const actionHandlers = {
		'input.welcome': () => commonIntents.welcomeIntent(),
		'input.unknown': () => commonIntents.unknownIntent(),
		'default': () => commonIntents.defaultIntent(),
		'input.showmeetups': () => displayMeetupItents.inputShowMeetups(),
		'showmeetups.showmeetups-next': () => displayMeetupItents.showMeetupsNext(),
		'showmeetups.showmeetups-previous': () => displayMeetupItents.showMeetupsPrevious(),
		'showmeetups.showmeetups-repeat': () => displayMeetupItents.showMeetupsPrevious(),
		'input.showmeetuplist': () => displayMeetupItents.showMeetupsList(),
		'showmeetuplist.showmeetuplist-selectnumber': () => displayMeetupItents.showNumber(),
		'input.panic': () => otherIntents.panic()
	};

	actionHandlers[action || 'default']();

});



