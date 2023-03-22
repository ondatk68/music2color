<template>
    <div class="song-info">
    <div class="song-image">
      <img :src="songInfo()['Album Art']" alt="Album Art">
    </div>
    <div class="song-details">
      <h1>{{ songInfo()['Track Name'] }}</h1>
      <h2>{{ songInfo()['Artist'] }}</h2>
      <ul>
        <li><strong>Danceability:</strong> {{ songInfo()['danceability'] }}</li>
        <li><strong>Energy:</strong> {{ songInfo()['energy'] }}</li>
        <li><strong>Key:</strong> {{ songInfo()['key'] }}</li>
        <li><strong>Loudness:</strong> {{ songInfo()['loudness'] }}</li>
        <li><strong>Mode:</strong> {{ songInfo()['mode'] }}</li>
        <li><strong>Speechiness:</strong> {{ songInfo()['speechiness'] }}</li>
        <li><strong>Acousticness:</strong> {{ songInfo()['acousticness'] }}</li>
        <li><strong>Instrumentalness:</strong> {{ songInfo()['instrumentalness'] }}</li>
        <li><strong>Liveness:</strong> {{ songInfo()['liveness'] }}</li>
        <li><strong>Valence:</strong> {{ songInfo()['valence'] }}</li>
        <li><strong>Tempo:</strong> {{ songInfo()['tempo'] }}</li>
        <li><strong>Duration:</strong> {{ formatDuration(songInfo()['duration_ms']) }}</li>
        <li><strong>Time Signature:</strong> {{ songInfo()['time_signature'] }}</li>
      </ul>
      <a :href="'https://open.spotify.com/track/'+songInfo()['id']" target="_blank" class="btn-spotify">Go to Spotify Page</a>
    </div>

  </div>
</template>
<style scoped>
  .song-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    max-width: 1000px;
    background-color: #f2f2f2;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .song-image {
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  .song-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .song-details {
    width: 50%;
    padding: 20px;
    font-family: 'Helvetica Neue', sans-serif;
    color: #333;
  }

  h1 {
    font-size: 40px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 16px;
  }

  strong {
    font-weight: bold;
  }

  .btn-spotify {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #1DB954;
    color: #fff;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    transition: background-color 0.2s ease;
  }

  .btn-spotify:hover {
    background-color: #1ED760;
  }
</style>

<script>

  import data from '@/assets/top_chart_50.csv';

  export default{
    data: ()=>({
      csvData: [],
    }),
    mounted: function() {
      //console.log(data);
      data.forEach((value,index) => {
        this.csvData = data;
      });
    },
    methods: {
      songInfo() {
        // idに対応するデータを返す
        if (this.csvData.length > 0) {
          return this.csvData.find((row, index) => index == this.$route.params.id);
        }else{
          return {}
        }
      },
      formatDuration(ms) {
        // ミリ秒を分:秒に変換
        const min = Math.floor(ms / 60000);
        const sec = ((ms % 60000) / 1000).toFixed(0);
        return min + ":" + (sec < 10 ? '0' : '') + sec;
      },
    },

  }
  </script>