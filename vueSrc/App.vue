<template>
  <div id="app">
    <div v-touch="handleTouch" class="test">This is a test.</div>
  </div>
</template>

<script>
export default {
    name: 'app',
    components: {
    },
    methods: {
        handleTouch (touch) {
            console.log(touch);
        }
    }
};
</script>

<style>
.test{
    position: absolute;
    width: 100%;
    height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
