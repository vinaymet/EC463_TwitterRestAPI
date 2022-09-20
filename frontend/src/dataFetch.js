import React from 'react';

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
        let accountToCheckStr = String(inputAccount)

        // 1st API call
        let req = JSON.stringify({ username: accountToCheckStr });
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: req,
        };
        const response = await fetch("https://vab-api3.herokuapp.com/twitter", requestOptions);
        const data = await response.json();
        console.log(data);

        // 2nd API call
        let req2 = JSON.stringify({ Twitter_Text: data.Twitter_Text, username: accountToCheckStr });
        const requestOptions2 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: req2,
        };
        const response2 = await fetch("https://vab-googleapi.herokuapp.com/twitter", requestOptions2)
        const data2 = await response2.json();
        console.log(data2);

        this.setState({ botScore: data2.BotScore });
        this.setState({ majorTopics: data2.Major_Categories });
        this.setState({ sentimentScore: data2.Sentiment });
    }

    render() {
        const { account, botScore, majorTopics, sentimentScore } = this.state;
        return (
            <div className="card text-center m-3">
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <label>Enter the Twitter handle below, starting with @ (for example: @elonmusk):    
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
                <h5>Results will take at least several seconds to update below.</h5>
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