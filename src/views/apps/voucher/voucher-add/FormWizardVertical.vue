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
              <b-form-radio-group
                      id="v-email"
                      v-model="form"
                      :options="optionsForm"
                      class="mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
              label="Status Group"
              label-for="v-password"
            >
              <b-form-radio-group
                      v-model="active"
                      :options="optionsActive"
                      class="mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group
                    label="Note"
                    label-for="v-note"
            >
              <b-form-textarea
                      id="textarea"
                      v-model="note"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"
              ></b-form-textarea>
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
              <b-form-radio v-model="effect" name="some-radios" value="0"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
              label="Từ ngày"
              label-for="v-last-name"
            >
              <b-form-datepicker placeholder="From Date" :date-disabled-fn="dateEffDisabled" locale="en"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Tới ngày"
                    label-for="v-last-name"
            >
              <b-form-datepicker placeholder="To Date" :date-disabled-fn="dateExpDisabled" locale="en"></b-form-datepicker>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
                    label="Expiry Date"
                    label-for="v-expiry-from"
            >
              <b-form-radio v-model="expiry" name="some-radios" value="1"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Choose Date Number"
                    label-for="v-last-name"
            >
              <b-form-input type="number" placeholder="Enter your name"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Release date type"
                    label-for="v-last-name"
            >
              <v-select
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :value="type"
                      :options="issueOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => $emit('update:type', val)"
              />
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
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :value="type"
                      :options="issueOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => $emit('update:type', val)"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Customer Apply To"
              label-for="v-customer-apply"
            >
              <b-form-radio-group
                      id="v-customer-apply"
                      v-model="active"
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
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :value="type"
                      :options="issueOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => $emit('update:type', val)"
              />
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
          <b-col md="6">
            <b-form-group
              label="Twitter"
              label-for="v-twitter"
            >
              <b-form-input
                id="v-twitter"
                placeholder="https://twitter.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Facebook"
              label-for="v-facebook"
            >
              <b-form-input
                id="v-facebook"
                placeholder="https://facebook.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Google+"
              label-for="v-google-plus"
            >
              <b-form-input
                id="v-google-plus"
                placeholder="https://plus.google.com/abc"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="LinkedIn"
              label-for="v-linked-in"
            >
              <b-form-input
                id="v-linked-in"
                placeholder="https://linkedin.com/abc"
              />
            </b-form-group>
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
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormTextarea,
  BFormRadio,
  BFormDatepicker,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BFormTextarea,
    BFormDatepicker,
    BFormRadio,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      countryName: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'Russia', text: 'Russia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'China', text: 'China' },
        { value: 'United States', text: 'United States' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'Australia', text: 'Australia' },
        { value: 'India', text: 'India' },
      ],
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
      active: 0,
      optionsActive: [
        { item: 0, name: 'Nonactive' },
        { item: 1, name: 'Active' },
      ],
      form: 0,
      optionsForm: [
        { item: 0, name: 'Trade' },
        { item: 1, name: 'Gift' },
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
        { name: "All Systems", item: 0 },
        { name: "Branch Systems", item: 1 },
      ],
      cusOptions: [
        { name: "All Customer", item: 0 },
        { name: "Branch Systems", item: 1 },
      ],
      note: "",
      effect: 0,
      expiry: null,
      effect_date: null,
      expiry_date: null,
    }
  },
  methods: {
    dateEffDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6 || day === 13
    },

    dateExpDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6 || day === 13
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
