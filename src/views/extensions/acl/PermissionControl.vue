<template>
    <b-row>
        <b-col
                cols="12"
                md="6"
        >
            <b-card title="Common">
                <b-card-text>No ability is required to view this card</b-card-text>
                <b-card-text class="text-primary">
                    This card is visible to 'user' and 'admin' both
                </b-card-text>
            </b-card>
        </b-col>
        <b-col
                v-if="$can('write', 'Dashboard')"
                cols="12"
                md="6"
        >
            <b-card title="Analytics">
                <b-card-text>User with 'Analytics' subject's 'write' ability can view this card</b-card-text>
                <b-card-text class="text-danger">
                    This card is visible to 'admin' only
                </b-card-text>
            </b-card>
        </b-col>
        <b-col cols="12"
               md="12">
            <b-card title="Role Permissions">
                <b-card-text>User is 'Super Admin' ability can view this card</b-card-text>
                <b-card-text class="text-danger">
                    This card is visible to 'Super Admin' only
                </b-card-text>
                <b-card-body>
                    <validation-observer ref="information_user">
                        <b-form class="mt-1">
                            <!-- Header: Personal Info -->
                            <div class="d-flex mb-2">
                                <feather-icon icon="UserIcon" size="19"/>
                                <h4 class="mb-0 ml-50">{{ action ? 'View And Update Role Permissions' : 'Create New RolePermissions' }}</h4>
                            </div>
                            <b-row>
                                <!-- Field: Name  -->
<!--                                <b-col cols="12" md="6" lg="6" v-if="">-->
<!--                                    <b-form-group label="Add new name role" label-for="Add new name role">-->
<!--                                        <validation-provider-->
<!--                                                #default="{ errors }"-->
<!--                                                name="Name role"-->
<!--                                                rules="required"-->
<!--                                        >-->
<!--                                            <b-form-input-->
<!--                                                    id="title"-->
<!--                                                    v-model="role"-->
<!--                                                    :state="errors.length > 0 ? false : null"-->
<!--                                                    placeholder="Name role"-->
<!--                                            />-->
<!--                                            <small class="text-danger">{{ errors[0] }}</small>-->
<!--                                        </validation-provider>-->
<!--                                    </b-form-group>-->
<!--                                </b-col>-->

                                <b-col cols="12" md="6" lg="6">
                                    <b-form-group
                                            label="Select role to view permissions"
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

