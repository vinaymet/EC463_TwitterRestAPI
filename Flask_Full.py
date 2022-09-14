from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/tweety",methods=['POST'])
def welcome():
    if request.method == 'POST':

        USER_INPUT = request.json
        USER_INPUT = USER_INPUT['username']

        import tweepy
        import snscrape.modules.twitter as sntwitter
        import pandas as pd
        import pygsheets
        import os
        from google.cloud import language_v1

        # Twitter API Keys

        twitter_API_key = '6RLUh7BzRCdwfdCyIFw5cOCHj'
        twitter_API_secret = '736rrQnMbO06Ck0YBCHcfXZPqgPRjU6CSoYOkW6e3clW7JbiBm'
        bearer_token = 'AAAAAAAAAAAAAAAAAAAAABksfwEAAAAAoarqqrrSJe0as2Pq6Hkbw3IqyZY%3DDI0s4m7F13gBUxe59ZKnJbWs5HNqhNkIGRKlIPdndufgA21adN'
        twitter_API_access = '1557118965314453504-7adMRXYRUR7nQEWHEQ8Mw97GbhfFqX'
        twitter_API_token_secret = '2Yn27VOQ6VntnXchseqbJtWlxGz3XKN0O2guw564Zn0At'

        # Set up Tweepy Authentication

        auth = tweepy.OAuthHandler(twitter_API_key,twitter_API_secret)
        auth.set_access_token(twitter_API_access,twitter_API_token_secret)

        api = tweepy.API(auth)

        # Verify Valid Tweepy Authentication

        try:
            api.verify_credentials()
            print('Successful Authentication')
        except:
            print('Failed authentication')

        # If sucessful, try and pull latest tweet from sample user
        # NOTE: Hardcoding count to 1 for testing purposes

        tweets = api.user_timeline(screen_name=USER_INPUT,
                                   # 200 is the maximum allowed count
                                   count=100,
                                   include_rts = False,
                                   # Necessary to keep full_text
                                   # otherwise only the first 140 words are extracted
                                   tweet_mode = 'extended'
                                   )


        # ---Google NLP API---

        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] =r"/Users/vinaymetlapalli/Downloads/cloud.json"

        client = language_v1.LanguageServiceClient()

        def getSentiment(text):
            document = language_v1.Document(content=text, type=language_v1.Document.Type.PLAIN_TEXT)
            sentiment = client.analyze_sentiment(request={"document": document}).document_sentiment
            return sentiment

        def getCategories(text):
            document = language_v1.Document(content=text, type=language_v1.Document.Type.PLAIN_TEXT)
            response = client.classify_text(request = {'document': document})
            for category in response.categories:
                return category.name


        scorelist=[]
        magnitudelist=[]
        tweetList=[]
        categoryList=[]
        tweetString = ""

        for info in tweets:
            sentiment = getSentiment(str(info))
            scorelist.append(sentiment.score)
            magnitudelist.append(sentiment.magnitude)
            tweetList.append(info.full_text)
            tweetString = tweetString + " " + str(info.full_text)


        categoryList.append(getCategories(tweetString))

        output_frame = pd.DataFrame()
        output_frame['Tweet'] = tweetList
        output_frame['Sentiment'] = scorelist
        output_frame['Magnitude'] = magnitudelist

        category_frame = pd.DataFrame()
        category_frame['Major_Categories'] = categoryList



    # ---Botometer---

    import botometer

    twitter_app_auth = {
                        'consumer_key': '6RLUh7BzRCdwfdCyIFw5cOCHj',
                        'consumer_secret': '736rrQnMbO06Ck0YBCHcfXZPqgPRjU6CSoYOkW6e3clW7JbiBm',
                        'access_token': '1557118965314453504-7adMRXYRUR7nQEWHEQ8Mw97GbhfFqX',
                        'access_token_secret': '2Yn27VOQ6VntnXchseqbJtWlxGz3XKN0O2guw564Zn0At'
                       }

    bom = botometer.Botometer(wait_on_ratelimit=True,
                              rapidapi_key='4d3863afb7msh188df29dde30c0ep1c9cf6jsn95f19cdfb25c',
                              botometer_api_url='https://botometer-pro.p.rapidapi.com',
                              **twitter_app_auth)

    result = bom.check_account(USER_INPUT)
    botscore = result['display_scores']['english']['overall']

    output_frame['BotScore'] = botscore

    return category_frame.to_dict()

if(__name__=="__main__"):
    app.run()
