<template>
  <div>
    <!-- Header: Personal Info -->
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
      <!-- Information Service tab -->
      <tab-content title="Information User">
        <validation-observer ref="information_user">
          <b-form class="mt-1">
            <!-- Header: Personal Info -->
            <div class="d-flex mb-2">
              <feather-icon icon="UserIcon" size="19"/>
              <h4 class="mb-0 ml-50">Service Information</h4>
            </div>
            <b-row>
              <!-- Field: Name  -->
              <b-col cols="12" md="6" lg="4">
                <b-form-group label="Title" label-for="Title">
                  <validation-provider
                          #default="{ errors }"
                          name="Title"
                          :disabled="true"
                          rules=""
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
                          rules=""
                  >
                    <v-select
                            :state="errors.length > 0 ? false : null"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            v-model="smsData.customer"
                            class="w-100"
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
                          rules=""
                  >
                    <b-form-input
                            :disabled="true"
                            id="telephone"
                            v-model="smsData.telephoneCustomer"
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
                          rules=""
                  >
                    <b-form-input
                            :disabled="true"
                            id="email"
                            v-model="smsData.mailCustomer"
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
                          rules=""
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
                          rules=""
                  >
                    <flat-pickr
                            v-model="smsData.dateAutomaticallySent"
                            class="form-control mb-2"
                            :config="{ enableTime: true,dateFormat: 'Y-m-d H:i'}"
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
                        rules=""
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
                        rules=""
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
            <b-col cols="12" md="6" lg="6" v-if="smsData.discount.reduction.money != null">
              <b-form-group label="Discount" label-for="Discount">
                <validation-provider
                        #default="{ errors }"
                        name="Discount"
                        rules=""
                >
                  <p> {{ fmMoney(smsData.discount.reduction.money) }}đ</p>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3"
                   v-if="smsData.discount.PercentAMaximum.maximumMoney != null">
              <b-form-group label="Discount" label-for="Discount">
                <validation-provider
                        #default="{ errors }"
                        name="Discount"
                        rules=""
                >
                  <p>{{ fmMoney(smsData.discount.PercentAMaximum.maximumMoney) }}đ</p>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="3" v-if="smsData.discount.PercentAMaximum.percent != null">
              <b-form-group label="Discount" label-for="Discount">
                <validation-provider
                        #default="{ errors }"
                        name="Discount"
                        rules=""
                >
                  <p> {{ smsData.discount.PercentAMaximum.percent }}%</p>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: From date  -->
            <b-col cols="12" md="6" lg="3" v-if="smsData.timeLine.release != null">
              <b-form-group label="From Date" label-for="From Date">
                <validation-provider
                        #default="{ errors }"
                        name="From Date"
                        rules=""
                >
                  <b-form-datepicker :disabled="true"
                                     id="from_date" v-model="smsData.timeLine.release"
                                     class="mb-2"></b-form-datepicker>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Field: To date  -->
            <b-col cols="12" md="6" lg="3" v-if="smsData.timeLine.expiration != null">
              <b-form-group label="To Date" label-for="To Date">
                <validation-provider
                        #default="{ errors }"
                        name="To Date"
                        rules=""
                >
                  <b-form-datepicker :disabled="true" id="to_date"
                                     v-model="smsData.timeLine.expiration"
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
          <wizard-button v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">
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
                  @click.native="$router.push({name: 'apps-services-list-sms'})"
          >
            Cancel
          </wizard-button>
        </div>

      </template>
    </form-wizard>

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
} from "bootstrap-vue";
import {FormWizard, TabContent, WizardButton} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import flatPickr from "vue-flatpickr-component";
import {onUnmounted, ref} from "@vue/composition-api";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import {quillEditor} from "vue-quill-editor";
import store from "@/store";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import {useToast} from "vue-toastification/composition";
import userStoreModule from "@/views/apps/customers/userStoreModule";

export default {
  components: {
    quillEditor,
    BFormSelect,
    BRow,
    BFormTextarea,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BFormDatepicker,
    ValidationProvider, ValidationObserver,
    FormWizard, TabContent, WizardButton,
  },
  directives: {
    Ripple,
  },
  props: {
    serviceinfo: {
      required: true,
      type: Object,
    },
  },
  setup({ serviceinfo }) {
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

    const smsData = ref({ ...serviceinfo });
console.log(smsData)
    const objSelectDistrict = {
      selected: "a",
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const objSelectProvince = {
      selected: "b",
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const objSelectWard = {
      selected: "c",
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const customers = ref([
      {
        telephone: null,
        email: null,
        value: null,
        label: 'Choose a customer'
      }
    ]);
    const groupOptions = ref([]);
    const voucherOptions = ref([]);

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

    return {
      smsData,
      servicesOptions,
      objSelectDistrict,
      objSelectProvince,
      voucherOptions,
      objSelectWard,
      groupOptions,
      customers,
    };
  },
  methods: {
    fmMoney(val) {
      let money = (Number(val) / 1).toFixed(0).replace('.', ',')
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
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
