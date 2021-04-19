<template>
    <div>
        <!-- Media -->
        <b-media class="mb-2">
            <template #aside>
                <b-avatar
                        ref="previewEl"
                        :src="api + userData.avatar"
                        :text="avatarText(userData.fullName)"
                        :variant="`light-${resolveUserRoleVariant(userData.role)}`"
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
                        @click="deleteUser(userData._id)"
                >
                    <span class="d-none d-sm-inline">Remove</span>
                    <feather-icon
                            icon="TrashIcon"
                            class="d-inline d-sm-none"
                    />
                </b-button>
            </div>
        </b-media>

        <!-- User Info: Input Fields -->
        <b-form>
            <b-row>

                <!-- Field: Username -->
                <b-col
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="Name"
                            label-for="full-name"
                    >
                        <b-form-input
                                id="full-name"
                                @input="follow"
                                v-model="userData.name"
                        />
                    </b-form-group>
                </b-col>

                <!-- Field: Full Name -->
                <b-col
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="Email"
                            label-for="email"
                    >
                        <b-form-input
                                id="email"
                                @input="follow"
                                v-model="userData.email"
                        />
                    </b-form-group>
                </b-col>

                <!-- Field: Address -->
                <!--        <b-col-->
                <!--          cols="12"-->
                <!--          md="4"-->
                <!--        >-->
                <!--          <b-form-group-->
                <!--            label="Address"-->
                <!--            label-for="address"-->
                <!--          >-->
                <!--            <b-form-input-->
                <!--              id="address"-->
                <!--              v-model="userData.address"-->
                <!--              type="email"-->
                <!--            />-->
                <!--          </b-form-group>-->
                <!--        </b-col>-->

                <!-- Birth Day -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-group>
                        <label for="datepicker-placeholder">Birth Day</label>
                        <b-form-datepicker
                                @input="follow"
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
                                    @input="follow"
                                    v-model="userData.telephone"
                                    :state="errors.length > 0 ? false : null"
                                    placeholder="Enter Telephone Number"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- Field: Gender -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-radio-group
                            @input="follow"
                            v-model="userData.gender"
                            :options="genderOptions"
                            class="demo-inline-spacing"
                            name="radio-validation"
                            value="male"
                    >
                    </b-form-radio-group>
                </b-col>

                <!-- Field: Role -->
                <b-col
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="User Role"
                            label-for="user-role"
                    >
                        <v-select
                                @input="follow"
                                v-model="userData.role"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="roleOptions"
                                :reduce="val => val.value"
                                :clearable="false"
                                input-id="user-role"
                        />
                    </b-form-group>
                </b-col>

                <!-- Field: Email -->
                <b-col
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="Password"
                            label-for="password"
                    >
                        <b-form-input
                                @input="follow"
                                id="password"
                                :type="type ? 'password' : 'text'"
                                v-model="userData.password"
                        />
                        <feather-icon
                                @click="hidePass"
                                :icon="type ? 'EyeOffIcon' : 'EyeIcon'"
                                class="eye d-inline"
                        />
                    </b-form-group>
                </b-col>

            </b-row>
        </b-form>

        <!-- PERMISSION TABLE -->
        <b-card
                no-body
                class="border mt-1"
        >
            <b-card-header class="p-1">
                <b-card-title class="font-medium-2">
                    <feather-icon
                            icon="LockIcon"
                            size="18"
                    />
                    <span class="align-middle ml-50">Permission</span>
                </b-card-title>
            </b-card-header>
            <b-table
                    striped
                    responsive
                    class="mb-0"
                    :items="permissionsData"
            >
                <template #cell(module)="data">
                    {{ data.value }}
                </template>
                <template #cell()="data">
                    <b-form-checkbox :checked="data.value"/>
                </template>
            </b-table>
        </b-card>

        <!-- Action Buttons -->
        <div class="d-flex float-right mt-2">
            <b-button
                    type="button"
                    variant="outline-secondary"
                    class="mr-2 text-uppercase"
                    @click="autoClose"
            >
                Cancel
            </b-button>
            <b-button @click="updateUser({userData: userData, _id: userData._id})"
                      variant="primary"
                      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            >
                Save Changes
            </b-button>
        </div>
    </div>
</template>

