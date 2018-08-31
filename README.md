## Pre-Usage
* Use V2 Dialogflow api
* Enable fullfilment for intents including welcome intent
* In Dialogflow
    * In Intents
        * In Default Welcome Intent
            * Make sure there are 2 events
                * Dialogflow Welcome
                * Google Assistant Welcome
    * In Integrations 
        * Go to Assistant
            * Add invocation intents including welcome intent
  
## Usage
* `firebase use --add` to select the project you would work on 
    * This is important to prevent deploying to the wrong project
* npm start
* node ngrok
* In fullfillment 
    * Add `${ngrok url}/prokect_name/region/dialogflowFirebaseFulfillment` to the url field
* In Integrations 
    * Go to Assistant
        * Test your app in simulator


## To do
* Add location capability
* Fix listing meetups by card
