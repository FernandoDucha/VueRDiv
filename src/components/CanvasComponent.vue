<template>
  <div>
  <canvas class="mycanvas" ref="canvascomp"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provider: {
        context: null,
      },
    };
  },

  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    this.provider.context = this.$refs['canvascomp'].getContext('2d');

    this.$refs['canvascomp'].width = this.$refs['canvascomp'].parentElement.clientWidth;
    this.$refs['canvascomp'].height = this.$refs['canvascomp'].parentElement.clientHeight;
  },
};
</script>
<style>
.mycanvas{
  position: relative;
  orientation: center;
  min-width: 80%;
  min-height: 80%;
  max-width: 80%;
  max-height: 80%;
  background-color: yellow;
}
</style>