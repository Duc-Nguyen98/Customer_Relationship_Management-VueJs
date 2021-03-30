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
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Full Name" label-for="birth-date">
            <flat-pickr
              v-model="userDataInfo.dob"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d' }"
              placeholder="Full Name"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Email" label-for="birth-date">
            <flat-pickr
              v-model="userDataInfo.dob"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d' }"
              placeholder="Email"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Adress" label-for="birth-date">
            <flat-pickr
              v-model="userDataInfo.dob"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d' }"
              placeholder="Adress"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Birth Date -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Birth Date" label-for="birth-date">
            <flat-pickr
              v-model="userDataInfo.dob"
              class="form-control"
              :config="{ dateFormat: 'Y-m-d' }"
              placeholder="YYYY-MM-DD"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Mobile" label-for="mobile">
            <b-form-input id="mobile" v-model="userDataInfo.mobile" />
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
              v-model="selected"
              :options="options"
            ></b-form-select>
            <!-- <b-form-input id="city" v-model="userDataInfo.city" /> -->
          </b-form-group>
        </b-col>

        <!-- Field: State -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="District Name" label-for="state">
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <!-- Field: Country -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Ward Name" label-for="country">
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
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
            <b-form-textarea id="city" placeholder="Note" />
          </b-form-group>
        </b-col>
      </b-row>
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
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option", disabled: true },
        {
          label: "Grouped options",
          options: [
            { value: { C: "3PO" }, text: "Option with object value" },
            { value: { R: "2D2" }, text: "Another option with object value" },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
