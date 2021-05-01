<template>
  <div>
    <validation-observer ref="simpleRules">
      <b-form class="mt-1">
        <!-- Header: Personal Info -->
        <div class="d-flex mb-2">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-0 ml-50">SMS Information</h4>
        </div>
        <b-row>
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

          <!-- Type -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Type" label-for="Type">
              <validation-provider
                      #default="{ errors }"
                      name="Type"
                      rules="required"
              >
                <v-select
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        v-model="smsData.type_name"
                        :options="typeOptions"
                        class="w-100"
                        @input="changeType($event)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Voucher -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Voucher" label-for="Voucher">
              <validation-provider
                      #default="{ errors }"
                      name="Voucher"
                      rules="required"
              >
                <v-select
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        v-model="smsData.voucher_name"
                        :options="voucherOptions"
                        class="w-100"
                        @input="changeVoucher($event)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Header: Personal Note -->
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
        <!-- submit button -->
        <b-row class="d-flex float-right mt-2">
          <b-col>
            <b-button
              variant="outline-secondary"
              class="mr-2 text-uppercase"
              type="button"
            >
              Cancel
            </b-button>
            <b-button
              class="text-uppercase"
              variant="primary"
              type="button"
              @click="validationForm"
            >
              Send
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
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
    const USER_APP_STORE_MODULE_NAME = "app_voucher";

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