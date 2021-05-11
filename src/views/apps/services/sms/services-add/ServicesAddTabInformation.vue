<template>
    <div>
        <form-wizard
                ref="wizard"
                color="#7367F0"
                :title="null"
                :subtitle="null"
                layout="vertical"
                finish-button-text="Submit"
                back-button-text="Previous"
                class="wizard-vertical mb-3"
        >
            <!-- Information User tab -->
            <tab-content title="Information User">
                <validation-observer ref="information_user">
                    <b-form class="mt-1">
                        <!-- Header: Personal Info -->
                        <div class="d-flex mb-2">
                            <feather-icon icon="UserIcon" size="19"/>
                            <h4 class="mb-0 ml-50">User Information</h4>
                        </div>
                        <b-row>
                            <!-- Field: Name  -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group label="Title" label-for="Title">
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Title"
                                            rules="required"
                                    >
                                        <b-form-input
                                                id="title"
                                                v-model="smsData.titleServices"
                                                :state="errors.length > 0 ? false : null"
                                                placeholder="Title"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>

                            <!-- Customer -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group>
                                    <label>Customer</label>
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Customer"
                                            rules="required"
                                    >
                                        <v-select
                                                :state="errors.length > 0 ? false : null"
                                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                v-model="smsData.customer"
                                                :options="customers"
                                                class="w-100"
                                                @input="changeCustomer($event)"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>

                            <!-- Field: Name  -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group label="Telephone" label-for="Telephone">
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Telephone"
                                            rules="required"
                                    >
                                        <b-form-input
                                                :disabled="true"
                                                id="telephone"
                                                v-model="smsData.telephone"
                                                placeholder="Telephone"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>

                            <!-- Field: Name  -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group label="Email" label-for="Email">
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Email"
                                            rules="required"
                                    >
                                        <b-form-input
                                                :disabled="true"
                                                id="email"
                                                v-model="smsData.email"
                                                placeholder="Email"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>

                            <!-- Type -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group label="Services" label-for="Services">
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Services"
                                            rules="required"
                                    >
                                        <v-select
                                                :state="errors.length > 0 ? false : null"
                                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                                :options="servicesOptions"
                                                v-model="smsData.typeServices"
                                                class="w-100"
                                                :reduce="(val) => val.value"
                                                @input="(val) => smsData.typeServices = val"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>

                            <!-- Date -->
                            <b-col cols="12" md="6" lg="4">
                                <b-form-group label="Date automatically sent" label-for="Date automatically sent">
                                    <validation-provider
                                            #default="{ errors }"
                                            name="Date"
                                            rules="required"
                                    >
                                        <flat-pickr
                                                v-model="smsData.dateAuto"
                                                class="form-control mb-2"
                                                :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
                                                :date-disabled-fn="dateEffDisabled" :locale="locale"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-form>
                </validation-observer>
            </tab-content>
            <tab-content title="Information Service">
                <validation-observer ref="validateStep2">
                    <b-row>
                        <!-- Groups voucher -->
                        <b-col cols="12" md="6" lg="6">
                            <b-form-group label="Groups voucher" label-for="Groups voucher">
                                <validation-provider
                                        #default="{ errors }"
                                        name="Groups voucher"
                                        rules="required"
                                >
                                    <v-select
                                            :state="errors.length > 0 ? false : null"
                                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                            :options="groupOptions"
                                            class="w-100"
                                            @input="chooseGroup($event)"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <!-- Vouchers -->
                        <b-col cols="12" md="6" lg="6">
                            <b-form-group label="Vouchers" label-for="Vouchers">
                                <validation-provider
                                        #default="{ errors }"
                                        name="Voucher"
                                        rules="required"
                                >
                                    <v-select
                                            :state="errors.length > 0 ? false : null"
                                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                            :options="voucherOptions"
                                            class="w-100"
                                            v-model="smsData.voucher"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>


                        <!-- Field: Discount  -->
                        <b-col cols="12" md="6" lg="6" v-if="smsData.voucher.discount.reduction.money != null">
                            <b-form-group label="Discount" label-for="Discount">
                                <validation-provider
                                        #default="{ errors }"
                                        name="Discount"
                                        rules=""
                                >
                                    <p> {{ fmMoney(smsData.voucher.discount.reduction.money) }}đ</p>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" md="6" lg="3"
                               v-if="smsData.voucher.discount.PercentAMaximum.maximumMoney != null">
                            <b-form-group label="Discount" label-for="Discount">
                                <validation-provider
                                        #default="{ errors }"
                                        name="Discount"
                                        rules=""
                                >
                                    <p>{{ fmMoney(smsData.voucher.discount.PercentAMaximum.maximumMoney) }}đ</p>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" md="6" lg="3" v-if="smsData.voucher.discount.PercentAMaximum.percent != null">
                            <b-form-group label="Discount" label-for="Discount">
                                <validation-provider
                                        #default="{ errors }"
                                        name="Discount"
                                        rules=""
                                >
                                    <p> {{ smsData.voucher.discount.PercentAMaximum.percent }}%</p>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <!-- Field: From date  -->
                        <b-col cols="12" md="6" lg="3" v-if="smsData.voucher.timeLine.release != null">
                            <b-form-group label="From Date" label-for="From Date">
                                <validation-provider
                                        #default="{ errors }"
                                        name="From Date"
                                        rules=""
                                >
                                    <b-form-datepicker :disabled="true"
                                                       id="from_date" v-model="smsData.voucher.timeLine.release"
                                                       class="mb-2"></b-form-datepicker>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                        <!-- Field: To date  -->
                        <b-col cols="12" md="6" lg="3" v-if="smsData.voucher.timeLine.expiration != null">
                            <b-form-group label="To Date" label-for="To Date">
                                <validation-provider
                                        #default="{ errors }"
                                        name="To Date"
                                        rules=""
                                >
                                    <b-form-datepicker :disabled="true" id="to_date"
                                                       v-model="smsData.voucher.timeLine.expiration"
                                                       class="mb-2"></b-form-datepicker>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>

                      <b-col cols="12" md="12" lg="12">
                        <b-form-group label="List Shops" label-for="List Shops">
                          <validation-provider
                                  #default="{ errors }"
                                  name="List Shops"
                                  rules=""
                          >
                            <b-list-group  v-for="data in smsData.listShops" >
                              <b-list-group-item class="d-flex" :key="data.value">
                                <span>{{ data.title }}.</span>
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                        <!-- Header: Personal Note -->
                        <b-col cols="12" md="12" lg="12">
                            <div class="d-flex my-2">
                                <feather-icon icon="MapPinIcon" size="19"/>
                                <h4 class="mb-0 ml-50">Content</h4>
                            </div>
                            <b-row>
                                <!--  Note -->
                                <b-col cols="12" md="12" lg="12">
                                    <b-form-group label="Content Information" label-for="Content Information">
                                        <quill-editor
                                                id="textarea-default"
                                                v-model="smsData.content"
                                        />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </validation-observer>
            </tab-content>

            <template slot="footer" scope="props">
                <div class=wizard-footer-left>
                    <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">
                        Previous
                    </wizard-button>
                </div>
                <div class="wizard-footer-right">
                    <wizard-button v-if="!props.isLastStep" @click.native="nextService(props)"
                                   class="wizard-footer-right" :style="props.fillButtonStyle">Next
                    </wizard-button>

                    <wizard-button v-else @click.native="formSubmitted" class="wizard-footer-right finish-button"
                                   :style="props.fillButtonStyle">{{props.isLastStep ? 'Save' : 'Next'}}
                    </wizard-button>

                    <wizard-button
                            class="mr-2 text-uppercase btn-outline-primary wizard-footer-right"
                            type="button"
                            :to="{name: 'apps-group-voucher-list'}"
                    >
                        Cancel
                    </wizard-button>
                </div>

            </template>
        </form-wizard>
    </div>
