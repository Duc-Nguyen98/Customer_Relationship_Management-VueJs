<template>
    <div>
        <div>

                <b-form
                    ref="form"
                    class="repeater-form"
            >
                    <b-tabs>
                        <b-tab active>
                            <template #title>
                                <feather-icon icon="ClipboardIcon"/>
                                <span>Infor vouchers</span>
                            </template>
                            <validation-observer ref="validate">
                                <DiscountAndTimeVoucher @update="proVoucher" />
                            </validation-observer>
                        </b-tab>
                        <b-tab>
                            <template #title>
                                <feather-icon icon="PlusCircleIcon"/>
                                <span>Add vouchers</span>
                            </template>
                            <validation-observer ref="simpleRules">
                                <!-- Row Loop -->
                                <b-row ref="row">
                                    <!-- Item Name -->
                                    <b-col
                                            lg="12"
                                            md="12"
                                            class="mb-50"
                                    >
                                        <b-row>
                                            <b-col md="4">
                                                <label for="Number-Of-Vouchers">Number Of Vouchers</label>
                                            </b-col>
                                            <b-col md="8">
                                                <b-form-group>
                                                    <validation-provider
                                                            #default="{ errors }"
                                                            rules="required|between:5,50|integer"
                                                            name="Your Number Of Vouchers"
                                                    >
                                                        <b-input-group>
                                                            <b-form-input
                                                                    type="number"
                                                                    id="Number-Of-Vouchers"
                                                                    placeholder="Your Number Of Vouchers"
                                                                    v-model="data.number"
                                                                    :state="errors.length > 0 ? false : null"
                                                            />
                                                            <b-input-group-append is-text>
                                                                <feather-icon
                                                                        icon="TargetIcon"
                                                                        class="cursor-pointer"
                                                                />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <!-- Item Name -->
                                    <b-col
                                            lg="12"
                                            md="12"
                                            class="mb-50"
                                    >
                                        <b-row>
                                            <b-col md="4">
                                                <label for="Voucher-Code-Length">Voucher Code Length</label>
                                            </b-col>
                                            <b-col md="8">
                                                <b-form-group>
                                                    <validation-provider
                                                            #default="{ errors }"
                                                            rules="required|between:10,15|integer"
                                                            name="Voucher Code Length"
                                                    >
                                                        <b-input-group>
                                                            <b-form-input
                                                                    id="Voucher-Code-Length"
                                                                    placeholder="Your Voucher Code Length"
                                                                    v-model="data.length"
                                                                    :state="errors.length > 0 ? false : null"
                                                            />
                                                            <b-input-group-append is-text>
                                                                <feather-icon
                                                                        icon="TargetIcon"
                                                                        class="cursor-pointer"
                                                                />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <!-- Item Name -->
                                    <b-col
                                            lg="12"
                                            md="12"
                                            class="mb-50"
                                    >
                                        <b-row>
                                            <b-col md="4">
                                                <label for="Begin-characters">Begin characters</label>
                                            </b-col>
                                            <b-col md="8">
                                                <b-form-group>
                                                    <validation-provider
                                                            #default="{ errors }"
                                                            rules="required|min:3|max:3"
                                                            name="Begin characters"
                                                    >
                                                        <b-input-group>
                                                            <b-form-input
                                                                    id="Begin-characters"
                                                                    placeholder="Your Begin characters"
                                                                    v-model="data.begin"
                                                                    :state="errors.length > 0 ? false : null"
                                                            />
                                                            <b-input-group-append is-text>
                                                                <feather-icon
                                                                        icon="TargetIcon"
                                                                        class="cursor-pointer"
                                                                />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <!-- Item Name -->
                                    <b-col
                                            lg="12"
                                            md="12"
                                            class="mb-50"
                                    >
                                        <b-row>
                                            <b-col md="4">
                                                <label for="End-characters">End characters</label>
                                            </b-col>
                                            <b-col md="8">
                                                <b-form-group>
                                                    <validation-provider
                                                            #default="{ errors }"
                                                            rules="required|min:3|max:3"
                                                            name="End characters"
                                                    >
                                                        <b-input-group>
                                                            <b-form-input
                                                                    id="End-characters"
                                                                    placeholder="Your End characters"
                                                                    v-model="data.end"
                                                                    :state="errors.length > 0 ? false : null"
                                                            />
                                                            <b-input-group-append is-text>
                                                                <feather-icon
                                                                        icon="TargetIcon"
                                                                        class="cursor-pointer"
                                                                />
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <small class="text-danger">{{ errors[0] }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-col>

                                </b-row>
                                <b-row class="d-flex float-right mt-2">
                                    <b-col>
                                        <b-button
                                                variant="outline-secondary"
                                                class="mr-2 text-uppercase"
                                                type="button"
                                                @click="$bvModal.hide('modal-lg2')"
                                        >
                                            Cancel
                                        </b-button>
                                        <b-button
                                                class="text-uppercase"
                                                variant="primary"
                                                type="button"
                                                @click="validationForm"
                                        >
                                            Save
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </validation-observer>
                        </b-tab>
                    </b-tabs>

            </b-form>
        </div>
    </div>
</template>

<script>
    import {
        BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BInputGroup, BInputGroupAppend, BTabs, BTab,
    } from 'bootstrap-vue'
    import DiscountAndTimeVoucher from './FieldVoucher/DiscountAndTimeVoucher'
    import Ripple from 'vue-ripple-directive'
    import {ValidationProvider, ValidationObserver} from 'vee-validate'
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
    import {useToast} from "vue-toastification/composition";
    import moment from "moment";
    import {ref} from "@vue/composition-api";
    import ToastificationContent from "@core/components/toastification/ToastificationContent";

    export default {
        components: {
            DiscountAndTimeVoucher,
            ValidationProvider,
            ValidationObserver,
            BForm,
            BTabs,
            BTab,
            BRow,
            BCol,
            BButton,
            BFormGroup,
            BFormInput,
            BInputGroupAppend,
            BInputGroup,
        },
        directives: {
            Ripple,
        },
        props: {
            _id: {
                default: null
            }
        },
        setup() {
            const toast = useToast();

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
                validation,
                toast,
            };
        },
        mounted() {

        },
        created() {

        },
        destroyed() {

        },
        data() {
            return {
                data: {
                    number: null,
                    length: null,
                    begin: null,
                    end: null,
                },
                dataVouchers: {
                    vouchers: null,
                    items: null,
                }
            }
        },
        methods: {
            proVoucher(data) {
                this.dataVouchers.vouchers = data
            },
            makeid(length) {
                var result = []
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                var charactersLength = characters.length
                for ( var i = 0; i < length; i++ ) {
                    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
                }
                return result.join('')
            },

            validationForm() {
                this.locale = this.locale === "en" ? "vi" : "en";

                this.$refs.simpleRules.validate().then((success) => {
                    if (success && this.dataVouchers.vouchers != null) {
                        // eslint-disable-next-line
                        let vouchers = [];
                        let length = this.data.length - (this.data.begin.length + this.data.end.length)
                        if (this._id == null) {
                            for (let i = 0; i < this.data.number; i++) {
                                vouchers.push(
                                    {
                                        idVoucher: null,
                                        voucherCode: this.data.begin + this.makeid(length) + this.data.end,
                                        idGroupVoucher: null,
                                        idCustomersUse: null,
                                        idLocationUse: null,
                                        status: 0,
                                        nameCustomerUse: null,
                                        nameLocationUse: null,
                                        usedDate: null,
                                        softDelete: 0,
                                        created: {
                                            createBy: "admin",
                                            time: Date.now()
                                        },
                                        modified: {
                                            modifyBy: "admin",
                                            time: Date.now()
                                        }
                                    }
                                )
                            }
                        } else {
                            for (let i = 0; i < this.data.number; i++) {
                                vouchers.push(this.data.begin + this.makeid(length) + this.data.end)
                            }
                        }
                        this.dataVouchers.items = vouchers
                        this.$emit('update', this.dataVouchers)
                        this.$bvModal.hide("modal-lg2")
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'Please enter all fields or add a voucher',
                                icon: 'AlertTriangleIcon',
                                variant: 'danger',
                            },
                        })
                    }
                });
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>
