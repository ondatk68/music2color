<template>
  <div class="song-page">
    <div class="song-info">
      <div class="song-image">
        <img :src="songInfo()['Album Art']" alt="Album Art">
        <iframe :src="'https://open.spotify.com/embed/track/' + songInfo()['id']" frameborder="0" allowtransparency="true"
          allow="encrypted-media"></iframe>

      </div>
      <div class="song-details">
        <div class="title">{{ songInfo()['Track Name'] }}</div>
        <div class="artist">{{ songInfo()['Artist'] }}</div>
        <div class="color-buttons">
          <div class="question">
            What is the color of this song?
          </div>
          <button v-for="color in colors" :key="color" :style="{ 'background-color': color }" @click="voteColor(color)">
            {{ color }}
          </button>
        </div>
        <a :href="'https://open.spotify.com/track/' + songInfo()['id']" target="_blank" class="btn-spotify">Go to
          Spotify
          Page</a>

      </div>

    </div>


  </div>
</template>
<style scoped>
.song-page {
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-width: 1000px;
  background-color: #f2f2f2;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.song-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.song-image {
  width: 50%;
  height: 100%;
  overflow: hidden;
  text-align: left;
  margin: 25px;
}

.song-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

}

.song-image iframe {
  width: 100%;
  margin-top: 32px;
}

.song-details {
  width: 50%;
  height: 100%;
  margin: 25px;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.artist {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}

.question {
  padding: 0px;
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 24px;
  font-weight: bold;

  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.color-buttons {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 50px auto;

}

.color-buttons button {
  cursor: pointer;
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.2);

  width: 60px;
  height: 60px;
  position:absolute;
  top:40%;
  left:40%;

  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.color-buttons button:hover {
    opacity: 0.6;
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
import Swal from 'sweetalert2';



export default {
  data: () => ({
    csvData: [],
    colors: ['Red', 'Orange', 'Yellow', 'Green', 'Lime', 'Blue', 'Aqua', 'Purple', 'Pink', 'Brown', 'Black', 'White'],
    angle: 0
  }),

  methods: {
    songInfo() {
      // idに対応するデータを返す
      if (this.csvData.length > 0) {
        return this.csvData.find((row) => row["id"] == this.$route.params.id);
      } else {
        return {}
      }
    },
    formatDuration(ms) {
      // ミリ秒を分:秒に変換
      const min = Math.floor(ms / 60000);
      const sec = ((ms % 60000) / 1000).toFixed(0);
      return min + ":" + (sec < 10 ? '0' : '') + sec;
    },
    async voteColor(color) {
      // csv書き込み
      const { data } = await useFetch('/api/color', {
        method: 'POST',
        body: JSON.stringify({
          id: this.songInfo()["id"],
          color: color
        }),
      });

      Swal.fire({
        title: 'Thank you for voting!',
        html: `<p style="background-color:white" >voted for the color of<br>${this.songInfo()['Track Name']} - ${this.songInfo()['Artist']}<br> as <br>${color} !</p>`,
        icon: 'success',
        confirmButtonText: 'OK',
        background: color,
      })

      return false;
    },

    positionButtons() {
      const buttons = document.querySelectorAll('.color-buttons button');
      const buttonCount = buttons.length;
      const radius = 150;
      const angleIncrement = 360 / buttonCount;

      buttons.forEach((button, index) => {
        const angle = index * angleIncrement + this.angle;
        const x = radius * Math.cos((angle-90) * Math.PI / 180);
        const y = radius * Math.sin((angle-90) * Math.PI / 180);
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  },

  mounted: function () {
    this.csvData = data;
    this.positionButtons();
  },
}
</script>