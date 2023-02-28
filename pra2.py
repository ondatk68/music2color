import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
#import pandas as pd
#import json

client_id = '8b116a7228c342b98f196596896f2215'
client_secret = '1e0dad160f364b449f5a63f1976e1a4d'

client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

results = sp.playlist_tracks('37i9dQZEVXbKXQ4mDTEBXq', limit = 20)
tracks = results['items']

def color_by_key(key):
    if "major" in key:
        return "(red)"
    elif "minor" in key:
        return "(blue)"
    else:
        return "unknown"
    
for track in tracks:
    track_id = track['track']['id']
    track_name = track['track']['name']
    artist = track['track']['album']['artists'][0]['name']
    key = sp.audio_features(track_id)[0]['key']
    mode = sp.audio_features(track_id)[0]['mode']

    if mode == 1:
        key = str(key) + ' major'
    else:
        key = str(key) + ' minor'
    print(track_name + " / " + artist + ': ' + key + color_by_key(key))


    
