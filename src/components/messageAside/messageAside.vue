<template>
  <div class="aside">
    <div class="aside-tool aside-div">
      <!--      <h1>Find a Furry Friend</h1>-->
      <div class="aside-tool-list">
        <div class="aside-tool-con">
          <router-link to="/Dental-Clinics">
            <div class="aside-tool-item">
              <span class="tool-text">
                {{$t('menu.menu0.title')}}
              </span>
            </div>
          </router-link>
        </div>
        <div class="aside-tool-con">
          <router-link to="/news">
            <div class="aside-tool-item">
              <span class="tool-text">
               {{$t('menu.menu1.title')}}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="aside-filter aside-div" v-if="liList">
      <h1>{{ $t('aside.filter') }}</h1>
      <ul class="filter-box-options" style="display: block;">
        <li @click="liActive({label:''})" :class="liActiveItem?.label === ''?'active':'' "><span>All</span></li>
        <li v-for="(item,index) in liList" :key="index" @click="liActive(item)"
            :class="liActiveItem?.label === item.label?'active':'' ">
          <span>{{$t(`breadcrumb.${item.label}.title`)}}{{ item?.count }}</span>
          <!--                <a href="?category_filter=all-about-foster-care&amp;term=">{{ item.name }}({{ item.num }})</a>-->
          <span></span>
        </li>
      </ul>
    </div>
    <div class="aside-select aside-div" v-if="selectObj">
      <h1>Filter By</h1>
      <div v-for="(item,key) in selectObj" class="selectObj-list">
        <h3>
          {{ key }}
        </h3>
        <el-select
          v-model="checked[key]"
          multiple
          collapse-tags
          placeholder="choose"
          @change="selectChange"

        >
          <el-option
            v-for="(item1,index1) in item"
            :key="index1"
            :label="item1"
            :value="item1"
            @mouseenter.native.stop="selectClick(key)"
          >
          </el-option>
        </el-select>
        <!--        <el-checkbox-group v-model="checked[key]" @change="handleCheckedChange">-->
        <!--          <el-checkbox v-for="(item1,index1) in item" :label="item1.name" :key="index1">{{item1.name}}</el-checkbox>-->
        <!--        </el-checkbox-group>-->
      </div>
    </div>
    <div class="aside-msg aside-div" v-if="msgList">
      <h1>{{$t('aside.msg')}}</h1>
      <div class="aside-msg-con" v-for="(item,index) in msgList" :key="index" @click="msgClick(item)">
        <div class="aside-msg-item">
          <img class="lazyload" src="https://img.ttsnews.com/mr.webp"
               :data-src="item.img" alt="">
          <div class="aside-msg-itemLabel">
            <span>{{ item.label[0] }}</span>
            <!--            <span v-for="(item1,index1) in item.label" :key="index1"> {{ item1 }}</span>-->
          </div>
          <div class="aside-msg-itemTitle">{{ item.title }}</div>

          <div class="aside-msg-itemTxt">
            <span>{{ item.overview }}</span>
            <!--            <span v-for="(item1,index1) in item.label" :key="index1"> {{ item1 }}</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="aside-msg aside-div" v-if="petList">
      <h1>{{$t('aside.msg')}}</h1>
      <div class="aside-msg-con" v-for="(item,index) in petList" :key="index" @click="petClick(item)">
        <div class="aside-msg-item">
          <img :src="item.img" alt="">
          <div class="aside-msg-itemTitle">
            <svg-icon :icon-class="item.gender"></svg-icon>
            {{ item.name }}
          </div>
          <div class="aside-msg-itemLabel"><span>{{ item.age }}</span> <span>{{ item.size }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['newsUrl', 'liList', 'selectObj', 'isSelectObj', 'msgList', 'petList'],
  data () {
    return {
      liActiveItem: { label: '' },
      checked: {
        Type: [],
        Age: []
      },
      selectComObj: {},
      selectType: null
    }
  },
  mounted () {
    if (this.msgList && this.msgList.length > 0) {
      setTimeout(() => {
        document
          .querySelectorAll('.lazyload').forEach(function (img) {
          var src = img.getAttribute('data-src')
          var ImgObj = new Image()
          ImgObj.src = src
          ImgObj.onload = function () {
            // 图片路径正确，且图片已成功加载
            img.src = src
          }
          ImgObj.onerror = function () {
            img.src = 'https://img.ttsnews.com/mr.webp'
            // 图片路径正确，且图片已成功加载
          }
        })
      }, 400)
    }

  },

  methods: {
    liActive (item) {
      this.liActiveItem = item
      this.$emit('liActive', item)
    },
    selectChange (item) {
      this.selectComObj[this.selectType] = item

      this.$router.push({
        // name: 'newsContent',
        path: `/${this.$route.name}`,
        query: { obj: JSON.stringify(this.selectComObj) }
      })
      // this.$emit('selectChange', this.selectComObj)
      // console.log(this.selectComObj,this.selectComObj[this.selectType])
    },
    selectClick (key) {
      this.selectType = key
    },
    handleCheckedChange () {
    },
    msgClick (item) {
      this.$router.push({
        path: '/news/content',
        query: { newsId: item.id }
      })
    },
    petClick (item) {
      this.$router.push({
        path: '/about',
        query: { oid: item.oid }
      })
    }
  }
}
</script>
<style scoped lang="less">
.aside {
  margin-right: 40px;
  text-align: left;
  max-width: 320px;

  a {
    text-decoration: none;
    color: #000;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .aside-div {
    margin-bottom: 28px;
  }

  //max-width: 280px;
  .aside-tool {
    font-size: 18px;

    .iconStyle {
      width: 30px;
      height: 30px;
      vertical-align: -8px;
    }

    .aside-tool-list {
      width: 100%;

      .aside-tool-con {
        border: 1px solid var(--button_color);
        background-color: var(--button_color);
        padding: 15px 10px;
        margin-bottom: 6px;
        cursor: pointer;

        a {
          color: #ffffff !important;
          font-weight: bold;
        }

        //border-radius: 20px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .aside-filter {
    text-align: left;


    ul li:not(.interstate) {
      border-radius: 2px;
      display: block;
      padding: 8px 10px;
      text-decoration: none;
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: var(--txt_color);
      }

      &.active {
        color: var(--txt_color);
      }
    }
  }

  .aside-select {

    .selectObj-list {
      h3 {
        margin: 10px 0;
      }
    }
  }

  .aside-msg {

    .aside-msg-item {
      cursor: pointer;
      padding: 9px 10px;
      //border: 1px solid rgba(0, 127, 255, 0.1);
      box-shadow: 0 0 2px 1px rgba(186, 183, 183, 0.2);
      margin-bottom: 5px;
      overflow-wrap: anywhere;

      img {

        width: 100%;
        height: 160px;
        margin-bottom: 5px;
        object-fit: cover;
      }

      .aside-msg-itemTitle {
        font-size: 18px;
        line-height: 18px;
        margin: 8px 0;
        overflow-wrap: anywhere;
      }

      .aside-msg-itemLabel {
        color: var(--txt_color);
        font-size: 14px;

        span {
          margin-right: 10px;
        }
      }

      .aside-msg-itemTxt {
        color: #999999;
        font-size: 14px;
      }

      &:hover {
        color: var(--txt_color);
        box-shadow: 0 0 2px 1px var(--txt_color);
      }

    }
  }
}

@media screen and (max-width: 800px) {
  .aside {
    max-width: 100%;
    margin-right: 0;
    //max-width: 60px;
    .aside-msg {
      display: none;
    }

    .aside-tool {
      .aside-tool-list {
        .aside-tool-con {
          display: inline-block;
          width: 48%;
          margin-right: 2%;
          font-size: 16px;
        }

      }
    }

    .aside-select {
      .selectObj-list {
        display: inline-block;
        width: 48%;
        margin-right: 2%;
      }
    }

    .aside-filter {
      font-size: 14px;

      .filter-box-options {
        li {
          padding: 5px 5px !important;
          display: inline-block !important;
          width: 44%;


        }

      }
    }
  }
}
</style>
