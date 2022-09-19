let req = JSON.stringify({ username: '@elonmusk' });

var request = require('request');

var clientServerOptions = {
    uri: 'https://vab-api2.herokuapp.com/tweety',
    body: req,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
request(clientServerOptions, function (error, response) {
    console.log(error,response.body);
});
