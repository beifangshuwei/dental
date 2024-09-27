<template>
  <div id="newMessage">
    <div>
      <div class="newMessage-container">
        <div class="News">
          <message-aside :li-list="liList" :msg-list="msgList" @liActive="liActive"></message-aside>
          <div class="new-con">
            <features
              name=""
              :title="$t('msg.title')"
              bottompx="40px"
            >
              <template v-slot:one>
                <newmessage :newsList="newMessageList.newsList" :read="true" @newMessage="newMessage"></newmessage>
              </template>
            </features>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-size="pageSize"
              layout="pager"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { newMessageList } from './js/index'
import { getPetArticleList } from '@/libs/utils'
import { petArticleType, getArticle } from '@/api/index'
import Newmessage from '../../components/moudle/newmessage.vue'
import features from '../../components/features/features.vue'
import messageAside from 'comps/messageAside/messageAside.vue'
import SvgIcon from 'comps/SvgIcon/index.vue'

export default {
  components: {
    SvgIcon,
    features,
    Newmessage,
    messageAside
  },
  data () {
    return {
      select: '最新动态',
      msg: '',
      newMessageList,
      newsUrl: 'news',
      liActiveItem: { label: '' },
      liList: [
        {
          name: 'All',
          label: 'Dental Health',
          num: 100
        }, {
          name: 'All',
          label: 'Dental Care',

          num: 100
        }, {
          name: 'All',
          label: 'Dental Treatments & Procedures',
          num: 100
        },{
          name: 'All',
          label: 'Dental Insurance & Costs',
          num: 100
        },

      ],
      msgList: [
        {
          img: '',
          title: '10 Most Popular Dog Breeds in 2024'
        },
        {
          img: '',
          title: '10 Most Popular Dog Breeds in 2024'
        }
      ],
      pageNo: 1,
      pageSize: 12,
      total: 0
    }
  },
  watch: {
    $route (to, from) {
      this.newsUrl = to.name
    }
  },
  async mounted () {
    this.newsUrl = this.$route.name
    this.getArticleFn()
    // this.petArticleTypeFn()
    this.msgList = await getPetArticleList()
  },
  methods: {
    // petArticleTypeFn () {
    //   petArticleType().then(res => {
    //     this.liList = res.data
    //     this.getArticleFn()
    //   })
    // },
    getArticleFn () {
      getArticle({
        label: this.liActiveItem.label == '' ? null : this.liActiveItem.label,
        type: 2,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(res => {
        this.newMessageList.newsList = res.data.lawyerArticleTypeDTOList
        this.total = res.data.count
      })
    },
    handleCurrentChange (num) {
      this.pageNo = num
      this.getArticleFn()
    },
    searchMsg () {
      this.getArticleFn()
    },
    liActive (item) {
      this.liActiveItem = item
      this.getArticleFn()
    },
    newMessage (item) {
      this.$router.push({
        // name: 'newsContent',
        path: `/news/content/${item.uid}`,
        // query: { newsId: item.id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#newMessage {
  width: 100%;
  background: #ffffff;

  .newMessage-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .News {
    width: 100%;
    max-width: 1280px;
    display: flex;
    padding: 40px 0;

    .new-con {
      flex: 1;
    }
  }

  .title {
    //height: 428px;
    background: url("../../assets/image/newMessage/bg.png") 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
    // font-family: "PingFang SC";
    font-size: 48px;
    font-weight: 400;
    color: #2d3033;
    box-sizing: border-box;

    span {
      font-size: 16px;
      display: inline-block;
    }
  }

  @media screen and (max-width: 1500px) {
    .News {
      padding: 40px 15px;
    }
  }
  @media screen and (max-width: 800px) {
    .News {
      flex-direction: column;
    }
  }

}
</style>
<style lang="less">
#newMessage {
  .el-input-group__append,
  .el-input-group__prepend {
    font-size: 16px;
    color: #ffffff;
    background-color: #3269ff;
  }

  .el-input-group {
    line-height: normal;
    display: inline-table;
    width: 41%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 40px;
  }
}

</style>
