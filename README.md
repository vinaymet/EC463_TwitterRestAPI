This is a Twitter Rest API Project for BU EC463 - Senior Design Fall 2022

Created by: Vinay Metlapalli, Beatriz Sicilia, and Alex Zhou

In this mini software project, we have developed a web app where the users enters a twitter user who he wants to track and then, is able to analyze different aspects retrieved from the twits of the selected user such as the sentiment, main content or how likely they are to be bots. 

GOOGLE NATURAL LANGUAGE API:

We have implemented the Google Natural Language API, which includes different features such as sentiment analysis, entity analysis or content classification. We have used it to analyze the text on the twits that were retrieved. 

BOT CHECKER:

A social bot is an automatic program that simulates human behavior on social network, taking part in discussions or spreading unverified information around social media. Malicious bots usually follow the same patterns, that’s why we have used “Botometer”, a supervised machine learning tool for bot detection on twitter which we have accessed using an API. 

FRONT END:

We utilized the React.js framework for the frontend component as a webpage application. We started with the create-react-app framework and added the features that were needed for our project. The page starts with a Google login authentication, followed by an input box for the user to enter a Twitter handle they would like to track for bot score, main content topics, and overall sentiment. After the API calls are made, these three pieces of account information are retrieved and presented to the user below the input box. 

Google Firebase was chosen to host our React web app. After building the React app and setting up the Firebase environment, you can access the webpage by clicking here: https://ec463-twitter-miniproject.web.app/

Should you decide to add or modify the web page, make sure to download all the relevant node packages in the frontend directory:

- npm install [package]

Run the project locally on localhost 3000:

- npm run start

Build your changes:

- npm run build

Deploy/host the web page; since we used Firebase, deploy as:

- firebase deploy

---BACKEND:----

The backend contains a Python script used to create a Flask API hosted on Heroku. Our API calls and retrieves data from the three external APIs. It is called via POST request and can be accessed through our REACT JS webpage. Below is a detailed overview of the external API’s we used, the structure of our API, and how our API interacts with Heroku (the hosting service we selected).

External API’s:

Twitter API (Tweepy)
  verify_credentials
     This is the first function from the Twitter API that is called. The purpose is to first verify that the input twitter handle from the user is valid.        If so, the program continues, otherwise, the API returns an “invalid user” message to the user.
  user_timeline 
    This is the secon function from the Twitter API that is called. The purpose is to pull 200 tweets (not including retweets) from the account the user       entered. The tweets are stored in a list for further analysis

Google Natural Language Processing (NLP) API:
    analyze_sentiment 
      This is the first function from the Google NLP API that is called. This function returns a sentiment score from -1 to 1 for the 200 tweets collected       from the twitter API
    classify_text
      This is the second function from the Google NLP API that is called. This function returns the major categories discussed in the 200 tweets collected       from the Twitter API.

Botometer API
    check_account
      This is the only function from the Botometer API that is called. This function returns a score from 0-5 on how likely the account the user inputted         is a bot. Where 0 is more unlikely and 5 is more likely.

Internal (Our) Flask API Structure:
    External API Calls:
      The first part of the backend infrastructure is the API calls to the services outlined above
          Output Packaging with JSON via Post Request:
             Our API outputs the sentiment, categories, and Botometer score in a JSON format.
             There are several error checks throughout the script to ensure that the output from our API is accurate. For example, the API first checks                  that the user inputted a valid twitter account to avoid making several unnecessary external API calls
         Our API is called via a POST request

API Hosting via Heroku:
  Pushing our API to Heroku:
    Our Flask API is pushed to Heroku via Git Command-Line
  Hosting our API on Heroku:
    Our API is hosted at: https://vab-apitest.herokuapp.com/twitter

Calling our API:
  Our API can be accessed in 3 ways:
     API Testing Apps (Ex. Postman) via POST request
     REACT JS Web app: https://ec463-twitter-miniproject.web.app/
     Directly from a script (Ex: Through the Requests library in Python)




