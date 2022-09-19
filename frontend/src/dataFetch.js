import React from 'react';
var request = require('request');

class DataFetch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            botScore: null,
            majorTopics: null,
            sentimentScore: null
        };
    }

    async componentDidMount() {
        // let req = JSON.stringify({ username: '@elonmusk' });

        // var clientServerOptions = {
        //     uri: 'https://vab-api2.herokuapp.com/tweety',
        //     body: req,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // request(clientServerOptions, function (error, response) {
        //     console.log(error,response.body);
        //     const data = response.json();
        //     console.log(data);
        // });

        let req = JSON.stringify({ username: '@elonmusk' });

        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: req,
        };
        const response = await fetch("https://vab-api2.herokuapp.com/tweety", requestOptions);
        const data = await response.json();
        console.log(data);
        // let obj = JSON.parse(data);
        this.setState({ botScore: data.BotScore });
        this.setState({ majorTopics: data.Major_Categories });
        this.setState({ sentimentScore: data.Sentiment });
        // response.text().then(data => {
        //     console.log(data);
        // });
    }

    render() {
        const { botScore, majorTopics, sentimentScore } = this.state;
        return (
            <div className="card text-center m-3">
                <h3 className="card-header">Twitter Account Information</h3>
                <div className="card-body">
                    Bot Score: {botScore}
                    <br /> <br />
                    Major Topics: {majorTopics}
                    <br /> <br />
                    Sentiment: {sentimentScore}
                    <br /> <br />
                </div>
            </div>
        );
    }
}

export default DataFetch; 