<template>
  <div id="liveDetail">
    <div
      class="liveDetail-title bg"
      :class="{ bg: this.liveContent.status === 'unStart' }"

    >
      <!-- :style="{'background-image': this.liveContent.status !== 'unStart'?`url(${PNGURL}${liveContent.pcBanner})`:`url(${require('./liveInfoTitle.png')})` }" -->

      <div class="content">
        <div
          v-if="this.liveContent.status === 'end' && this.liveContent.liveUrl"
          class="titleContent"
        >
          <div class="titleContent-img">
            <img src="" alt="" srcset=""/>
            <div class="play">
              <a
                :href="this.liveContent.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="" alt=""
                /></a>
            </div>
          </div>
          <div class="titleContent-righTxt">
            <div class="titleContent-title">
              <!-- 【第{{ this.liveContent.seriesNumber }}期】 -->
              {{
                this.liveContent.title
              }}
            </div>
            <div class="titleContent-txt">
              <div class="titleContent-txt-title">大气海洋大讲堂</div>
              <div class="titleContent-txt-teacher">
                直播讲师：{{ this.liveContent.expertName }}
              </div>
              <div class="titleContent-txt-date">

                直播时间：{{ this.liveContent.liveDate }}
              </div>
            </div>
            <button class="titleContent-button">
              <a
                :href="this.liveContent.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                观看回放</a
              >
            </button>
          </div>
        </div>
        <div v-else class="liveing">
          <div class="content">
            <div class="info">
              <span class="index">智慧地球大讲堂</span>
              <p class="title">
                <!-- 【第{{ this.liveContent.seriesNumber }}期】 -->
                {{
                  this.liveContent.title
                }}
              </p>
              <div class="name">

                直播讲师：{{ this.liveContent.expertName }}
              </div>
              <div class="name">直播时间：{{ this.liveContent.liveDate }}</div>
              <p class="time" v-if="this.liveContent.status !== 'end'">
                <b>{{ remainder.day }}</b> 天 <b>{{ remainder.hour }}</b> 时
                <b>{{ remainder.min }}</b> 分 <b>{{ remainder.s }}</b> 秒
              </p>
              <p class="btn" @click="appointment">预约观看</p>
              <p class="tip" v-if="this.liveContent.status === 'end'">
                我们稍后将上传本次直播的视频回放，敬请期待！
              </p>
            </div>
            <!-- <img :src="PNGURL +liveContent.bannerImg" alt="" srcset="" /> -->
            <img :src="liveContent.bannerImg" alt="" srcset=""/>
          </div>
        </div>
      </div>
    </div>
    <div class="liveDetail-content">
      <div class="content">
        <div class="left">
          <div class="left-title"><span>直播介绍</span></div>
          <div class="left-content">
            <!-- <img :src="liveContent.liveListImg" alt="" /> -->
            <img :src="liveContent.posterUrl" alt=""/>
            <!-- <img :src="PNGURL + liveContent.liveListImg" alt="" /> -->
          </div>
        </div>
        <div class="right">
          <div class="recommendBox">

            <div class="swipeBox">
              <el-carousel
                trigger="click"
                height="210px"
                :autoplay="false"
                arrow="never"
              >
                <el-carousel-item
                  v-for="(item, index) in liveContent.recommendList"
                  :key="index"
                >
                  <!-- :src="PNGURL + item.recommendLiveImg" -->
                  <img
                    :src=" item.recommendLiveImg"
                    alt=""
                    srcset=""
                    @click="recommendLive(item.id)"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getById, petDetails } from '@/api/live/live.js'
import { APPURL2, APPURL, PNGURL } from '@/config.js'

