import React from 'react';

class DataFetch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false,
            account: null,
            botScore: null,
            majorTopics: null,
            sentimentScore: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Once account is submitted
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.account)
        this.componentDidMount(this.state.account)
    }

    // API Call
    // CORS error: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
    async componentDidMount(inputAccount) {
        let accountToCheckStr = String(inputAccount)
        console.log(this.state.isClicked)
        
        this.setState({ botScore: "" });
        this.setState({ majorTopics: "" });
        this.setState({ sentimentScore: "" });    

        if (this.state.isClicked === true) {
            let req = JSON.stringify({ username: accountToCheckStr });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: req,
            };
            const response = await fetch("https://arcane-lowlands-40251.herokuapp.com/https://vab-apitest.herokuapp.com/twitter", requestOptions);
            const data = await response.json();
            console.log(data);

            this.setState({ botScore: data.BotScore });
            this.setState({ majorTopics: data.Major_Categories });
            this.setState({ sentimentScore: data.Sentiment });            
        }
    }

    render() {
        const { account, botScore, majorTopics, sentimentScore } = this.state;
        return (
            <div className="card text-center m-3">
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <label>Enter the desired Twitter handle below:    
                        <br /> <br /><div>
                        <input 
                            type="text" 
                            value={account}
                            onChange={(e) => this.setState({account: e.target.value, isClicked: true})}
                        />
                        </div>
                    </label>
                    <input type="submit" />
                    </form>
                </div>
                <h5>Results may take up to 10 seconds to display below.</h5>
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