<template>
  <div id="index">

    <div class="index">
      <div class="vedio">

        <div class="image-container">
          <img decoding="async" id="image" src="../../assets/image/index/banner-desktop.webp" alt="">
        </div>
        <div class="index-banner">
          <div class="banner-title">{{ $t('index.header.headerTitle1') }} <span>{{ $t('index.header.headerTitle2') }}</span> {{ $t('index.header.headerTitle3') }}</div>
          <div class="banner-select">
            <el-input :placeholder="$t('index.header.search')" v-model="searchValue">
            </el-input>
            <div class="select-search" @click="searchFn(null)">{{ $t('index.header.search') }}</div>
          </div>
          <div class="banner-label"><span>{{ $t('index.headerSearch.trending') }}:</span>
            <div @click="searchFn($t('index.headerSearch.search1') )">{{ $t('index.headerSearch.search1') }}</div>
            <div @click="searchFn($t('index.headerSearch.search2'))">{{ $t('index.headerSearch.search2') }}</div>
            <div @click="searchFn($t('index.headerSearch.search3') )">{{ $t('index.headerSearch.search3') }}</div>
          </div>

        </div>
        <div class="banner-number">
          <div v-for="(item,index) in allList.numList" :key="index">
            <div class="number-num">{{ item.num }}</div>
            <div class="number-content">{{ $t(`index.number.number${index+1}`) }}</div>
          </div>
        </div>

      </div>
      <div class="index-moudle show-list">
        <features :title="$t('index.legal-offices.title')">
          <template v-slot:two>
            <ul class="index-moudle1 index-moudle-ul content-width grid-four">
              <li
                v-for="(item, index) in allList.produceList"
                :key="index"
                class="curser-hover"
              >
                <router-link :to="`/${ $t(`index.legal-offices.list.list${index}.link`)}`">
                  <div class="img-container">
                     <img :src="item.img" alt="">
                  </div>
                  <div>
                    <div class="newTitle mle">{{ $t(`index.legal-offices.list.list${index}.name`) }}</div>
                    <div class="newMore">
                      {{ $t(`index.legal-offices.list.list${index}.type`)}}
                      <svg-icon icon-class="right"></svg-icon>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </template>
        </features>
      </div>
      <div class="index-moudle newMessage">
        <features :title="$t('index.free.title')">
          <template v-slot:one>
            <ul class="choose-list  content-width ">
              <router-link :to="{path:'/news',query:{type:'Dental Health'}}" tag="li">
               {{$t('index.free.liList.li1')}}
              </router-link> <router-link :to="{path:'/news',query:{type:'Dental Care'}}" tag="li">
              {{$t('index.free.liList.li2')}}
              </router-link>
              <router-link :to="{path:'/news',query:{type:'Dental Treatments & Procedures'}}" tag="li">
                {{$t('index.free.liList.li3')}}
              </router-link>
              <router-link :to="{path:'/news',query:{type:'Dental Insurance & Costs'}}" tag="li">
                {{$t('index.free.liList.li4')}}
              </router-link>
            </ul>
          </template>
          <template v-slot:two>
            <ul class="message index-moudle-ul content-width grid-three">

              <router-link v-for="(item, index) in allList.messageList.newsList" tag="li" :key="index" :to="`/news/content/${item.uid}`">
                <img data-img="item.img" class="lazyload" alt="">
                <div>
                  <div class="newTitle mle">{{ item.title }}</div>
                  <span v-for="(item1,index1) in item.label" :key="index1">{{ item1 }}</span>
                  <div class="newMore">
                    <div>
                      Read More
                    </div>
                  </div>
                </div>
              </router-link>

            </ul>
          </template>

        </features>
        <router-link to="/news" tag="div" class="newMessage-more">{{$t('index.free.moreButton') }}</router-link>
      </div>
      <div class="index-moudle friend">
        <features
          :title="$t('index.about.title')"
        >
          <template v-slot:one>
            <ul class="index-moudle-ul content-width grid-three">
              <li
                v-for="(item, index) in allList.serviceList"
                :key="index"
              >

                <div>
                  <img
                    :src="item.img"
                    alt=""
                  >
                </div>
                <div class="frind_name">{{ $t(`index.about.about${index+1}.name`) }}</div>
                <div class="friend_title">{{ $t(`index.about.about${index+1}.intro`) }}</div>

              </li>
            </ul>
          </template>
        </features>

      </div>
      <footer-com></footer-com>
    </div>
  </div>
