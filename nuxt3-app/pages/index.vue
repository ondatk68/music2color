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
    </div>
  </div>
</template>
<script setup>
    definePageMeta({
    layout: false,
    });
</script>