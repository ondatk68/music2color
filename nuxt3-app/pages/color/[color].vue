<template>
    <div class="usingcolor" :style="{'background-color': $route.params.color}">
        <div class="centered">
            <h1>{{ $route.params.color }}に合う曲はこれ！</h1>
            <div class="songlist">
                <NuxtLink to="https://open.spotify.com/track/4F0m8AWIgR7SK6GyvPsPpc?si=e0922c12e4be4a91">
                    春の歌 スピッツ
                </NuxtLink>
            </div>
            <div class="songlist">
                <NuxtLink to="https://open.spotify.com/track/1rr2DJOxV0sHXeUXCAz1yf?si=932cb2bcf1a74d5b">
                    春泥棒 ヨルシカ
                </NuxtLink>
            </div>
            <div class="songlist">
                <NuxtLink to="https://open.spotify.com/track/3UF51Hc8M8ZFH7nzbZxobZ?autoplay=true">
                    サクラ咲ケ 嵐
                </NuxtLink>
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
export default {
  methods: {
    backButton(){
      this.$router.go(-1);
    }
  },
}
</script>