<template>
  <div>
    <!-- <NuxtLayout name="default">
      <template #header>ヘッダー</template>
    </NuxtLayout> -->
    <div class="wrapper">
      <div class="centered">
        <h1 class="shadow">Music to Color</h1>
        <div class="search">
          <NuxtLink to="/usingcolor">色で検索する</NuxtLink>
        </div>
        <div class="search">
          <NuxtLink to="/usingtitle">曲名で検索する</NuxtLink>
        </div>
        <div class="box">
        </div>
      </div>
    </div>
  </div>
</template>

<style  type="text/css">
.shadow {
  font-size: 3.5em;
  /*color: #000000*/
  text-shadow: 1px 1px 2px #000000;
  font-weight: bold;
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
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');
.search {
  font-family: 'Noto Sans JP', sans-serif;
  border-radius: 30px;
  background-color: rgba(248, 247, 247, 0.2);
  padding: 10px;
  margin: 30px auto;
  margin-top: 100px;
  width:120px;
  /*width: 100px;*/
  /*text-align: 50%;*/
  text-decoration: none;
  color: rgb(0, 0, 0);
}

/*
.box {
  max-width  : 250px;
  height     : 150px;
  margin     : auto;

  background : linear-gradient(to right,
                               rgb(255, 128, 128),
                               rgb(255, 210, 125),
                               rgb(255, 255, 125),
                               rgb(0, 192, 0),
                               rgb(0, 128, 128),
                               rgb(0,0,128),
                               rgb(192, 0, 192));
}
*/
</style>

<script setup>
definePageMeta({
  layout: false,
});
</script>