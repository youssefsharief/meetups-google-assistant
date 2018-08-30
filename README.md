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
* conv.close() mutes mic 
* app.ask() opens the mic
* Two ways to save state
    * For a user
        * **conv.user.storage**
    * For a conversation with a user    
        * **conv.data**


TODO
* Fix state with events
 
