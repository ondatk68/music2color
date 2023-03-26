<template>
    <div class="question">
      What color song are you looking for ?
    </div>
    <div class="button-container">
        <div v-for="(color, index) in colors" :key="index">
        <button class="color-button" :style="{'background-color': color}" @click="goToColorPage(color)">{{ color }}</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['Red', 'Orange', 'Yellow', 'Green', 'Lime', 'Blue', 'Aqua', 'Purple', 'Pink', 'Brown', 'Black', 'White']
    }
  },
  methods: {
    goToColorPage(color) {
      this.$router.push(`/color/${color.toLowerCase()}`)
    }
  }
}
</script>

<style>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
}

.color-button {
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 50%;
  font-size: 1.2rem;
  color: #fff;
  text-shadow:
    1px 0 0 black,
    0 1px 0 black,
    -1px 0 0 black,
    0 -1px 0 black;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-button:hover {
  transform: translateY(-10px);

}

.color-button:active {
  transform: translateY(0px);
}

.question{
    padding:20px;
    text-align: center;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: bold;
  }


</style>
