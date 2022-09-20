This is a Twitter Rest API Project for BU EC463 - Senior Design Fall 2022

Created by: Vinay Metlapalli, Beatriz Sicilia, and Alex Zhou

In this mini software project, we have developed a web app where the users enters a twitter user who he wants to track and then, is able to analyze different aspects retrieved from the twits of the selected user such as the sentiment, main content or how likely they are to be bots. 

GOOGLE NATURAL LANGUAGE API:

We have implemented the Google Natural Language API, which includes different features such as sentiment analysis, entity analysis or content classification. We have used it to analyze the text on the twits that were retrieved. 

BOT CHECKER:

A social bot is an automatic program that simulates human behavior on social network, taking part in discussions or spreading unverified information around social media. Malicious bots usually follow the same patterns, that’s why we have used “Botometer”, a supervised machine learning tool for bot detection on twitter which we have accessed using an API. 

FRONT END:

We utilized the React.js framework for the frontend component as a webpage application. We started with the create-react-app framework and added the features that were needed for our project. The page starts with a Google login authentication, followed by an input box for the user to enter a Twitter handle they would like to track for bot score, main content topics, and overall sentiment. After the API calls are made, the three pieces of account information are retrieved and presented to the user below the input box. 

Google Firebase was chosen to host our React web app. After building the React app and setting up the Firebase environment, you can access the webpage by clicking here: https://ec463-twitter-miniproject.web.app/
