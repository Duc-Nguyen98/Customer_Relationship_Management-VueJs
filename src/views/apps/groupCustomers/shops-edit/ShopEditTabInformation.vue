<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
                ref="previewEl"
                :src="api + shopData.avatar"
                :text="avatarText(shopData.name)"
                :variant="`light-primary`"
                size="90px"
                rounded
        />
      </template>
      <h4 class="mb-1">
        {{ shopData.name }}
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
                v-if="shopData.softDelete == 0"
                @click="delShop(shopData._id)"
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
    <validation-observer ref="simpleRules">
      <b-form class="mt-1">
        <!-- Header: Personal Info -->
        <div class="d-flex mb-2">
          <feather-icon icon="UserIcon" size="19"/>
          <h4 class="mb-0 ml-50">Shop Information</h4>
        </div>
        <b-row>
          <!--  Full Name-->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Shop Name</label>
              <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Shop Name"
              >
                <b-form-input
                        v-model="shopData.name"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Shop Name"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!--  Full Name-->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Owner Shop</label>
              <validation-provider
                      #default="{ errors }"
                      rules="required"
                      name="Owner Shop"
              >
                <b-form-input
                        v-model="shopData.ownerShop"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Owner Shop"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- email -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label for="email">Email</label>
              <validation-provider
                      id="email"
                      #default="{ errors }"
                      name="Email"
                      rules="required|email"
              >
                <b-form-input
                        v-model="shopData.email"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Telephone -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Telephone</label>
              <validation-provider
                      #default="{ errors }"
                      name="Telephone"
                      rules="required|integer"
              >
                <b-form-input
                        v-model="shopData.telephone"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Telephone"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>


          <!-- Telephone Shop -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Telephone Shop</label>
              <validation-provider
                      #default="{ errors }"
                      name="Telephone Shop"
                      rules="required|integer"
              >
                <b-form-input
                        v-model="shopData.telephoneShop"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Telephone Shop"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Fax Shop -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Fax</label>
              <validation-provider
                      #default="{ errors }"
                      name="Fax"
                      rules="required|integer"
              >
                <b-form-input
                        v-model="shopData.fax"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Fax"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Status -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label for="status">Status</label>
              <validation-provider
                      #default="{ errors }"
                      name="Status"
                      rules="required"
              >
                <v-select
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :state="errors.length > 0 ? false : null"
                        :value="shopData.status"
                        :options="optionsActive"
                        :reduce="(val) => val.value"
                        @input="(val) => data.status = val"
                        class="w-100"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Region" label-for="Region">
              <validation-provider
                      #default="{ errors }"
                      name="Region"
                      rules="required"
              >
                <v-select
                        :state="errors.length > 0 ? false : null"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :value="shopData.region"
                        :options="regionOptions"
                        class="w-100"
                        :reduce="(val) => val.value"
                        @input="(val) => shopData.region = val"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Address -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group>
              <label>Address</label>
              <validation-provider
                      #default="{ errors }"
                      name="Address"
                      rules="required"
              >
                <b-form-input
                        v-model="shopData.address"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Address"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Fanpage -->
          <b-col cols="12" md="6" lg="6">
            <b-form-group>
              <label>Fanpage</label>
              <validation-provider
                      #default="{ errors }"
                      name="Fanpage"
                      rules=""
              >
                <b-form-input
                        v-model="shopData.fanpage"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Fanpage"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Website -->
          <b-col cols="12" md="6" lg="6">
            <b-form-group>
              <label>Website</label>
              <validation-provider
                      #default="{ errors }"
                      name="Fanpage"
                      rules=""
              >
                <b-form-input
                        v-model="shopData.website"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Website"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Header: Personal Note -->
        <div class="d-flex my-2">
          <feather-icon icon="ClipboardIcon" size="19"/>
          <h4 class="mb-0 ml-50">Note</h4>
        </div>
        <b-row>
          <!--  Note -->
          <b-col cols="12" md="12" lg="12">
            <b-form-group label="Note Information" label-for="Note Information">
              <validation-provider
                      #default="{ errors }"
                      name="Note"
                      rules=""
              >
                <b-form-textarea
                        id="textarea-rows"
                        placeholder="Note Here..."
                        rows="8"
                        v-model="shopData.note"
                        :state="errors.length > 0 ? false : null"
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
import useShopsList from '../shops-list/useShopsList';

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
    shopInfo: {
      type: Object,
      required: true,
    },
  },
  setup({shopInfo}) {
    const toast = useToast()

    const shopData = ref( shopInfo )

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

    const optionsActive = [
      { label: "Inactive", value: 0 },
      { label: "Active", value: 1 },
    ];

    const regionOptions = [
      { label: "TP. Ha Noi", value: 0 },
      { label: "TP. Ho Chi Minh", value: 1 },
    ];

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      // shopData.avatar = base64

      store.dispatch('app-shops/uploadCustomer', {
        file: refInputEl.value.files[0],
        _id: router.currentRoute.params.id
      })
              .then(response => {
                if (response.data.success) {
                  shopData.value.avatar = response.data.data
                  toast({
                    component: ToastificationContent,
                    props: {
                      title: "Notification",
                      icon: "BellIcon",
                      text: "👋 Upload avatar success",
                      variant: 'success',
                    },
                  })
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
      deleteShop,
    } = useShopsList();

    return {
      api,
      toast,
      shopData,
      objSelectDistrict,
      objSelectProvince,
      objSelectWard,

      avatarText,
      deleteShop,
      optionsActive,
      regionOptions,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
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
    // Update one user
    validationForm(shopData) {
      this.locale = this.locale === "en" ? "vi" : "en";

      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          // eslint-disable-next-line
          store.dispatch('app-shops/updateShop', shopData)
                  .then(response => {
                    if (response.data.success) {
                      this.alert("success", "Update shop successfully.")
                      this.$router.push({name: 'apps-shops-list'});
                    } else {
                      this.alert("danger", "Update shop failed.")
                    }
                  })
                  .catch((error) => {
                    this.toast({
                      component: ToastificationContent,
                      props: {
                        title: 'Error fetching shops list',
                        icon: 'AlertTriangleIcon',
                        variant: 'danger',
                      },
                    })
                  })
        }
      });
    },

    // Delete soft one user
    async delShop(_id) {
      const data = await this.deleteUser(_id);
      if (data) {
        this.shopData.softDelete = 1;
        this.$router.push({name: 'apps-shops-list-del'})
      }
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
