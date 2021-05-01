<template>
  <div>
      <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      layout="vertical"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="wizard-vertical mb-3"
      @on-complete="formSubmitted"
    >

      <!-- Information Group tab -->
      <tab-content title="Information Group" :before-change="validateStep1">
        <validation-observer ref="step1">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
             Information Group
            </h5>
            <small class="text-muted">
              Enter Your Information Group.
            </small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Title Group"
              label-for="v-title"
            >
              <validation-provider
                      #default="{ errors }"
                      name="Title"
                      rules="required"
              >
                <b-form-input
                        v-model="data.title"
                        :state="errors.length > 0 ? false : null"
                    id="v-title"
                    placeholder="Enter title group"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
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
                        :options="appliesOptions"
                        :reduce="(val) => val.value"
                        @input="(val) => data.classified = val"
                        class="w-100"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
              label="Status Group"
              label-for="v-password"
            >
              <validation-provider
                      #default="{ errors }"
                      name="Status"
                      rules="required"
              >
                <v-select
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :state="errors.length > 0 ? false : null"
                        :value="data.status"
                        :options="optionsActive"
                        :reduce="(val) => val.value"
                        @input="(val) => data.status = val"
                        class="w-100"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="12">
             <p>Discount</p>
          </b-col>
          <b-col md="6">
            <b-form-group
                    label-for="v-discount"
            >
              <b-col md="12">
                <b-form-group>
                  <b-form-radio v-model="discount" :autofocus="true" :value="0">Percent And Maximum</b-form-radio>
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
                            :state="errors.length > 0 ? false : null"
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
                    <small class="text-danger">{{ errors[0] }}</small>
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
                              :state="errors.length > 0 ? false : null"
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
                    <small class="text-danger">{{ errors[0] }}</small>
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
                  <b-form-radio v-model="discount" id="v-reduction-money" name="some-radios" :value="1">Reduction Money</b-form-radio>
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
                              :state="errors.length > 0 ? false : null"
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
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-form-group>
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
                      placeholder="Textarea"
                      rows="6.5"
                      :state="errors.length > 0 ? false : null"
                      v-model="note"
              />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        </validation-observer>
      </tab-content>

      <!-- Retention Period tab -->
      <tab-content title="Retention Period" :before-change="validateStep2">
        <b-row>
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
             <validation-observer ref="effect">
              <b-row>
                <b-col md="4">
                  <b-form-group
                          label="Effect From"
                          label-for="v-effect-from"
                  >
                    <b-form-radio v-model="chooseE" name="some-radios" :value="0"></b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                          label="From date"
                          label-for="v-last-name"
                  >
                    <validation-provider
                            #default="{ errors }"
                            name="From date"
                            rules="required"
                    >
                      <b-form-datepicker :state="errors.length > 0 && chooseE==0 ? false : null" v-model="data.timeLine.effective.release" placeholder="From Date"  :disabled="chooseE!=0" :date-disabled-fn="dateEffDisabled" locale="en">
                      </b-form-datepicker>
                      <small v-if="chooseE==0" class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                          label="To date"
                          label-for="v-last-name"
                  >
                    <validation-provider
                            #default="{ errors }"
                            name="To date"
                            rules="required"
                    >
                      <b-form-datepicker :state="errors.length > 0 && chooseE==0 ? false : null" v-model="data.timeLine.effective.expiration" placeholder="To Date" :disabled="chooseE!=0" :date-disabled-fn="dateExpDisabled" locale="en">
                      </b-form-datepicker>
                      <small v-if="chooseE==0" class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
             </validation-observer>
           </b-col>

          <b-col md="12">
            <validation-observer ref="expiry">
              <b-row>
                <b-col md="4">
                  <b-form-group
                          label="Expiry Date"
                          label-for="v-expiry-from"
                  >
                    <b-form-radio v-model="chooseE" name="some-radios" :value="1"></b-form-radio>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                          label="Date Number"
                          label-for="v-last-name"
                  >
                    <validation-provider
                            #default="{ errors }"
                            name="Date Number"
                            rules="required"
                    >
                    <b-form-input :state="errors.length > 0 && chooseE==1 ? false : null" type="number" min="1"
                                  v-model="data.timeLine.expiry.number" :disabled="chooseE!=1"
                                  :placeholder="chooseE==1 ? 'Enter your date number' : 'Disabled date number'"></b-form-input>
                      <small v-if="chooseE==1" class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group
                          label="Release date type"
                          label-for="v-last-name"
                  >
                    <validation-provider
                            #default="{ errors }"
                            name="Release date type"
                            rules="required"
                    >
                      <b-form-select
                              :state="errors.length > 0 && chooseE==1 ? false : null"
                              :disabled="chooseE!=1"
                              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                              v-model="data.timeLine.expiry.type"
                              :options="typeDateOptions"
                              class="w-100"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled>{{ chooseE==1 ? 'Choose release date type' : 'Disabled release date type' }}</b-form-select-option>
                        </template>
                      </b-form-select>
                      <small v-if="chooseE==1" class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </validation-observer>
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content title="Range Of Activities">
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
              label="Shops"
              label-for="v-systems-apply"
            >
              <b-form-radio-group
                      id="v-systems-apply"
                      v-model="data.scopeApply.shop.all"
                      :options="sysOptions"
                      class="mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Select Shops"
              label-for="v-landmark"
            >
              <span v-show="data.scopeApply.shop.all == 0">Choose all shops</span>
              <v-select
                      v-show="data.scopeApply.shop.all != 0"
                      v-model="data.scopeApply.shop.listShop"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      multiple
                      :options="$store.state.app_voucher.allSystem"
                      label="title"
              >
              </v-select>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Customer Apply To"
              label-for="v-customer-apply"
            >
              <b-form-radio-group
                      id="v-customer-apply"
                      v-model="data.scopeApply.customer.all"
                      :options="cusOptions"
                      class="mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled">
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Select Groups Customer"
              label-for="v-city"
            >
              <span v-show="data.scopeApply.customer.all == 1">Choose all shops</span>
              <v-select
                      v-show="data.scopeApply.customer.all != 1"
                      v-model="data.scopeApply.customer.listGroupCustomer"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      multiple
                      :options="$store.state.app_voucher.allCustomers"
                      label="title"
              >
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- social link -->
      <tab-content title="Voucher List">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Voucher List
            </h5>
            <small class="text-muted">Enter Your Voucher List</small>
          </b-col>
          <b-col md="12">
            <VoucherList />
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VoucherList from '../voucher-list/VoucherList.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

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

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormTextarea,
  BFormRadio,
  BFormSelect,
  BFormSelectOption,
  BButton,
  BFormDatepicker,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {ref} from "@vue/composition-api";
