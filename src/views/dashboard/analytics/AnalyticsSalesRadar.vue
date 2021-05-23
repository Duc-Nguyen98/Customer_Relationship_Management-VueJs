<template>
    <b-card
            v-if="data"
            no-body
    >
        <b-card-header class="align-items-baseline">
            <div>
                <b-card-title>{{ title }}</b-card-title>
                <b-card-text class="mb-0">
                    Last 6 months
                </b-card-text>
            </div>
            <b-dropdown
                    variant="link"
                    no-caret
                    right
                    class="chart-dropdown"
                    toggle-class="p-0"
            >
                <template #button-content>
                    <feather-icon
                            icon="MoreVerticalIcon"
                            size="18"
                            class="text-body cursor-pointer"
                    />
                </template>
                <b-dropdown-item href="#" @click="$emit('update', {by: 0, type: type})">
                  By Week
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="$emit('update', {by: 1, type: type})">
                    By Month
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="$emit('update', {by: 2, type: type})">
                    By Year
                </b-dropdown-item>
            </b-dropdown>
        </b-card-header>

        <b-card-body>
            <ul class="user-media-list">
                <b-media
                        v-for="data in data"
                        :key="data.idUser"
                        tag="li"
                        no-body
                        class="user-read"
                >

                    <b-media-aside class="media-left mr-50">
                        <b-avatar
                                class="avatar"
                                size="40"
                                variant="primary"
                                :src="api + data.avatar"
                        />
                    </b-media-aside>

                    <b-media-body>
                        <div class="d-flex justify-content-between">
                            <div class="mail-items">
                                <h5 class="mt-1">
                                    {{ data.name }}
                                </h5>
                            </div>
                            <div v-if="type == 'sale'">
                                {{ data.earned ? data.earned.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : '' }}
                            </div>
                            <div v-if="type == 'gra'">
                                {{ data.countGratitude ? data.countGratitude : '' }}
                            </div>
                        </div>
                    </b-media-body>
                </b-media>
            </ul>
<!--            <div class="d-inline-flex align-items-center mr-2">-->
<!--                <feather-icon-->
<!--                        icon="CircleIcon"-->
<!--                        class="text-primary mr-50"-->
<!--                />-->
<!--                <span>Sales</span>-->
<!--            </div>-->
<!--            <div class="d-inline-flex align-items-center">-->
<!--                <feather-icon-->
<!--                        icon="CircleIcon"-->
<!--                        class="text-info mr-50"-->
<!--                />-->
<!--                <span>Visits</span>-->
<!--            </div>-->

            <!-- apex chart -->
<!--            <vue-apex-charts-->
<!--                    type="radar"-->
<!--                    height="275"-->
<!--                    :options="statisticsRadar.chartOptions"-->
<!--                    :series="data.series"-->
<!--            />-->
        </b-card-body>
    </b-card>
</template>

<script>
    import {
        BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BDropdown, BDropdownItem, BMedia, BAvatar, BMediaBody, BMediaAside
    } from 'bootstrap-vue'
    import VueApexCharts from 'vue-apexcharts'
    import { $themeColors } from '@themeConfig'

    export default {
        components: {
            VueApexCharts,
            BDropdown,
            BDropdownItem,
            BCardText,
            BCard,
            BCardHeader,
            BCardTitle,
            BCardBody,
            BMedia, BAvatar,
            BMediaBody,
            BMediaAside,
        },
        props: {
            title: {
                type: String,
                default: () => '',
            },
            type: {
                type: String,
                default: () => 'sale',
            },
            data: {
                type: Array,
                default: () => [],
            },
        },
        data() {
            return {
                api: process.env.VUE_APP_ROOT_API,
                tableColumns: [
                    { key: 'name', label: 'Name', sortable: false },
                    { key: 'earned', label: 'Earned', sortable: false },
                ],
                statisticsRadar: {
                    chartOptions: {
                        chart: {
                            height: 300,
                            type: 'radar',
                            dropShadow: {
                                enabled: true,
                                blur: 8,
                                left: 1,
                                top: 1,
                                opacity: 0.2,
                            },
                            toolbar: {
                                show: false,
                            },
                            offsetY: 5,
                        },
                        stroke: {
                            width: 0,
                        },
                        dataLabels: {
                            background: {
                                foreColor: ['#ebe9f1'],
                            },
                        },
                        legend: { show: false },
                        colors: [$themeColors.primary, $themeColors.info],
                        plotOptions: {
                            radar: {
                                polygons: {
                                    strokeColors: ['#ebe9f1', 'transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
                                    connectorColors: 'transparent',
                                },
                            },
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shade: 'dark',
                                gradientToColors: [$themeColors.primary, $themeColors.info],
                                shadeIntensity: 1,
                                type: 'horizontal',
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100, 100, 100],
                            },
                        },
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        markers: {
                            size: 0,
                        },
                        yaxis: {
                            show: false,
                        },
                        grid: {
                            show: false,
                            padding: {
                                bottom: -27,
                            },
                        },
                    },
                },
            }
        },
    }
</script>
<style scoped>
    .user-media-list {
        padding: 0;
    }

    .user-media-list li.user-read {
        border-bottom: 1px solid #3b4253;
        background-color: #283046;
        padding: 1rem;
    }
</style>