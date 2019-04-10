<template>
  <div class="star"
       :class="starType">
    <span v-for="(itemClass,index) in itemClasses"
          v-bind:key="index"
          :class="itemClass"
          class="star-item"></span>
  </div>
</template>

<script type='text/ecmascript-6'>
const LEGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data() {
    return {}
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      var result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 === 0
      let integer = Math.floor(score)

      while (result.length < integer) {
        result.push(CLS_ON)
      }

      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LEGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  components: {}
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl'
.star
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-img('star48_on')
      &.off
        bg-img('star48_off')
      &.half
        bg-img('star48_half')
  &.star-36
    width 15px
      height 15px
      margin-right 16px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-img('star36_on')
      &.off
        bg-img('star36_off')
      &.half
        bg-img('star36_half')
  &.star-24
    width 12px
      height 12px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-img('star24_on')
      &.off
        bg-img('star24_off')
      &.half
        bg-img('star24_half')
</style>
