<template>
  <b-card v-if="data">
    <b-row class="pb-50">
      <!-- text and button -->
      <b-col
        sm="6"
        order-sm="1"
        order="2"
        class="d-flex justify-content-between flex-column mt-1 mt-sm-0"
      >
        <div>
          <b-card-title class="font-weight-bold mb-2">
            Overview Statistics Chart
          </b-card-title>

          <h5 class="font-medium-2">
            <span class="text-success mr-50">{{ data.growth }}</span>
            <span>vs to last weeks</span>
          </h5>
        </div>
      </b-col>

      <!-- dropdown and chart -->
      <b-col
        sm="12"
        cols="12"
        order-sm="2"
        order="1"
        class="d-flex justify-content-between flex-column text-right"
      >
        <div>
          <b-dropdown
            text="Last Weeks"
            variant="transparent"
            class="chart-dropdown"
            left
            no-caret
            size="sm"
          >
            <b-dropdown-item v-for="day in data.lastDays" :key="day">
              {{ day }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <!-- apex chart -->
        <vue-apex-charts
          type="bar"
          height="200"
          :options="salesBar.chartOptions"
          :series="data.salesBar.series"
        />
      </b-col>
    </b-row>
    <hr />

    <!-- progress bar -->
    <b-row class="avg-sessions pt-50">
      <b-col cols="6" class="mb-2">
        <b-card-text class="mb-50"> Goal: ${{ data.goal }} </b-card-text>
        <b-progress value="50" max="100" height="6px" />
      </b-col>
      <b-col cols="6" class="mb-2">
        <b-card-text class="mb-50">
          Users: {{ kFormatter(data.users) }}
        </b-card-text>
        <b-progress value="60" max="100" height="6px" variant="warning" />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Retention: {{ data.retention }}%
        </b-card-text>
        <b-progress
          value="70"
          max="100"
          height="6px"
          variant="danger"
          class="mt-25"
        />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Duration: {{ data.duration }}yr
        </b-card-text>
        <b-progress
          value="90"
          max="100"
          variant="success"
          height="6px"
          class="mt-25"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BDropdown,
  BDropdownItem,
  BProgress,
  BCardText,
  BCardTitle,
} from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import Ripple from "vue-ripple-directive";
import { $themeColors } from "@themeConfig";
import { kFormatter } from "@core/utils/filter";

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
    BButton,
    BCardText,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BProgress,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      salesBar: {
        chartOptions: {
          chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: "none",
            },
          },
          colors: [
            "#ebf0f7",
            "#ebf0f7",
            $themeColors.primary,
            "#ebf0f7",
            "#ebf0f7",
            "#ebf0f7",
          ],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
              endingShape: "rounded",
            },
          },
          tooltip: {
            x: { show: false },
          },
          xaxis: {
            type: "numeric",
          },
        },
      },
    };
  },
  methods: {
    kFormatter,
  },
};
</script>
