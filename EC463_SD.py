import snscrape.modules.twitter as sntwitter
import pandas as pd
import pygsheets

attributes_container = []

# Using TwitterSearchScraper to scrape data and append tweets to list
for i,tweet in enumerate(sntwitter.TwitterSearchScraper('from:elonmusk').get_items()):
    if i>100:
        break
    attributes_container.append([tweet.date, tweet.content, tweet.username])

# Creating a dataframe from the tweets list above
tweets_df = pd.DataFrame(attributes_container, columns=["Date","Tweets", "Username"])
print(tweets_df)
