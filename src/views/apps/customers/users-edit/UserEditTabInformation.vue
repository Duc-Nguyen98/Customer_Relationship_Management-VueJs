<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
                ref="previewEl"
                :src="api + userData.avatar"
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
                v-if="userData.softDelete == 0"
                @click="delUser(userData._id)"
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
              id="fullname"
              v-model="userData.name"
              :state="userData.name.length > 0"
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
              v-model="userData.email"
              :state="userData.email.length > 0"
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

              v-model="userData.address"
              :state="userData.address.length > 0"
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
              v-model="userData.birthDay"
              :state="userData.birthDay.length > 0"
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
              v-model="userData.telephone"
              :state="userData.telephone.length > 0"
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
              v-model="userData.gender"
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
                      :value="userData.groups"
                      :options="groupOptions"
                      class="w-100"
                      :reduce="(val) => val.value"
                      @input="(val) => {
                          userData.groups = val;
                      }"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon icon="MapPinIcon" size="19" />
        <h4 class="mb-0 ml-50">Address</h4>
      </div>

      <!-- Form: Personal Info Form -->
<!--      <b-row class="mt-1">-->
<!--        &lt;!&ndash; Field: Province Name &ndash;&gt;-->
<!--        <b-col cols="12" md="6" lg="4">-->
<!--          <b-form-group label="Province Name" label-for="city">-->
<!--            <b-form-select-->
<!--              v-model="objSelectProvince.selected"-->
<!--              :options="objSelectProvince.options"-->
<!--              :state="objSelectProvince.selected === null ? false : true"-->
<!--            />-->

<!--            &lt;!&ndash; <b-form-input id="city" v-model="userDataInfo.city" /> &ndash;&gt;-->
<!--          </b-form-group>-->
<!--        </b-col>-->

<!--        &lt;!&ndash; Field: District Name &ndash;&gt;-->
<!--        <b-col cols="12" md="6" lg="4">-->
<!--          <b-form-group label="District Name" label-for="state">-->
<!--            <b-form-select-->
<!--              v-model="objSelectDistrict.selected"-->
<!--              :options="objSelectDistrict.options"-->
<!--              :state="objSelectDistrict.selected === null ? false : true"-->
<!--            />-->
<!--          </b-form-group>-->
<!--        </b-col>-->

<!--        &lt;!&ndash; Field: Ward Name &ndash;&gt;-->
<!--        <b-col cols="12" md="6" lg="4">-->
<!--          <b-form-group label="Ward Name" label-for="country">-->
<!--            <b-form-select-->
<!--              v-model="objSelectWard.selected"-->
<!--              :options="objSelectWard.options"-->
<!--              :state="objSelectWard.selected === null ? false : true"-->
<!--            />-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-row>-->

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
              v-model="userData.note"
              :state="userData.note.length > 0"
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
          @click="$router.push({name: 'apps-customers-list'})"
        >
          Cancel
        </b-button>

        <b-button variant="primary" @click="updateUser({userData: userData, _id: userData._id})" class="text-uppercase">
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
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils';
import { avatarText } from '@core/utils/filter';
import {ValidationProvider, ValidationObserver} from "vee-validate";
import useUsersList from '../users-list/useUsersList';

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
  import router from "@/router";
  import ToastificationContent from "@core/components/toastification/ToastificationContent";
  import {useToast} from "vue-toastification/composition";

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
    userInfo: {
      type: Object,
      required: true,
    },
  },
  setup({userInfo}) {
    const toast = useToast()

    const userData = ref( userInfo )

    const api = process.env.VUE_APP_ROOT_API

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
      { label: "Normal customers", value: 0 },
      { label: "Loyal customers", value: 1 },
      { label: "Potential customers", value: 2 },
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
      // userData.avatar = base64

      store.dispatch('app-user/uploadCustomer', {
        file: refInputEl.value.files[0],
        _id: router.currentRoute.params.id
      })
              .then(response => {
                if (response.data.success) {
                  userData.value.avatar = response.data.data
                }
              })
              .catch(error => {
                toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Error fetching users list',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                  },
                })
              })
    })

    const {
      deleteUser,
    } = useUsersList();

    return {
      api,
      toast,
      userData,
      genderOptions,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,
      groupOptions,
      avatarText,
      deleteUser,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    };
  },
  methods: {

    // Update one user
    updateUser(userData) {
      store.dispatch('app-user/updateUser', userData)
              .then(response => {
                if (response.data.success) {
                  this.alert("success", "Update user successfully.")
                  this.$router.push({name: 'apps-customers-list'});
                } else {
                  this.alert("danger", "Update user failed.")
                }
              })
              .catch((error) => {
                this.toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Error fetching users list',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                  },
                })
              })
    },

    // Delete soft one user
    async delUser(_id) {
      const data = await this.deleteUser(_id);
      if (data) {
        this.userData.softDelete = 1;
        this.$router.push({name: 'apps-customers-list-del'})
      }
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
