<template>
  <div id="information">

    <div class="information-con">
      <features
        name=""
        title=""
        bottompx="40px"
      >
        <template v-slot:one>
          <newmessage :newsList="informationList" :concat="true" @newMessage="newMessage"></newmessage>
        </template>
      </features>

    </div>
  </div>
</template>
<script>
import Newmessage from 'comps/moudle/newmessage.vue'
import { getIcon } from '@/api/help'

export default {
  props:['informationList'],
  data () {
    return {
      // informationList: [{}]
    }
  },
  components: { Newmessage },
  mounted () {
    // log
    // this.getInformationFn()
  },
  methods: {

    newMessage (item) {
      localStorage.setItem('DenId', item.id)
      this.$router.push({
        path: `/${this.$route.name.replace(/ /g, '-')}/${this.$route.params.state}/${this.$route.params.area}/${item.id}-${item.name.replace(/[ ,&./]/g, '-').replace(/-+/g, '-')}`
      })
    }
  },

}
</script>
<style lang="less">
#information {
  .information-con {
    padding-top: 20px;

    .newMessage {
      .grid-three {
        grid-gap: 16px;
        clear: both;
        display: grid;
        grid-template-columns: 1fr 1fr !important;
        @media screen and (max-width: 800px) {
          grid-template-columns: 1fr !important;
        }
      }


    }
  }
}
</style>
