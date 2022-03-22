<template>
<div class="backdiv">
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
    min-width: 70%;
    min-height: 70%;
    width:1920px;
    height:720px;
    
    max-width: 70%;
    max-height: 70%;
    background-color: rgba(255, 255, 0, 0.5);
    background-blend-mode: darken;

}
.backdiv{
    background-image: url("../assets/seed.png");
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
}
</style>