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
              v-model="value1"
              :state="value1.length > 0"
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
              v-model="value2"
              :state="value2.length > 0"
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
              v-model="value3"
              :state="value3.length > 0"
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
            <b-form-datepicker id="datepicker-valid" :state="true" />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Mobile" label-for="mobile">
            <b-form-input
              id="mobile"
              v-model="value5"
              :state="value5.length > 0"
              placeholder="mobile"
            />
          </b-form-group>
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
        <!-- Field: City -->
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

        <!-- Field: State -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="District Name" label-for="state">
            <b-form-select
              v-model="objSelectDistrict.selected"
              :options="objSelectDistrict.options"
              :state="objSelectDistrict.selected === null ? false : true"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Country -->
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
        <!-- Field: City -->
        <b-col cols="12" md="12" lg="12">
          <b-form-group label="" label-for="city">
            <b-form-textarea
              id="textarea-state"
              v-model="textareaNote"
              :state="textareaNote.length <= 255"
              placeholder="Enter only 255 characters or less"
              rows="3"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Form Actions -->
      <div class="d-flex float-right mt-2">
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="button"
          variant="outline-secondary"
          class="mr-2 text-uppercase"
        >
          Cancel
        </b-button>

        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="button"
          variant="primary"
          class="mr-2 text-up text-uppercase"
        >
          Reset
        </b-button>

        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          type="submit"
          class="text-uppercase"
        >
          Add New
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
  data() {
    return {
      value1: "Nguyễn Quang Đức",
      value2: "ducsimax199@gmail.com",
      value3: "Quan Hoa, Cầu Giấy, Hà Nội",
      value4: "2021-04-01",
      value5: "0393177289",
      objSelectDistrict: {
        selected: "a",
        options: [
          { value: null, text: "Please select some item", disabled: true },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Default Selected Option" },
          { value: "c", text: "This is another option" },
        ],
      },
      objSelectProvince: {
        selected: "b",
        options: [
          { value: null, text: "Please select some item", disabled: true },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Default Selected Option" },
          { value: "c", text: "This is another option" },
        ],
      },
      objSelectWard: {
        selected: "c",
        options: [
          { value: null, text: "Please select some item", disabled: true },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Default Selected Option" },
          { value: "c", text: "This is another option" },
        ],
      },
      textareaNote: "",
    };
  },
  setup() {
    const userDataInfo = ref({
      dob: null,
      mobile: "+6595895857",
      website: "https://rowboat.com/insititious/Angelo",
      language: "French",
      gender: "female",
      contactOptions: ["Email", "Message"],
      addressLine1: "A-65, Belvedere Streets",
      addressLine2: "",
      postcode: "",
      city: "New York",
      state: "",
      country: "",
    });

    const languageOptions = [
      "English",
      "Spanish",
      "French",
      "Russian",
      "German",
      "Arabic",
      "Sanskrit",
    ];

    const genderOptions = [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ];

    const contactOptionsOptions = ["Email", "Message", "Phone"];

    return {
      userDataInfo,
      languageOptions,
      genderOptions,
      contactOptionsOptions,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
