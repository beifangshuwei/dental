<template>
  <div id="showList">
    <message-aside :newsUrl="newsUrl" :select-obj="selectObj" :msg-list="msgList"
                   :isSelectObj="isSelectObj" @liActive="liActiveFn" @selectChange="selectChangeFn"></message-aside>
    <div class="livePlay">
      <div class="content">
        <div class="livePlay-title">
          <div class="before"></div>
          <div>{{ num }} for adoption</div>
        </div>
        <div class="livePlay-lists grid-four">
          <div
            class="livePlay-list"
            v-for="(item, index) in showList"
            :key="index"
          >
            <div class="livePlayList-content">
              <router-link :to="`/about?oid=${item.oid}`">
                <div class="livePlayList-img">
                  <!-- :src="PNGURL +item.bannerImg" -->
                  <img :src="item.img" alt=""/>
                </div>
                <div class="livePlayList-txt">
                  <div class="livePlayList-title">
                    <!-- 【第{{item.seriesNumber}}期】 -->
                    <svg-icon :icon-class="item.gender"></svg-icon>
                    {{ item.name }}
                  </div>
                  <!--                  <span>{{ item.ageGroup }}</span>-->
                  <!--                  <span>{{ item.sizeGroup }}</span>-->
                  <div class="livePlayList-span">
                    <div>{{ item.age }}</div>
                    <div> {{ item.size }}</div>

                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="load-more">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="num">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import messageAside from 'comps/messageAside/messageAside.vue'
import { getType, queryPet } from '@/api/index'
import { getPetArticleList } from '@/libs/utils'

export default {
  components: { messageAside },
  data () {
    return {
      typeValue: 'dog',
      num: '--',
      typeList: [
        {
          value: 'dog',
          label: 'dog'
        }, {
          value: 'cat',
          label: 'cat'
        }
      ],
      msgList: [
        {
          img: require('../../assets/image/about/bg.png'),
          title: '10 Most Popular Dog Breeds in 2024'
        },
        {
          img: require('../../assets/image/about/bg.png'),
          title: '10 Most Popular Dog Breeds in 2024'
        }
      ],
      selectObj: {},
      isSelectObj: {},
      showList: [],
      pageNum: 1,
      pageSize: 12,
      total: '',
      search: '',
      newsUrl: 'liveShow'
    }
  },
  watch: {
    $route (to, from) {
      this.newsUrl = to.name
      // this.newsUrl === 'cat' ? this.getCat() : this.getDog()
      this.getTypeFn()
    }
  },
  async mounted () {
    // console.log(this.$route.fullPath)
    this.newsUrl = this.$route.name
    this.msgList = await getPetArticleList()
    this.getTypeFn()
  },
  methods: {
    getTypeFn () {
      getType({ type: this.newsUrl }).then(res => {
        this.selectObj = res.data
        this.num = res.data.count

        const item = this.$route.query.obj !== undefined ? JSON.parse(this.$route.query.obj) : {}
        this.selectChangeFn(item)
      })
    },

    selectChangeFn (item) {
      this.pageNum = 1
      this.showList = []
      this.isSelectObj = item
      this.getPetList(item)
    },
    // 获取宠物列表
    getPetList (item) {
      queryPet({
        ...item,
        type: this.newsUrl,
        page: this.pageNum,
        pageSize: 12
      }).then(res => {
        this.num = res.data.count
        this.showList = res.data.petList
      })
    },
    liActiveFn (item) {
      console.log(item)
    },
    handleCurrentChange (num) {
      this.pageNum = num
      this.getPetList(this.isSelectObj)
    },
    activeLive (index) {
      this.activeLiveIndex = index
      this.activeLiveFn = this.activities[index]
      this.itemTransform = -751 * index
      // this.activeLiveFn.status = this.statusList[this.activities[index].status]
    }

  }
}
</script>

<style lang="less" scoped>
#showList {
  width: 100%;
  //background-color: #eff3fa;
  max-width: 1280px;
  display: flex;
  justify-content: center;
  padding: 40px 0;

  .liveTitle {
    position: relative;
    width: 100%;

    .livePic {
      background-repeat: no-repeat;
      height: 500px;
      width: 100%;
      //background-image: url("../../assets/image/live/liveTitle.png");
      background-size: 100% 100%;
    }

    .liveInfo {
      display: flex;
      justify-content: center;
      width: 100%;
      top: 453px;
      //position: absolute;
      .live-middle {
        padding: 0 15px;
      }

      .live-middleBox {
        display: flex;
        justify-content: space-between;

        padding: 15px;
        background-color: #fff;
        text-align: left;
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.08);
        overflow: hidden;

      }
    }
  }

  .livePlay {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;

    .content {
      width: 100%;
    }
  }

  .livePlay-title {
    display: flex;
    height: 26px;
    align-items: center;
    text-align: left;
    padding-left: 15px;
    margin-bottom: 30px;

    div {
      display: inline-block;
      height: 26px;
      line-height: 1.2;
      font-size: 22px;
      font-weight: bold;
      color: #000000;
    }

    .before {
      width: 6px;
      background: #2b88bf;
      margin-right: 10px;
    }
  }
  .livePlay-lists {

    .livePlay-list {
      width: 100%;
      box-sizing: border-box;

      .livePlayList-content {
        background: #ffffff;
        border-radius: 20px;
        box-sizing: border-box;
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.08);
        cursor: pointer;

        &:hover {
          box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.4);
        }

        //padding: 10px 20px;
        .livePlayList-img {
          height: 210px;
          //width: 100%;
          //background: ;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
            object-fit: cover;
          }
        }

        .livePlayList-txt {
          padding: 20px;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;

          .livePlayList-title {
            font-weight: bold;
            color: #0b1531;
            font-size: 20px;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis; /* 超出部分省略号 */
            word-break: break-all; /* break-all(允许在单词内换行。) */
            display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
            -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-line-clamp: 1; /* 显示的行数 */
            cursor: pointer;
          }

          span {
            font-size: 18px;
            line-height: 29px;
            color: #666666;
          }

          .livePlayList-span {
            display: flex;
            justify-content: center;
            align-items: center;

            div {
              cursor: pointer;
              background: #3269ff;
              border-radius: 10px;
              //border: 1px solid #3269ff;
              color: #fff;
              font-size: 14px;
              line-height: 26px;
              width: 70px;
              text-align: center;

              &:nth-child(1) {
                margin-right: 10px;

              }
            }
          }
        }
      }
    }
  }

  .load-more {
    width: 100%;
    margin-top: 10px;

    div {
      //width: 124px;
      //background: #3269ff;
      text-align: right;
      padding: 15px;
      font-size: 20px;

    }
  }
}

#showList {
  @media screen and (max-width: 1500px) {
    padding: 40px 15px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}
</style>
<style lang="less">
.el-timeline-item__node {
  position: absolute;
  background: #ffffff;

  border: 2px solid #3269ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-timeline-item__tail {
  position: absolute;
  left: 4px;
  height: 100%;
  border-left: 2px dashed #3269ff;
}
</style>
