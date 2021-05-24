<template>
  <b-card no-body>
    <b-card-header>
      <div>
        <b-card-sub-title class="mb-25">
          Balance
        </b-card-sub-title>
        <b-card-title>{{ title }}</b-card-title>
      </div>
      <!-- datepicker -->
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <!-- datepicker -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-horizontal-bar-chart
        :height="400"
        :data="data"
        :options="chartjsData.horizontalBarChart.options"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import ChartjsComponentHorizontalBarChart from './charts-components/ChartjsComponentHorizontalBarChart.vue'
import chartjsData from './chartjsData'
import axios from "axios";
import { $themeColors } from '@themeConfig'

export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
    ChartjsComponentHorizontalBarChart,
  },
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      data: {},
      chartjsData,
      rangePicker: ['2019-05-01', '2019-05-10'],
      config: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      },
      themeColors: $themeColors,
    }
  },
  async created() {
    await this.customersUsedServices()
  },
  methods: {
    async customersUsedServices() {
      const response = await axios.get(`${process.env.VUE_APP_ROOT_API}statistics/customersUsedServices`, this.config)
      response.data.data.customersUsedService.datasets[0].backgroundColor = '#00ffff'
      response.data.data.customersUsedService.datasets[0].borderColor = 'transparent'
      response.data.data.customersUsedService.datasets[0].barThickness = 15
      this.data = response.data.data.customersUsedService
    },
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
