<template>
    <div>
        <!-- Header: Personal Info -->
        <div class="d-flex">
            <feather-icon icon="UserIcon" size="19"/>
            <h4 class="mb-0 ml-50">Group Voucher Information</h4>
        </div>

        <!-- Form: Personal Info Form -->
        <div class="mt-1">
            <b-tabs>
                <b-tab active>
                    <template #title>
                        <feather-icon icon="EditIcon"/>
                        <span>Information group</span>
                    </template>
                    <b-row>
                        <b-col md="12">
                            <validation-observer ref="information">
                                <b-row>
                                    <b-col md="6">
                                        <b-form-group
                                                label="Title Group"
                                                label-for="v-title"
                                        >
                                            <b-form-input
                                                    disabled
                                                    v-model="GroupDataInfo.title"
                                                    id="v-title"
                                                    placeholder="Enter title group"
                                            />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="6">
                                        <b-form-group
                                                label="Status Group"
                                                label-for="v-password"
                                        >
                                            <v-select
                                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                    :value="GroupDataInfo.status"
                                                    class="w-100"
                                                    :reduce="(val) => val.value"
                                                    @input="(val) => GroupDataInfo.status = val"
                                                    :options="optionsActive"
                                            />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="12">
                                        <b-row>
                                            <b-col
                                                    cols="12"
                                                    class="mb-2"
                                            >
                                                <h5 class="mb-0">
                                                    Range Of Activities
                                                </h5>
                                                <small class="text-muted">Enter Your Range Of Activities.</small>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group
                                                        label="Select Shops"
                                                        label-for="v-landmark"
                                                >
                                                    <v-select
                                                            v-model="GroupDataInfo.scopeApply.listShop"
                                                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                            multiple
                                                            :options="$store.state.app_voucher.allSystem"
                                                            label="title"
                                                    >
                                                        <template v-slot:option="option">
                                                            {{ option.title }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12">
                                        <p>Note</p>
                                    </b-col>
                                    <b-col md="12">
                                        <b-form-group
                                                label-for="v-note"
                                        >
                                            <validation-provider
                                                    #default="{ errors }"
                                                    name="Percent"
                                                    rules="max:1000"
                                            >
                                                <b-form-textarea
                                                        id="textarea-default"
                                                        placeholder="Enter note"
                                                        rows="6.5"
                                                        v-model="GroupDataInfo.note"
                                                />
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </validation-observer>
                        </b-col>
                        <b-col md="12">
                            <!-- Form Actions -->
                            <div class="d-flex float-right mt-2">
                                <b-button
                                        type="button"
                                        variant="outline-secondary"
                                        class="mr-2 text-uppercase"
                                        @click="$router.push({name: 'apps-group-voucher-list'})"
                                >
                                    Cancel
                                </b-button>

                                <b-button variant="primary" @click="validationForm({GroupDataInfo: GroupDataInfo, _id: GroupDataInfo._id})" class="text-uppercase">
                                    Save Changes
                                </b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab :disabled="GroupDataInfo.status == 0">
                    <template #title>
                    <span>
                      <feather-icon icon="BookmarkIcon"/>
                      <span @click="viewVouchers()">Voucher list</span>
                    </span>
                    </template>
                    <VoucherList :_id="GroupDataInfo._id" :idGroup="GroupDataInfo.idGroupVoucher"/>
                </b-tab>
                <b-tab v-if="GroupDataInfo">
                    <template #title>
                        <feather-icon icon="DivideCircleIcon"/>
                        <span>Use history</span>
                    </template>

                    <VoucherListHistory :_id="GroupDataInfo.idGroupVoucher"/>
                </b-tab>
                <b-tab v-if="GroupDataInfo">
                    <template #title>
                        <feather-icon icon="TrashIcon"/>
                        <span>Vouchers Trash</span>
                    </template>

                    <VoucherListDel :_id="GroupDataInfo.idGroupVoucher"/>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
    import {
        BFormSelect,
        BRow,
        BCol,
        BForm,
        BFormTextarea,
        BFormGroup,
        BFormInput,
        BFormRadioGroup,
        BFormCheckboxGroup,
        BButton,
        BFormValidFeedback,
        BFormInvalidFeedback,
        BFormDatepicker,
        BTabs,
        BTab, BInputGroup, BInputGroupAppend, BFormRadio, BFormSelectOption,
    } from "bootstrap-vue";
    import flatPickr from "vue-flatpickr-component";
    import {ref} from "@vue/composition-api";
    import vSelect from "vue-select";
    import Ripple from "vue-ripple-directive";
    import VoucherList from "../voucher-list/VoucherList";
    import VoucherListHistory from "../voucher-list/VoucherListHistory";
    import VoucherListDel from "../voucher-list/VoucherListDel";
    import {ValidationObserver, ValidationProvider} from "vee-validate";
    import store from "@/store";
    import {
        required,
        email,
        confirmed,
        url,
        between,
        alpha,
        integer,
        password,
        min,
        max,
        digits,
        alphaDash,
        length,
    } from "@validations";

    // Notification
    import { useToast } from 'vue-toastification/composition'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

    export default {
        components: {
            VoucherList,
            VoucherListHistory,
            VoucherListDel,
            ValidationProvider, ValidationObserver,
            BTabs,
            BTab,
            BFormSelect,
            BRow,
            BFormTextarea,
            BCol,
            BForm,
            BFormGroup,
            flatPickr,
            BFormInput,
            vSelect,
            BFormRadio,
            BFormRadioGroup,
            BFormCheckboxGroup,
            BButton,
            BFormValidFeedback,
            BFormInvalidFeedback,
            BFormDatepicker,
            BInputGroup,
            BInputGroupAppend,
            BFormSelectOption,
        },
        directives: {
            Ripple,
        },
        props: {
            groupinfo: {
                required: true,
                type: Object,
            },
        },
        setup({groupinfo}) {

            const toast = useToast();

            const GroupDataInfo = ref(groupinfo);
            console.log(GroupDataInfo.value)
            const classifiedOptions = [
                {label: "Trade Voucher", value: 0},
                {label: "Gift Voucher", value: 1},
            ]

            const percent = null
            const discount = ref(1)
            const chooseE = ref(1)
            const system = ref(0)

            const optionsActive = [
                {label: "Inactive", value: 0},
                {label: "Active", value: 1},
            ]

            const typeDateOptions = [
                {text: "Day", value: 0},
                {text: "Month", value: 1},
            ]

            const sysOptions = [
                {name: "All Shops", item: 0},
                {name: "Shops", item: 1},
            ]

            const cusOptions = [
                {name: "All Groups Customer", item: 0},
                {name: "Groups Customer", item: 1},
            ]

            const chooseEffect = () => {
                chooseE.value = 0
                this.date_number = null
                this.typeDate = null
            }

            const chooseExpiry = () => {
                this.date_number = 1
                chooseE.value = 1
                this.from_date = null
                this.to_date = null
            }

            const dateEffDisabled = (ymd, date) => {
                // Disable weekends (Sunday = `0`, Saturday = `6`) and
                // disable days that fall on the 13th of the month
                var today = new Date();

                const day = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()

                // Return `true` if the date should be disabled
                return date < today.setDate(today.getDate() - 1)
            }

            const dateExpDisabled = (ymd, date) => {
                // Disable weekends (Sunday = `0`, Saturday = `6`) and
                // disable days that fall on the 13th of the month
                var today = new Date();

                const day = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()
                // Return `true` if the date should be disabled
                return date < today
            }

            const viewVouchers = () => {

            }

          const alert = (variant, message) => {
            toast({
              component: ToastificationContent,
              props: {
                title: "Notification",
                icon: "BellIcon",
                text: "👋 " + message,
                variant,
              },
            });
          }

            const selectedSys = ref([])
            const selectedCus = ref([])

            const chooseRange = () => {
                if (store.state.app_voucher.allSystem.length == 0) {
                    store.dispatch('app_voucher/fetchSystems')
                        .then(response => {
                            if (response.data.success) {
                              let allSystem = []
                              response.data.listShop.map(obj => {
                                allSystem.push({
                                  value: obj.idShop,
                                  title: obj.name,
                                })
                              })
                              store.commit('app_voucher/updateSystems', allSystem)
                            } else {
                                alert("danger", "Get list systems failed.")
                            }
                        })
                        .catch((err) => {
                            toast({
                                component: ToastificationContent,
                                props: {
                                    title: 'Error fetching services list',
                                    icon: 'AlertTriangleIcon',
                                    variant: 'danger',
                                },
                            })
                        })
                }

                if (store.state.app_voucher.allCustomers.length == 0) {
                    store.dispatch('app_voucher/fetchCustomers')
                        .then(response => {
                            if (response.data.success) {
                                let allCustomers = []
                                response.data.listGroupCustomer.map(obj => {
                                    allCustomers.push({
                                        value: obj.idGroupCustomer,
                                        title: obj.title,
                                    })
                                })
                                store.commit('app_voucher/updateCustomers', allCustomers)
                            } else {
                                alert("danger", "Get list customers failed.")
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            toast({
                                component: ToastificationContent,
                                props: {
                                    title: 'Error fetching services list',
                                    icon: 'AlertTriangleIcon',
                                    variant: 'danger',
                                },
                            })
                        })
                }
            }

            //Format money
            // const Mmoney = ref(GroupDataInfo.value.discount.PercentAMaximum.maximumMoney)
            // const blurMoney = () => {
            //     GroupDataInfo.value.discount.PercentAMaximum.maximumMoney = Mmoney.value
            //     let val = (Mmoney.value/1).toFixed(2).replace('.', ',')
            //     Mmoney.value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // }
            // blurMoney()

            //Format money
            // const reduction = ref(GroupDataInfo.value.discount.reduction.money)
            // const blurReduction = () => {
            //     GroupDataInfo.value.discount.reduction.money = reduction.value
            //     let val = (reduction.value/1).toFixed(2).replace('.', ',')
            //     reduction.value = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // }
            // blurReduction()

            // if (groupinfo.discount.reduction.money == null) {
            //     discount.value = 0
            // }
            //
            // if (groupinfo.timeLine.expiry.number == null && groupinfo.timeLine.expiry.type == null) {
            //     chooseE.value = 0
            // }

            return {
                chooseEffect,
                chooseExpiry,
                dateEffDisabled,
                dateExpDisabled,
                discount,
                chooseE,
                percent,
                classifiedOptions,
                typeDateOptions,
                cusOptions,
                sysOptions,
                optionsActive,
                GroupDataInfo,
                selectedSys,
                selectedCus,
                system,
                chooseRange,
                viewVouchers,
            };
        },
        methods: {
            alert(variant, message) {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: "Notification",
                        icon: "BellIcon",
                        text: "👋 " + message,
                        variant,
                    },
                });
            },
            validationForm(GroupDataInfo) {
                this.locale = this.locale === "en" ? "vi" : "en"
                this.$refs.information.validate().then((success) => {
                    if(success) {
                        store.dispatch('app_voucher/updateVoucherGroup', GroupDataInfo)
                            .then(response => {
                                if (response.data.success) {
                                    this.alert("success", "Update group voucher successfully.")
                                } else {
                                    this.alert("danger", "Update group voucher failed.")
                                }
                            })
                            .catch((err) => {
                                this.$toast({
                                    component: ToastificationContent,
                                    props: {
                                        title: 'Error fetching services list',
                                        icon: 'AlertTriangleIcon',
                                        variant: 'danger',
                                    },
                                })
                            })
                    }
                })
            }
        },
    };
</script>

<style lang="scss">
    @import "@core/scss/vue/libs/vue-flatpicker.scss";
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
