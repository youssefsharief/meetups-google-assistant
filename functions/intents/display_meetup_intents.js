const rquestApi = require('request-promise')
const apiKey = require('../config/config').meetupAPIKey
const stateStore = require('../state_store')
// const responses = require('../responses/response')
// const constants = require('../config/constants')
const colors = require('colors/safe');
const image = 'https://secure.meetupstatic.com/s/img/786824251364989575000/logo/swarm/m_swarm_630x630.png'

function buildSingleMeetupResponse(events) {
	if (!events.length) {
		stateStore.app.tell('No meetups available now')
	} else if (stateStore.app.data.meetupCount < 0) {
		stateStore.app.tell('No more meetups before this one')
	} else if (stateStore.app.data.meetupCount < events.length) {
		let meetup = events[stateStore.app.data.meetupCount]
		const date = new Date(meetup.time)
		let displayText = `Meetup number ${stateStore.app.data.meetupCount + 1} ${meetup.name} by ${meetup.group.name} on ${date.toDateString()}`
		let speech = `<speak> 
		<say-as interpret-as="ordinal"> ${stateStore.app.data.meetupCount + 1} </say-as> meetup is ${meetup.name}. <break time="1"/> by ${meetup.group.name}
		<break time="1"/> on ${date.toDateString()}. <break time="1600ms"/> For more, visit website <break time="800ms"/>. Say next meetup for more
		`
		let res = stateStore.app.buildRichResponse().addSimpleResponse({speech, text: displayText}).addBasicCard(
			stateStore.app.buildBasicCard(meetup.description).setTitle(meetup.name).addButton(`Read more ${meetup.link}`)
				.setImage(image, meetup.name).setImageDisplay('CROPPED')
		)
		stateStore.app.ask(res)
	} else {
		stateStore.app.tell('There are no more meetups schedules at this time')
	}
}

function buildMeetupListResponse(events) {
	if (!events.length) {
		stateStore.app.tell('No meetups available now')
	} else if (stateStore.app.data.meetupCount < events.length) {
		// let displayText = events.reduce((prev, meetup, i) =>
		// 	prev + `Meetup number ${i + 1} : ${meetup.name} by ${meetup.group.name} on ${new Date(meetup.time).toDateString()}, For more information, 
		// 	type meetup number ${i + 1}.\n`, 'This is a list of foods ')

		let speech = events.reduce((prev, meetup, i) => i < 1 ?
			prev + `<say-as interpret-as="ordinal"> ${i + 1} <say-as> meetup <break time="500ms"/> is ${meetup.name}
				<break time="700ms"/> on ${new Date(meetup.time).toDateString()}. For more information say "meetup ${i + 1}"  <break time="1200ms"/>`
			: '', `<speak> 
			This is a list of meeaeetups <break time="800ms"/>.
			</speak>
			`)

		let res = stateStore.app.buildRichResponse().addSimpleResponse(speech).buildList('List of meeaaatups')
		events.forEach((meetup, i) => {
			res.addItems(
				stateStore.app.buildOptionItem(`meetup ${i}`).setTitle(`meetup ${i + 1} :`).setImage(image, meetup.name)
			)
		});
		stateStore.app.ask(res)
	} else {
		stateStore.app.ask('There are no more meetups schedules at this time')
	}
}


function getMeetupData() {
	return rquestApi(`https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=31.360367&lat=30.046225&key=${apiKey}`).then(data => {
		const meetups = JSON.parse(data)
		console.log(colors.yellow(meetups.events))
		if (meetups.events) {
			return meetups.events
		}
	}).catch(err => {
		console.log(colors.red(err))
	})
}

function displayMeetup() {
	return getMeetupData().then((events) => {
		buildSingleMeetupResponse(events)
	})
}

function displayMeetupList() {
	return getMeetupData().then((events) => {
		buildMeetupListResponse(events)
	})
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
		let param = stateStore.app.getContextArgument('actions_intent_option', 'OPTION')
		if (param) {
			stateStore.app.data.meetupCount = parseInt(param.value.replace('meetup ', ''))
		}
		let number = stateStore.app.getArgument('number')
		if (number) {
			stateStore.app.data.meetupCount = number[0] - 1
		}
		displayMeetup()
	}
}