</template>

<script>
import { allList } from './js/index.js'

import features from '../../components/features/features.vue'
import Shu from '../../components/moudle/shu.vue'
import FooterCom from '../../components/footerCom/footerCom.vue'
import UseProducts from '../../components/moudle/useProducts.vue'

import { articleRandom, getType } from '@/api/index'

export default {
  components: {
    features,
    Shu,
    FooterCom,
    UseProducts
  },
  data () {
    return {
      // 所有列表文字
      allList,
      // 鼠标悬浮在哪个上面
      mouseName: '',
      mouseindex: null,
      // 防抖
      timer: null,
      versionUrl: 'index',
      isRouterAlive: true,
      dogTotal: 0,
      catTotal: 0,
      typeList: [
        {
          value: 'dog',
          label: 'dog'
        }, {
          value: 'cat',
          label: 'cat'
        }
      ],

      searchList: {},
      searchValue: ''
    }
  },
  watch: {
    $route (to, from) {
      this.versionUrl = to.name
    }
  },
  mounted () {
    // this.getImg()
    this.versionUrl = this.$route.name
    this.randomFn()
    this.getTypeList()
  },
  methods: {
    getImg () {
      // 获取图片元素
      var imgElement = document.getElementById('image')
      imgElement.addEventListener('load', function () {
        // 图片加载完成后，可以在这里添加逻辑，比如移除白色背景
        this.style.backgroundColor = 'transparent' // 设置背景色为透明
      })
      imgElement.addEventListener('error', function () {
        // 图片加载失败时的处理逻辑
        this.style.backgroundColor = 'white' // 可以继续显示白色背景或其他提示
      })
    },
    // 鼠标经过离开
    mouseover (item, index) {
      this.mouseindex = index
      this.mouseName = item
      // fangdou(((this.mouseindex = index), (this.mouseName = item)), 1000)
    },
    mouseout (item, index) {
      this.mouseindex = ''
      this.mouseName = ''
      // fangdou((this.mouseindex = '')), 1000)
    },
    // 立即开始
    toBegin () {
      this.$router.push('/service')
      this.reload()
    },

    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // typeChange(){
    //
    // },
    // 获取类型
    getTypeList () {
      getType().then(res => {
        this.allList.produceList = res.data
      })
    },
    // 推荐文章
    randomFn () {
      articleRandom({ type: 1 }).then(res => {
        this.allList.messageList.newsList = res.data.lawyerArticleTypeDTOList
        setTimeout(() => {
          document
            .querySelectorAll('.lazyload').forEach(function (img) {
              var src = img.getAttribute('data-src')
              var ImgObj = new Image()
              ImgObj.src = src
              if (ImgObj.fileSize > 0 || (ImgObj.width > 0 || ImgObj.height > 0)) {
              // console.log('true')
                img.src = src
                return true
              } else {
                console.log('false')
                img.src = 'https://img.ttsnews.com/mr.webp'
                return false
              }
            })
        }, 400)
      })
    },
    // 点击查询
    searchType () {
      this.$router.push({
        // name: 'newsContent',
        path: `/${this.searchValue.typeValue}`,
        query: { obj: JSON.stringify(this.searchValue) }
      })
    },
    // 点击搜索
    searchFn (item) {
      this.searchValue = item || this.searchValue
      console.log(this.searchValue)
      this.$router.push({
        // name: 'newsContent',
        path: '/search',
        query: { msg: this.searchValue }
      })
    }
  },

  provide () {
    return {
      reload: this.reload
    }
  }
}
</script>

