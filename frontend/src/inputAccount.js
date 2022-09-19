import React, {useState} from "react";

function InputAccount() {
    const [account, setAccount] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The account name you entered was: ${account}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Enter the Twitter account you want to follow:    
                <div>
                <input 
                    type="text" 
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                />
                </div>
            </label>
            <input type="submit" />
            </form>
        </div>
    )
}

export default InputAccount;