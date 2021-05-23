<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col
        xl="12"
        md="12"
      >
        <chartjs-horizontal-bar-chart />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <b-row class="match-height">
          <!-- Bar Chart - Doughnut -->
          <b-col md="6">
            <echart-doughnut />
          </b-col>
          <!--/ Bar Chart - Doughnut -->
          <b-col md="6">
            <echart-doughnut />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <!-- Company Line Chart -->
      <b-col lg="12">
        <apex-line-area-chart />
      </b-col>
      <!--/ Company Line Chart -->

      <!-- Company Belance Chart -->
      <b-col lg="12">
        <apex-line-chart />
      </b-col>
      <!-- Company Belance Chart -->
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import ChartjsHorizontalBarChart from '@/views/charts-and-maps/charts/chartjs/ChartjsHorizontalBarChart'
import EchartDoughnut from '@/views/charts-and-maps/charts/echart/EchartDoughnut'
import ApexLineChart from '@/views/charts-and-maps/charts/apex-chart/ApexLineChart'
import ApexLineAreaChart from '@/views/charts-and-maps/charts/apex-chart/ApexLineAreaChart'

export default {
  components: {
    BRow,
    BCol,
    ChartjsHorizontalBarChart,
    EchartDoughnut,
    ApexLineChart,
    ApexLineAreaChart,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
