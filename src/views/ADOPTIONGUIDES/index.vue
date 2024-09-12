<template>
  <div
    id="ADOPTIONGUIDES"
  >
    <div class="ADOPTIONGUIDES-sidebar">
      <div class="sidebar-intro">
        <h2 class="sidebar-intro-q">About Free Dental Service</h2>
        <p class="sidebar-intro-a"> Free or low-cost dental clinics exist in the U.S. to help bridge the gap in dental care accessibility, particularly for individuals who may not have the means to afford regular dental services. These clinics are often funded by government programs, non-profit organizations, or charitable donations, aiming to provide essential dental care to those most in need. These services are typically targeted toward low-income individuals and families, uninsured individuals, children and seniors, and people on government assistance.</p>
      </div>
      <message-aside :msg-list="msgList"></message-aside>
    </div>

    <div class="ADOPTIONGUIDES-description">
      <el-main class="ADOPTIONGUIDES-description">
        <router-view :key="$route.fullpath"></router-view>
      </el-main>
    </div>
  </div>

</template>

<script>
import features from '../../components/features/features.vue'

import messageAside from 'comps/messageAside/messageAside.vue'
import { getPetArticleList } from '@/libs/utils'
export default {
  components: { messageAside },

  data () {
    return {
      msgList:[{}]
    }
  },
  async mounted () {
    this.msgList = await getPetArticleList()
  }

}
</script>


<style lang="less" scoped>

#ADOPTIONGUIDES {
  display: flex;
  width: 100%;
  max-width: 1132px;
  padding: 40px 0;

  .ADOPTIONGUIDES-description {
    flex: 1;
    padding: 0;
  }

  .sidebar-intro {
    background-color: #2c6bff33;
    padding: 16px 20px;
    border-radius: 16px;
    margin-bottom: 28px;
    width: 100%;
    max-width: 320px;
    text-align: left;
    margin-top: 28px;
    margin-right: 40px;

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
  }
}

@media screen and (max-width: 800px) {
  #ADOPTIONGUIDES {
    flex-direction: column-reverse;
    padding: 40px 15px;

  }
}
</style>
<style style="less">
#ADOPTIONGUIDES {
  .el-breadcrumb {
    line-height: 1.4;
  }
}

</style>

