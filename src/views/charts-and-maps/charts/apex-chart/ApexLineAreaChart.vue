<template>
  <b-card no-body>
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          {{ title }}
        </b-card-title>
        <b-card-sub-title>Commercial networks</b-card-sub-title>
      </div>
      <!--/ title and subtitle -->

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

    <b-card-body>
      <vue-apex-charts
        type="area"
        height="400"
        :options="chartOptions ? chartOptions : apexChatData.lineAreaChartSpline.chartOptions"
        :series="series"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component'
import apexChatData from './apexChartData'
import moment from "moment";

export default {
  components: {
    BCard,
    VueApexCharts,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
  },
  props: {
    title: {
      type: String,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      series: this.data.series,
      chartOptions: this.data.chartOptions,
      apexChatData,
      rangePicker: [moment().subtract(7, "days").format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    }
  },
  watch: {
    data: function (value) {
      this.series = value.series
      this.chartOptions = value.chartOptions
    }
  },
}
</script>
