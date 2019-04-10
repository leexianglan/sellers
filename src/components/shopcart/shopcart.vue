<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">
          $100
        </div>
        <div class="decs">
          还差4元配送
        </div>
      </div>
      <div class="content-right">
        $20元起送
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.shopcart
  position fixed
  width 100%
  height 48px
  left 0
  bottom 0px
  z-index 50
  .content
    display flex
    background-color #141d27
    color rgba(255, 255, 255, 0.4)
    font-size 16px
    .content-left
      display flex
      position relative
      flex-direction row
      align-items center
      flex 1
      .logo-wrapper
        // display flex
        margin-left 15px
        width 46px
        height 46px
        margin-top -6px
        margin-right 15px
        border 6px solid #141d27
        border-radius 29px
        background-color rgba(255, 255, 255, 0.2)
        .logo
          display flex
          width 46px
          height 46px
          justify-content center
          align-items center
          background-size 46px 46px
      .price
        font-weight 700
        line-height 24px
        margin-right 24px
      .decs
        font-size 12px
    .content-right
      display flex
      flex 0 0 105px
      width 105px
      font-size 12px
      font-weight 700
      line-height 14px
      justify-content center
      align-items center
      background-color rgba(255, 255, 255, 0.2)
</style>
