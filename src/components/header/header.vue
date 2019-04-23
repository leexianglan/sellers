<template>
  <div class="header">
    <div class="top_view">
      <div class="avatar">
        <img width="64"
             height="64"
             :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support"
             v-if="seller.supports">
          <span class="icon"
                :class="classMap[seller.supports[0].type]"></span>
          <span class="description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports"
           class="suppert-content"
           @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="bulletin"
         @click="showDetail">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar"
           width="100%"
           height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow"
           class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <star :size="48"
                  :score="seller.score"
                  class="star"></star>
            <div class="subtitleWithLine">
              <div class="line-left"></div>
              <h2 class="subtitleName">优惠信息</h2>
              <div class="line-right"></div>
            </div>
            <ul v-if="seller.supports"
                class="supports">
              <li v-for="(item, index) in seller.supports"
                  v-bind:key="index"
                  class="item-support">
                <span class="icon"
                      :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="bulletin-view">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin-text">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"
             @click="hiddenDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import star from '../star/star.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hiddenDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl'
.header
  position relative
  color #ffffff
  font-size 14px
  background-color rgba(7, 17, 27, 0.5)
  overflow hidden
  .top_view
    position relative
    padding 24px 12px 18px 24px
    .avatar
      display inline-block
      img
        border-radius 2px
    .content
      display inline-block
      vertical-align top
      margin-left 16px
      .title
        .brand
          display inline-block
          width 30px
          height 18px
          bg-img('brand')
          background-repeat no-repeat
          background-size 30px 18px
        .name
          display inline-block
          vertical-align top
          line-height 18px
          font-size 16px
          font-width bold
          margin-left 6px
      .description
        margin-bottom 5px
        margin-top 8px
        line-height 12px
        font-size 12px
      .support
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 4px
          bg-img('decrease_1')
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-img('decrease_1')
          &.discount
            bg-img('discount_1')
          &.guarantee
            bg-img('guarantee_1')
          &.invoice
            bg-img('invoice_1')
          &.special
            bg-img('special_1')
        .description
          display inline-block
          height 12px
          font-size 10px
    .suppert-content
      position absolute
      font-size 10px
      height 24px
      right 12px
      bottom 18px
      padding 0 8px
      border-radius 14px
      background-color rgba(0, 0, 0, 0.2)
      line-height 24px
      text-align center
      .count
        font-size 10px
        vertical-align top
      .keyboard_arrow_right
        font-size 10px
        margin-left 2px
        vertical-align top
  .bulletin
    position relative
    height 28px
    line-height 28px
    padding 0 12px 0 12px
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
    background-color rgba(7, 17, 27, 0.2)
    .bulletin-icon
      display inline-block
      width 22px
      height 12px
      bg-img('bulletin')
      vertical-align middle
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      line-height 28px
      font-size 10px
      margin 0 4px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 10px
  .background
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    left 0
    top 0px
    width 100%
    height 100%
    z-index 100
    overflow auto
    color #ffffff
    transition all 0.5s
    backdrop-filter blur(10px)
    background-color rgba(7, 17, 27, 0.8)
    &.fade-enter-active, &.fade-leave-active
      transition opacity 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          font-size 16px
          font-weight 700
          line-height 16px
          text-align center
        .star
          text-align center
          line-height 24px
          margin-top 16px
          padding-bottom 28px
        .subtitleWithLine
          display flex
          width 80%
          height 14px
          line-height 14px
          margin 28px auto 24px auto
          .line-left
            position relative
            flex 1
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
            top -6px
          .subtitleName
            font-size 14px
            font-weight 700
            padding 0 12px 0 12px
          .line-right
            position relative
            flex 1
            top -6px
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .supports
          width 80%
          margin 0 auto 0 auto
          .item-support
            padding 0 12px
            &:last-child
              margin-bottom 6px
            .icon
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              margin-bottom 6px
              vertical-align top
              &.decrease
                bg-img('decrease_2')
              &.discount
                bg-img('discount_2')
              &.guarantee
                bg-img('guarantee_2')
              &.invoice
                bg-img('invoice_2')
              &.special
                bg-img('special_2')
            .text
              display inline-block
              font-size 12px
              font-weight 200
              line-height 12px
        .bulletin-view
          display flex
          width 80%
          margin 28px auto 24px auto
          .line
            position relative
            flex 1
            top -6px
            border-bottom 1px solid rgba(255, 255, 255, 0.2)
          .text
            font-size 14px
            font-weight 700
            padding 0 12px 0 12px
        .bulletin-text
          width 80%
          margin 0 auto 0 auto
          font-size 12px
          font-weight 200
          line-height 24px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
</style>