</template>

<script>
    import {FormWizard, TabContent, WizardButton} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import {ValidationProvider, ValidationObserver} from 'vee-validate'
    import {onUnmounted, ref} from '@vue/composition-api'
    import vSelect from 'vue-select'
    import faker from 'faker'
    import flatPickr from 'vue-flatpickr-component'
    import {quillEditor} from 'vue-quill-editor'
    import moment from 'moment'

    import {
        BFormTextarea,
        BFormDatepicker,
        BFormSelect,
        BFormRadioGroup,
        BFormInput,
        BFormGroup,
        BListGroup,
        BListGroupItem,
        BForm,
        BRow,
        BCol,
        BButton,
    } from "bootstrap-vue";
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
    import store from "@/store";
    import userStoreModule from "@/views/apps/customers/userStoreModule";

    // Notification
    import {useToast} from 'vue-toastification/composition'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

    export default {
        components: {
            quillEditor,
            flatPickr,
            FormWizard,
            WizardButton,
            TabContent,
            BFormTextarea,
            BFormDatepicker,
            BFormSelect,
            BFormDatepicker,
            BFormRadioGroup,
            ValidationProvider,
            ValidationObserver,
            BListGroup,
            BListGroupItem,
            BFormInput,
            BFormGroup,
            BForm,
            BRow,
            BCol,
            BButton,
            vSelect,
        },
        setup() {

            const api = process.env.VUE_APP_ROOT_API

            // Use toast
            const toast = useToast()
            const USER_APP_STORE_MODULE_NAME = "app-customers"

            // Register module
            if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
                store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

            // UnRegister on leave
            onUnmounted(() => {
                if (store.hasModule(USER_APP_STORE_MODULE_NAME))
                    store.unregisterModule(USER_APP_STORE_MODULE_NAME);
            })
            const smsData = ref({
                customer: null,
                telephone: "",
                email: "",
                title: "",
                dateAuto: "",
                content: null,
                group: "",
                voucher: {
                    discount: {
                        PercentAMaximum: {
                            percent: null,
                            maximumMoney: null,
                        },
                        reduction: {
                            money: null,
                        },
                    },
                  timeLine: {
                    release: null,
                    expiration: null,
                  },
                },
                listShops: [],
                titleServices: null,
                idGroupVoucher: null,
                typeServices: null,
            })

            const customers = ref([
                {
                    telephone: null,
                    email: null,
                    value: null,
                    label: 'Choose a customer'
                }
            ]);

            const groupOptions = ref([])
            const voucherOptions = ref([])

            store.dispatch('app-customers/fetchUsers', {}).then(response => {
                customers.value = [];
                const {data} = response.data
                data.map(obj => {
                    customers.value.push({
                        telephone: obj.telephone,
                        email: obj.email,
                        value: obj.idCustomer,
                        label: '@CS' + obj.idCustomer + '-' + obj.name
                    })
                })
            })
                .catch(() => {
                    toast({
                        component: ToastificationContent,
                        props: {
                            title: 'Error fetching users list',
                            icon: 'AlertTriangleIcon',
                            variant: 'danger',
                        },
                    })
                })

            const servicesOptions = [
                {label: "Choose a service", value: null},
                {label: "SMS", value: 0},
                {label: "Email", value: 1},
                {label: "SMS & Email", value: 2},
            ]

            const validation = {
                required,
                confirmed,
                password,
                email,
                min,
                max,
                integer,
                url,
                alpha,
                between,
                digits,
                length,
                alphaDash,
            };

            return {
                api,
                customers,
                smsData,
                validation,
                groupOptions,
                voucherOptions,
                servicesOptions,
            };
        },

        methods: {
            fmMoney(val) {
              let money = (Number(val) / 1).toFixed(0).replace('.', ',')
              return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            dateEffDisabled(ymd, date) {
                // Disable weekends (Sunday = `0`, Saturday = `6`) and
                // disable days that fall on the 13th of the month
                var today = new Date();

                const day = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()

                // Return `true` if the date should be disabled
                return date < today.setDate(today.getDate() - 1)
            },

            changeCustomer(data) {
                this.smsData.telephone = data.telephone
                this.smsData.email = data.email
            },

            chooseGroup(data) {
                this.smsData.listShops = data.listShops
                this.smsData.idGroupVoucher = data.value
                store.dispatch('app-services-sms/fetchVouchers', {idGroupVoucher: data.value})
                    .then(response => {
                        if (response.data.success) {
                            const Vouchers = []
                            response.data.voucherItems.map(obj => {
                                Vouchers.push({
                                    label: obj.voucherCode,
                                    value: obj.idVoucher,
                                    discount: obj.discount,
                                    timeLine: obj.timeLine,
                                })
                            })
                            this.voucherOptions = Vouchers
                        }
                    })
                    .catch((err) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Fetch vouchers error',
                                icon: 'AlertTriangleIcon',
                                variant: 'danger',
                            },
                        })
                    })
            },

            nextService(props) {
                this.locale = this.locale === "en" ? "vi" : "en"
                this.$refs.information_user.validate().then((success) => {
                    if (success) {
                        store.dispatch('app-services-sms/fetchVoucherGroup')
                            .then(response => {
                                if (response.data.success) {
                                    const groupVoucher = []
                                    response.data.groupVoucher.map(obj => {
                                        groupVoucher.push({
                                            label: obj.title,
                                            value: obj.idGroupVoucher,
                                            listShops: obj.listShop,
                                        })
                                    })
                                    this.groupOptions = groupVoucher
                                    console.log(response.data.groupVoucher)
                                }
                            })
                            .catch((err) => {
                                this.$toast({
                                    component: ToastificationContent,
                                    props: {
                                        title: 'Fetch groups voucher error',
                                        icon: 'AlertTriangleIcon',
                                        variant: 'danger',
                                    },
                                })
                            })

                        props.nextTab();
                    }
                })
            },

            validationForm() {
                this.locale = this.locale === "en" ? "vi" : "en";

                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        // eslint-disable-next-line
                        this.sendSMS();
                    }
                });
            },

            validateStep1() {
                this.locale = this.locale === "en" ? "vi" : "en"
                return this.$refs.information.validate()
            },

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

            formSubmitted() {
              const smsData = {
                idCustomer: this.smsData.customer.value,
                typeServices: this.smsData.typeServices,
                dateAutomaticallySent: moment(this.smsData.dateAuto).format("X"),
                titleServices: this.smsData.titleServices,
                idGroupVoucher: this.smsData.idGroupVoucher,
                voucherCode: this.smsData.voucher.label,
                content: this.smsData.content,
              }

                store.dispatch('app-services-sms/addService', smsData)
                    .then(response => {
                        if (response.data.success) {
                            this.alert("success", `Add service successfully. ${response.data.details}`)
                            this.$router.push({name: 'apps-services-list-sms'})
                        } else {
                            this.alert("danger", "Add service failed.")
                        }
                    })
                    .catch((err) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Error add service',
                                icon: 'AlertTriangleIcon',
                                variant: 'danger',
                            },
                        })
                    })
            },

            sendSMS() {
                console.log(this.userData)
                // store.dispatch('app-services-sms/sendSMS', this.userData)
                //         .then(response => {
                //           if (response.data.success) {
                //             this.alert("success", "Send sms successfully.")
                //             this.$router.push({name: 'apps-customers-list'});
                //           } else {
                //             this.alert("danger", "Send sms failed.")
                //           }
                //         })
                //         .catch(() => {
                //           this.toast({
                //             component: ToastificationContent,
                //             props: {
                //               title: 'Error send sms',
                //               icon: 'AlertTriangleIcon',
                //               variant: 'danger',
                //             },
                //           });
                //         });
            }
        },
    };
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-wizard.scss';
    @import "@core/scss/vue/libs/vue-select.scss";
    @import '@core/scss/vue/libs/vue-flatpicker.scss';
    @import '@core/scss/vue/libs/quill.scss';
</style>
<style>
    .ql-editor {
        height: 200px !important;
    }
</style>