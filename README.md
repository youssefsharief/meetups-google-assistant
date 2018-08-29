* Use V1 Legacy Dialogflow api
* Enable fullfilment for intents


## Notes
* You could have 2 intents that uses the same action and are handled the same way in the backend
* You could use events in dialogflow
* Test TTS simulator in Google actions simulator by clicking on the audio tab and testing new text

### How to deal with different surfaces
* X branching
    * add the following contexts to limit usages for device
        * `actions_capability_audio_output`
        * `actions_capability_screen_output`

### Code
* app.tell() mutes mic 
* app.speak() opens the mic


TODO
 1) add previous and repeat intents for showing meetups

2) make code changes to give proper response on previous and repeat query

3) Add a question where you need a response from the user before you open the mic 

4) mute the mic where you don't expect no input from the user 