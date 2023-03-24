<template>
    <div class="usingcolor" :style="{'background-color': $route.params.color}">
        <div class="centered">
            <h1>{{ $route.params.color }}に合う曲はこれ！</h1>
            <div class="search">
                <input type="text" v-model="keyword" placeholder="searching track..." />
            </div>
            <div class="container">
                <tr v-for="tracks in filteredTracks" :key="tracks.id">
                    <nuxt-link :to="`/track/${tracks.id}`" class="songlist">{{ tracks.name }}</nuxt-link>
                </tr>
            </div>
        </div>
    </div>
    <a @click="backButton" class = "btn">戻る</a>
</template>


<style>
.btn {
  border-radius: 30px;
  background-color: rgb(250, 85, 85);
  padding: 20px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.songlist {
  display: flex; /* フレックスボックスとして表示するための設定 */
  justify-content: space-between; /* アイテムを左右に均等に配置する */
  align-items: center; /* アイテムを垂直方向中央に配置する */
  background-color: #f7f7f7;
  margin: 10px;
  padding: 50px;
  width: 500px;
  color: black; /*テキストの色変化と下線を消したい */
  text-decoration: none;
}

.search {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  background-color: transparent;
}

.search input[type="text"] {
  width: 300px;
  height: 20px;
  font-size: 18px;
  padding: 15px;
  padding-left: 30px;
  border: none;
  border-radius: 40px;
  background-color: white;
  outline: none;
  border: 1px solid black;
}
</style>

<script>
import data from '@/assets/top_chart_50.csv';

export default{
  data: ()=>({
      keyword: "",
      tracks: []
  }),

  mounted: function() {
    data.forEach((value) => {
      this.tracks.push({ name: value["Track Name"] + " - " + value["Artist"], lower: value["Track Name"] + " - " + value["Artist"].toLowerCase(), id: value["id"] });
    });
  },
  computed: {
    filteredTracks: function() {
      var tracks = [];
      for (var i in this.tracks) {
        var song  = this.tracks[i];
        if (song.lower.indexOf(this.keyword.toLowerCase()) !== -1) {
          tracks.push(song);
        }
      }
      return tracks;
    }
  },
  methods: {
    backButton(){
      this.$router.go(-1);
    }
  },
}
</script>