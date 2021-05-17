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
                        v-if="userData.softDelete == 0"
                        variant="outline-secondary"
                        class="ml-1"
                        @click="delUser(userData._id)"
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
        <validation-observer ref="simpleRules">
            <b-form>
            <b-row>
                <!-- Field: Username -->
                <b-col
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="Name"
                            label-for="name"
                    >
                        <validation-provider
                                #default="{ errors }"
                                rules="required"
                                name="Name"
                        >
                            <b-form-input
                                    disabled=""
                                    id="name"
                                    :state="errors.length > 0 ? false : null"
                                    v-model="userData.name"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
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
                        <validation-provider
                                #default="{ errors }"
                                rules="required"
                                name="Email"
                        >
                        <b-form-input
                                disabled=""
                                id="email"
                                v-model="userData.email"
                                :state="errors.length > 0 ? false : null"
                        />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
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
                        <validation-provider
                                #default="{ errors }"
                                rules="required"
                                name="Telephone Number"
                        >
                            <b-form-datepicker
                                    :state="errors.length > 0 ? false : null"
                                    id="datepicker-placeholder"
                                    placeholder="Choose a date"
                                    local="vi"
                                    v-model="userData.birthDay"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
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
                                    :state="errors.length > 0 ? false : null"
                                    v-model="userData.telephone"
                                    placeholder="Enter Telephone Number"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- Field: Gender -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-group>
                        <label>Gender</label>
                        <validation-provider
                                #default="{ errors }"
                                rules="required"
                                name="Gender"
                        >
                            <b-form-radio-group
                                    :state="errors.length > 0 ? false : null"
                                    v-model="userData.gender"
                                    :options="genderOptions"
                                    class="demo-inline-spacing"
                                    name="radio-validation"
                                    value="male"
                            >
                            </b-form-radio-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

                <!-- Field: Role -->
                <b-col
                        v-if="userData.role != 'super admin'"
                        cols="12"
                        md="4"
                >
                    <b-form-group
                            label="User Role"
                            label-for="user-role"
                    >
                        <validation-provider
                                #default="{ errors }"
                                rules="required"
                                name="Role"
                        >
                            <v-select
                                    :state="errors.length > 0 ? false : null"
                                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                    :options="roleOptions"
                                    :clearable="false"
                                    input-id="user-role"
                                    :value="userData.role.charAt(0).toUpperCase() + userData.role.slice(1)"
                                    :selectable="option => !option.value.includes(userData.role)"
                                    @input="chooseRole($event)"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
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
                        <validation-provider
                                #default="{ errors }"
                                rules="required|max:50|min:6"
                                name="Password"
                        >
                        <b-form-input
                                :state="errors.length > 0 ? false : null"
                                id="password"
                                :type="type ? 'password' : 'text'"
                                v-model="userData.password"
                        />
                        <feather-icon
                                @click="hidePass"
                                :icon="type ? 'EyeOffIcon' : 'EyeIcon'"
                                class="eye d-inline"
                        />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>

            </b-row>
        </b-form>
        </validation-observer>
        <!-- PERMISSION TABLE -->
        <b-card
                v-if="userData.role != 'super admin'"
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
                    {{ data.value.charAt(0).toUpperCase() + data.value.slice(1) }}
                </template>
                <template #cell(read)="data">
                    <b-form-checkbox @change="changeRole(data.value, {action: 'read', subject: data.item.module})" v-model="data.value"/>
                </template>
                <template #cell(create)="data">
                    <b-form-checkbox @change="changeRole(data.value, {action: 'create', subject: data.item.module})" v-model="data.value"/>
                </template>
                <template #cell(update)="data">
                    <b-form-checkbox @change="changeRole(data.value, {action: 'update', subject: data.item.module})" v-model="data.value"/>
                </template>
                <template #cell(delete)="data">
                    <b-form-checkbox @change="changeRole(data.value, {action: 'delete', subject: data.item.module})" v-model="data.value"/>
                </template>
            </b-table>
        </b-card>

        <!-- Action Buttons -->
        <div class="d-flex float-right mt-2">
            <b-button
                    type="button"
                    variant="outline-secondary"
                    class="mr-2 text-uppercase"
                    @click="$router.push({name: 'apps-users-list'})"
            >
                Cancel
            </b-button>
            <b-button @click="validationForm({userData: userData, _id: userData.idUser})"
                      variant="primary"
                      class="mb-1 mb-sm-0 mr-0 mr-sm-1 text-uppercase"
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

            const roleOptions = ref([]);

            store.dispatch('app-user/fetchRoles')
                .then(response => {
                    if (response.data.success) {
                        let listRole = response.data.listRole.filter(obj => obj.name != "Super Admin")
                            listRole.map(obj => {
                            roleOptions.value.push({
                                label: obj.name,
                                value: obj.name.toLowerCase(),
                                ability: obj.ability,
                                modules: obj.modules,
                                disabled: true,
                            })
                        })
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        userData.value = undefined
                    }
                })

            const genderOptions = [
                {text: "Male", value: 0},
                {text: "Female", value: 1},
            ]

            const permissionsData = ref(
                [
                    {
                        module: 'customers',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'voucherItems',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'services',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'users',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'shops',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupVouchers',
                        read: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupCustomers',
                        read: false,
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
                            read: action.includes('read') ? true : false,
                            create: action.includes('create') ? true : false,
                            update: action.includes('update') ? true : false,
                            delete: action.includes('delete') ? true : false,
                        })
                    }
                })
            }

            changeRoleUser(userData.value.ability, userData.value.modules)

            const chooseRole = (role) => {
                changeRoleUser(role.ability, role.modules)
                userData.value.role = role.value
            }

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
                            userData.value.avatar = response.data.data
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
                toast,
                userData,
                resolveUserRoleVariant,
                avatarText,
                roleOptions,
                genderOptions,
                permissionsData,
                deleteUser,
                chooseRole,
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

            changeRole(bol, {action, subject}) {
                if (bol == false) {
                    this.userData.ability = this.userData.ability.filter(obj => obj.action != action || obj.subject != subject)
                } else {
                    this.userData.ability.push({'action': action, 'subject': subject})
                }

                let module = this.userData.ability.filter(obj => obj.subject == subject)
                if (module.length == 0) {
                    this.userData.modules = this.userData.modules.filter(val => val != subject)
                } else if (!subject.includes(this.userData.modules)) {
                    this.userData.modules.push(subject)
                }
            },

            validationForm(userData) {
                this.locale = this.locale === "en" ? "vi" : "en";

                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        // eslint-disable-next-line
                        store.dispatch('app-user/updateUser', userData)
                            .then(response => {
                                if (response.data.success) {
                                    this.alert("success", "Update user successfully.")
                                    this.$router.push({name: 'apps-users-list'});
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
                    }
                });
            },

            // Delete soft one user
            async delUser(_id) {
                const data = await this.deleteUser(_id);
                if (data) {
                    this.userData.softDelete = 1;
                    this.$router.push({name: 'apps-users-list-del'})
                }
            }
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