<template>
    <div>
        <validation-observer ref="simpleRules">
            <b-form class="mt-1">
                <!-- Header: Personal Info -->
                <div class="d-flex mb-2">
                    <feather-icon icon="UserIcon" size="19"/>
                    <h4 class="mb-0 ml-50">Personal Information</h4>
                </div>
                <b-row>
                    <!--  Full Name-->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>Full Name</label>
                            <validation-provider
                                    #default="{ errors }"
                                    rules="required"
                                    name="Full Name"
                            >
                                <b-form-input
                                        v-model="userData.name"
                                        :state="errors.length > 0 ? false : null"
                                        placeholder="Enter Full Name"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!-- email -->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>Email</label>
                            <validation-provider
                                    #default="{ errors }"
                                    name="Email"
                                    rules="required|email"
                            >
                                <b-form-input
                                        v-model="userData.email"
                                        :state="errors.length > 0 ? false : null"
                                        placeholder="Email"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!-- Adress -->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>Address</label>
                            <validation-provider
                                    #default="{ errors }"
                                    name="Address"
                                    rules="required|"
                            >
                                <b-form-input
                                        v-model="userData.address"
                                        :state="errors.length > 0 ? false : null"
                                        placeholder="Adress"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!-- Birth Day -->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label for="datepicker-placeholder">Birth Day</label>
                            <b-form-datepicker
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
                                        v-model="userData.telephone"
                                        :state="errors.length > 0 ? false : null"
                                        placeholder="Enter Telephone Number"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!--  Full Name-->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-radio-group
                                v-model="userData.gender"
                                :options="genderOptions"
                                class="demo-inline-spacing"
                                name="radio-validation"
                                value="0"
                        >
                        </b-form-radio-group>
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
                                        @input="(val) => userData.groups = val"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                </b-row>
                <!-- Header: Personal Select -->
                <div class="d-flex my-2">
                    <feather-icon icon="MapPinIcon" size="19"/>
                    <h4 class="mb-0 ml-50">Address</h4>
                </div>
                <b-row>
                    <!--  Province Name-->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>Province Name</label>
                            <validation-provider
                                    #default="{ errors }"
                                    rules="required"
                                    name="Province Name"
                            >
                                <b-form-select
                                        v-model="objSelectProvince.selected"
                                        :options="objSelectProvince.options"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <!--  District Name-->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>District Name</label>
                            <b-form-select
                                    v-model="objSelectDistrict.selected"
                                    :options="objSelectDistrict.options"
                            />
                        </b-form-group>
                    </b-col>
                    <!--  Ward Name-->
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group>
                            <label>Ward Name</label>
                            <b-form-select
                                    v-model="objSelectWard.selected"
                                    :options="objSelectWard.options"
                            />
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
                            <b-form-textarea
                                    id="textarea-rows"
                                    placeholder="Note Here..."
                                    rows="8"
                                    v-model="userData.note"
                            />
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
    import {ValidationProvider, ValidationObserver} from "vee-validate";
    import {ref} from "@vue/composition-api";
    import vSelect from "vue-select";
    import moment from "moment";
    // Notification
    import {useToast} from 'vue-toastification/composition'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

    import {
        BFormTextarea,
        BFormDatepicker,
        BFormSelect,
        BFormRadioGroup,
        BFormInput,
        BFormGroup,
        BForm,
        BRow,
        BCol,
        BButton,
        BFormFile,
    } from "bootstrap-vue";
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

    export default {
        components: {
            BFormTextarea,
            BFormSelect,
            BFormDatepicker,
            BFormRadioGroup,
            ValidationProvider,
            ValidationObserver,
            BFormInput,
            BFormGroup,
            BForm,
            BRow,
            BCol,
            BButton,
            BFormFile,
            vSelect,
        },
        setup() {
            const toast = useToast();
            var today = moment();
            const userData = ref({
                name: "",
                address: "",
                email: "",
                gender: 0,
                birthDay: moment(today._d).format("YYYY-MM-DD"),
                telephone: "",
                note: "",
                groups: null,
            });

            const objSelectDistrict = {
                selected: null,
                options: [
                    {value: null, text: "Please select some item", disabled: true},
                    {value: "a", text: "This is First option"},
                    {value: "b", text: "Default Selected Option"},
                    {value: "c", text: "This is another option"},
                ],
            };

            const objSelectProvince = {
                selected: null,
                options: [
                    {value: null, text: "Please select some item", disabled: true},
                    {value: "a", text: "This is First option"},
                    {value: "b", text: "Default Selected Option"},
                    {value: "c", text: "This is another option"},
                ],
            };

            const objSelectWard = {
                selected: null,
                options: [
                    {value: null, text: "Please select some item", disabled: true},
                    {value: "a", text: "This is First option"},
                    {value: "b", text: "Default Selected Option"},
                    {value: "c", text: "This is another option"},
                ],
            };

            const groupOptions = [
                {label: "Khách hàng thường", value: 0},
                {label: "khách hàng thân thiết", value: 1},
                {label: "Khách hàng tiềm năng", value: 2},
            ];

            const genderOptions = [
                {text: "Male", value: 0},
                {text: "Female", value: 1},
            ];

            const validation = {
                required,
                confirmed,
                password,
                email,
                min,
                max,
                integer,
                url,
                alpha,
                between,
                digits,
                length,
                alphaDash,
            };

            return {
                toast,
                userData,
                objSelectDistrict,
                objSelectProvince,
                objSelectWard,
                groupOptions,
                genderOptions,
                validation,
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

            validationForm() {
                this.locale = this.locale === "en" ? "vi" : "en";
                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        // eslint-disable-next-line
                        this.addUser();
                    }
                });
            },

            addUser() {
                store.dispatch('app-user/addUser', this.userData)
                    .then(response => {
                        if (response.data.success) {
                            this.alert("success", "Add user successfully.")
                            this.$router.push({name: 'apps-customers-list'});
                        } else {
                            this.alert("danger", "Add user failed.")
                        }
                    })
                    .catch(() => {
                        this.toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Error fetching users list',
                                icon: 'AlertTriangleIcon',
                                variant: 'danger',
                            },
                        });
                    });
            }
        }
    };
</script>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>