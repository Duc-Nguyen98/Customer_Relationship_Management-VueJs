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
        <validation-observer ref="information">
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
          <b-col md="6">
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

              <b-col md="12">
                  <b-row>
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
                        <validation-provider
                                v-if="data.scopeApply.shop.all != 0"
                                #default="{ errors }"
                                name="Shops"
                                rules="required"
                        >
                          <v-select
                                  v-model="data.scopeApply.shop.listShop"
                                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                  multiple
                                  :options="$store.state.app_voucher.allSystem"
                                  label="title"
                                  :state="errors.length > 0 && chooseE==1 ? false : null"
                          >
                            <template v-slot:option="option">
                              {{ option.title }}
                            </template>
                          </v-select>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
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
                        <span v-show="data.scopeApply.customer.all == 0">Choose all customers</span>
                        <validation-provider
                                v-if="data.scopeApply.customer.all != 0"
                                #default="{ errors }"
                                name="Groups Customer"
                                rules="required"
                        >
                          <v-select
                                  v-model="data.scopeApply.customer.listGroupCustomer"
                                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                  multiple
                                  :options="$store.state.app_voucher.allCustomers"
                                  label="title"
                          >
                            <template v-slot:option="option">
                              {{ option.title }}
                            </template>
                          </v-select>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-row>
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
                      placeholder="Textarea"
                      rows="6.5"
                      :state="errors.length > 0 ? false : null"
                      v-model="data.note"
              />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="12 mb-2  mt-5">
            <b-row class="d-flex float-right">
              <b-col>
                <b-button
                        variant="outline-secondary"
                        class="mr-2 text-uppercase"
                        type="button"
                        :to="{name: 'apps-group-voucher-list'}"
                >
                  Cancel
                </b-button>
                <b-button
                        class="text-uppercase"
                        variant="primary"
                        type="button"
                        @click="submitGroup"
                >
                  Save group voucher
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        </validation-observer>
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
        status: 0,
        note: null,
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
      },
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
      sysOptions: [
        { name: "All Shops", item: 0 },
        { name: "Shops", item: 1 },
      ],
      cusOptions: [
        { name: "All Groups Customer", item: 0 },
        { name: "Groups Customer", item: 1 },
      ],
      note: "",
      vouchers: {},
    }
  },
  async created() {
    await this.chooseRange()
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
                    console.log(allSystem)
                    store.commit('app_voucher/updateSystems', allSystem)
                  } else {
                    this.alert("danger", "Get list systems failed.")
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
                    console.log(response.data.listGroupCustomer)
                    store.commit('app_voucher/updateCustomers', allCustomers)
                  } else {
                    this.alert("danger", "Get list customers failed.")
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
    },

    validateStep1() {
      this.locale = this.locale === "en" ? "vi" : "en"
      return this.$refs.information.validate()
    },

    submitGroup() {
      this.locale = this.locale === "en" ? "vi" : "en"
      this.$refs.information.validate().then((success) => {
        if(success) {
          store.dispatch('app_voucher/addVoucherGroup', this.data)
                  .then(response => {
                    if (response.data.success) {
                      this.alert("success", "Add group voucher successfully.")
                    } else {
                      this.alert("danger", "Add group voucher failed.")
                    }
                  })
                  .catch((err) => {
                    this.$toast({
                      component: ToastificationContent,
                      props: {
                        title: 'Error Add group voucher',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                      },
                    })
                  })
        }
      })
    },

    formSubmitted() {
      const data = store.state.app_voucher.allVouchers
      store.dispatch('app_voucher/addListVouchersGroup', data)
              .then(response => {
                if (response.data.success) {
                  this.alert("success", "Add vouchers successfully.")
                } else {
                  this.alert("danger", "Add vouchers failed.")
                }
              })
              .catch((err) => {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Error add vouchers list',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                  },
                })
              })
    },
  },
  watch: {
    discount(val) {
      if (val == 0) {
        this.Mmoney = '1.000'
        this.data.discount.PercentAMaximum.maximumMoney = 1000
        this.data.discount.PercentAMaximum.percent = 5
        this.reduction = 0
        this.data.discount.reduction.money = 0
      } else {
        this.reduction = '1.000'
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
