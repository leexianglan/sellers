<template>
  <div class="goods">
    <div class="menu-wrapper"
         ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods"
            :key="index"
            class="menu"
            :class="{'current': currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type > 0"
                  class="icon"
                  :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper"
         ref="goodsWrapper">
      <ul>
        <li v-for="(good, index) in goods"
            :key="index"
            class="good-list good-list-hook">
          <div class="good-name">{{good.name}}</div>
          <ul>
            <li v-for="(food , index) in good.foods"
                :key="index"
                class="good-item border-1px">

              <div class="icon">
                <img width="60"
                     height="60"
                     :src="food.icon">
              </div>
              <div class="content">
                <div class="food-name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div class="sell-rating">
                  <span class="sell">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                        v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>

            </li>
          </ul>
        </li>

      </ul>
    </div>
    <shopcart v-if="seller"
              :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart.vue'
import cartcontrol from '../cartControl/cartcontrol'

const ERR_NO = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [],
      scrollY: 0
    }
  },
  created() {
    this.$http.get('api/goods').then(response => {
      response = response.data
      if (response.errno === ERR_NO) {
        this.goods = response.data
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initScroll()
          this._calculationListHeight()
        })
      }
    })
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      // console.log(index)
      this.scrollY = this.listHeight[index]
      let food = this.$refs.goodsWrapper.getElementsByClassName(
        'good-list-hook'
      )[index]
      this.goodScroll.scrollToElement(food, 300)
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true,
        probeType: 3
      })

      this.goodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },

    _calculationListHeight() {
      let foodlist = this.$refs.goodsWrapper.getElementsByClassName(
        'good-list-hook'
      )
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  components: {
    shopcart,
    cartcontrol
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixin.styl'
.goods
  display flex
  position absolute
  width 100%
  top 180px
  bottom 46px
  overflow hidden
  .menu-wrapper
    // diplay flex
    flex 0 0 80px
    width 80px
    // top 180px
    background-color #f3f5f7
    // overflow auto
    // overflow-x hidden
    .menu
      display table
      // position relative
      color rgb(147, 153, 159)
      height 54px
      width 56px
      padding 0 12px
      font-size 12px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #ffffff
        color rgb(7, 17, 27)
        .text
          border-none()
      .text
        display table-cell
        vertical-align middle
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
  .goods-wrapper
    // display flex
    // position relative
    flex 1
    .good-list
      .good-name
        background #f3f5f7
        border-left 1px solid #d9dde1
        padding-left 14px
        line-height 26px
        color rgb(147, 153, 149)
        font-size 12px
      .good-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 60px
          margin-right 10px
        .content
          flex 1
          .food-name
            color rgb(7, 17, 27)
            font-size 14px
            line-height 14px
            margin-top 2px
            margin-bottom 8px
          .desc, .sell-rating
            color rgb(147, 153, 159)
            font-size 10px
            line-height 10px
            margin-bottom 8px
          .sell-rating
            .sell
              margin-right 12px
          .price
            line-height 24px
            font-size 700
            .now
              color rgb(240, 20, 20)
              font-size 14px
              margin-right 8px
            .old
              color rgb(147, 153, 159)
              font-size 10px
              text-decoration line-through
          .cartcontrol-wrapper
            position absolute
            right 0
            height 24px
            bottom 18px
</style>
