<template>
  <div class="home-background">
    <!-- <NuxtLayout name="default">
      <template #header>ヘッダー</template>
    </NuxtLayout> -->
    <div class="wrapper">
      <div class="centered">
        <h1 class="shadow">Music to Color</h1>
        <div class="go-to-search">
          <div class="go-to-color" @click="$nuxt.$router.push('/usingcolor')">
            色から検索
          </div>
          <div class="go-to-title" @click="$nuxt.$router.push('/usingtitle')">
            曲名から検索
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow {
  font-size: 4.5em;
  text-shadow: 1px 1px 2px #000000;
  font-weight: bold;

}

.go-to-search {
  position: relative;
  top: 70%;
}

.go-to-color {
  width: 300px;
  height: 300px;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #000;
  text-align: center;
  line-height: 300px;
  margin-right: 50px;
  color: blue;
}

.go-to-title {
  width: 300px;
  height: 300px;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #000;
  text-align: center;
  line-height: 300px;
  margin-left: 50px;
  color: blue;
}

.go-to-color:hover,
.go-to-title:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.wrapper {
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: linear-gradient(124deg, #ff6666, #ffb266, #e8b71d, #ffff66, #66ff66, #66ffff, #6666ff, #ff99ff, #ff99cc);
  opacity: 0.7;
  background-size: 1800% 1800%;

  -webkit-animation: rainbow 18s ease infinite;
  -z-animation: rainbow 18s ease infinite;
  -o-animation: rainbow 18s ease infinite;
  animation: rainbow 18s ease infinite;
}


@-webkit-keyframes rainbow {
  0% {
    background-position: 0% 82%
  }

  50% {
    background-position: 100% 19%
  }

  100% {
    background-position: 0% 82%
  }
}


@-moz-keyframes rainbow {
  0% {
    background-position: 0% 82%
  }

  50% {
    background-position: 100% 19%
  }

  100% {
    background-position: 0% 82%
  }
}

@-o-keyframes rainbow {
  0% {
    background-position: 0% 82%
  }

  50% {
    background-position: 100% 19%
  }

  100% {
    background-position: 0% 82%
  }
}

@keyframes rainbow {
  0% {
    background-position: 0% 82%
  }

  50% {
    background-position: 100% 19%
  }

  100% {
    background-position: 0% 82%
  }
}
</style>

<script setup>
definePageMeta({
  layout: false,
});
</script>