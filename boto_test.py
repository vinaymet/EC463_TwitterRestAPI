import botometer
import pandas as pd

twitter_app_auth = {
                    'consumer_key': '6RLUh7BzRCdwfdCyIFw5cOCHj',
                    'consumer_secret': '736rrQnMbO06Ck0YBCHcfXZPqgPRjU6CSoYOkW6e3clW7JbiBm',
                    'access_token': '1557118965314453504-7adMRXYRUR7nQEWHEQ8Mw97GbhfFqX',
                    'access_token_secret': '2Yn27VOQ6VntnXchseqbJtWlxGz3XKN0O2guw564Zn0At'
                   }


# bom = botometer.Botometer(
#                 wait_on_ratelimit = True,
#                 botometer_api_url=botometer_api_url,
#                 rapidapi_key = '',
#                 **twitter_app_auth)

bom = botometer.Botometer(wait_on_ratelimit=True,
                          rapidapi_key='4d3863afb7msh188df29dde30c0ep1c9cf6jsn95f19cdfb25c',
                          botometer_api_url='https://botometer-pro.p.rapidapi.com',
                          **twitter_app_auth)

result = bom.check_account('@espn')
result_frame = pd.DataFrame.from_dict(result)
result_frame.to_csv('out.csv', index=False)
