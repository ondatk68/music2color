<template>
  <div id="app">
    <div class="container">
      <div class="search">
        <input type="text" v-model="keyword" placeholder="searching track..." />
      </div>
      <tr v-for="tracks in  paginatedTracks" :key="tracks.id">
        <nuxt-link :to="`/track/${tracks.id}`" class="songlist">
          <div class="track-img">
            <img :src="tracks.art" alt="Album Art">
          </div>
          <div class="track-name">
            {{ tracks.name }}
          </div>
        </nuxt-link>
      </tr>
      <paginate
        v-model="currentPage"
        :page-count="totalPages"
        :page-range="3"
        :margin-pages="2"
        :click-handler="onPageChanged"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>
    </div>
  </div>
</template>

<script>
import data from '@/assets/top_chart_50.csv';
import Paginate  from 'vuejs-paginate/src/components/Paginate'


export default{
  components: {
    Paginate
  },
  data: ()=>({
      keyword: "",
      tracks: [],
      currentPage: 1,
      pageSize: 30
  }),

  mounted: function() {
    data.forEach((value) => {
      this.tracks.push({ name: value["Track Name"] + " - " + value["Artist"], lower: value["Track Name"] + " - " + value["Artist"].toLowerCase(), id: value["id"], art:value["Album Art"]});
    });
  },
  computed: {
    filteredTracks: function() {
      this.currentPage=1;
      var tracks = [];
      for (var i in this.tracks) {
        var song  = this.tracks[i];
        if (song.lower.indexOf(this.keyword.toLowerCase()) !== -1) {
          tracks.push(song);
        }
      }
      return tracks;
    },
    totalPages: function() {
      return Math.ceil(this.filteredTracks.length / this.pageSize);
    },
    paginatedTracks: function() {
      var start = (this.currentPage - 1) * this.pageSize;
      var end = start + this.pageSize;
      return this.filteredTracks.slice(start, end);
    }
  },
  methods: {
    onPageChanged: function(page) {
      this.currentPage = page;
    }
  }
}
</script>

<style>

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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .container tr:hover{
	background-color: #9eff0c;
} */
.songlist {
  display: flex; /* フレックスボックスとして表示するための設定 */
  /* justify-content: space-between; アイテムを左右に均等に配置する */
  align-items: center; /* アイテムを垂直方向中央に配置する */
  background-color: #f7f7f7;
  margin: 10px;
  padding: 50px;
  width: 500px;
  color: black; /*テキストの色変化と下線を消したい */
  text-decoration: none;
}

.songlist
.track-img img{
  height:100px;
  width:100px;
  margin-right: 50px;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.pagination li {
  margin: 0 10px;
  font-size: 14px;
}

.pagination li a{
  display: inline-block;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #333;
  background-color: #f7f7f7;
  text-decoration: none;
}

.pagination li a:hover,
.pagination li.active a{
  background-color: #333;
  color: #fff;
}

.pagination li.disabled a{
  opacity:0.5;
  pointer-events: none;
}
</style>