<!--                                <b-col cols="12" md="6" lg="6">-->
<!--                                    <div class="d-flex align-items-center justify-content-end">-->
<!--                                        <b-button-->
<!--                                                v-if="action"-->
<!--                                                @click="changeAction"-->
<!--                                                class="mr-1"-->
<!--                                                variant="primary">-->
<!--                                            <span class="text-nowrap"><feather-icon-->
<!--                                                    icon="PlusCircleIcon"/> Create</span>-->
<!--                                        </b-button>-->
<!--                                        <b-button-->
<!--                                                class="mr-1"-->
<!--                                                variant="primary">-->
<!--                                            <span class="text-nowrap"><feather-icon icon="EyeIcon"/> View</span>-->
<!--                                        </b-button>-->
<!--                                    </div>-->
<!--                                </b-col>-->

                                <!-- PERMISSION TABLE -->
                                <b-col cols="12" md="12" lg="12">
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
                                            <template #cell(write)="data">
                                                <b-form-checkbox
                                                        @change="changeRole(data.value, {action: 'write', subject: data.item.module})"
                                                        v-model="data.value"/>
                                            </template>
                                            <template #cell(create)="data">
                                                <b-form-checkbox
                                                        @change="changeRole(data.value, {action: 'create', subject: data.item.module})"
                                                        v-model="data.value"/>
                                            </template>
                                            <template #cell(update)="data">
                                                <b-form-checkbox
                                                        @change="changeRole(data.value, {action: 'update', subject: data.item.module})"
                                                        v-model="data.value"/>
                                            </template>
                                            <template #cell(delete)="data">
                                                <b-form-checkbox
                                                        @change="changeRole(data.value, {action: 'delete', subject: data.item.module})"
                                                        v-model="data.value"/>
                                            </template>
                                        </b-table>
                                    </b-card>
                                </b-col>
                            </b-row>
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
                                <b-button @click="saveRole({userData: userData, _id: userData.idUser})"
                                          variant="primary"
                                          class="mb-1 mb-sm-0 mr-0 mr-sm-1 text-uppercase"
                                          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                                >
                                    Save Changes
                                </b-button>
                            </div>
                        </b-form>
                    </validation-observer>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    import {ValidationProvider, ValidationObserver} from "vee-validate"
    import vSelect from 'vue-select'
    import {
        BRow,
        BCol,
        BCard,
        BCardText,
        BCardBody,
        BForm,
        BFormGroup,
        BFormInput,
        BButton,
        BTable,
        BCardTitle,
        BFormCheckbox,
        BCardHeader,
    } from 'bootstrap-vue'
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
    } from "@validations"
    import store from "@/store";
    import router from "@/router";
    import {onUnmounted, ref} from "@vue/composition-api";
    import userStoreModule from "@/views/apps/user/userStoreModule";
    import ToastificationContent from "@core/components/toastification/ToastificationContent";

    export default {
        components: {
            BRow,
            BCol,
            BCard,
            BCardText,
            BCardBody,
            BForm,
            BFormGroup,
            BFormInput,
            vSelect,
            BButton,
            BTable,
            BCardTitle,
            BFormCheckbox,
            BCardHeader,
            ValidationProvider,
            ValidationObserver,
        },
        setup() {
            const userData = ref(JSON.parse(localStorage.getItem('userData')))

            const roleOptions = ref([])

            const role = ref(null)
            const oldRole = ref(null)
            const newRole = ref({
                ability: [],
                module: [],
            })
            const action = ref(true)

            const USER_APP_STORE_MODULE_NAME = 'app-user'

            // Register module
            if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

            // UnRegister on leave
            onUnmounted(() => {
                if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
            })

            const fetchRoles = () => {
                store.dispatch('app-user/fetchRoles')
                    .then(response => {
                        if (response.data.success) {
                            let listRole = response.data.listRole.filter(obj => obj.name != "Super Admin")
                            listRole.map(obj => {
                                roleOptions.value.push({
                                    _id: obj._id,
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
                            this.roleOptions = []
                        }
                    })
            }
            fetchRoles()

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
                        module: 'shops',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupVouchers',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                    {
                        module: 'groupCustomers',
                        write: false,
                        create: false,
                        update: false,
                        delete: false,
                    },
                ]
            )

            const changeRoleUser = (ability, modules) => {
                if (modules.length > 0 && ability.length > 0) {
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
                } else {
                    permissionsData.value = permissionsData.value.map(obj => {
                        return {
                            module: obj.module,
                            write: false,
                            create: false,
                            update: false,
                            delete: false,
                        }
                    })
                }
            }

            const chooseRole = (role) => {
                oldRole.value = role
                changeRoleUser(role.ability, role.modules)
                userData.value.role = role.value
            }

            const changeAction = () => {
                action.value = !action.value
                if (!action.value) {
                    changeRoleUser([], [])
                } else {
                    changeRoleUser(oldRole.value.ability, oldRole.value.modules)
                }
            }

            return {
                userData,
                roleOptions,
                role,
                oldRole,
                action,
                permissionsData,
                changeRoleUser,
                chooseRole,
                changeAction,
                fetchRoles,
            }
        },
        methods: {
            changeRole(bol, {action, subject}) {

                this.oldRole = this.action ? this.oldRole : this.newRole

                if (bol == false) {
                    this.oldRole.ability = this.oldRole.ability.filter(obj => obj.action != action || obj.subject != subject)
                } else {
                    this.oldRole.ability.push({'action': action, 'subject': subject})
                }

                let module = this.oldRole.ability.filter(obj => obj.subject == subject)
                if (module.length == 0) {
                    this.oldRole.modules = this.oldRole.modules.filter(val => val != subject)
                } else if (!subject.includes(this.oldRole.modules)) {
                    this.oldRole.modules.push(subject)
                }

            },

            saveRole() {
                if (this.action) {
                    store.dispatch('app-user/updateRole', {
                        _id: this.oldRole._id,
                        role: {ability: this.oldRole.ability, modules: this.oldRole.modules}
                    })
                        .then(response => {
                            if (response.data.success) {
                                this.$toast({
                                    component: ToastificationContent,
                                    props: {
                                        title: response.data.message,
                                        icon: "AlertTriangleIcon",
                                        variant: "success",
                                    },
                                })
                            }
                        })
                        .catch(error => {
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: "Error, can't update role.",
                                    icon: "AlertTriangleIcon",
                                    variant: "success",
                                },
                            })
                        })
                } else {
                    this.locale = this.locale === "en" ? "vi" : "en"
                    this.$refs.simpleRules.validate().then((success) => {
                        if (success) {
                            store.dispatch('app-user/createRole', {
                                name: this.role,
                                ability: this.oldRole.ability,
                                modules: this.oldRole.modules,
                            })
                                .then(response => {
                                    if (response.data.success) {
                                        this.fetchRoles()
                                        this.$toast({
                                            component: ToastificationContent,
                                            props: {
                                                title: response.data.message,
                                                icon: "AlertTriangleIcon",
                                                variant: "success",
                                            },
                                        })
                                    }
                                })
                                .catch(error => {
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: "Error, can't create role.",
                                            icon: "AlertTriangleIcon",
                                            variant: "success",
                                        },
                                    })
                                })
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
</style>