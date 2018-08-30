const rquestApi = require('request-promise')
const apiKey = require('../config/config').meetupAPIKey
const colors = require('colors/safe');
const image = 'https://secure.meetupstatic.com/s/img/786824251364989575000/logo/swarm/m_swarm_630x630.png'
const { List, Button, BasicCard, Image } = require('actions-on-google')
const fakeData = require('../config/data')

function buildSingleMeetupResponse(conv) {
	let meetup = conv.data.events[conv.data.meetupIndex]
	const date = new Date(meetup.time)
	// let displayText = `Meetup number ${conv.data.events.length + 1} ${meetup.name} by ${meetup.group.name} on ${date.toDateString()}`
	conv.ask(`<speak> 
		<say-as interpret-as="ordinal"> ${conv.data.meetupIndex + 1} </say-as> meetup is ${meetup.name}. <break time="1"/> by ${meetup.group.name}
		<break time="1"/> on ${date.toDateString()}. <break time="1600ms"/> For more, visit website <break time="800ms"/>. Say next meetup for more
		</speak>`)

	return conv.ask(new BasicCard({
		text: meetup.description,
		title: meetup.name,
		image: new Image({
			url: image,
			alt: meetup.name
		}),
		buttons: new Button({
			title: `Read more`,
			url: meetup.link
		})
	}))
}

function buildMeetupListResponse(conv) {
	// let displayText = events.reduce((prev, meetup, i) =>
	// 	prev + `Meetup number ${i + 1} : ${meetup.name} by ${meetup.group.name} on ${new Date(meetup.time).toDateString()}, For more information, 
	// 	type meetup number ${i + 1}.\n`, 'This is a list of foods ')

	conv.ask(`<speak> 
	This is a list of meetups <break time="800ms"/>.
	</speak>
	`)

	const reduction = conv.data.events.reduce((prev, meetup, i) =>  i<4 ? prev + 
	`<say-as interpret-as="ordinal"> ${i + 1} </say-as> meetup <break time="500ms"/> is ${meetup.name}
	<break time="700ms"/> on ${new Date(meetup.time).toDateString()}. For more information say "meetup ${i + 1}".  <break time="1200ms"/>` 
	: prev ,'')

	conv.ask(`<speak>` + reduction + `</speak>`)

	// console.log(colors.yellow('Hmmamamamama'))

	return conv.ask(new List({
		title: 'Titel',
		items: {
			item1: {
				title: 'aaaa',
				description: 'asrer',
				image: new Image({
					url: image,
					alt: 'AAAAAAA'
				})
			}
		}
	}))
	// return conv.ask('asd')


	// let res = conv.buildRichResponse().addSimpleResponse(speech).buildList('List of meeaaatups')
	// events.forEach((meetup, i) => {
	// 	res.addItems(
	// 		conv.buildOptionItem(`meetup ${i}`).setTitle(`meetup ${i + 1} :`).setImage(image, meetup.name)
	// 	)
	// });
	// conv.ask(res)
}

function fetchFakeEvents() {
	return new Promise((resolve)=>[
		resolve(fakeData.events)
	])
}

function fetchEvents() {
	return rquestApi(`https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=31.360367&lat=30.046225&key=${apiKey}`)
		.then(meetups => JSON.parse(meetups).events).catch(err => {
			console.log(colors.red(err))
		})
}

function saveConvState(conv, events) {
	console.log(colors.yellow(events.length))
	conv.data.meetupIndex = 0
	conv.data.events = events
}

module.exports = {
	inputShowMeetups(conv) {
		return fetchEvents().then(events => {
			if (!events.length) {
				conv.close('No meetups available now')
			}
			saveConvState(conv, events)
			return buildSingleMeetupResponse(conv)
		})
	},
	showMeetupsList(conv) {
		return fetchEvents().then(events => {
			if (!events.length) {
				conv.close('No meetups available now')
			}
			saveConvState(conv, events)
			return buildMeetupListResponse(conv)
		})
	},
	showMeetupsNext(conv) {
		if (conv.data.events.length == conv.data.meetupIndex - 1) {
			return conv.close('No more meetups after this one')
		} else {
			conv.data.meetupIndex++
			return buildSingleMeetupResponse(conv)
		}
	},
	showMeetupsPrevious(conv) {
		if (conv.data.meetupIndex == 0) {
			return conv.close('No more meetups before this one')
		} else {
			conv.data.meetupIndex--
			return buildSingleMeetupResponse(conv)
		}
	},
	showMeetupsRepeat(conv) {
		return buildSingleMeetupResponse(conv)
	},

	showNumber(conv) {
		let param = conv.contexts.get('actions_intent_option').parameters['OPTION']
		if (param) {
			conv.data.meetupIndex = parseInt(param.value.replace('meetup ', ''))
		}
		let number = conv.params['number']
		if (number) {
			conv.data.meetupIndex = number[0] - 1
		}
		return buildSingleMeetupResponse(conv)
	}
}