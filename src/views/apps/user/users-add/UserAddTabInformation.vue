<template>
  <div>
    <validation-observer ref="simpleRules">
      <b-form class="mt-1">
        <!-- Header: Personal Info -->
        <div class="d-flex mb-2">
          <feather-icon icon="UserIcon" size="19" />
          <h4 class="mb-0 ml-50">User Information</h4>
        </div>
        <b-row>
          <!--  Full Name-->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Full Name</label>
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Full Name"
              >
                <b-form-input
                  v-model="userData.name"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Enter Full Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- email -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Email</label>
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  v-model="userData.email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Adress -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Address</label>
              <validation-provider
                #default="{ errors }"
                name="Adress"
                rules="required|"
              >
                <b-form-input
                  v-model="userData.address"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Adress"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Birth Day -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label for="datepicker-placeholder">Birth Day</label>
              <b-form-datepicker
                id="datepicker-placeholder"
                placeholder="Choose a date"
                local="vi"
                v-model="userData.birthDay"
              />
            </b-form-group>
          </b-col>

          <!-- Telephone Number -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Telephone Number</label>
              <validation-provider
                #default="{ errors }"
                rules="required|regex:^([0-9]+)$|digits:10"
                name="Telephone Number"
              >
                <b-form-input
                  v-model="userData.telephone"
                  :state="errors.length > 0 ? false : null"
                  placeholder="Enter Telephone Number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!--  Full Name-->
          <b-col cols="12" md="6" lg="4">
            <b-form-radio-group
              v-model="userData.gender"
              :options="genderOptions"
              class="demo-inline-spacing"
              name="radio-validation"
              value="0"
            >
            </b-form-radio-group>
          </b-col>

          <!-- Role -->
          <b-col>
            <b-form-group>
              <label>Role</label>
              <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Role"
              >
                <v-select
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="roleOptions"
                        class="w-100"
                        :reduce="val => val.value"
                        v-model="userData.role"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Account Name -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Account Name</label>
              <validation-provider
                #default="{ errors }"
                rules="required||max:50"
                name="Account Name"
              >
                <b-form-input
                  v-model="userData.account"
                  :state="
                    errors.length > 0 && errors.length <= 50 ? false : null
                  "
                  placeholder="Enter Account Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Password -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Password</label>
              <validation-provider
                #default="{ errors }"
                rules="required||max:50"
                name="Password"
              >
                <b-form-input
                  v-model="userData.password"
                  type="password"
                  :state="
                    errors.length > 0 && errors.length <= 50 ? false : null
                  "
                  placeholder="Enter Password"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
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
              :to="{name: 'apps-users-list'}"
            >
              Cancel
            </b-button>
            <b-button
              class="text-uppercase"
              variant="primary"
              type="button"
              @click="validationForm"
            >
              Save Changes
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";

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
import moment from "moment";
import vSelect from 'vue-select'
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import store from "@/store";
import {useToast} from 'vue-toastification/composition'

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
    const toast = useToast();
    var today = moment();
    const userData = ref({
      name: "",
      email: "",
      address: "",
      gender: 0,
      telephone: "",
      role: "",
      birthDay: moment(today._d).format("YYYY-MM-DD"),
      account: "",
      password: "",
    });

    console.log(userData.value.telephone);
    console.log(userData.value.address);
    const objSelectDistrict = {
      selected: null,
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const objSelectProvince = {
      selected: null,
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const objSelectWard = {
      selected: null,
      options: [
        { value: null, text: "Please select some item", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
      ],
    };

    const roleOptions = [
      { label: "Nhân viên", value: 0 },
      { label: "Quản lí", value: 1 },
    ];

    const genderOptions = [
      { text: "Male", value: 0 },
      { text: "Female", value: 1 },
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
      userData,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,
      genderOptions,
      roleOptions,
      validation,
      toast,
    };
  },
  methods: {
    alert(variant, message) {
      this.toast({
        component: ToastificationContent,
        props: {
          title: "Notification",
          icon: "BellIcon",
          text: "👋 " + message,
          variant,
        },
      });
    },

    validationForm() {
      this.locale = this.locale === "en" ? "vi" : "en";

      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.addUser()
        }
      });
    },

    addUser() {
      store.dispatch('app-user/addUser', this.userData)
              .then(response => {
                if (response.data.success) {
                  this.alert("success", "Add user successfully.")
                  this.$router.push({name: 'apps-users-list'});
                } else {
                  this.alert("danger", "Add user failed.")
                }
              })
              .catch(() => {
                this.toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Error fetching users list',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                  },
                });
              });
    }
  },
};
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>