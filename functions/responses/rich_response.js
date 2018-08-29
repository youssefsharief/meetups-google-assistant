// const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library

// const app = new DialogflowApp();
// const googleRichResponse = app.buildRichResponse()
// 	.addSimpleResponse('This is the first simple response for Google Assistant')
// 	.addSuggestions(
// 		['Suggestion Chip', 'Another Suggestion Chip'])
// 	// Create a basic card and add it to the rich response
// 	.addBasicCard(app.buildBasicCard(`This is a basic card.  Text in a
//  basic card can include "quotes" and most other unicode characters
//  including emoji 📱.  Basic cards also support some markdown
//  formatting like *emphasis* or _italics_, **strong** or __bold__,
//  and ***bold itallic*** or ___strong emphasis___ as well as other things
//  like line  \nbreaks`) // Note the two spaces before '\n' required for a
// 		// line break to be rendered in the card
// 		.setSubtitle('This is a subtitle')
// 		.setTitle('Title: this is a title')
// 		.addButton('This is a button', 'https://assistant.google.com/')
// 		.setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
// 			'Image alternate text'))
// 	.addSimpleResponse({
// 		speech: 'This is another simple response',
// 		displayText: 'This is the another simple response 💁'
// 	});

// module.exports = {
// 	googleRichResponse
// }
// Rich responses for both Slack and Facebook
// const richResponses = {
// 	'slack': {
// 		'text': 'This is a text response for Slack.',
// 		'attachments': [
// 			{
// 				'title': 'Title: this is a title',
// 				'title_link': 'https://assistant.google.com/',
// 				'text': 'This is an attachment.  Text in attachments can include \'quotes\' and most other unicode characters including emoji 📱.  Attachments also upport line\nbreaks.',
// 				'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
// 				'fallback': 'This is a fallback.'
// 			}
// 		]
// 	},
// 	'facebook': {
// 		'attachment': {
// 			'type': 'template',
// 			'payload': {
// 				'template_type': 'generic',
// 				'elements': [
// 					{
// 						'title': 'Title: this is a title',
// 						'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
// 						'subtitle': 'This is a subtitle',
// 						'default_action': {
// 							'type': 'web_url',
// 							'url': 'https://assistant.google.com/'
// 						},
// 						'buttons': [
// 							{
// 								'type': 'web_url',
// 								'url': 'https://assistant.google.com/',
// 								'title': 'This is a button'
// 							}
// 						]
// 					}
// 				]
// 			}
// 		}
// 	}
// };




