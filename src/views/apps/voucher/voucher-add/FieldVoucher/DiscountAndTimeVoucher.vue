<template>
    <div>
        <validation-observer ref="validate">
        <b-row>
            <b-col md="12 mb-2">
                <!-- Retention Period tab -->
                <b-row>
                    <b-col md="12">
                        <b-form-group
                                label="Classify"
                                label-for="v-classified"
                        >
                            <validation-provider
                                    #default="{ errors }"
                                    name="Classify"
                                    rules="required"
                            >
                                <v-select
                                        id="v-classified"
                                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                        :value="data.classified"
                                        :state="errors.length > 0 ? false : null"
                                        :options="classifiedOptions"
                                        :reduce="(val) => val.value"
                                        @input="(val) => data.classified = val"
                                        class="w-100"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col
                            cols="12"
                            class="mb-2"
                    >
                        <h5 class="mb-0">
                            Retention Period
                        </h5>
                        <small class="text-muted">Enter Your Retention Period.</small>
                    </b-col>
                    <b-col md="12">
                        <b-row>
                                <b-col md="6">
                                    <b-form-group
                                            label="From date"
                                            label-for="v-last-name"
                                    >
                                        <validation-provider
                                                #default="{ errors }"
                                                name="From date"
                                                rules="required"
                                        >
                                            <b-form-datepicker :state="errors.length > 0 && chooseE==0 ? false : null"
                                                               v-model="data.timeLine.release"
                                                               placeholder="From Date" :disabled="chooseE!=0"
                                                               :date-disabled-fn="dateEffDisabled" locale="en">
                                            </b-form-datepicker>
                                            <small v-if="chooseE==0" class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col md="6">
                                    <b-form-group
                                            label="To date"
                                            label-for="v-last-name"
                                    >
                                        <validation-provider
                                                #default="{ errors }"
                                                name="To date"
                                                rules="required"
                                        >
                                            <b-form-datepicker :state="errors.length > 0 && chooseE==0 ? false : null"
                                                               v-model="data.timeLine.expiration"
                                                               placeholder="To Date" :disabled="chooseE!=0"
                                                               :date-disabled-fn="dateExpDisabled" locale="en">
                                            </b-form-datepicker>
                                            <small v-if="chooseE==0" class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col
                    cols="12"
                    class="mb-2"
            >
                <h5 class="mb-0">
                    Discount
                </h5>
                <small class="text-muted">Enter Your Discount.</small>
            </b-col>
            <b-col md="6">
                <b-form-group
                        label-for="v-discount"
                >
                    <b-col md="12">
                        <b-form-group>
                            <b-form-radio v-model="discount" :autofocus="true" :value="0" name="discount">Percent And
                                Maximum
                            </b-form-radio>
                        </b-form-group>
                    </b-col>
                    <b-col md="12">
                        <b-form-group>
                            <label for="Percent">Percent</label>
                            <validation-provider
                                    #default="{ errors }"
                                    name="Percent"
                                    rules="required|between:5,95|integer"
                            >
                                <b-input-group>
                                    <b-form-input
                                            v-model="data.discount.PercentAMaximum.percent"
                                            :state="errors.length > 0 && discount != 1? false : null"
                                            id="Percent"
                                            type="number"
                                            placeholder="Your Percent"
                                            :disabled="discount == 1"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                                icon="PercentIcon"
                                                class="cursor-pointer"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small v-if="discount != 1" class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>

                        <b-form-group>
                            <label for="Mmoney">Maximum money</label>
                            <validation-provider
                                    #default="{ errors }"
                                    name="Maximum money"
                                    rules="required"
                            >
                                <b-input-group>
                                    <b-form-input
                                            :disabled="discount == 1"
                                            v-model="Mmoney"
                                            @blur="blurMoney"
                                            @focus="Mmoney = data.discount.PercentAMaximum.maximumMoney"
                                            :state="errors.length > 0 && discount != 1? false : null"
                                            id="Mmoney"
                                            placeholder="Your maximum money"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                                icon="DollarSignIcon"
                                                class="cursor-pointer"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small v-if="discount != 1" class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group
                        label-for="v-reduction-money"
                >
                    <b-col md="12">
                        <b-form-group
                                label-for="v-reduction-money"
                        >
                            <b-form-radio v-model="discount" id="v-reduction-money" name="discount" :value="1">Reduction
                                Money
                            </b-form-radio>
                        </b-form-group>
                    </b-col>
                    <b-col md="12">
                        <b-form-group>
                            <label for="Reduction">Reduction</label>
                            <validation-provider
                                    #default="{ errors }"
                                    name="Maximum money"
                                    rules="required"
                            >
                                <b-input-group>
                                    <b-form-input
                                            :disabled="discount == 0"
                                            id="Reduction"
                                            v-model="reduction"
                                            :state="errors.length > 0 && discount != 0? false : null"
                                            @blur="blurReduction"
                                            @focus="reduction = data.discount.reduction.money"
                                            placeholder="Your Reduction"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                                icon="DollarSignIcon"
                                                class="cursor-pointer"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small v-if="discount != 0" class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="12">
                <b-row class="d-flex float-right mt-2">
                    <b-col md="12">
                        <b-button
                                variant="outline-secondary"
                                class="mr-2 text-uppercase"
                                type="button"
                                @click="hideModal"
                        >
                            Cancel
                        </b-button>
                        <b-button
                                class="text-uppercase"
                                variant="primary"
                                type="button"
                                @click="emitData"
                        >
                            Save
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        </validation-observer>
    </div>
