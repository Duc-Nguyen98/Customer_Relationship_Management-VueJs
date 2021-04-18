<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
                ref="previewEl"
                :src="userData.avatar"
                :text="avatarText(userData.fullName)"
                :variant="`light-primary`"
                size="90px"
                rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
                variant="primary"
                @click="$refs.refInputEl.click()"
        >
          <input
                  ref="refInputEl"
                  type="file"
                  class="d-none"
                  @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
                  icon="EditIcon"
                  class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
                variant="outline-secondary"
                class="ml-1"
        >
          <span class="d-none d-sm-inline">Remove</span>
          <feather-icon
                  icon="TrashIcon"
                  class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <b-row>
        <!-- Field: Name  -->
        <b-col cols="12" md="6" lg="4">
          <b-form-group label="Full Name" label-for="Full Name">
            <b-form-input
                    @input="follow"
              id="fullname"
              v-model="userDataInfo.name"
              :state="userDataInfo.name.length > 0"
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
                    @input="follow"
              id="email"
              v-model="userDataInfo.email"
              :state="userDataInfo.email.length > 0"
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
              @input="follow"
              v-model="userDataInfo.address"
              :state="userDataInfo.address.length > 0"
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
                    @input="follow"
              id="datepicker-valid"
              v-model="userDataInfo.birthDay"
              :state="userDataInfo.birthDay.length > 0"
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
                    @input="follow"
              id="telephone"
              v-model="userDataInfo.telephone"
              :state="userDataInfo.telephone.length > 0"
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
                    @input="follow"
              id="gender"
              v-model="userDataInfo.gender"
              :options="genderOptions"
              value="male"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="6">
          <b-form-group label="Group" label-for="Group">
            <validation-provider
                    #default="{ errors }"
                    name="Group"
                    rules="required|"
            >
              <v-select
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :value="userDataInfo.groups"
                      :options="groupOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => {
                          userDataInfo.groups = val;
                           change = true;
                      }"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="6">
          <b-form-group label="Avatar" label-for="Avatar">
            <b-form-file @input="follow" v-model="userDataInfo.avatar" ref="file-input"></b-form-file>
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
                    @input="follow"
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
                    @input="follow"
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
                    @input="follow"
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
              v-model="userDataInfo.note"
              :state="userDataInfo.note.length > 0"
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
    BMedia,
    BAvatar, BFormFile,
  } from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import {ValidationProvider, ValidationObserver} from "vee-validate";
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
    BMedia,
    BAvatar,
    BFormFile,

    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup({userData}) {
    const userDataInfo = ref( userData )
    userDataInfo.value.avatar = null
    const change = false

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

    const groupOptions = [
      {label: "Khách hàng thường", value: 0},
      {label: "khách hàng thân thiết", value: 1},
      {label: "Khách hàng tiềm năng", value: 2},
    ];

    const genderOptions = [
      { text: "Male", value: 0 },
      { text: "Female", value: 1 },
    ];

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      userData.avatar = base64
    })

    return {
      userDataInfo,
      genderOptions,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,
      change,
      groupOptions,
      avatarText,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    };
  },
  methods: {
    //check thay đổi
    follow() {
      this.change = true;
    },

    // auto close
    autoClose() {
      if (this.change) {
          this.confirmChange()
      } else {
          this.$router.push({name: 'apps-customers-list'})
      }
    },

    confirmChange() {
      this.$swal({
        title: 'Have a litle change, are you sure cancel?',
        html: "I will close in <strong>3</strong> seconds.",
        icon: 'warning',
        timer: 3000,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$router.push({name: 'apps-customers-list'})
        }
      })
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
