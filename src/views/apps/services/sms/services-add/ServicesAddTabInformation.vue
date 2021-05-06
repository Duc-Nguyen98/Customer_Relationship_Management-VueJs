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
                          :options="typeOptions"
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
                                :options="typeOptions"
                                class="mb-3"
                                value-field="item"
                                text-field="name"
                                disabled-field="notEnabled"
                        ></b-form-radio-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {onUnmounted, ref, watch} from "@vue/composition-api";
import vSelect from "vue-select";
import faker from "faker";

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
    BFormTextarea,
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

    const customers = ref([]);

    store.dispatch('app-customers/fetchUsers', {}).then(response => {
      customers.value = [];
         const { data } = response.data
            data.map(obj => {
              customers.value.push({
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

    const smsData = ref({
      customer: "",
      title: "",
      type: "",
      type_name: "",
      category: "",
      telephone: "",
      content: "",
      voucher_name: "",
      voucher: "",
    });

    const typeOptions = [
      { label: "BirthDay Customer", value: 0 },
      { label: "By Week", value: 1 },
      { label: "By Month", value: 2 },
      { label: "Other", value: 3 },
    ];

    const voucherOptions = [
      { label: "25%", value: 0 },
      { label: "50%", value: 1 },
      { label: "75%", value: 2 },
      { label: "100%", value: 3 },
    ];

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
      typeOptions,
      validation,
      voucherOptions,
    };
  },

  methods: {
    changeCustomer(data) {
      this.smsData.customer = data?.label??""
      this.smsData.telephone = data?.value??""
      this.smsData.content = this.smsData.customer + ' - Voucher ' + this.smsData.type_name + ':"' + faker.finance.bic() + '" - '
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
  @import "@core/scss/vue/libs/vue-select.scss";
</style>