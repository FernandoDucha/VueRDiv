<template>
<canvascomp  id="canvas" >
<coordcomp
        v-for="(obj, index) of coords"
        :key=index
>
</coordcomp>
</canvascomp>
<ul>
<li><button class=button-30 v-for="(item, index) in buttons" :key="index" @click="dealWithClick(bsreturnvalue[index])">{{item}}</button></li>
</ul>
<a> Directions: </a><input type="number" @keydown="keyPressTreat($event)" @keydown.enter="submit('directions')" id="directions"/><a> Point Neighbor Radius: </a><input type="number" @keydown="keyPressTreat($event)" @keydown.enter="submit('radius')" id="radius"/> <a> Seed: </a><input type="number" @keydown="keyPressTreat($event)" @keydown.enter="submit('seed')" id="seed"/>

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
        type: CoordSystem,
        default: null
      },
      radius:{
        type : Number,
        default: 0.35,
      },
      directions:{
        type : Number,
        default: 0
      },
      radius:{
        type: Number,
        default: 0
      },
      seed:{
        type: Number,
        default: 0
      },
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
      if(this.coordcreator==null){
        this.coordcreator=CoordSystem([0,0],)
      }
      switch(coordQty){
        case 0:
          this.coords.concat(this.coordcreator.addToPath(1,this.directions))
      }
    },
    keyPressTreat(event){
      if(event.keyCode>= 48 && event.keyCode <= 57){
        return event.keyCode;
      }else{
        return null;
      }
    },
    submit(object){
      var value = document.getElementById(object).value;
      if(Math.isInteger(value) && object=="direction"){
        this.directions=value;
      
      }
      if(object=="radius"){
        this.radius=value;
      }
      if(Math.isInteger(value) && object=="seed"){
        this.seed=value;
      
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  /* position: relative; */
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  list-style-type: none;
  list-style: none;

}
ul {
    display: block;
    list-style-type: none;
    margin-block-start: 0px;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
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
