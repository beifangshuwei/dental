：
<template>
  <div id="helpList">
    <div>
      <el-breadcrumb>
        <el-breadcrumb-item to="/index"><span>{{ $t('home') }}</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/${$route.name.replace(/ /g, '-') }`}">
          <span>{{ $t(`breadcrumb.${$route.name}.title`) }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeState"
                            :to="{ path: `/${$route.name.replace(/ /g, '-') }/${state.replace(/[ ,&.,']/g, '-').replace(/-+/g, '-')}`}">
          {{
            state
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.area"
         :to="{ path: `/${$route.name.replace(/ /g, '-') }/${state.replace(/[ ,&.]/g, '-').replace(/-+/g, '-')}/${$route.params.area.replace(/[ ,&.,']/g, '-').replace(/-+/g, '-')}`}">
          {{ area }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.oid"></el-breadcrumb-item>
      </el-breadcrumb>
      <div v-if="!$route.params.oid" class="ADOPTIONGUIDES-title">{{ $t(`breadcrumb.${$route.name}.title`) }} {{ $t('pro-Bono.tipTxt.nearby') }}
        {{
          state ? $route.params.area ? `in ${area}, ${state}` : `in ${state}` : ''
        }}
      </div>
      <!--      <div class="ADOPTIONGUIDES-title">{{ title }}</div>-->
      <div class="ADOPTIONGUIDES-lists grid-three" v-if="!$route.params.area">
        <div class="ADOPTIONGUIDES-list " v-for="(item,index) in sheltersList" :key="index" @click="clickFn(item)">
          <span class="ADOPTiONGUIDES-span" v-if="item.area">{{ item.area }}</span>
          <span class="ADOPTiONGUIDES-span" v-else>{{ item.state }}</span>
          <span class="num">{{ item.total }} {{ item.total > 1 ? $t('pro-Bono.unit.more') : $t('pro-Bono.unit.one') }}  > </span>
        </div>
      </div>
      <div v-if="!$route.params.oid && $route.params.area">
        <information :informationList="informationList"></information>
      </div>
      <div v-if="$route.params.oid">
        <detail></detail>
      </div>
      <section v-if="!$route.params.oid" class="layout-faq">
        <h2 class="layout-mintit">{{ $t('pro-Bono.asked.title') }}</h2>
        <div class="layout-faq-box">
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              {{ $t('pro-Bono.asked.ask0.title') }}
            </div>
            <div class="layout-faq-a">
              <p>{{ $t('pro-Bono.asked.ask0.intro0') }}</p>
              <p>{{ $t('pro-Bono.asked.ask0.intro1') }}</p>
            </div>
            <div class="layout-faq-item">
              <div class="layout-faq-q">
                {{ $t('pro-Bono.asked.ask1.title') }}
              </div>
              <div class="layout-faq-a">
                <p>{{ $t('pro-Bono.asked.ask1.intro0') }}</p>
                <div class="layout-faq-item">
                  <div class="layout-faq-q">
                    {{ $t('pro-Bono.asked.ask2.title') }}
                  </div>
                  <div class="layout-faq-a">
<p>{{ $t('pro-Bono.asked.ask2.intro0') }}  </p>
                </div>
                <div class="layout-faq-item">
                  <div class="layout-faq-q">
                    {{ $t('pro-Bono.asked.ask3.title') }}
                  </div>
                  <div class="layout-faq-a">
                    <p>
                      {{ $t('pro-Bono.asked.ask3.intro0') }}
                    </p></div>
                </div>
                <div class="layout-faq-item">
                  <div class="layout-faq-q">
                    {{ $t('pro-Bono.asked.ask4.title') }}
                  </div>
                  <div class="layout-faq-a">
                    <p>{{ $t('pro-Bono.asked.ask4.intro0') }}</p>
                    <p>{{ $t('pro-Bono.asked.ask4.intro1') }}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        </div>
      </section>

    </div>

  </div>
</template>
<script>
import { getArea, getIcon, getState } from '@/api/help'
import information from './information.vue'
import detail from './detail.vue'

export default {
  components: {
    information,
    detail
  },
  data () {
    return {
      title: 'FIND SHELTERS & VET',
      state: null,
      routeState: '',
      area: '',
      firstPath: '',
      chooseTitle: '',
      informationList: [],
      sheltersList: [
        {
          name: 'Alabama',
          num: 156
        }, {
          name: 'Alaska',
          num: 156
        }, {
          name: 'Alabama',
          num: 156
        }, {
          name: 'Alorida',
          num: 16
        }, {
          name: 'Alorida',
          num: 16
        }, {
          name: 'Alorida',
          num: 16
        }, {
          name: 'Alorida',
          num: 16
        }, {
          name: 'Alabama',
          num: 6
        }, {
          name: 'Alabama',
          num: 156
        }]
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    $route (to, from) {
      this.init()
    }
  },
  methods: {
    init () {
      this.title = this.$route.name
      this.state = this.$route.params.state ? this.$route.params.state.replace(/-/g, ' ') : null
      this.area = this.$route.params.area ? this.$route.params.area.replace(/-/g, ' ') : null
      // this.type = localStorage.getItem('denType')
      this.routeState = this.$route.params.state
      this.routeState == null ? this.getStateFn() : this.$route.params.area ? this.getInformationFn() : this.getAreaFn()
    },
    // 获取州
    getStateFn () {
      getState({ categoryItem: this.$route.name }).then(res => {
        this.sheltersList = res.data
      })
    },

    clickFn (item) {
      // localStorage.setItem('denType', JSON.stringify(item))
      if (item.area) {
        localStorage.setItem('denArea', item.area)
        this.$router.push({
            path: this.$route.fullPath + '/' + item.area.replace(/[ ,&.]/g, '-').replace(/-+/g, '-')
          }
        )
      } else {
        localStorage.setItem('denState', item.state)
        this.$router.push({
            path: this.$route.fullPath + '/' + item.state.replace(/[ ,&.]/g, '-').replace(/-+/g, '-')
          }
        )
      }

      // item.area ? this.getInformationFn(item) : this.getAreaFn(item)
    },
    getInformationFn () {
      getIcon({
        area: this.$route.params.area === 'county' ? '' : this.$route.params.area,
        state:
        this.$route.params.state,
        categoryItem: this.$route.name,
        pageNo: 1,
        pageSize: 100000
      }).then(res => {
        this.informationList = res.data.dentistIconDTOList
      })
    },
    getAreaFn (item) {
      getArea({
        categoryItem: this.$route.name,
        state: this.$route.params.state
      }).then(res => {
        this.sheltersList = res.data
      })
    },
    getList () {
      this.getInformationFn()
    }
  }
}
</script>
<style scoped lang="less">

#helpList {
  color: #333333;
  text-align: left;

  .ADOPTIONGUIDES-title {
    font-size: 28px;
    text-align: left;
    color: var(--txt_color);
    font-weight: 600;
    margin: 20px 0;

  }

  .ADOPTIONGUIDES-num {
    margin-top: 20px;
    font-size: 16px;
  }

  .ADOPTIONGUIDES-lists {
    grid-gap: 0px !important;
    //margin-top: 20px;
  }

  .ADOPTIONGUIDES-list {
    //height: 50px;
    line-height: 18px;
    border-radius: 5px;
    //border: 1px solid #ccc;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;

    .ADOPTiONGUIDES-span {
      flex: 1;
      text-align: left;
    }

    .num {
      font-size: 12px;
      color: #999;
    }

    &:hover {
      border-color: var(--button_color);
      color: var(--txt_color);
    }
  }

  .layout-faq {
    margin-top: 28px;
    text-align: left;

    .layout-mintit {
      font-weight: 700;
      margin-bottom: 20px;
      font-size: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .layout-faq-item {
      margin-top: 20px;
    }

    .sidebar-intro-q, .layout-faq-q {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .sidebar-intro-a, .layout-faq-a {
      font-size: 20px;
      color: #999999;
      font-size: 14px;
      line-height: 1.4;
    }

    .layout-faq-end {
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    .ADOPTIONGUIDES-title {
      font-size: 20px;

    }

    .ADOPTIONGUIDES-list {
      //padding: 0 3px;
      //font-size: 16px;
    }

    .layout-faq {
      .layout-mintit {
        //font-size: 24px;
      }
    }

  }
}

</style>
