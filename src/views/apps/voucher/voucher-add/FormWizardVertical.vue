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

      <!-- Information Group tab -->
      <tab-content title="Information Group">
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
                              label="Select Shops"
                              label-for="v-landmark"
                      >
                        <validation-provider
                                #default="{ errors }"
                                name="Shops"
                                rules="required"
                        >
                          <v-select
                                  v-model="data.listShop"
                                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                  multiple
                                  :options="$store.state.app_voucher.allSystem"
                                  label="title"
                                  :state="errors.length > 0 ? false : null"
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
                <quill-editor
                        id="textarea-default"
                        :state="errors.length > 0 ? false : null"
                        v-model="data.note"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
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

        <template slot="footer" scope="props">
          <div class=wizard-footer-left>
            <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">Previous</wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button v-if="!props.isLastStep" @click.native="submitGroup(props)" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

            <wizard-button v-else @click.native="formSubmitted" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>

            <wizard-button
                    class="mr-2 text-uppercase btn-outline-primary wizard-footer-right"
                    type="button"
                    @click.native="$router.push({name: 'apps-group-voucher-list'})"
            >
              Cancel
            </wizard-button>
          </div>

        </template>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VoucherList from '../voucher-list/VoucherList.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { quillEditor } from 'vue-quill-editor'

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
    WizardButton,
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
    quillEditor,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      data: {
        title: null,
        status: 0,
        note: null,
        listShop: [],
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
      add: false,
    }
  },
  async created() {
    await this.chooseRange()
  },
  methods: {
    isLastStep() {
      if (this.$refs.wizard) {

        return this.$refs.wizard.isLastStep
      }
      return false
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

    submitGroup(props) {
      if (this.add == false) {
        this.locale = this.locale === "en" ? "vi" : "en"
        this.$refs.information.validate().then((success) => {
          if(success) {
            store.dispatch('app_voucher/addVoucherGroup', this.data)
                    .then(response => {
                      if (response.data.success) {
                        this.add = true
                        props.nextTab();
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
      }
    },

    formSubmitted() {
      const data = store.state.app_voucher.allVouchers
      store.dispatch('app_voucher/addListVouchersGroup', data)
              .then(response => {
                if (response.data.success) {
                  this.alert("success", "Add vouchers successfully.")
                  this.$router.push({name: 'apps-group-voucher-list'})
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
  }
}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/quill.scss';
</style>
<style>
  .ql-editor {
    height: 200px !important;
  }
</style>