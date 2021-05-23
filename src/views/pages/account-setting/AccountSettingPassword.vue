<template>
  <b-card>
    <!-- form -->
    <validation-observer ref="simpleRules">
       <b-form>
      <b-row>
        <!-- old password -->
        <b-col md="6">
          <validation-provider
                  #default="{ errors }"
                  name="Old Password"
                  rules="required"
          >
            <b-form-group
              label="Old Password"
              label-for="account-old-password"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                        :state="errors.length > 0 ? false : null"
                  id="account-old-password"
                  v-model="passwordOld"
                  name="old-password"
                  :type="passwordFieldTypeOld"
                  placeholder="Old Password"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIconOld"
                    class="cursor-pointer"
                    @click="togglePasswordOld"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!--/ old password -->
      </b-row>
      <b-row>
        <!-- new password -->
        <b-col md="6">
          <validation-provider
                  #default="{ errors }"
                  name="New Password"
                  rules="required"
          >
          <b-form-group
            label-for="account-new-password"
            label="New Password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                      :state="errors.length > 0 ? false : null"
                id="account-new-password"
                v-model="passwordNew"
                :type="passwordFieldTypeNew"
                name="new-password"
                placeholder="New Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconNew"
                  class="cursor-pointer"
                  @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <validation-provider
                  #default="{ errors }"
                  name="Retype New Password"
                  rules="required"
          >
            <b-form-group
            label-for="account-retype-new-password"
            label="Retype New Password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                      :state="errors.length > 0 ? false : null"
                id="account-retype-new-password"
                v-model="RetypePassword"
                :type="passwordFieldTypeRetype"
                name="retype-password"
                placeholder="New Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconRetype"
                  class="cursor-pointer"
                  @click="togglePasswordRetype"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <!--/ retype password -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="changePass"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
            @click="reset"
          >
            Reset
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {ValidationProvider, ValidationObserver} from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
    reset() {
      this.passwordOld = ''
      this.passwordNew = ''
      this.RetypePassword = ''
    },
    changePass() {
      this.locale = this.locale === "en" ? "vi" : "en";

      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
            if (this.passwordNew == this.RetypePassword) {
              this.$store.dispatch('app-user/changePass', {passwordOld: this.passwordOld, passwordNew: this.passwordNew})
                      .then(response => {
                        if (response.data.success) {
                          this.reset()
                          this.$toast({
                            component: ToastificationContent,
                            props: {
                              title: response.data.message,
                              icon: 'AlertTriangleIcon',
                              variant: 'success',
                            },
                          })
                        } else {
                          this.$toast({
                            component: ToastificationContent,
                            props: {
                              title: 'Update user failed.',
                              icon: 'AlertTriangleIcon',
                              variant: 'danger',
                            },
                          })
                        }
                      })
                      .catch((err) => {
                        console.log(err)
                        this.$toast({
                          component: ToastificationContent,
                          props: {
                            title: 'Error update user',
                            icon: 'AlertTriangleIcon',
                            variant: 'danger',
                          },
                        })
                      })
            }
        }
      })
    }
  },
}
</script>