export default {
  data () {
    return {
      detail: '直播中',
      remainder: {
        day: '01',
        hour: '',
        min: '',
        s: ''
      },
      APPURL,
      PNGURL,
      liveContent: {},
      dialogVisible: false,
      timer: null
    }
  },
  mounted () {
    this.getLive()
  },
  methods: {
    getLive () {
      const oid = this.$route.query.oid
      petDetails({ oid }).then((res) => {
        if (res.code === '200') {
          this.liveContent = res.data
          if (res.data.status !== 'end') {
            this.liveTime()
          }
        }
      })
    },
    liveTime (url) {
      var newDay = this.liveContent.liveDate
      //  var newDay = '2022/1/28 13:47:00';
      var countDate = new Date(newDay)
      var now = new Date().getTime()
      var gap = countDate - now
      var second = 1000
      var minute = second * 60
      var hour = minute * 60
      var day = hour * 24
      var d = Math.floor(gap / day)
      var h = Math.floor((gap % day) / hour)
      var m = Math.floor((gap % hour) / minute)
      var s = Math.floor((gap % minute) / second)

      if ((d, h, m, s < 0)) {
        this.getLive()
        clearInterval(this.timer)
      } else {
        this.remainder.day = d
        this.remainder.hour = h
        this.remainder.min = m
        this.remainder.s = s
        this.timer = setInterval(() => {
          this.liveTime()
        }, 1000)
      }
    },
    // 推荐直播
    recommendLive (id) {
      if (!id) return
      this.$router.push({
        // name: 'newsContent',
        path: '/live-show/live-detail',
        query: { id: id }
      })
      // this.getLive()
    },
    // 预约观看
    appointment () {
      this.dialogVisible = true
    }
  },
  deactivated () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
#liveDetail {
  width: 100%;
  text-align: left;

  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
  }

  .liveDetail-title {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #ffffff;
    box-sizing: border-box;

    .titleContent {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 68px 0;

      .titleContent-img {
        position: relative;
        width: 655px;
        // height: 100%;
        height: 358px;
        margin-right: 36px;

        .play {
          position: absolute;
          top: calc(50% - 22.5px);
          left: calc(50% - 22.5px);
          z-index: 100;
          width: 45px;
          height: 45px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .titleContent-righTxt {
        flex: 1;
      }

      .titleContent-title {
        font-size: 26px;
        font-weight: bold;
        color: #0b1531;
        margin-bottom: 28px;
      }

      .titleContent-txt {
        width: 448px;
        height: 150px;
        background: #f5f5f5;
        border-radius: 6px 6px 0px 0px;
        margin-bottom: 58px;
        padding: 16px 28px;

        .titleContent-txt-title {
          font-size: 16px;
          font-weight: bold;
          color: #3269ff;
          margin-bottom: 20px;
        }

        .titleContent-txt-teacher,
        .titleContent-txt-date {
          font-size: 16px;
          color: #0b1531;
          margin-bottom: 14px;
        }
      }

      button {
        width: 245px;
        height: 46px;
        background: linear-gradient(180deg, #6e95fd 0%, #3269ff 100%);
        border: 0px;
        border-radius: 23px 23px 23px 23px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;

        &:hover {
          cursor: pointer;
        }

        a {
          color: #fff;
          text-decoration: none;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .liveing {
      position: relative;
      width: 100%;
      height: 509px;
      padding: 62px 0;
      color: #fff;

      .info {
        // position: absolute;
        // top: 1px;
        // // left: 50%;
        // left: 0;
        width: 350px;
        // height: 509px;
        color: #fff;
        box-sizing: border-box;
        // background: rgba(0, 0, 0, 0.3);

        .index {
          display: block;
          width: 152px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background: linear-gradient(133deg, #41c6ef 0%, #6674ff 100%);
          border-radius: 4px 4px 4px 4px;

          font-size: 18px;
          color: #fff;
          margin-bottom: 13px;
        }

        .title {
          font-size: 25px;

          font-weight: 600;

          line-height: 41px;
          margin-bottom: 10px;
        }

        .name {
          font-size: 18px;

          line-height: 36px;
        }

        .time {
          height: 33px;
          margin-top: 40px;
          font-size: 16px;
          color: #c2c4ff;
          margin-bottom: 43px;

          b {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #fff;
            margin: 0 3px;
          }
        }

        .btn {
          width: 302px;
          height: 39px;
          background: linear-gradient(180deg, #6e95fd 0%, #3269ff 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 21px;
          margin: 20px 0;

          &:hover {
            cursor: pointer;
          }
        }

        .tip {
          margin-top: 5px;
          font-size: 16px;
          color: #999;
        }
      }

      img {
        width: 640px;
        height: 360px;
        background: #ffffff;
        border-radius: 20px 20px 20px 20px;
      }
    }
  }

  .bg {
    background-image: url("./liveInfoTitle.png");
    background-size: 100% 100%;
  }

  .liveDetail-content {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 70px;
    // flex-direction: column;
    .left {
      width: 62%;
      height: auto;
      background-color: #fff;
      margin-right: 26px;

      .left-title {
        font-size: 20px;
        font-weight: bold;
        color: #0b1531;
        width: 100%;
        border-bottom: 1px solid #e1e1e1;
        padding: 14px 0 13px 24px;
      }

      .left-content {
        padding: 25px;

        h2 {
          margin-bottom: 20px;
        }
      }
    }

    .right {
      width: 33%;
      //   height: 100px;
      .recommendBox {
        background-color: #fff;

        .recommendBox-title {
          font-size: 20px;
          font-weight: bold;
          color: #0b1531;
          width: 100%;
          border-bottom: 1px solid #e1e1e1;
          padding: 14px 0 13px 24px;
        }

        .swipeBox {
          padding: 20px 20px 10px;

          img {
            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .tipsBox {
        display: flex;
        // justify-content: space-between;
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;

        .tipsBox-img {
          img {
            width: 108px;
            height: 108px;
            margin-right: 9px;
          }
        }

        .tipsBox-content {
          .tipsBox-title {
            font-size: 16px;
            color: #0b1531;
            margin-bottom: 12px;
          }

          .tipsBox-txt {
            color: #3d4c64;
            margin-bottom: 24px;
          }

          .tipsBox-produce {
            font-size: 16px;
            font-weight: bold;
            color: #3269ff;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-carousel__button {
  background-color: #c0c4cc;
  opacity: 0.44;
}

.el-dialog__wrapper {
  top: 10%;
}

.el-dialog__body {
  text-align: center;

  img {
    width: 170px;
  }
}

// .el-carousel__indicators--horizontal{
//   bottom: -50px;
// }
</style>
