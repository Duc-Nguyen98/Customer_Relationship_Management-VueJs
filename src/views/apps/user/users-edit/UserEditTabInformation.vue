<template>
  <div>
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Personal Information</h4>
    </div>

    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <b-row>
        <!-- Field: Name  -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Full Name" label-for="Full Name">
            <b-form-input
              id="fullname"
              v-model="userDataInfo.C_Name"
              :state="userDataInfo.C_Name.length > 0"
              placeholder="Fullname"
            />
            <b-form-valid-feedback> Looks good! </b-form-valid-feedback>
            <b-form-invalid-feedback>
              Please provide a valid input.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- Field: Email -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Email" label-for="Email">
            <b-form-input
              id="email"
              v-model="userDataInfo.C_Email"
              :state="userDataInfo.C_Email.length > 0"
              placeholder="Email"
            />
            <b-form-valid-feedback> Looks good! </b-form-valid-feedback>
            <b-form-invalid-feedback>
              Please provide a valid input.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- Field: Adress  -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Adress" label-for="Adress">
            <b-form-input
              id="adress"
              v-model="userDataInfo.C_Adress"
              :state="userDataInfo.C_Adress.length > 0"
              placeholder="Adress"
            />
            <b-form-valid-feedback> Looks good! </b-form-valid-feedback>
            <b-form-invalid-feedback>
              Please provide a valid input.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Birth Date" label-for="birth-date">
            <b-form-datepicker
              id="datepicker-valid"
              v-model="userDataInfo.C_DoB"
              :state="userDataInfo.C_DoB.length > 0"
            />
            <b-form-valid-feedback> Looks good! </b-form-valid-feedback>
            <b-form-invalid-feedback>
              Please provide a valid input.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <!-- Field: Telephone Number -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Telephone Number" label-for="Telephone Number">
            <b-form-input
              id="telephone"
              v-model="userDataInfo.C_Phone"
              :state="userDataInfo.C_Phone.length > 0"
              placeholder="Telephone Number"
            />
          </b-form-group>
          <b-form-valid-feedback> Looks good! </b-form-valid-feedback>
          <b-form-invalid-feedback>
            Please provide a valid input.
          </b-form-invalid-feedback>
        </b-col>

        <!-- Field: Gender -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Gender" label-for="gender" label-class="mb-1">
            <b-form-radio-group
              id="gender"
              v-model="userDataInfo.gender"
              :options="genderOptions"
              value="male"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon icon="MapPinIcon" size="19" />
        <h4 class="mb-0 ml-50">Address</h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">
        <!-- Field: Province Name -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Province Name" label-for="city">
            <b-form-select
              v-model="objSelectProvince.selected"
              :options="objSelectProvince.options"
              :state="objSelectProvince.selected === null ? false : true"
            />

            <!-- <b-form-input id="city" v-model="userDataInfo.city" /> -->
          </b-form-group>
        </b-col>

        <!-- Field: District Name -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="District Name" label-for="state">
            <b-form-select
              v-model="objSelectDistrict.selected"
              :options="objSelectDistrict.options"
              :state="objSelectDistrict.selected === null ? false : true"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Ward Name -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Ward Name" label-for="country">
            <b-form-select
              v-model="objSelectWard.selected"
              :options="objSelectWard.options"
              :state="objSelectWard.selected === null ? false : true"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon icon="MapPinIcon" size="19" />
        <h4 class="mb-0 ml-50">Note</h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">
        <!-- Field: Content -->
        <b-col cols="12" md="12" lg="12">
          <b-form-group label="Note Information" label-for="Note Information">
            <b-form-textarea
              id="textarea-state"
              @input="follow"
              v-model="userDataInfo.C_Note"
              :state="userDataInfo.C_Note.length > 0"
              placeholder="Enter only 255 characters or less"
              rows="3"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Form Actions -->
      <div class="d-flex float-right mt-2">
        <b-button
          type="button"
          variant="outline-secondary"
          class="mr-2 text-uppercase"
          @click="autoClose"
        >
          Cancel
        </b-button>

        <b-button variant="primary" type="submit" class="text-uppercase">
          Save Changes
        </b-button>
      </div>
    </b-form>
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
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";

export default {
  components: {
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
  },
  directives: {
    Ripple,
  },
  props: {
    userinfo: {
      required: true,
      type: Object,
    },
  },
  setup({ userinfo }) {
    const userDataInfo = ref({ ...userinfo, gender: "male" });

    const change = false;

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

    const genderOptions = [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ];

    return {
      userDataInfo,
      genderOptions,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,
      change,
    };
  },
  methods: {
    //check thay đổi
    follow() {
      this.change = true;
      console.log(this.change);
    },

    // auto close
    autoClose() {
      if (this.change) {
        this.$swal({
          title: "Auto close alert!",
          html: "I will close in <strong>3</strong> seconds.",
          timer: 3000,
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
