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
            @on-complete="formSubmitted"
    >
      <!-- Information User tab -->
      <tab-content title="Information User" >
        <validation-observer ref="validateStep">
          <b-form class="mt-1">
            <!-- Header: Personal Info -->
            <div class="d-flex mb-2">
              <feather-icon icon="UserIcon" size="19" />
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
                            v-model="smsData.title"
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
                          rules=""
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
                            v-model="smsData.service"
                            class="w-100"
                            :reduce="(val) => val.value"
                            @input="(val) => smsData.service = val"
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
                    <b-form-datepicker id="example-datepicker" v-model="smsData.dateAuto" class="mb-2"></b-form-datepicker>
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
                              :reduce="(val) => val.value"
                              @input="(val) => smsData.group = val"
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
                              :reduce="(val) => val.value"
                              @input="(val) => smsData.voucher = val"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>


                <!-- Field: Discount  -->
                <b-col cols="12" md="6" lg="6">
                  <b-form-group label="Discount" label-for="Discount">
                    <validation-provider
                            #default="{ errors }"
                            name="Discount"
                            rules=""
                    >
                      <b-form-input
                              id="discount"
                              :disabled="true"
                              v-model="smsData.discount"
                              placeholder="Discount"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Field: From date  -->
                <b-col cols="12" md="6" lg="3">
                  <b-form-group label="From Date" label-for="From Date">
                    <validation-provider
                            #default="{ errors }"
                            name="From Date"
                            rules=""
                    >
                      <b-form-datepicker :disabled="true" id="from_date" v-model="smsData.from_date" class="mb-2"></b-form-datepicker>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Field: To date  -->
                <b-col cols="12" md="6" lg="3">
                  <b-form-group label="To Date" label-for="To Date">
                    <validation-provider
                            #default="{ errors }"
                            name="To Date"
                            rules=""
                    >
                      <b-form-datepicker :disabled="true" id="to_date" v-model="smsData.to_date" class="mb-2"></b-form-datepicker>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Header: Personal Note -->
                <b-col  cols="12" md="12" lg="12">
                  <div class="d-flex my-2">
                    <feather-icon icon="MapPinIcon" size="19" />
                    <h4 class="mb-0 ml-50">Content</h4>
                  </div>
                  <b-row>
                    <!--  Note -->
                    <b-col cols="12" md="12" lg="12">
                      <b-form-group label="Content Information" label-for="Content Information">
                        <b-form-textarea
                                id="textarea-rows"
                                placeholder="Content Here..."
                                rows="8"
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
          <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">Previous</wizard-button>
        </div>
        <div class="wizard-footer-right">
          <wizard-button v-if="!props.isLastStep" @click.native="nextService(props)" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

          <wizard-button v-else @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{props.isLastStep ? 'Done' : 'Next'}}</wizard-button>

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
import { FormWizard, TabContent, WizardButton } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {onUnmounted, ref} from '@vue/composition-api'
import vSelect from 'vue-select'
import faker from 'faker'

import {
  BFormTextarea,
  BFormDatepicker,
  BFormSelect,
  BFormRadioGroup,
  BFormInput,
  BFormGroup,
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
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
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
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    vSelect,
  },
  setup() {

    // Use toast
    const toast = useToast();
    const USER_APP_STORE_MODULE_NAME = "app-customers";

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
      service: null,
      dateAuto: "",
      content: "",
      group: "",
      voucher: "",
      discount: "",
      form_date: "",
      to_date: "",
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
         const { data } = response.data
            data.map(obj => {
              customers.value.push({
                telephone: obj.telephone,
                email: obj.email,
                value: obj.telephone,
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
      { label: "Choose a service", value: null },
      { label: "SMS", value: 0 },
      { label: "Email", value: 1 },
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
      customers,
      smsData,
      validation,
      groupOptions,
      voucherOptions,
      servicesOptions,
    };
  },

  methods: {
    changeCustomer(data) {
      this.smsData.telephone = data.telephone
      this.smsData.email = data.email
    },

    nextService(props) {
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
    },

    changeType(data) {
      this.smsData.type_name = data?.label??""
      this.smsData.type = data?.value??""
      this.smsData.content = this.smsData.customer + ' - Voucher ' + this.smsData.type_name + ':"' + faker.finance.bic() + '" - '
    },

    changeVoucher(data) {
      this.smsData.voucher_name = data?.label??""
      this.smsData.voucher = data?.value??""
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
</style>