<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo"
               :class="{'heightlight' : totalCount > 0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num">
            {{totalCount}}
          </div>
        </div>
        <div class="price">
          ￥{{totalPrice}}
        </div>
        <div class="decs">
          还差{{deliveryPrice}}元配送
        </div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{minPrice}}元起送
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 2
          }
        ]
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
    return {}
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
    }
  },
  components: {}
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
      .pay
        font-size 12px
        font-weight 700
        line-height 46px
        text-align center
</style>
