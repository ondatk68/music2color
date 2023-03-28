import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Spotify APIの認証情報を設定
client_id = ''
client_secret = ''

client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# 日本のトップチャート50件を取得
chart = sp.playlist_tracks('37i9dQZEVXbKXQ4mDTEBXq')

# トップチャート50件のトラックIDを取得
track_ids = [track['track']['id'] for track in chart['items']]

# トラックIDを用いてアルバムアート、アーティスト名、曲名、audio_featuresを取得
album_art_list = []
artist_list = []
track_name_list = []
audio_features_list = []

for track_id in track_ids:
    track = sp.track(track_id)
    album_art_list.append(track['album']['images'][0]['url'])
    artist_list.append(track['artists'][0]['name'])
    track_name_list.append(track['name'])
    audio_features_list.append(sp.audio_features(track_id)[0])

# 取得した情報をDataFrameに変換
df_album_art = pd.DataFrame({'Album Art': album_art_list})
df_artist = pd.DataFrame({'Artist': artist_list})
df_track_name = pd.DataFrame({'Track Name': track_name_list})
df_audio_features = pd.DataFrame(audio_features_list)

df_merged = pd.concat([df_album_art, df_artist, df_track_name, df_audio_features], axis=1)

df_merged.to_csv('song_features9.csv', index=False)
