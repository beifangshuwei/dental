<template>
  <div id="detail">

    <div class="detail">
      <div class="detail-title">{{ detailData?.name }}</div>
      <div v-if="detailData.img"><img :src="detailData.img" alt=""></div>
      <div class="detail-message">
        <div>
          <svg-icon icon-class="address"></svg-icon>
          <span>{{ detailData?.address }}</span></div>
        <div>
          <svg-icon icon-class="phone"></svg-icon>
          <span>{{ detailData?.phone }}</span>
        </div>
        <div>
          <svg-icon icon-class="Internet"></svg-icon>
          <span>Official Website: </span> <a :href="detailData?.href">{{ detailData?.href }}</a>
        </div>
        <div>
          <svg-icon icon-class="star"></svg-icon>
          <span>{{ detailData?.cityScore }}</span>
        </div>

      </div>
      <div class="detail-concent" v-if="detailData.accepts&&detailData.accepts.length>0">
        <h3>Accepts</h3>
        <div v-for="(item,index) in detailData?.accepts" :key="index" class="detail-concent-div">
          <svg-icon :icon-class="`insure${detailData.acceptsIcon[index]}`"></svg-icon>
          <span>{{ item }}</span>
        </div>
      </div>
<!--      <div class="detail-concent">-->
<!--        <h3>Accepts</h3>-->
<!--        <svg-icon icon-class="address"></svg-icon>-->
<!--        <span>{{ detailData?.detaileAddress }}</span>-->
<!--      </div>-->
      <div class="detail-concent" v-if="detailData.serviceDetails&&detailData.serviceDetails.length>0">
        <h3>Service Details</h3>
        <div>
          <ul>
            <li class="sle" v-for="(item,index) in detailData?.serviceDetails" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="detail-concent" v-if="detailData.hoursOfOperation&&detailData.hoursOfOperation.length>0">
        <h3>Hours of Operation</h3>
<!--        <svg-icon icon-class="time"></svg-icon>-->
        <ul>
          <li class="sle" v-for="(item,index) in detailData?.hoursOfOperation" :key="index">{{ item }}</li>
        </ul>
      </div>

      <div class="detail-concent" v-if="detailData.financialEligibility&&detailData.financialEligibility.length>0">
        <h3>Financial Eligibility</h3>
<!--        <svg-icon icon-class="address"></svg-icon>-->
        <span>{{ detailData?.financialEligibility }}</span>
      </div>
      <div class="detail-concent" v-if="detailData.cost&&detailData.cost.length>0">
        <h3>Cost</h3>
        <!--        <svg-icon icon-class="address"></svg-icon>-->
        <span>{{ detailData?.cost[0] }}</span>
      </div>
      <div class="detail-concent" v-if="detailData.supportedLanguage&&detailData.supportedLanguage.length>0">
        <h3>Supported Language</h3>
        <div>
          <ul>
            <li class="sle" v-for="(item,index) in detailData?.supportedLanguage" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="detail-concent" v-if="detailData.aboutThisClinic&&detailData.aboutThisClinic!=='None'">
        <h3>About This Clinic</h3>
        <div class="detail-concent-about">{{ detailData.aboutThisClinic}}</div>
      </div>
      <section class="detail-table-box">
      <h2 class="layout-mintit">2024 Pautas federales de pobreza de EE. UU.</h2>
      <p class="detail-p">para los 48 estados contiguos y el Distrito de Columbia</p>
      <table class="detail-table">
        <thead>
        <tr>
          <th>Personas en la familia / hogar</th>
          <th>Pauta de pobreza</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>$14,580</td>
        </tr>
        <tr>
          <td>2</td>
          <td>$19,720</td>
        </tr>
        <tr>
          <td>3</td>
          <td>$24,860</td>
        </tr>
        <tr>
          <td>4</td>
          <td>$30,000</td>
        </tr>
        <tr>
          <td>5</td>
          <td>$35,140</td>
        </tr>
        <tr>
          <td>6</td>
          <td>$40,280</td>
        </tr>
        <tr>
          <td>7</td>
          <td>$45,420</td>
        </tr>
        <tr>
          <td>8</td>
          <td>$50,560</td>
        </tr>
        </tbody>
      </table>
      <p class="detail-table-des">Para familias/hogares con más de 8 personas, agregue $5,140 por cada persona adicional.</p>
      </section>
    </div>
  </div>
</template>

<script>
import { getInformation } from '../../../api/help'

export default {
  data () {
    return {
      detailData: {}
    }
  },
  mounted () {
    getInformation({ id: this.$route.params.oid.split('-')[0] }).then(res => {
      this.detailData = res.data
    })
  },

}
</script>
<style scoped lang="less">
#detail {
  text-align: left;

  .detail {
    padding-top: 20px;
    svg {
      //color: var(--txt_color);
      width: 18px;
      height: 18px;
      margin-right: 12px;
      vertical-align:-0.2em;
    }
    .detail-title {
      font-size: 24px;
      line-height: 1.2;
      //font-weight: 600;
    }

    img {
      width: 500px;
      margin: 20px 0 20px;

    }

    .detail-message {
      font-size: 16px;
      margin-bottom: 20px;
      div {
        margin-bottom: 16px;
      }
    }

    .detail-concent {
      padding: 20px 0;
      border-top: 1px solid #e6eaf0;

      h3 {
        font-size: 24px;
        margin-bottom: 20px;
        //font-weight: 600;
      }

      svg {
        margin-right: 10px;
      }

      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        list-style: inherit;
        li {
          //display: inline-block;
          width: 30%;
          font-size: 16px;
          line-height: 20px;
          margin-bottom: 12px;
          padding: 0px 10px;
          list-style-type: disc;
          list-style-position:inside;
          text-align: left;
        }
      }

      span {
        font-size: 16px;

      }


    }
    .detail-concent-about {
      font-size: 16px;
      text-indent: 2em;
      line-height: 1.4;
      color: #666666;
    }
    .detail-table-box {
      width: 100%;
      height: auto;
      .layout-mintit {
        font-weight: 700;
        margin-bottom: 20px;
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .detail-p {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .detail-table {
        margin-top: 12px;
        width: 100%;
        border-collapse: collapse;
        th {
          width: 50%;
          border-color: #fff;
          background-color: rgba(238, 238, 238, .67);
          border-bottom: 2px solid #04303a;
          font-weight: 700;
          border-left: 1px solid #fff;
        }
         tr:nth-child(2n) td {
          background-color: rgba(238, 238, 238, .47);
        }

      }
      .detail-table-des {
        margin-top: 12px;
        font-size: 14px;
      }
      .detail-table th, .detail-table td {
        padding: 7px 10px;
        text-align: left;
        line-height: 20px;
        font-size: 15px;
      }
    }
    .detail-table-box, .detail-banner-item, .detail-item {
      padding: 24px 0;
    }
  }
}
</style>
<style lang="less">
#detail{
  @media screen and (max-width: 800px){
    .detail-concent{
      ul{
        li{
          width: 40% !important;
        }

      }
    }
  }

}
</style>
