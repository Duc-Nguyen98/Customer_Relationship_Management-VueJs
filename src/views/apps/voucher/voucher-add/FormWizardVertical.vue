<template>
  <div>
    <validation-observer ref="simpleRules">
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
      <tab-content title="Information Group">
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
              <b-form-input
                id="v-title"
                placeholder="Enter title group"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
              label="Form Applies"
              label-for="v-email"
            >
              <v-select
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      v-model="applies"
                      :options="appliesOptions"
                      class="w-100"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
              label="Status Group"
              label-for="v-password"
            >
              <v-select
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      v-model="active"
                      :options="optionsActive"
                      class="w-100"
              />
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
                          rules="between:5,95"
                  >
                  <b-input-group>
                    <b-form-input
                            v-model="percent"
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
                  <b-input-group>
                    <b-form-input
                            :disabled="discount == 1"
                            v-model="Mmoney"
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
                  <div v-if="Mmoney != null" class="p-1">
                    Format money: {{ formatMoney }}
                  </div>
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
                  <b-input-group>
                    <b-form-input
                            :disabled="discount == 0"
                            id="Reduction"
                            placeholder="Your Reduction"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                              icon="DollarSignIcon"
                              class="cursor-pointer"
                      />
                    </b-input-group-append>
                  </b-input-group>
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
                      v-model="note"
              />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- Retention Period tab -->
      <tab-content title="Retention Period">
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
          <b-col md="4">
            <b-form-group
              label="Effect From"
              label-for="v-effect-from"
            >
              <b-form-radio @input="chooseEffect" v-model="effect" name="some-radios" :value="0"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
              label="From date"
              label-for="v-last-name"
            >
              <b-form-datepicker v-model="from_date" placeholder="From Date"  :disabled="expiry!=null" :date-disabled-fn="dateEffDisabled" locale="en"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="To date"
                    label-for="v-last-name"
            >
              <b-form-datepicker v-model="to_date" placeholder="To Date" :disabled="expiry!=null" :date-disabled-fn="dateExpDisabled" locale="en"></b-form-datepicker>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
                    label="Expiry Date"
                    label-for="v-expiry-from"
            >
              <b-form-radio @input="chooseExpiry" v-model="expiry" name="some-radios" :value="1"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Date Number"
                    label-for="v-last-name"
            >
              <b-form-input type="number" min="1" v-model="date_number" :disabled="effect!=null" :placeholder="effect==null ? 'Enter your date number' : 'Disabled date number'"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Release date type"
                    label-for="v-last-name"
            >
              <b-form-select
                      :disabled="effect!=null"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      v-model="typeDate"
                      :options="typeDateOptions"
                      class="w-100"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>{{ effect==null ? 'Choose release date type' : 'Disabled release date type' }}</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
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
              label="Systems Apply"
              label-for="v-systems-apply"
            >
              <b-form-radio-group
                      id="v-systems-apply"
                      v-model="active"
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
              label="Select Branch"
              label-for="v-landmark"
            >
              <v-select
                      v-model="selected1"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      multiple
                      :options="books"
                      label="title"
              >
                <template #option="{ title, icon }">
                  <feather-icon
                          :icon="icon"
                          size="16"
                          class="align-middle mr-25"
                  />
                  <span> {{ title }}</span>
                </template>
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
                      v-model="cus"
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
              label="Select Branch"
              label-for="v-city"
            >
              <v-select
                      v-model="selected1"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      multiple
                      :options="books"
                      label="title"
              >
                <template #option="{ title, icon }">
                  <feather-icon
                          :icon="icon"
                          size="16"
                          class="align-middle mr-25"
                  />
                  <span> {{ title }}</span>
                </template>
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
    </validation-observer>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VoucherList from "../voucher-list/VoucherList.vue";
import {ValidationProvider, ValidationObserver} from "vee-validate";
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
      discount: 0,
      applies: 0,
      appliesOptions: [
        { value: 0, label: 'Trade Voucher' },
        { value: 1, label: 'Gift Voucher' },
      ],
      active: 0,
      cus: 0,
      optionsActive: [
        { label: "Choose 1 status", value: null },
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
        { name: "All Systems", item: 0 },
        { name: "Branch Systems", item: 1 },
      ],
      cusOptions: [
        { name: "All Customer", item: 0 },
        { name: "Group Customer", item: 1 },
      ],
      selected1: [
        {
          title: 'Command',
          icon: 'CommandIcon',
        },
      ],
      books: [
        {
          title: 'Database',
          icon: 'DatabaseIcon',
        },
        {
          title: 'Codepen',
          icon: 'CodepenIcon',
        },
        {
          title: 'Aperture ',
          icon: 'ApertureIcon',
        },
        {
          title: 'Command',
          icon: 'CommandIcon',
        },
      ],
      note: "",
      percent: null,
      Mmoney: null,

      //Màn 2
      effect: 0,
      expiry: null,
      effect_date: null,
      from_date: null,
      to_date: null,
      expiry_date: null,
      date_number: null,

      //Màn 4

    }
  },
  created() {

  },
  computed: {
    formatMoney() {
      let val = (this.Mmoney/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  methods: {
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

    chooseEffect() {
      this.expiry = null
      this.date_number = null
      this.typeDate = null
    },

    chooseExpiry() {
      this.date_number = 1
      this.effect = null
      this.from_date = null
      this.to_date = null
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
}
</script>
