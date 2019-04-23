<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease"
           v-show="food && food.count > 0"
           @click="decreaseCart">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count"
         v-show="food && food.count > 0">{{food.count}}</div>
    <div class="cart-add"
         @click="addCart">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Vue from 'vue'
import Bus from '../../common/js/EventBus.js'

export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return
      }
      this.food.count--
    }
  },
  components: {
    Vue,
    Bus
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.cartcontrol
  display flex
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    .inner
      display inline-block
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
    &.move-enter-active, &.move-enter-active
      opacity 1
      transition all 1s
      transform translate3d(0, 0, 0)
      .inner
        transition all 1s
        transform rotate(0)
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    font-size 10px
    line-height 24px
    width 12px
    padding-top 6px
    vertical-align top
    text-align center
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    font-size 24px
    line-height 24px
    color rgb(0, 160, 220)
    padding 6px
</style>
