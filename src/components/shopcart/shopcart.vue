<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left"
           @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo"
               :class="{'heightlight' : totalCount > 0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num"
               v-show="totalCount > 0">
            {{totalCount}}
          </div>
        </div>
        <div class="price">
          ￥{{totalPrice}}
        </div>
        <div class="decs">
          另需{{deliveryPrice}}元配送费
        </div>
      </div>
      <div class="content-right"
           :class="{'can-pay':totalPrice >= minPrice}">
        <div class="pay"
             @click.stop.prevent="payAction">
          {{payText}}
        </div>
      </div>
    </div>
    <div class="ball-content">
      <div v-for="(ball, index) in balls"
           :key="index">
        <transition name="drop"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
          <div v-show="ball.show"
               class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <div class="toggle"
         v-show="toggleShow">
      <div class="toggle-title">
        <h1 class="title">购物车</h1>
        <div class="empty">清空</div>
      </div>
      <div class="food-wrapper">
        <div v-for="(food, index) in selectFoods"
             :key="index">
          <div class="name">{{food.name}}</div>
          <div class="price">{{food.price}}</div>
          <div class="carcontrol-wrapper">
            <cartcontrol></cartcontrol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import cartcontrol from '../cartControl/cartcontrol'
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      toggleShow: false
    }
  },
  computed: {
    totalPrice() {
      let price = 0
      this.selectFoods.forEach(food => {
        price += food.price * food.count
      })
      return price
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payText() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送'
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return '还差' + (this.minPrice - this.totalPrice) + '元起送'
      } else {
        return '去结算'
      }
      // },
      // showList() {
      //   if
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return 1
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0, 0)`
          inner.style.transform = `translate3d(${x}px,0, 0)`
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    payAction(event) {
      if (!event._constructed) {
        return
      }
      if (this.totalPrice >= this.minPrice) {
        window.alert('去结算' + this.totalPrice + '元')
      }
    },
    toggleList() {
      if (!this.totalCount || this.totalCount === 0) {
        return
      }
      this.toggleShow = !this.toggleShow
    }
  },
  components: {
    cartcontrol
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.shopcart
  position fixed
  left 0
  bottom 0
  width 100%
  height 46px
  z-index 50
  color rgba(255, 255, 255, 0.4)
  .content
    display flex
    font-size 0
    background-color #141d27
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        width 56px
        height 56px
        margin -10px 15px 0px 15px
        box-sizing border-box
        background-color #141d27
        border-radius 50%
        padding 6px
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background rgba(255, 255, 255, 0.2)
          &.heightlight
            background rgb(0, 160, 220)
            .icon-shopping_cart
              color #ffffff
          .icon-shopping_cart
            line-height 44px
            font-size 24px
        .num
          position absolute
          right 0px
          top 0px
          height 16px
          width 24px
          font-size 9px
          line-height 16px
          color #ffffff
          text-align center
          border-radius 40%
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        height 24px
        font-size 16px
        line-height 24px
        font-weight 700
        padding-right 12px
        border-right 1px solid rgba(255, 255, 255, 0.4)
      .decs
        display inline-block
        font-size 12px
        line-height 24px
        margin-left 12px
    .content-right
      flex 0 0 105px
      width 105px
      background-color rgba(255, 255, 255, 0.2)
      &.can-pay
        background-color rgb(0, 160, 220)
        .pay
          color #ffffff
      .pay
        font-size 12px
        font-weight 700
        line-height 46px
        text-align center
  .ball-content
    .ball
      position fixed
      left 24px
      bottom 22px
      z-index 100
      transition all 0.4s cubic-bezier(0.53, -0.09, 0.91, 0.52)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background-color rgb(0, 160, 220)
        transition all 0.4s linear
    .toggle
      position fixed
      left 0
      bottom 48px
      width 100%
      z-index 40
      .toggle-title
        width 100%
        height 40px
        padding 0 18px
        background rgb(239, 240, 243)
        .title
          line-height 40px
          color rgb(7, 17, 27)
          font-size 14px
          font-weight 200
        .empty
          position absolute
          line-height 40px
          color rgb(0, 160, 220)
          font-size 12px
</style>
