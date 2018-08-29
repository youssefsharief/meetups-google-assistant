const rquestApi = require('request-promise')
const apiKey = require('../config/config').meetupAPIKey
const stateStore = require('../state_store')
const responses = require('../responses/response')
const constants = require('../config/constants')
const colors = require('colors/safe');

function buildSingleMeetupResponse() {
	let responseToUser, displayText, endConversation
	const image = 'https://secure.meetupstatic.com/s/img/786824251364989575000/logo/swarm/m_swarm_630x630.png'
	if (!stateStore.app.data.meetupData.length) {
		endConversation = true
		responseToUser = 'No meetups available now'
		displayText = 'No meetups available now'
	} else if (stateStore.app.data.meetupCount < 0) {
		endConversation = true
		responseToUser = 'No more meetups before this one'
		displayText = 'No more meetups before this one'
	} else if (stateStore.app.data.meetupCount < stateStore.app.data.meetupData.length) {
		let meetup = stateStore.app.data.meetupData[stateStore.app.data.meetupCount]
		const date = new Date(meetup.time)
		let displayText = `Meetup number ${stateStore.app.data.meetupCount + 1} ${meetup.name} by ${meetup.group.name} on ${date.toDateString()}`
		let speech = `<speak> 
		<say-as interpret-as="ordinal"> ${stateStore.app.data.meetupCount+1} </say-as> meetup. Is ${meetup.name}. <break time="1"/> by ${meetup.group.name}
		<break time="1"/> on ${date.toDateString()}. <break time="1600ms"/> For more visit website <break time="800ms"/>. Say next meetup for more
		`
		
		let googleRichResponse = stateStore.app.buildRichResponse().addSimpleResponse(displayText).addBasicCard(
			stateStore.app.buildBasicCard(meetup.description).setTitle(meetup.name).addButton(`Read more ${meetup.link}`)
				.setImage(image, meetup.name).setImageDisplay('CROPPED')
		)
		responseToUser = {
			googleRichResponse, displayText, speech
		}
	} else {
		responseToUser = 'There are no more meetups schedules at this time'
		displayText = 'There are no more meetups schedules at this time'
	}

	if (stateStore.requestSource === constants.googleAssistantRequest) {
		console.log(colors.yellow('yes google'))
		return endConversation ? stateStore.app.tell(responseToUser.googleRichResponse) : stateStore.app.askWithList(displayText, responseToUser.googleListResponse)
		// responses.sendGoogleResponse(responseToUser, endConversation)
	} else {
		responses.sendResponse(displayText)
	}
}

function buildMeetupListResponse() {
	let responseToUser, displayText, endConversation
	const image = 'https://secure.meetupstatic.com/s/img/786824251364989575000/logo/swarm/m_swarm_630x630.png'
	if (!stateStore.app.data.meetupData.length) {
		endConversation = true
		displayText = 'No meetups available now'
	} else if (stateStore.app.data.meetupCount < stateStore.app.data.meetupData.length) {
		displayText = 'This is a list of meetups. Please select one of them to proceeed. '
		let speech = `<speak> 
		This is a list of meetups <break time="800ms"/>.
		</speak>
		`

		let googleListResponse = stateStore.app.buildList('List of meetups')
		stateStore.app.data.meetupData.forEach((meetup, i) => {
			const date = new Date(meetup.time)
			googleListResponse.addItems(
				stateStore.app.buildOptionItem(`meetup ${i}`).setTitle(`meetup ${i + 1} :`).setImage(image, meetup.name)
			)
			displayText += `Meetup number ${i + 1} : ${meetup.name} by ${meetup.group.name} on ${date.toDateString()}, For more information, 
			type meetup number ${i + 1}.`

			if(i<1) {
				speech =+ `<say-as interpret-as="ordinal"> ${i+1} <say-as> meetup <break time="500ms"/> is ${meetup.name}
				<break time="700ms"/> on ${date.toDateString()}. For more information say "meetup ${i+1}"  <break time="1200ms"/>`
			}
		});

		responseToUser = {
			googleListResponse: googleListResponse, speech, displayText
		}
	} else {
		displayText = 'There are no more meetups schedules at this time'
	}

	if (stateStore.requestSource === constants.googleAssistantRequest) {
		responses.sendGoogleResponse(responseToUser, endConversation)
	} else {
		responses.sendResponse(displayText)
	}
}


function getMeetupData() {
	return rquestApi(`https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=31.360367&page=20&lat=30.046225&key=${apiKey}`).then(data => {
		const meetups = JSON.parse(data)
		if (meetups.events) {
			console.log(colors.yellow('yessssss'))
			stateStore.app.data.meetupData = meetups.events
		}
	}).catch(err => {
		console.log(colors.red(err))
	})
}

function displayMeetup() {
	// if (stateStore.app.data.meetupData.length === 0) {
	getMeetupData().then(() => {
		buildSingleMeetupResponse()
	})
	// }
}

function displayMeetupList() {
	// if (stateStore.app.data.meetupData.length === 0) {
	getMeetupData().then(() => {
		buildMeetupListResponse()
	})
	// }
}

module.exports = {
	inputShowMeetups() {
		displayMeetup()
	},
	showMeetupsNext() {
		stateStore.app.data.meetupCount++
		displayMeetup()
	},
	showMeetupsPrevious() {
		stateStore.app.data.meetupCount--
		displayMeetup()
	},
	showMeetupsRepeat() {
		displayMeetup()
	},
	showMeetupsList() {
		displayMeetupList()
	},
	showNumber() {
		console.log(colors.yellow('showing number'))
		let param = stateStore.app.getContextArgument('actions_intent_option', 'OPTION')
		console.log(colors.yellow('param', param))
		if (param) {
			stateStore.app.data.meetupCount = parseInt(param.value.replace('meetup ', ''))
		}
		let number = stateStore.app.getArgument('number')
		if (number) {
			stateStore.app.data.meetupCount = number[0] - 1
		}
		displayMeetup()
		console.log(colors.yellow('number', number))
	}
}