<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col lg="6" md="12">
        <analytics-congratulation :data="data.congratulations" />
      </b-col>
      <b-col lg="3" sm="6">
        <statistic-card-with-area-chart
          v-if="data.subscribersGained"
          icon="UsersIcon"
          :statistic="
            kFormatter(data.subscribersGained.analyticsData.subscribers)
          "
          statistic-title="Subscribers Gained"
          :chart-data="data.subscribersGained.series"
        />
      </b-col>
      <b-col lg="3" sm="6">
        <statistic-card-with-area-chart
          v-if="data.ordersRecevied"
          icon="PackageIcon"
          color="warning"
          :statistic="kFormatter(data.ordersRecevied.analyticsData.orders)"
          statistic-title="Orders Received"
          :chart-data="data.ordersRecevied.series"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="12">
        <analytics-avg-sessions :data="data.avgSessions" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";

import StatisticCardWithAreaChart from "@core/components/statistics-cards/StatisticCardWithAreaChart.vue";
import { kFormatter } from "@core/utils/filter";
import AnalyticsCongratulation from "./AnalyticsCongratulation.vue";
import AnalyticsAvgSessions from "./AnalyticsAvgSessions.vue";

export default {
  components: {
    BRow,
    BCol,
    AnalyticsCongratulation,
    AnalyticsAvgSessions,
    StatisticCardWithAreaChart,
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    // data
    this.$http.get("/analytics/data").then((response) => {
      this.data = response.data;
    });
  },
  methods: {
    kFormatter,
  },
};
</script>
