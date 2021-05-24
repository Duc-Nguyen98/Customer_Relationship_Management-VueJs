<template>
    <section id="dashboard-ecommerce">
        <b-row class="match-height">
            <b-col
                    xl="12"
                    md="12"
            >
                <chartjs-horizontal-bar-chart :config="config" title="Customers Used Service" />
            </b-col>
        </b-row>

        <b-row class="match-height">
            <b-col lg="12">
                <b-row class="match-height">
                    <!-- Bar Chart - Doughnut -->
                    <b-col md="6">
                        <echart-doughnut title="Type Services" :series="data.typeServices" />
                    </b-col>
                    <!--/ Bar Chart - Doughnut -->
                    <b-col md="6">
                        <echart-doughnut title="Message Services" :series="data.messageServices" />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row class="match-height">
            <!-- Company Line Chart -->
            <b-col lg="12">
                <apex-line-area-chart title="Voucher Release" :data="data.voucherRelease" />
            </b-col>
            <!--/ Company Line Chart -->

            <!-- Company Belance Chart -->
            <b-col lg="12">
                <apex-line-chart title="Service Revenue" :data="data.serviceRevenue" />
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
    import axios from "axios";
    import ToastificationContent from "@core/components/toastification/ToastificationContent";
    import { $themeColors } from '@themeConfig'

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
                data: {
                    typeServices: [],
                    messageServices: [],
                    voucherRelease: {},
                    serviceRevenue: {
                        series: [],
                        chartOptions: {}
                    },
                },
                config: {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            }
        },
        created() {
            // data
            Promise.all([this.typeServices(), this.messageServices(), this.voucherRelease(), this.serviceRevenue()])
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
        methods: {
            async typeServices() {
                const response = await axios.get(`${process.env.VUE_APP_ROOT_API}statistics/typeServices`, this.config)
                response.data.data.typeServices = [
                    {
                        name: 'Type Services',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ["50%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: response.data.data.typeServices.data
                    },
                ]
                return response.data
            },
            async messageServices() {
                const response = await axios.get(`${process.env.VUE_APP_ROOT_API}statistics/messageServices`, this.config)
                response.data.data.messageServices = [
                    {
                        name: 'Message Services',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ["50%", "50%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        data: response.data.data.messageServices.data
                    },
                ]
                return response.data
            },
            async voucherRelease() {
                const response = await axios.get(`${process.env.VUE_APP_ROOT_API}statistics/voucherRelease`, this.config)
                response.data.data.voucherRelease.chartOptions = {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        show: false,
                            curve: 'straight',
                    },
                    legend: {
                        show: true,
                            position: 'top',
                            horizontalAlign: 'left',
                            fontSize: '14px',
                            fontFamily: 'Montserrat',
                    },
                    grid: {
                        xaxis: {
                            lines: {
                                show: true,
                            },
                        },
                    },
                    xaxis: {
                        categories: response.data.data.voucherRelease.labels,
                    },
                    yaxis: {
                        // opposite: isRtl
                    },
                    fill: {
                        opacity: 1,
                            type: 'solid',
                    },
                    tooltip: {
                        shared: false,
                    },
                    colors: ['#a4f8cd', '#60f2ca', '#2bdac7'],
                }
                return response.data
            },
            async serviceRevenue() {
                const response = await axios.get(`${process.env.VUE_APP_ROOT_API}statistics/serviceRevenue`, this.config)
                response.data.data.serviceRevenue.chartOptions = {
                    chart: {
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    markers: {
                        strokeWidth: 7,
                            strokeOpacity: 1,
                        strokeColors: [$themeColors.light],
                        colors: [$themeColors.warning],
                    },
                    colors: [$themeColors.warning],
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'straight',
                    },
                    grid: {
                        xaxis: {
                            lines: {
                                show: true,
                            },
                        },
                    },
                    xaxis: {
                        categories: response.data.data.serviceRevenue.labels.categories,
                    },
                    yaxis: {
                        // opposite: isRtl,
                    },
                }
                return response.data
            },
        },
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/pages/dashboard-ecommerce.scss';
    @import '@core/scss/vue/libs/chart-apex.scss';
</style>
