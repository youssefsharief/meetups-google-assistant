
module.exports = {
    panic(conv) {
        const displayText = `
        Step 1 take a deep breath. \n
        Step 2 Exhale \n
        Step 3 take a deep breath again \n
        Step 4 exhale \n
        `
        const speech = `
        <speak> 
        Step 1 take a deep breath. \n <break time="2600ms"/>
        Step 2 Exhale.\n 
        Step 3 take a deep breath again.\n  <break strength="weak"/>
        Step 4 exhale.\n 
        </speak>
    `
        return conv.close(speech)
    },

}