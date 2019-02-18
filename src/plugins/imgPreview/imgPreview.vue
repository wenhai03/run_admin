<template>
  <div class="preview-img" v-if="onOff" @click.stop.prevent="onOff=false">
    <!--<div class="toolbar">
      <i class="iconfont icon-left" @click.stop.prevent="prev"></i>
      <i class="iconfont icon-right" @click.stop.prevent="next"></i>
      <i class="iconfont icon-fangda" @click.stop.prevent="zoom(1)"></i>
      <i class="iconfont icon-suoxiao" @click.stop.prevent="zoom(-1)"></i>
      <i class="iconfont icon-zhongzhi" @click.stop.prevent="resetStyle"></i>
      <i class="iconfont icon-close" @click.stop.prevent="previewClose"></i>
    </div>-->
    <div style="height: calc(100% - 100px);display: flex;align-items: center;justify-content: center" >
      <img :src="url" alt="" class="viewer-transition" :class="{'viewer-transition': viewerTransition}">
    </div>
    <!--<h1>Vue.extend接收到的内容！！！</h1>
    <img :src="url" alt="">-->
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: [String],
      default: '',
      viewerTransition: false
    }
  },
  components: {},
  data () {
    return {
      onOff: false
    }
  },
  created () {
    console.log("url", this.url);
  },
  mounted () {},
  methods: {
    initImgPreview () {
      this.onOff = true
      this.viewerTransition = true
    },
    zoom () {
    },
    previewClose () {
      this.onOff = false;
    },
    prev () {
      /*if (this.activeIndex > 0) {
        this.activeIndex--;
        this.initImage();
      }*/
    },
    next () {
      /*if (this.activeIndex < this.url.length) {
        this.activeIndex++;
        this.initImage();
      } else {
        this.activeIndex = this.url.length - 1;
      }*/
    },
    resetStyle () {}
  }
}
</script>
<style lang="stylus" scoped>
  .preview-img
    width: 100%
    height 100%
    position fixed
    left: 0
    background-color rgba(0, 0, 0, .3)
    top: 0
    z-index 999
</style>
