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
                  v-model="blankData.C_Name"
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
                  v-model="blankData.C_Email"
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
              <label>Adress</label>
              <validation-provider
                #default="{ errors }"
                name="Adress"
                rules="required|"
              >
                <b-form-input
                  v-model="blankData.C_Adress"
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
              <label for="datepicker-placeholder">Birth Date</label>
              <b-form-datepicker
                id="datepicker-placeholder"
                placeholder="Choose a date"
                local="vi"
                v-model="blankData.C_DoB"
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
                  v-model="blankData.C_Phone"
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
              v-model="genderOptions.value"
              :options="genderOptions"
              class="demo-inline-spacing"
              name="radio-validation"
              value="Male"
            >
            </b-form-radio-group>
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
                  v-model="blankData.AccountName"
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
                  v-model="blankData.Password"
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

        <!-- Header: Personal Note -->
        <div class="d-flex my-2">
          <feather-icon icon="MapPinIcon" size="19" />
          <h4 class="mb-0 ml-50">Note</h4>
        </div>
        <b-row>
          <!--  Note -->
          <b-col cols="12" md="12" lg="12">
            <b-form-group label="Note Information" label-for="Note Information">
              <b-form-textarea
                id="textarea-rows"
                placeholder="Note Here..."
                rows="8"
                v-model="blankData.C_Note"
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
  },
  setup() {
    const blankData = ref({
      C_DoB: "1992-03-22",
      C_Adress: "",
      C_Name: "",
      C_Email: "",
      C_Phone: "",
      C_Note: "",
    });

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

    const genderOptions = [
      { text: "Male", value: "Male" },
      { text: "Female", value: "Female" },
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
    ``;
    return {
      blankData,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,
      genderOptions,
      validation,
    };
  },
  methods: {
    validationForm() {
      this.locale = this.locale === "en" ? "vi" : "en";

      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          alert("form submitted!");
        }
      });
    },
  },
};
</script>