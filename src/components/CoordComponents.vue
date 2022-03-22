
<script>
const percentWidthToPix = (percent, ctx) =>
  Math.floor((ctx.canvas.width / 100) * percent);
const percentHeightToPix = (percent, ctx) =>
  Math.floor((ctx.canvas.height / 100) * percent);


export default {
  inject: ['provider'],

  props: {
    x1: {
      type: Number,
      default: 0,
    },
    y1: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#F00',
    },    
  },

  data() {
    return {

    };
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      const calculated = {
        x: percentWidthToPix(this.x1, ctx),
        y: percentHeightToPix(this.y1, ctx),
        w: percentWidthToPix(this.x2 - this.x1, ctx),
        h: percentHeightToPix(this.y2 - this.y1, ctx),
      };

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.oldBox = calculated;

      return calculated;
    },
  },

  // eslint-disable-next-line vue/require-render-return
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
        
  },
};
</script>
