<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/usingcolor">色検索</NuxtLink>
    <NuxtLink to="/usingtitle">曲名検索</NuxtLink>
  </nav>
</template>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    /* background: linear-gradient(124deg, #ff6666, #ffb266, #e8b71d, #ffff66, #66ff66, #66ffff, #6666ff, #ff99ff, #ff99cc); */

    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
  }

  nav a:hover {
    color: #ffd700;
  }
</style>