</template>


<script>
    import {
        BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BFormRadio, BInputGroup, BInputGroupAppend,
        BFormDatepicker,
    } from 'bootstrap-vue'
    import vSelect from 'vue-select'
    import Ripple from 'vue-ripple-directive'
    import {ValidationProvider, ValidationObserver} from 'vee-validate'

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
    } from '@validations'
    import ToastificationContent from "@core/components/toastification/ToastificationContent";

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
    }

    export default {
        components: {
            BForm,
            BRow,
            BCol,
            BButton,
            BFormGroup,
            BFormInput,
            BFormRadio,
            BInputGroup,
            BInputGroupAppend,
            BFormDatepicker,
            vSelect,
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        props: {},
        data() {
            return {
                discount: 0,
                Mmoney: '1.000',
                reduction: 0,
                chooseE: 0,
                data: {
                    discount: {
                        PercentAMaximum: {
                            percent: 5,
                            maximumMoney: 1000,
                        },
                        reduction: {
                            money: null,
                        },
                    },
                    timeLine: {
                        release: null,
                        expiration: null,
                    },
                    classified: 0,
                },
                typeDate: null,
                typeDateOptions: [
                    {text: "Day", value: 0},
                    {text: "Month", value: 1},
                ],

                classifiedOptions: [
                    { value: 0, label: 'Trade Voucher' },
                    { value: 1, label: 'Gift Voucher' },
                ],
                nextTodoId: 2,
            }
        },
        created() {

        },
        methods: {
            hideModal() {
                this.$bvModal.hide('modal-lg');
                this.$bvModal.hide('modal-lg2');
            },
            emitData() {
                this.locale = this.locale === "en" ? "vi" : "en"
                this.$refs.validate.validate().then((success) => {
                    if (success) {
                        this.data.discount.PercentAMaximum.percent = Number(this.data.discount.PercentAMaximum.percent)
                        this.$emit('update', this.data)
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Notification",
                                icon: "BellIcon",
                                text: "👋 Saved setting, You can add vouchers",
                                variant: 'success',
                            },
                        });
                    }
                })
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

            dateExpDisabled(ymd, date) {
                // Disable weekends (Sunday = `0`, Saturday = `6`) and
                // disable days that fall on the 13th of the month
                var today = new Date();

                const day = date.getDate()
                const month = date.getMonth()
                const year = date.getFullYear()
                // Return `true` if the date should be disabled
                return date < today
            },
            blurMoney() {
                this.data.discount.PercentAMaximum.maximumMoney = Number(this.Mmoney)
                let val = (this.Mmoney / 1).toFixed(0).replace('.', ',')
                this.Mmoney = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            blurReduction() {
                this.data.discount.reduction.money = Number(this.reduction)
                let val = (this.reduction / 1).toFixed(0).replace('.', ',')
                this.reduction = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
        },
        watch: {
            discount(val) {
                if (val == 0) {
                    this.Mmoney = '1.000'
                    this.data.discount.PercentAMaximum.maximumMoney = 1000
                    this.data.discount.PercentAMaximum.percent = 5
                    this.reduction = 0
                    this.data.discount.reduction.money = null
                } else {
                    this.reduction = '1.000'
                    this.data.discount.PercentAMaximum.percent = null
                    this.data.discount.PercentAMaximum.maximumMoney = null
                    this.Mmoney = 0
                }
            },
            chooseE(val) {
                if (val == 0) {
                    this.data.timeLine.expiry.number = null
                    this.data.timeLine.expiry.type = null
                } else {
                    this.data.timeLine.expiry.number = 1
                    this.data.timeLine.expiry.type = 1
                    this.data.timeLine.effective.release = null
                    this.data.timeLine.effective.expiration = null
                }
            }
        }
    }
</script>