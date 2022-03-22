<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <DrawingCanvas :buttons="allbs"/>
</template>

<script>
import DrawingCanvas from './components/DrawingCanvas'
export default {
  data: function() {
    return {
        allbs:[
          '1-point' ,'10-points','100-points','1000-points'
        ],
    }
  },
  name: 'App',
  components: {
    DrawingCanvas
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
