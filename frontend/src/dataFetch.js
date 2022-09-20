import e from 'cors';
import React from 'react';
var request = require('request');

class DataFetch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            botScore: null,
            majorTopics: null,
            sentimentScore: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.account)
        this.componentDidMount(this.state.account)
    }

    async componentDidMount(inputAccount) {
        let accountToCheck = inputAccount;
        console.log(accountToCheck)
        let accountToCheckStr = String(accountToCheck)

        let req = JSON.stringify({ username: accountToCheckStr });

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
        this.setState({ botScore: data.BotScore });
        this.setState({ majorTopics: data.Major_Categories });
        this.setState({ sentimentScore: data.Sentiment });
    }

    render() {
        const { account, botScore, majorTopics, sentimentScore } = this.state;
        return (
            <div className="card text-center m-3">
                <h3 className="card-header">Twitter Account Information</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <label>Enter the Twitter account username, starting with @ (for example: @elonmusk):    
                        <br /> <br /><div>
                        <input 
                            type="text" 
                            value={account}
                            onChange={(e) => this.setState({account: e.target.value})}
                        />
                        </div>
                    </label>
                    <input type="submit" />
                    </form>
                </div>
                <br /><br />
                <div className="card-body">
                    Bot Score: {botScore}
                    <br /> <br />
                    Major Topics: {majorTopics}
                    <br /> <br />
                    Sentiment: {sentimentScore}
                    <br /> <br />
                    <h2> {this.props.account} </h2>
                </div>
            </div>
        );
    }
}

export default DataFetch; 