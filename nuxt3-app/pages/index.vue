<template>
  <div>
    <NuxtLayout name="default">
        <template #header>ヘッダー</template>
    </NuxtLayout>
    <div class="centered">
        <h1>Music to Color</h1>
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
</template>

<style  type="text/css">
.box {
  max-width  : 250px;
  height     : 150px;
  margin     : auto;
                              /* 虹色グラデーション編集CSS  */
  background : linear-gradient(to right,
                               rgb(255, 125, 125),
                               rgb(255, 210, 125),
                               rgb(255, 255, 125),
                               rgb(0, 192, 0),
                               rgb(0, 128, 128),
                               rgb(0,0,128),
                               rgb(192, 0, 192));
}
</style>

<script setup>
    definePageMeta({
    layout: false,
    });
</script>