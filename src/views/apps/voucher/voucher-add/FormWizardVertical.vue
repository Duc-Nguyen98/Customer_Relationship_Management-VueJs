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
              <v-select
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :value="typeDate"
                      :options="typeDateOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => $emit('update:type', val)"
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
                      :value="typeDate"
                      :options="typeDateOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => $emit('update:type', val)"
              />
            </b-form-group>
          </b-col>
          <b-col md="12">
             <p>Discount</p>
          </b-col>
          <b-col md="6">
            <b-form-group
                    label-for="v-password"
            >
              <b-col md="12">
                <b-form-group
                        label-for="v-password"
                >
                  <b-form-radio v-model="effect" name="some-radios" value="0">Percent And Maximum</b-form-radio>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <label for="Percent">Percent</label>
                  <b-input-group>
                    <b-form-input
                            id="Percent"
                            placeholder="Your Percent"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                              icon="PercentIcon"
                              class="cursor-pointer"
                      />
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-form-group>
                  <label for="Mmoney">Maximum money</label>
                  <b-input-group>
                    <b-form-input
                            id="Mmoney"
                            placeholder="Your maximum money"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                              icon="ChevronsUpIcon"
                              class="cursor-pointer"
                      />
                    </b-input-group-append>
                  </b-input-group>
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
                  <b-form-radio v-model="effect" id="v-reduction-money" name="some-radios" value="0">Reduction Money</b-form-radio>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group>
                  <label for="Reduction">Reduction</label>
                  <b-input-group>
                    <b-form-input
                            id="Reduction"
                            placeholder="Your Reduction"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                              icon="ChevronsDownIcon"
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
              <b-form-textarea
                      id="textarea-default"
                      placeholder="Textarea"
                      rows="6.5"
                      v-model="note"
              />
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
              <b-form-radio @input="chooseEffect" v-model="effect" name="some-radios" value="0"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
              label="Từ ngày"
              label-for="v-last-name"
            >
              <b-form-datepicker v-model="from_date" placeholder="From Date"  :disabled="expiry!=null" :date-disabled-fn="dateEffDisabled" locale="en"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Tới ngày"
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
              <b-form-radio @input="chooseExpiry" v-model="expiry" name="some-radios" value="1"></b-form-radio>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Choose Date Number"
                    label-for="v-last-name"
            >
              <b-form-input type="number" v-model="date_number" :disabled="effect!=null" placeholder="Enter your date number"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
                    label="Release date type"
                    label-for="v-last-name"
            >
              <v-select
                      placeholder="Choose release date type"
                      :disabled="effect!=null"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      v-model="typeDate"
                      :options="typeDateOptions"
                      class="w-100"
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

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VoucherList from "../voucher-list/VoucherList.vue";

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormTextarea,
  BFormRadio,
  BButton,
  BFormDatepicker,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    VoucherList,
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
    BButton,
    BInputGroup,
    BInputGroupAppend,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      active: 0,
      optionsActive: [
        { item: 0, name: 'Inactive' },
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
      typeDate: null,
      typeDateOptions: [
        { label: "Day", value: 0 },
        { label: "Month", value: 1 },
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

    chooseEffect() {
      this.expiry = null
      this.date_number = null
      this.typeDate = null
    },

    chooseExpiry() {
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
