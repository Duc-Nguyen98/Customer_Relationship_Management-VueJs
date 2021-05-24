<template>
  <section id="dashboard-analytics" ref="app">
    <b-row class="match-height">
      <b-col
        lg="6"
        md="12"
      >
        <analytics-congratulation :data="data.userInformation" />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.customerData"
          icon="UsersIcon"
          title="Statistic Customers"
          :statistic="kFormatter(data.customerData.totalCustomers)"
          statistic-title="Totals Customer"
          :statistic2="kFormatter(data.customerData.customersPerMonth)"
          statistic2-title="Customers Per Month"
          :chart-data="data.customerData.chartData"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.gratitudeCustomerData"
          icon="PackageIcon"
          color="warning"
          title="Gratitude Customer"
          :statistic="kFormatter(data.gratitudeCustomerData.totalGratitude)"
          statistic-title="Totals Gratitude"
          :statistic2="kFormatter(data.gratitudeCustomerData.gratitudePerMonth)"
          statistic2-title="Gratitude Per Month"
          :chart-data="data.gratitudeCustomerData.chartData"
        />
      </b-col>
    </b-row>

<!--    <b-row class="match-height">-->
<!--      <b-col lg="6">-->
<!--        <analytics-avg-sessions :data="data.avgSessions" />-->
<!--      </b-col>-->
<!--      <b-col lg="6">-->
<!--        <analytics-support-tracker :data="data.supportTracker" />-->
<!--      </b-col>-->
<!--    </b-row>-->

    <b-row class="match-height" data-aos="fade-up">
      <b-col lg="6">
        <analytics-sales-radar title="Sales Revenue Ranking" type="sale" @update="changeRank" :data="data.rankingRevenue" />
      </b-col>
      <b-col lg="6">
        <analytics-sales-radar title="Customer Gratitude Ranking" type="gra" @update="changeRank" :data="data.rankingGratitude" />
      </b-col>
    </b-row>

    <b-row class="match-height" data-aos="fade-up" >
      <b-col cols="12">
        <ecommerce-statistics :data="data.statistics" />
      </b-col>
    </b-row>

    <b-row data-aos="fade-up">
      <b-col cols="12">
        <invoice-list />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import axios from 'axios'
import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'
import AnalyticsTimeline from './AnalyticsTimeline.vue'
import AnalyticsSalesRadar from './AnalyticsSalesRadar.vue'
import AnalyticsAppDesign from './AnalyticsAppDesign.vue'
import EcommerceStatistics from '../ecommerce/EcommerceStatistics.vue'
// Notification
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  components: {
    BRow,
    BCol,
    AnalyticsCongratulation,
    AnalyticsAvgSessions,
    StatisticCardWithAreaChart,
    AnalyticsSupportTracker,
    AnalyticsTimeline,
    AnalyticsSalesRadar,
    AnalyticsAppDesign,
    InvoiceList,
    EcommerceStatistics,
  },
  data() {
    return {
      data: {
        userInformation: {
          name: "User",
          gratitudeCustomer: 0,
          earned: 0,
        },
        customerData: {
          totalCustomers: 0,
          customersPerMonth: 0,
          chartData: [
            {
              name: 'customerData',
              data: [28, 40, 36, 52, 38, 60, 55],
            },
          ],
        },
        gratitudeCustomerData: {
          totalGratitude: 0,
          gratitudePerMonth: 0,
          chartData: [
            {
              name: 'gratitudeCustomerData',
              data: [28, 40, 36, 52, 38, 60, 55],
            },
          ],
        },
        rankingGratitude: [],
        rankingRevenue: [],
        statistics: null,
        tableServices: [],
      },
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      },
    }
  },
  created() {
    AOS.init()
    // data
    Promise.all([this.getUser(), this.getDataCus(), this.getGraCus(), this.getRankGra(), this.getRankSale()])
            .then(values => {
              this.data = {}
               values.map(obj => {
                 Object.assign(this.data, obj.data)
               })
            })
            .catch(error => {
              console.log(error)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: error.response.data.message,
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                },
              })
            })
  },
  mounted(){
    window.addEventListener('scroll', this.getStatistics)
  },
  destroyed () {
    window.removeEventListener('scroll', this.getStatistics)
  },
  methods: {
    async getUser() {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/userWelcome`, this.config)
      return response.data
    },
    async getDataCus() {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/customerData`, this.config)
      return response.data
    },
    async getGraCus() {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/gratitudeCustomerData`, this.config)
      return response.data
    },
    async getRankGra(by) {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/rankingGratitude?by=${by??1}`, this.config)
      return response.data
    },
    async getRankSale(by) {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/rankingRevenue?by=${by??1}`, this.config)
      return response.data
    },
    async getStatistics(event) {
      if (this.data.statistics == null) {
        const response = await axios.get(`${process.env.VUE_APP_ROOT_API}home/statistics`, this.config)
        response.data.data.statistics = [
          {
            icon: 'TagIcon',
            color: 'light-primary',
            title: response.data.data.statistics.vouchersTrade,
            subtitle: 'Vouchers Trade',
            customClass: 'mb-2 mb-xl-0',
          },
          {
            icon: 'AwardIcon',
            color: 'light-info',
            title: response.data.data.statistics.vouchersGift,
            subtitle: 'Vouchers Gift',
            customClass: 'mb-2 mb-xl-0',
          },
          {
            icon: 'LayersIcon',
            color: 'light-danger',
            title: response.data.data.statistics.totalVouchers,
            subtitle: 'Total Vouchers',
            customClass: 'mb-2 mb-xl-0',
          },
          {
            icon: 'DollarSignIcon',
            color: 'light-success',
            title: response.data.data.statistics.revenue.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
            subtitle: 'Revenue',
            customClass: '',
          },
        ]

        this.data = {...this.data, statistics: response.data.data.statistics}
      }
    },
    kFormatter,
    async changeRank({by, type}) {
        if (type == 'sale') {
            const response = await this.getRankSale(by)
            delete this.data.rankingRevenue
            this.data = {...this.data, ...response.data}
        } else {
            const response = await this.getRankGra(by)
          this.data = {...this.data, ...response.data}
        }
    },
  },
}
</script>
