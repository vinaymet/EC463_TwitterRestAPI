import tweepy

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

tweets = api.user_timeline(screen_name='elonmusk',
                           # 200 is the maximum allowed count
                           count=1,
                           include_rts = False,
                           # Necessary to keep full_text
                           # otherwise only the first 140 words are extracted
                           tweet_mode = 'extended'
                           )
# Print the Tweet Content

for info in tweets:
    print(info.full_text)
