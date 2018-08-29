const ngrok = require('ngrok');

function connect() {
    return ngrok.connect(5000)
}


connect().then(x => {
    console.log(x)
}).catch(err => {
    console.log(err)
})