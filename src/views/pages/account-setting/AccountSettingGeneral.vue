<template>
    <b-card>

        <!-- media -->
        <b-media no-body>
            <b-media-aside>
                <b-link>
                    <b-img
                            ref="previewEl"
                            rounded
                            :src="api+optionsLocal.avatar"
                            height="80"
                    />
                </b-link>
                <!--/ avatar -->
            </b-media-aside>

            <b-media-body class="mt-75 ml-75">
                <!-- upload button -->
                <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        size="sm"
                        class="mb-75 mr-75"
                        @click="$refs.refInputEl.$el.click()"
                >
                    Upload
                </b-button>
                <b-form-file
                        ref="refInputEl"
                        accept=".jpg, .png, .gif"
                        :hidden="true"
                        plain
                        @input="inputImageRenderer"
                />
                <!--/ upload button -->

                <!-- reset -->
                <!--                <b-button-->
                <!--                        v-ripple.400="'rgba(186, 191, 199, 0.15)'"-->
                <!--                        variant="outline-secondary"-->
                <!--                        size="sm"-->
                <!--                        class="mb-75 mr-75"-->
                <!--                >-->
                <!--                    Reset-->
                <!--                </b-button>-->
                <!--/ reset -->
                <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
            </b-media-body>
        </b-media>
        <!--/ media -->

        <!-- form -->
        <validation-observer ref="simpleRules">
            <b-form class="mt-2">
                <b-row>
                    <b-col sm="6">
                        <validation-provider
                                #default="{ errors }"
                                name="Name"
                                rules="required"
                        >
                            <b-form-group
                                    label="Name"
                                    label-for="name"
                            >
                                <b-form-input
                                        :state="errors.length > 0 ? false : null"
                                        v-model="optionsLocal.name"
                                        placeholder="Name"
                                        name="name"
                                />
                            </b-form-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-col>
                    <!-- Birth Day -->
                    <b-col sm="6">
                        <b-form-group>
                            <label for="datepicker-placeholder">Birth Day</label>
                            <b-form-datepicker
                                    id="datepicker-placeholder"
                                    placeholder="Choose a date"
                                    local="vi"
                                    v-model="optionsLocal.birthDay"
                            />
                        </b-form-group>
                    </b-col>

                    <!--  Gender -->
                    <b-col sm="6">
                        <b-form-radio-group
                                v-model="optionsLocal.gender"
                                :options="genderOptions"
                                class="demo-inline-spacing"
                                name="radio-validation"
                                value="0"
                        >
                        </b-form-radio-group>
                    </b-col>

                    <b-col sm="6">
                        <validation-provider
                                #default="{ errors }"
                                name="E-mail"
                                rules="required|email"
                        >
                            <b-form-group
                                    label="E-mail"
                                    label-for="mail"
                            >
                                <b-form-input
                                        :state="errors.length > 0 ? false : null"
                                        v-model="optionsLocal.email"
                                        name="email"
                                        placeholder="Email"
                                />

                            </b-form-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-col>

                    <b-col sm="6">
                        <validation-provider
                                #default="{ errors }"
                                name="Telephone"
                                rules="required"
                        >
                            <b-form-group
                                    label="Telephone"
                                    label-for="telephone"
                            >
                                <b-form-input
                                        :state="errors.length > 0 ? false : null"
                                        v-model="optionsLocal.telephone"
                                        name="telephone"
                                        placeholder="Telephone"
                                />

                            </b-form-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-col>

                    <b-col sm="6">
                        <b-form-group
                                label="Role"
                                label-for="role"
                        >
                            <b-form-input
                                    disabled=""
                                    v-model="optionsLocal.role.charAt(0).toUpperCase() + optionsLocal.role.slice(1)"
                                    name="role"
                                    placeholder="Role"
                            />

                        </b-form-group>
                    </b-col>

                    <b-col sm="12">
                        <b-card
                                v-if="optionsLocal.role != 'super admin'"
                                no-body
                                class="border mt-1"
                        >
                            <b-card-header class="p-1">
                                <b-card-title class="font-medium-2">
                                    <feather-icon
                                            icon="LockIcon"
                                            size="18"
                                    />
                                    <span class="align-middle ml-50">Permission (read only)</span>
                                </b-card-title>
                            </b-card-header>
                            <b-table
                                    striped
                                    responsive
                                    class="mb-0"
                                    :items="permissionsData"
                            >
                                <template #cell(module)="data">
                                    {{ data.value.charAt(0).toUpperCase() + data.value.slice(1) }}
                                </template>
                                <template #cell(write)="data">
                                    <b-form-checkbox
                                            v-model="data.value"/>
                                </template>
                                <template #cell(create)="data">
                                    <b-form-checkbox
                                            v-model="data.value"/>
                                </template>
                                <template #cell(update)="data">
                                    <b-form-checkbox
                                            v-model="data.value"/>
                                </template>
                                <template #cell(delete)="data">
                                    <b-form-checkbox
                                            v-model="data.value"/>
                                </template>
                            </b-table>
                        </b-card>
                    </b-col>

                    <!-- alert -->
                    <!--        <b-col-->
                    <!--          cols="12"-->
                    <!--          class="mt-75"-->
                    <!--        >-->
                    <!--          <b-alert-->
                    <!--            show-->
                    <!--            variant="warning"-->
                    <!--            class="mb-50"-->
                    <!--          >-->
                    <!--            <h4 class="alert-heading">-->
                    <!--              Your email is not confirmed. Please check your inbox.-->
                    <!--            </h4>-->
                    <!--            <div class="alert-body">-->
                    <!--              <b-link class="alert-link">-->
                    <!--                Resend confirmation-->
                    <!--              </b-link>-->
                    <!--            </div>-->
                    <!--          </b-alert>-->
                    <!--        </b-col>-->
                    <!--/ alert -->

                    <b-col cols="12">
                        <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="primary"
                                class="mt-2 mr-1"
                                @click="updateUser"
                                :disabled="disabled"
                        >
                            Save changes
                        </b-button>
                        <b-button
                                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                                variant="outline-secondary"
                                type="reset"
                                class="mt-2"
                                @click.prevent="resetForm"
                        >
                            Reset
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
    </b-card>
