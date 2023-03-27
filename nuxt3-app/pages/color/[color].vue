<template>
    <div class="usingcolor" :style="{'background-color': $route.params.color}">
        <div class="centered">
            <h1>{{ $route.params.color }}に合う曲はこれ！</h1>
            <div class="search">
                <input type="text" v-model="keyword" placeholder="searching track..." />
            </div>
            <div class="container">
                <tr v-for="tracks in paginatedTracks" :key="tracks.id">
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
</style>

<script>
import data from '@/assets/top_chart_50.csv';
// import id2color from '@/result/res.json';
import axios from 'axios';
import Paginate from 'vuejs-paginate/src/components/Paginate';

export default{
  components: {
    Paginate
  },
  data: ()=>({
      keyword: "",
      tracks: [],
      id2color:[],   //
      currentPage: 1,
      pageSize: 30
  }),

  mounted: function() {
    console.log(process.cwd());
    ///////////////
    axios.get("../result/res.json")
    .then(response=>{
      this.id2color = response.data;
    });
    //////////////
    data.forEach((value) => {
      let color = this.calcColor(value);
      if(color == this.$route.params.color){
        this.tracks.push({ name: value["Track Name"] + " - " + value["Artist"], lower: value["Track Name"] + " - " + value["Artist"].toLowerCase(), id: value["id"], art:value["Album Art"]});
      }
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
    backButton(){
      this.$router.go(-1);
    },
    calcColor(row){
      return this.id2color[row["id"]].toLowerCase();  //////
    },
    onPageChanged: function(page) {
      this.currentPage = page;
    }
  },
}
</script>