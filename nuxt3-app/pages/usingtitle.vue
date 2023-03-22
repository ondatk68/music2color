<template>
    <div id="app">
      <div class="search">
        <input type="text" v-model="keyword" placeholder="searching track..."/>

      </div>
      <tr v-for="tracks in filteredTracks" :key="tracks.id">
        <nuxt-link :to="`/track/${tracks.id}`">{{ tracks.name }}</nuxt-link>
      </tr>
    </div>
  </template>
  <script>
    import data from '@/assets/top_chart_50.csv';

    export default{
      data: ()=>({
        keyword: "",
        tracks: []
      }),
      mounted: function() {
        data.forEach((value,index) => {
          this.tracks.push({name: value["Track Name"]+" - "+value["Artist"], lower: value["Track Name"]+" - "+value["Artist"].toLowerCase(), id:index});
        });
      },
      computed: {
        filteredTracks: function() {
          var tracks = [];
          for(var i in this.tracks) {
            var song  = this.tracks[i];
            if(song.lower.indexOf(this.keyword.toLowerCase()) !== -1) {
              tracks.push(song);
            }
          }
          return tracks;
        }
      },
    }
  </script>