import store from "@/store";

export default {
  components: {
    ValidationProvider, ValidationObserver,
    VoucherList,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormRadioGroup,
    BFormTextarea,
    BFormDatepicker,
    BFormRadio,
    BFormSelectOption,
    BButton,
    BInputGroup,
    BInputGroupAppend,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      data: {
        title: null,
        classified: 1,
        status: 0,
        note: null,
        discount: {
          PercentAMaximum: {
            percent: 5,
            maximumMoney: 0,
          },
          reduction: {
            money: 0,
          },
        },
        timeLine: {
          effective: {
            release: null,
            expiration: null,
          },
          expiry: {
            number: null,
            type: null,
          },
        },
        scopeApply: {
          shop: {
            all: 0,
            listShop: [],
          },
          customer: {
            all: 0,
            listGroupCustomer: [],
          },
        },
        memberGroup: [],
      },
      discount: 0,
      applies: 0,
      appliesOptions: [
        { value: 0, label: 'Trade Voucher' },
        { value: 1, label: 'Gift Voucher' },
      ],
      active: 0,
      cus: 0,
      optionsActive: [
        { label: "Inactive", value: 0 },
        { label: "Active", value: 1 },
      ],
      system: 0,
      optionsSystem: [
        { item: 0, name: 'Trade' },
        { item: 1, name: 'Gift' },
      ],
      issueOptions: [
        { label: "Pending", value: 0 },
        { label: "Send", value: 1 },
      ],
      typeDate: null,
      typeDateOptions: [
        { text: "Day", value: 0 },
        { text: "Month", value: 1 },
      ],
      sysOptions: [
        { name: "All Shops", item: 0 },
        { name: "Shops", item: 1 },
      ],
      cusOptions: [
        { name: "All Groups Customer", item: 0 },
        { name: "Groups Customer", item: 1 },
      ],
      note: "",
      Mmoney: '1.000,00',
      reduction: 0,

      //Màn 2
      chooseE: 0,
      //Màn 4

    }
  },
  async created() {
    await this.chooseRange()
  },
  computed: {

  },
  methods: {
    chooseRange() {
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
    },
    blurMoney() {
      this.data.discount.PercentAMaximum.maximumMoney = this.Mmoney
      let val = (this.Mmoney/1).toFixed(2).replace('.', ',')
      this.Mmoney = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    blurReduction() {
      this.data.discount.reduction.money = this.reduction
      let val = (this.reduction/1).toFixed(2).replace('.', ',')
      this.reduction = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    dateEffDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      var today = new Date();

      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      // Return `true` if the date should be disabled
      return date < today.setDate(today.getDate()-1)
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

    validateStep1() {
      this.locale = this.locale === "en" ? "vi" : "en";
      return this.$refs.step1.validate();
    },

    validateStep2() {
      this.locale = this.locale === "en" ? "vi" : "en";
      if (this.chooseE == 0) {
        return this.$refs.effect.validate();
      }
      return this.$refs.expiry.validate();
    },

    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
  watch: {
    discount(val) {
      if (val == 0) {
        this.Mmoney = '1.000,00'
        this.data.discount.PercentAMaximum.maximumMoney = 1000
        this.data.discount.PercentAMaximum.percent = 5
        this.reduction = 0
        this.data.discount.reduction.money = 0
      } else {
        this.reduction = '1.000,00'
        this.data.discount.PercentAMaximum.percent = 0
        this.data.discount.PercentAMaximum.maximumMoney = 0
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
