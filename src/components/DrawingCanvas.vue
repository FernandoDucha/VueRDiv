<template>
<canvascomp  id="canvas" >
<coordcomp
        v-for="(obj, index) of coords"
        :key=index
>
</coordcomp>
</canvascomp><br>
<button class=button-30 v-for="(item, index) in buttons" :key="index" @click="dealWithClick(bsreturnvalue[index])">{{item}}</button>
<input type="number" @keydown="keyPressTreat(event)"/>

</template>

<script>
import canvascomp from "./CanvasComponent.vue"
import coordcomp from "./CoordComponents.vue"
import {CoordSystem} from './CoordSystem'
export default {
  data: function (){
    return{   
      bsreturnvalue:[
        1,10,100,1000
      ],
      coords:{
        type: Array
      },
      coordcreator:{
        type: CoordSystem
      },
      radius:{
        type : Number,
        default: 0.35,
      },
      directions:{
        type : Number,
        default: 0
      }
    }
  },
  computed:{
    calculateCoords(){
      
    }
  },
  components:{
    canvascomp,
    coordcomp
  },
  props:{
    buttons: Array
  },
  methods:{
    dealWithClick(coordQty){
      switch(coordQty){
        case 0:
          this.coords.concat(this.coordcreator.addToPath(1,))
      }
    },
    keyPressTreat(event){
      if(event.key>= 48 && event.charCode <= 57 && event.charCode === 110){
        console.log(event.charCode);
        return event.charCode;
      }else{
        return null;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/* CSS */
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-block;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

</style>
