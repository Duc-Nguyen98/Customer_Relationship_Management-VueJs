<template>
  <div>
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Group Voucher Information</h4>
    </div>

    <!-- Form: Personal Info Form -->
    <div class="mt-1">
      <b-tabs>
        <b-tab active>
          <template #title>
            <feather-icon icon="EditIcon" />
            <span>Information group</span>
          </template>
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
            <b-col md="3">
              <b-form-group
                      label="Form Applies"
                      label-for="v-email"
              >
                <v-select
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="classifiedOptions"
                        :value="GroupDataInfo.classified"
                        class="w-100"
                        :reduce="(val) => val.value"
                        @input="(val) => GroupDataInfo.classified = val"
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
                        :value="GroupDataInfo.status"
                        class="w-100"
                        :reduce="(val) => val.value"
                        @input="(val) => GroupDataInfo.status = val"
                        :options="optionsActive"
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
                                v-model="GroupDataInfo.discount.PercentAMaximum.percent"
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
                              v-model="GroupDataInfo.discount.PercentAMaximum.maximumMoney"
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
                    <div v-if="GroupDataInfo.discount.PercentAMaximum != null" class="p-1">
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
                          v-model="GroupDataInfo.note"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="ClockIcon" />
            <span>Retention Period</span>
          </template>

          <b-row>
            <b-col md="4">
              <b-form-group
                      label="Effect From"
                      label-for="v-effect-from"
              >
                <b-form-radio @input="chooseEffect" v-model="chooseE" name="some-radios" :value="0"></b-form-radio>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                      label="From date"
                      label-for="v-last-name"
              >
                <b-form-datepicker v-model="GroupDataInfo.timeLine.effective.expiration" placeholder="From Date"  :disabled="chooseE!=0" :date-disabled-fn="dateEffDisabled" locale="en"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                      label="To date"
                      label-for="v-last-name"
              >

                <b-form-datepicker v-model="GroupDataInfo.timeLine.effective.release" placeholder="To Date" :disabled="chooseE!=0" :date-disabled-fn="dateExpDisabled" locale="en"></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group
                      label="Expiry Date"
                      label-for="v-expiry-from"
              >
                <b-form-radio @input="chooseExpiry" v-model="chooseE" name="some-radios" :value="1"></b-form-radio>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                      label="Date Number"
                      label-for="v-last-name"
              >
                <b-form-input type="number" min="1" v-model="GroupDataInfo.timeLine.expiry.number" :disabled="chooseE!=1" :placeholder="chooseE!=1 ? 'Enter your date number' : 'Disabled date number'"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                      label="Release date type"
                      label-for="v-last-name"
              >
                <b-form-select
                        :disabled="chooseE!=1"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        v-model="GroupDataInfo.timeLine.expiry.type"
                        :options="typeDateOptions"
                        class="w-100"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>{{ chooseE!=1 ? 'Choose release date type' : 'Disabled release date type' }}</b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>
            </b-col>

          </b-row>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="TargetIcon" />
            <span>Range Of Activities</span>
          </template>
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
                        v-model="system"
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
                        v-model="GroupDataInfo.scopeApply.customer.all"
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
        </b-tab>
        <b-tab>
          <template #title>
            <span >
              <feather-icon icon="BookmarkIcon" />
              <span @click="viewVouchers()">Voucher list</span>
            </span>
          </template>
          <VoucherList :_id="GroupDataInfo.idGroupVoucher" />
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="DivideCircleIcon" />
            <span>Use history</span>
          </template>

          <VoucherListHistory :_id="GroupDataInfo.idGroupVoucher" />
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
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import VoucherList from "../voucher-list/VoucherList";
import VoucherListHistory from "../voucher-list/VoucherListHistory";
import {ValidationObserver, ValidationProvider} from "vee-validate";
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
export default {
  components: {
    VoucherList,
    VoucherListHistory,
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
  computed: {
    formatMoney() {
      let val = (this.Mmoney/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  setup({ groupinfo }) {
    const GroupDataInfo = ref(groupinfo);
console.log(GroupDataInfo.value)

    const classifiedOptions = [
      { label: "Choose a classified", value: null },
      { label: "Trade Voucher", value: 0 },
      { label: "Gift Voucher", value: 1 },
    ]

    const percent = null
    const discount = ref(1)
    const chooseE = ref(1)
    const system = ref(0)

    const optionsActive = [
      { label: "Choose a status", value: null },
      { label: "Inactive", value: 0 },
      { label: "Active", value: 1 },
    ]

    const typeDateOptions = [
      { text: "Day", value: 0 },
      { text: "Month", value: 1 },
    ]

    const sysOptions = [
      { name: "All Systems", item: 0 },
      { name: "Branch Systems", item: 1 },
    ]

    const cusOptions = [
      { name: "All Customer", item: 0 },
      { name: "Group Customer", item: 1 },
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
      return date < today.setDate(today.getDate()-1)
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
      console.log('drgdfgsds')
    }

    if (groupinfo.discount.reduction.money == 0) {
        discount.value = 0
    }

    if (groupinfo.timeLine.expiry.number == 0 && groupinfo.timeLine.expiry.type == 0) {
        chooseE.value = 0
    }

    const selected1 = [
      {
        title: 'Command',
        icon: 'CommandIcon',
      },
    ]

    const books = [
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
    ]

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
      selected1,
      books,
      system,
      viewVouchers,
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
