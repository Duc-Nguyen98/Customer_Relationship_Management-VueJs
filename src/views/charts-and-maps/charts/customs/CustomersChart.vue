<template>
    <section id="dashboard-ecommerce">
        <b-row class="match-height">
            <b-col
                    xl="7"
                    md="12"
            >
                <chartjs-bar-chart />
            </b-col>
            <b-col md="12" xl="5">
                <echart-doughnut title="Customer Classification" :series="data.typeServices" />
            </b-col>
        </b-row>

        <b-row class="match-height">
            <!-- Company Line Chart -->
            <b-col lg="12">

            </b-col>
            <!--/ Company Line Chart -->

            <!-- Company Belance Chart -->
            <b-col lg="12">

            </b-col>
            <!-- Company Belance Chart -->
        </b-row>
    </section>
</template>

<script>
    import { BRow, BCol } from 'bootstrap-vue'
    import ChartjsBarChart from '@/views/charts-and-maps/charts/chartjs/ChartjsBarChart'
    import EchartDoughnut from '@/views/charts-and-maps/charts/echart/EchartDoughnut'

    export default {
        components: {
            BRow,
            BCol,
            ChartjsBarChart,
            EchartDoughnut,
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