</template>

<script>
    import {
        BFormFile,
        BButton,
        BForm,
        BFormGroup,
        BFormInput,
        BRow,
        BCol,
        BAlert,
        BCard,
        BCardText,
        BMedia,
        BMediaAside,
        BMediaBody,
        BLink,
        BImg,
        BFormDatepicker, BFormRadioGroup,
        BTable,
        BFormCheckbox,
        BCardTitle,
        BCardHeader,
    } from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'
    import {useInputImageRenderer} from '@core/comp-functions/forms/form-utils'
    import {onUnmounted, ref} from '@vue/composition-api'
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
    import store from "@/store";

    // Notification
    import {useToast} from 'vue-toastification/composition'
    import ToastificationContent from "@core/components/toastification/ToastificationContent";
    import router from "@/router";
    import userStoreModule from "@/views/apps/user/userStoreModule";

    export default {
        components: {
            ValidationProvider,
            ValidationObserver,
            BFormDatepicker,
            BFormRadioGroup,
            BButton,
            BForm,
            BImg,
            BFormFile,
            BFormGroup,
            BFormInput,
            BRow,
            BCol,
            BAlert,
            BCard,
            BCardText,
            BMedia,
            BMediaAside,
            BMediaBody,
            BLink,
            BTable,
            BFormCheckbox,
            BCardTitle,
            BCardHeader,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                profileFile: null,
            }
        },
        setup() {
            const toast = useToast()

            const optionsLocal = ref(JSON.parse(localStorage.getItem('userData')))
            const api = process.env.VUE_APP_ROOT_API

            const USER_APP_STORE_MODULE_NAME = 'app-user'
            // Register module
            if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
                store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

            // UnRegister on leave
            onUnmounted(() => {
                if (store.hasModule(USER_APP_STORE_MODULE_NAME))
                    store.unregisterModule(USER_APP_STORE_MODULE_NAME)
            })

            const refInputEl = ref(null)
            const previewEl = ref(null)

            const genderOptions = [
                {text: "Male", value: 0},
                {text: "Female", value: 1},
            ];

            const resetForm = () => {
                optionsLocal.value = JSON.parse(localStorage.getItem('userData'))
            }

            const alert = (variant, message) => {
                toast({
                    component: ToastificationContent,
                    props: {
                        title: "Notification",
                        icon: "BellIcon",
                        text: "👋 " + message,
                        variant,
                    },
                })
            }


            const permissionsData = ref(
                [
                    {
                        module: 'customers',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'voucherItems',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'services',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'users',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'shop',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupVoucher',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupCustomer',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                ]
            );

            const changeRoleUser = (ability, modules) => {
                modules.map(val => {
                    let data = permissionsData.value.filter(obj => obj.module != val)
                    if (data.length < permissionsData.value.length) {
                        permissionsData.value = data
                        let ability_new = ability.filter(obj => obj.subject == val)
                        let action = ability_new.map(obj => obj.action)
                        permissionsData.value.unshift({
                            module: val,
                            write: action.includes('write') ? true : false,
                            create: action.includes('create') ? true : false,
                            update: action.includes('update') ? true : false,
                            delete: action.includes('delete') ? true : false,
                        })
                    }
                })

            }

            changeRoleUser(optionsLocal.value.ability, optionsLocal.value.modules)

            const disabled = ref(false)
            const saveUser = () => {
                const userData = {
                    name: optionsLocal.value.name,
                    email: optionsLocal.value.email,
                    gender: optionsLocal.value.gender,
                    birthDay: optionsLocal.value.birthDay,
                    telephone: optionsLocal.value.telephone,
                }

                store.dispatch('app-user/saveUser', userData)
                    .then(response => {
                        if (response.data.success) {
                            alert("success", "Update user successfully.")
                            localStorage.setItem('userData', JSON.stringify(optionsLocal.value))
                            disabled.value = true
                        } else {
                            alert("danger", "Update user failed.")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Error update user',
                                icon: 'AlertTriangleIcon',
                                variant: 'danger',
                            },
                        })
                    })
            }

            const {inputImageRenderer} = useInputImageRenderer(refInputEl, base64 => {
                // eslint-disable-next-line no-param-reassign
                // props.userData.avatar = base64
                store.dispatch('app-user/uploadUser', {
                    file: refInputEl.value.files[0],
                    _id: optionsLocal.value._id
                })
                    .then(response => {
                        if (response.data.success) {
                            optionsLocal.value.avatar = response.data.data
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

            return {
                api,
                refInputEl,
                previewEl,
                saveUser,
                resetForm,
                alert,
                disabled,
                optionsLocal,
                genderOptions,
                permissionsData,
                inputImageRenderer,
            }
        },
        methods: {
            updateUser() {
                this.locale = this.locale === "en" ? "vi" : "en";

                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        this.saveUser()
                    }
                })
            }
        }
    }
</script>