<style lang="less" scoped>
#index {
  width: 100%;
  .el-card__body,
  .el-main {
    padding: 0px;
    overflow: hidden;
  }

  .index {
    position: absolute;
    top: 0;
    width: 100%;

    .vedio {
      position: relative;
      width: 100%;

      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(12, 36, 92, 0.7), rgba(12, 36, 92, 0.7));
        z-index: 100;
      }

      img {
        position: relative;
        width: 100%;
        //height: 800px;
        object-fit: cover;
        //filter:hue-rotate(200deg) saturate(15) brightness(0.4);
        background-color: #ffffff;
      }

      .index-banner {
        position: absolute;
        top: 0;
        width: 100%;
        height: calc(100% - 238px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .banner-title {
          font-weight: 600;
          font-size: 48px;
          color: #FFFFFF;
          line-height: 53px;
          margin-bottom: 26px;
          z-index: 101;

          span {
            display: inline-block;
            //padding: 3px 6px;
            //background-color: var(--theme_color);
          }
        }

        .banner-select {
          position: relative;
          z-index: 101;
        }

        .select-search {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 18px;
          background-color: var(--theme_color);
          color: #ffffff;
          vertical-align: middle;
          display: table-cell;
          border: 0px solid #DCDFE6;
          border-radius: 26px;
          padding: 8px 20px;

          white-space: nowrap;
          z-index: 101;

          &:hover {
            cursor: pointer;
          }
        }

        .banner-label {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #FFFFFF;
          line-height: 21px;
          z-index: 101;

          span {
            margin-right: 12px;
          }

          div {
            padding: 12px 18px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 24px 24px 24px 24px;
            margin-right: 8px;
          }

          //width: 100%;
          //display: grid;
          //grid-gap: 15px;
          //clear: both;
          //grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
        }

      }

      .banner-number {
        position: absolute;
        bottom: 0;
        display: grid;
        grid-gap: 15px;
        clear: both;
        grid-template-columns:  repeat(4, 1fr);
        grid-template-rows: auto; /* 根据内容自动调整行高 */
        place-items: center;
        width: 100%;
        height: 150px;
        background: rgba(12, 36, 92, 0.7);
        z-index: 101;

        & > div:not(:last-child) {
          width: 100%;
          border-right: 1px solid #ffffff; /* 网格项边框，模拟内部线 */
          padding: 0px 10px; /* 网格项内边距 */
          text-align: center; /* 文本居中 */

        }

        .number-num {
          font-weight: bold;
          font-size: 32px;
          color: #FFFFFF;
          line-height: 53px;
          letter-spacing: 3px;
        }

        .number-content {
          font-weight: 600;
          font-size: 18px;
          color: var(--theme_color);
          line-height: 53px;
        }
      }

      @media screen and (max-width: 1280px) {

        .index-banner {
          height: calc(100% - 100px);

          .banner-title {
            font-weight: 600;
            font-size: 36px;
            color: #FFFFFF;
            line-height: 48px;
            margin-bottom: 30px;
          }

          .banner-label {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 21px;

            span {
              margin-right: 8px;

            }

            div {
              padding: 8px 12px;
            }

            //width: 100%;
            //display: grid;
            //grid-gap: 15px;
            //clear: both;
            //grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
          }

        }

        .banner-number {
          height: 150px;

          .number-num {
            font-size: 28px;
            line-height: 40px;
          }

          .number-content {
            font-size: 16px;
            line-height: 40px;
          }
        }
      }
      @media screen and (max-width: 800px) {
        img {
          height: 400px;
          object-fit: cover;
        }

        .index-banner {
          margin-top: 30px;
          padding: 0 20px;
          height: 100%;

          .banner-title {
            font-weight: 600;
            font-size: 26px;
            color: #FFFFFF;
            line-height: 36px;
            margin-bottom: 20px;
          }

          .banner-label {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 16px;

            span {
              margin-right: 6px;

            }

            div {
              margin-bottom: 5px;
              padding: 6px 8px;
            }

            //width: 100%;
            //display: grid;
            //grid-gap: 15px;
            //clear: both;
            //grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
          }
        }

        .banner-number {
          display: none;
        }
      }
    }

    .search-middleBox {
      margin-top: -40px;
      width: 100%;
      display: flex;
      justify-content: center;

      text-align: left;

      overflow: hidden;
      color: var(--txt_color);
      z-index: 111;

      .search-Select {
        background: #FFFFFF;
        box-shadow: 0px 0px 5px 1px var(--shadow_color) inset;
        border-radius: 20px;
        padding: 15px;
        font-weight: bold;

        span {
          display: inline-block;
          line-height: 40px;
          margin: 0 10px;
          font-size: 16px;
        }

        .selectObj-list {
          display: inline-block;
        }

        .search-icon {
          padding: 10px 20px;
          margin-left: 15px;
          background: rgba(50, 105, 255, 0.8) !important;
          border: 1px solid #ffffff !important;
          border-radius: 20px;
          cursor: pointer;
        }
      }

      //font-size: 20px;

    }

    .index-moudle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px 0;

      .index-moudle-ul {
        width: 100%;

        li {
          display: flex;
          width: 100%;
          background: #ffffff;
          box-sizing: border-box;
        }
      }
    }

    .show-list {
      li {
        flex-direction: column;
        //height: 240px;
        padding: 10px;
        box-shadow: var(--li-shadow);

        img {

          width: 100%;
          //height: 162px;

        }
        .img-container{
          position: relative;
          //margin-bottom: 10px;
        }
        .img-container::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 0px;
          left: 0;
          width: 100%;
          height: 100%;
          color: var(--txt_color);
          //background: linear-gradient(to bottom, rgba(12, 36, 92, 0.1), rgba(12, 36, 92, 0.7));

        }

        .newTitle {
          color: #333333;
          font-weight: 600;
          font-size: 30px;
          line-height: 50px;
          height:50px;
          text-align: left;
          color:var(--theme_color);
          //margin-bottom: 10px;

        }

        .newMore {
          width: 100%;
          text-align: right;
          font-size: 16px;

        }
      }

      .toMore {
        justify-content: center;
        align-items: center;
        color: var(--theme_color);
        font-size: 32px;
      }
    }

    .service {
      width: 1300px;

      li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        width: 413px;
        height: 317px;
        color: #fff;
        background: left top no-repeat;
        background-size: 100% 100%;
        border-radius: 6px 6px 6px 6px;
        margin-bottom: 20px;
        margin-right: 20px;
        padding: 60px 0 0 50px;
        box-sizing: border-box;

        &:nth-child(1) {
          width: 846px;
          height: 347px;
          padding-top: 90px;
        }

        &:nth-child(2) {
          margin-top: 30px;
          margin-right: 0px;
          height: 317px;
        }

        &:nth-child(5) {
          margin-right: 0px;
        }

        span {
          z-index: 200;

          &:nth-child(1) {
            font-size: 24px;
          }

          &:nth-child(2) {
            font-size: 16px;
            margin: 10px 0 130px 0;
          }
        }

        .zhe1 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 315px;
          position: absolute;
          background: var(--button_color) no-repeat center;
          // border-radius: 6px 6px 6px 6px;
          z-index: 100;
        }

        .zhe {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 317px;
          position: absolute;
          background: RGBA(125, 142, 180, 0.4) no-repeat center;
          border-radius: 6px 6px 6px 6px;
          z-index: 100;
          // &:nth-child(1) {
          //   width: 846px;
          //   height: 317px;
          // }
        }

        button {
          width: 110px;
          height: 32px;
          color: #fff;
          background-color: transparent;
          border-radius: 0px 0px 0px 0px;
          opacity: 1;
          border: 1px solid #ffffff;
          z-index: 200;
        }
      }
    }

    .newMessage {

      background-color: #f3f5f7;

      .choose-list {
        max-width: 1085px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 48px;

        li {
          font-weight: 600;
          font-size: 16px;
          color: #666666;
          padding: 12px 20px;
          background: #FFFFFF;
          border-radius: 4px 4px 4px 4px;
          margin-bottom: 8px;
          transition: color .15s linear;
          margin-right: 10px;

          &:hover {
            color: var(--theme_color);
            cursor: pointer;

          }
        }

      }

      .message {
        li {
          align-items: flex-start;
          background: #ffffff;
          box-shadow: 0px 0px 12px 1px rgba(139, 139, 139, 0.12);
          border-radius: 16px;
          padding: 14px 21px;
          position: relative;
          font-size: 18px;
          text-align: left;
          box-sizing: border-box;
          border-bottom: solid 4px #FFFFFF;
          cursor: pointer;

          &:hover {
            border-bottom: solid 4px var(--theme_color);
          }

          img {
            width: 172px;
            height: 172px;
            object-fit: cover;
            margin-right: 20px;
          }

          .newTitle {
            color: #333333;
            font-weight: 600;
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 10px;
          }

          span {
            text-align: left;
            font-size: 14px;
            color: #666666;
            line-height: 17px;
          }

          .newMore {
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-size: 18px;

            a {
              color: var(--theme_color);
            }

            div {
              //width: 100%;
              text-align: right;
            }
          }
        }
      }

      .newMessage-more {
        width: 448px;
        height: 70px;
        line-height: 70px;
        color: #ffffff;
        font-size: 20px;
        background: var(--theme_color);
        border-radius: 35px 35px 35px 35px;
        margin-top:50px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .friend {
      //background: url("../../assets/image/index/index/indexfriend.png") no-repeat;
      //margin-bottom: 100px;

      ul {
        li {
          font-weight: 600;
          flex-direction: column;
          padding: 80px 30px;
          box-shadow: 0px 0px 12px 1px rgba(139, 139, 139, .12);

          img {
            width: 75px;
            height: 75px;
            margin-bottom: 20px;
          }
        }

        .frind_name {

          font-size: 24px;
          color: #333333;
          line-height: 24px;
          height: 60px;
          margin-bottom: 34px;
        }

        .friend_title {
          font-size: 18px;
          color: #666666;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
<style lang="less">
#index {
.index{
  .search-middleBox {
    .el-input__inner {
      background-color: #FFF;
      border-radius: 20px;
    }
  }

  .el-input {
    width: 740px;
    height: 68px;
    border-radius: 34px;
    padding: 13px 27px;
    background-color: #ffffff;
    margin-bottom: 30px;
  }

  .el-input__inner {
    border: 0px;
    font-size: 18px;
  }

  @media screen and (max-width: 800px) {
    .search-middleBox {
      margin-top: 0 !important;
    }

    .produce {
      li {
        img {
          height: 200px;
        }

        button {
          //margin-top: 40px;
        }
      }
    }

    .search-Select {
      span {
        font-size: 12px !important;
        width: 50px;
      }

      .el-input__inner {
        height: 30px;
        line-height: 30px;
        width: 120px;
      }

      .el-input__inner {
        line-height: 30px;
      }

      .el-input__icon {
        line-height: 30px;
      }

      .search-icon {
        padding: 5px 10px !important;
        border-radius: 10px !important;
        //height: 20px;

        //color: var(--txt_color);

      }
    }

  }
  @media screen and (max-width: 1000px) {
    .index-moudle{
      padding: 48px 20px !important;
    }
    #features .name{
      margin-bottom: 20px !important;
    }
    .el-input {
      width: 300px;
      height: 48px;
      border-radius: 36px;
      padding: 5px 10px;
      background-color: #ffffff;
      margin-bottom: 38px;
    }
    .choose-list {
      margin-bottom: 20px !important;

      li {
        font-size: 12px !important;
        padding: 4px 6px !important;

      }

    }
    .select-search {
      padding: 4px 10px !important;
      top: 8px !important;
      right: 10px !important;
    }
    .newMessage{
      img{
        width: 140px !important;
        height: 140px !important;
      }
      .newMessage-more{
        width: 200px !important;
        height: 50px !important;
        line-height: 50px !important;
        margin-top: 20px !important;
      }
    }
    .friend{
      ul {
        li {
          padding: 30px !important;
          img{
            width: 48px !important;
            height: 48px !important;
          }
          .frind_name{
            font-size: 18px !important;
            margin-bottom: 24px !important;
          }
          .friend_title{
            font-size: 14px !important;
          }
        }
      }
    }
    .show-list {
      li {
        .img-container{
          margin-bottom: 0px !important;
        }
        .newTitle {
          font-size: 18px !important;
          line-height: 20px !important;
          height: 20px !important;
          margin-bottom: 5px;
          color: var(--theme_color);
        }
        .newMore{
          font-size: 14px !important;
          margin-bottom: 0;
        }
      }
    }
  }
}
}
</style>