<script>
    import {
        BButton,
        BMedia,
        BAvatar,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BTable,
        BCard,
        BCardHeader,
        BCardTitle,
        BFormCheckbox,
        BFormRadioGroup,
        BFormDatepicker
    } from 'bootstrap-vue'
    import {avatarText} from '@core/utils/filter'
    import vSelect from 'vue-select'
    import {useInputImageRenderer} from '@core/comp-functions/forms/form-utils'
    import {ref} from '@vue/composition-api'
    import useUsersList from '../users-list/useUsersList'
    import {ValidationProvider, ValidationObserver} from "vee-validate"
    // Notification
    import {useToast} from 'vue-toastification/composition'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

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

    export default {
        components: {
            BButton,
            BMedia,
            BAvatar,
            BRow,
            BCol,
            BFormGroup,
            BFormInput,
            BForm,
            BTable,
            BCard,
            BCardHeader,
            BCardTitle,
            BFormCheckbox,
            BFormRadioGroup,
            BFormDatepicker,
            vSelect,
            ValidationProvider,
            ValidationObserver,
        },
        props: {
            userInfo: {
                type: Object,
                required: true,
            },
        },
        setup(props) {

            const toast = useToast()

            const userData = ref(props.userInfo)

            const api = process.env.VUE_APP_ROOT_API

            const {resolveUserRoleVariant} = useUsersList()

            const roleOptions = [
                {label: "Employee", value: "employee"},
                {label: "Admin", value: "admin"},
            ]

            const genderOptions = [
                {text: "Male", value: 0},
                {text: "Female", value: 1},
            ]

            const permissionsData = [
                {
                    module: 'Admin',
                    read: true,
                    write: false,
                    create: false,
                    delete: false,
                },
                {
                    module: 'Staff',
                    read: false,
                    write: true,
                    create: false,
                    delete: false,
                },
                {
                    module: 'Author',
                    read: true,
                    write: false,
                    create: true,
                    delete: false,
                },
                {
                    module: 'Contributor',
                    read: false,
                    write: false,
                    create: false,
                    delete: false,
                },
                {
                    module: 'User',
                    read: false,
                    write: false,
                    create: false,
                    delete: true,
                },
            ]
            const type = ref(true)
            const hidePass = () => {
                type.value = !type.value
            }

            const {
                deleteUser,
            } = useUsersList();

            // ? Demo Purpose => Update image on click of update
            const refInputEl = ref(null)
            const previewEl = ref(null)

            const {inputImageRenderer} = useInputImageRenderer(refInputEl, base64 => {
                // eslint-disable-next-line no-param-reassign
                // props.userData.avatar = base64

                store.dispatch('app-user/uploadUser', {
                    file: refInputEl.value.files[0],
                    _id: router.currentRoute.params.id
                })
                    .then(response => {
                        if (response.data.success) {
                            props.userData.avatar = response.data.data
                        }
                    })
                    .catch(error => {
                        props.userData.avatar = undefined
                    })
            })

            return {
                api,
                toast,
                userData,
                resolveUserRoleVariant,
                avatarText,
                roleOptions,
                genderOptions,
                permissionsData,
                deleteUser,

                //  ? Demo - Update Image on click of update button
                refInputEl,
                previewEl,
                inputImageRenderer,

                //change Pass
                hidePass,
                type,
            }
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
            updateUser(userData) {
                store
                    .dispatch('app-user/updateUser', userData)
                    .then(response => {
                        if (response.data.success) {
                            this.alert("success", "Update user successfully.")
                            this.$router.push({name: 'apps-users-list'});
                        } else {
                            this.alert("danger", "Update user failed.")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
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

            //check thay đổi
            follow() {
                this.change = true;
            },

            // auto close
            autoClose() {
                if (this.change) {
                    this.confirmChange()
                } else {
                    this.$router.push({name: 'apps-users-list'})
                }
            },

            confirmChange() {
                this.$swal({
                    title: 'Have a litle change, are you sure cancel?',
                    html: "I will close in <strong>3</strong> seconds.",
                    icon: 'warning',
                    timer: 3000,
                    showCancelButton: true,
                    confirmButtonText: 'Yes, redirect to list!',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-danger ml-1',
                    },
                    buttonsStyling: false,
                }).then(result => {
                    if (result.value) {
                        this.$router.push({name: 'apps-users-list'})
                    }
                })
            },
        },
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
</style>
<style>
    .eye {
        position: absolute !important;
        top: 32px !important;
        right: 25px !important;
    }
</style>