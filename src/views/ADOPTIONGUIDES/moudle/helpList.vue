：<template>
  <div id="helpList">
    <div>
      <el-breadcrumb>
        <el-breadcrumb-item to="/index"><span>Home</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/${$route.name.replace(/ /g, '-') }`}"><span>{{ $route.name }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeState" :to="{ path: `/${$route.name.replace(/ /g, '-') }/${state.replace(/[ ,&.,']/g, '-').replace(/-+/g, '-')}`}">{{
            state
          }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.area"
                            :to="{ path: `/${$route.name.replace(/ /g, '-') }/${state.replace(/[ ,&.]/g, '-').replace(/-+/g, '-')}/${$route.params.area.replace(/[ ,&.,']/g, '-').replace(/-+/g, '-')}`}">
          {{ area }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.oid"></el-breadcrumb-item>
      </el-breadcrumb>
      <div v-if="!$route.params.oid" class="ADOPTIONGUIDES-title">{{ title }} Near Me
        {{
          state ? $route.params.area ? `in ${area}, ${state}` : `in ${state}` : ''
        }}
      </div>
<!--      <div class="ADOPTIONGUIDES-title">{{ title }}</div>-->
      <div class="ADOPTIONGUIDES-lists grid-three" v-if="!$route.params.area">
        <div class="ADOPTIONGUIDES-list " v-for="(item,index) in sheltersList" :key="index" @click="clickFn(item)">
          <span class="ADOPTiONGUIDES-span" v-if="item.area">{{ item.area }}</span>
          <span class="ADOPTiONGUIDES-span" v-else>{{ item.state }}</span>
          <span class="num">{{ item.total }} {{ item.total > 1 ? 'Clinics' : 'Clinic' }}  > </span>

        </div>
      </div>
      <div v-if="!$route.params.oid && $route.params.area">

        <information :informationList="informationList"></information>
      </div>
      <div v-if="$route.params.oid">

        <detail></detail>
      </div>
      <section v-if="!$route.params.oid" class="layout-faq">
        <h2 class="layout-mintit">Frequently Asked Questions</h2>
        <div class="layout-faq-box">
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              What Services Does USDentalService Provide?
            </div>
            <div class="layout-faq-a">
              <p>USDentalService is committed to aiding individuals who need free or low-cost dental care. Our platform primarily collates two types of information to assist users in addressing their dental health concerns.</p>
              <p>Our website features a comprehensive directory of nearby dental service providers, including free dental clinics, low-cost dental offices, dental schools, community health centers, and public health departments. Users can leverage this information to find suitable clinics or dental professionals catering to their dental needs.</p></div>
          </div>
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              How Can I Get Information About Nearby Dental Clinics?
            </div>
            <div class="layout-faq-a">
<p>To locate information about nearby dental service providers, you should initially navigate to the directory page on USDentalService, accessed from our homepage. Once you're on the directory page, select the state where you currently reside or where you are seeking dental care. On the state page, you can peruse the list of clinics and choose the ones that pique your interest. By clicking on a specific clinic's page, you can find detailed information about that dental clinic, including their address, contact number, services they offer, and so on.</p>          </div>
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              Where Can I Find Free Dental Knowledge?
            </div>
            <div class="layout-faq-a">
              <p>You can explore the articles on our website for free dental knowledge. We offer four categories of dental topics: Dental Implants, Dentures, Orthodontics, and Dental Insurance. Users can find the information they are looking for from our dental knowledge resources.</p></div>
          </div>
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              What Is The Cost Of Dental Services On USDentalService?
            </div>
            <div class="layout-faq-a">
              <p>The dental services information we provide is entirely FREE. All details about various dental service providers and dental posts on USDentalService are FREE OF CHARGE. However, it's crucial to understand that we are not directly associated with any dental clinic or dentist. As a result, we cannot be held responsible for the quality of dental services they provide or any fees incurred from engaging with them.</p></div>
          </div>
          <div class="layout-faq-item">
            <div class="layout-faq-q">
              What Else Should I Know About Free Dental Services On USDentalService?
            </div>
            <div class="layout-faq-a">
              <p>Please remember that access to free and low-cost dental services is not universal. Eligibility for these services often involves specific requirements or application procedures. Your qualification might be based on eligibility for government assistance, income level, geographic location, and age group, among other criteria. Before further discussions, verifying with the dental service provider whether you qualify for their assistance is crucial.</p>
              <p>The information on our website about any dental service provider comes directly from the respective provider's website. Consequently, we cannot assure the accuracy or validity of this information. If you have any doubts about the details on our website, please get in touch with the dental service provider for confirmation. Our website is regularly updated and maintained, so there might be times when we can only guarantee that some information is entirely accurate and current. We are dedicated to continuously adding new clinics and dentists to our listings and updating our content with the most recent information as it becomes available.</p></div>
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
      routeState:'',
      area:'',
      firstPath: '',
      chooseTitle: '',
      informationList:[],
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
      this.state = this.$route.params.state ? this.$route.params.state.replace(/-/g, ' '):null
      this.area = this.$route.params.area ? this.$route.params.area.replace(/-/g, ' '):null
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
    grid-gap:0px !important;
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
