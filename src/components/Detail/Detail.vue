<template>
    <div>
      <p class="detail">
        <span class="key">{{label}}:</span>
        <span class="key-info">{{description}}{{weights}}{{heights}}</span>
      </p>
    </div>
</template>

<script>
export default {
  name: '',
  props: {
    label: [String, Object, Number],
    description: {
      type: [String, Object, Number],
      default: '--'
    },
    weight: [Boolean],
    height: [Boolean]
  },
  data () {
    return {}
  },
  components: {},
  created () {},
  methods: {},
  computed: {
    descriptions () {
      return this.description
    },
    weights () {
      if (this.weight) {
        return 'kg'
      } else {
        return ''
      }
    },
    heights () {
      if (this.height) {
        return 'cm'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .detail
    height 35px
    line-height 35px
    span
      display inline-block
    .key
      width 85px
      text-align right
    .key-info
      width: 130px
      margin-left 5px

</style>
