<template>
    <div>
        <div>

                <b-form
                        @submit.prevent="repeateAgain"
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
                    <!-- Row Loop -->

                        <b-tab>

                            <template #title>
                                <feather-icon icon="PlusCircleIcon"/>
                                <span>Add vouchers</span>
                            </template>
                                <div class="repeater-form" ref="form" :style="{height: trHeight}">
                               <b-row
                                       v-for="(item, index) in items"
                                       :id="item.id"
                                       :key="index"
                                       ref="row"
                               >

                                   <!-- Item Name -->
                                   <b-col lg="9" md="9">
                                       <b-form-group
                                               :label="'Voucher ' + (index + 1)"
                                               :label-for="'voucher' + index"
                                       >
                                           <validation-provider
                                                   #default="{ errors }"
                                                   :name="`Voucher ${index + 1}`"
                                                   rules="required"
                                           >
                                               <b-form-input
                                                       :id="'voucher' + index"
                                                       @change="addVoucher(index)"
                                                       type="text"
                                                       placeholder="Enter voucher"
                                                       :state="errors.length > 0 ? false : null"
                                               />
                                               <small class="text-danger">{{ errors[0] }}</small>
                                           </validation-provider>
                                       </b-form-group>
                                   </b-col>

                                   <!-- Remove Button -->
                                   <b-col
                                           lg="3"
                                           md="3"
                                           class="mb-50 center"
                                   >
                                       <b-button
                                               v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                                               variant="outline-danger"
                                               class="mt-0 mt-md-2 "
                                               @click="removeItem(index)"
                                       >
                                           <feather-icon
                                                   icon="XIcon"
                                                   class="mr-25"
                                           />
                                           <span>Delete</span>
                                       </b-button>
                                   </b-col>
                               </b-row>
                               <b-row>
                                   <b-col>
                                       <b-button
                                               v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                               variant="primary"
                                               @click="repeateAgain"
                                       >
                                           <feather-icon
                                                   icon="PlusIcon"
                                                   class="mr-25"
                                           />
                                           <span>Add New</span>
                                       </b-button>
                                   </b-col>

                               </b-row>
                               <b-row>
                                   <b-col md="12">
                                       <b-row class="d-flex float-right mt-2">
                                           <b-col md="12">
                                               <b-button
                                                       variant="outline-secondary"
                                                       class="mr-2 text-uppercase"
                                                       type="button"
                                                       @click="$bvModal.hide('modal-lg')"
                                               >
                                                   Cancel
                                               </b-button>
                                               <b-button
                                                       class="text-uppercase"
                                                       variant="primary"
                                                       type="button"
                                                       @click="emitData"
                                               >
                                                   Add vouchers
                                               </b-button>
                                           </b-col>
                                       </b-row>
                                   </b-col>
                               </b-row>
                           </div>
                        </b-tab>
                    </b-tabs>
                </b-form>

        </div>
    </div>
</template>

<script>
    import {
        BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BTabs, BTab,
    } from 'bootstrap-vue'
    import { heightTransition } from '@core/mixins/ui/transition'
    import DiscountAndTimeVoucher from './FieldVoucher/DiscountAndTimeVoucher'
    import Ripple from 'vue-ripple-directive'
    import {ValidationProvider, ValidationObserver} from 'vee-validate'
    import ToastificationContent from "@core/components/toastification/ToastificationContent";

    export default {
        components: {
            BTabs,
            BTab,
            BForm,
            BRow,
            BCol,
            BButton,
            BFormGroup,
            BFormInput,
            DiscountAndTimeVoucher,
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        props: {
            _id: {
                default: null
            }
        },
        mixins: [heightTransition],
        data() {
            return {
                items: [
                    {
                        idVoucher: null,
                        voucherCode : null,
                        status : 0,
                        discount:{
                            PercentAMaximum : {
                                percent : 0,
                                maximumMoney : 0,
                            },
                            reduction : {
                                money : null,
                            },
                        },
                        timeLine:{
                            release : "2021-04-30",
                            expiration : "2021-05-05"
                        },
                        classified: 0,
                        created : {
                            createBy : "admin",
                            time : Date.now()
                        },
                        modified : {
                            modifyBy : "admin",
                            time : Date.now()
                        }
                    }
                ],
                vouchers: [],
                nextTodoId: 2,
                data: {
                    vouchers: null,
                    items: [],
                },
            }
        },
        mounted() {
            this.initTrHeight()
        },
        created() {
            window.addEventListener('resize', this.initTrHeight)
        },
        destroyed() {
            window.removeEventListener('resize', this.initTrHeight)
        },
        methods: {
            addVoucher(index) {
                const val = document.getElementById('voucher' + index).value
                if (val) {
                    this.items[index] = {
                        idVoucher: null,
                        voucherCode: val,
                        discount: this.data?.vouchers?.discount,
                        timeLine: this.data?.vouchers?.timeLine,
                        status : 0,
                        classified: this.data?.vouchers?.classified,
                        created: {
                            createBy: "admin",
                            time: Date.now()
                        },
                        modified: {
                            modifyBy: "admin",
                            time: Date.now()
                        }
                    }
                } else {
                    this.items = this.items.filter((item, key) => key != index)
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'Please enter all fields or add a voucher',
                            icon: 'AlertTriangleIcon',
                            variant: 'danger',
                        },
                    })
                }
            },
            emitData() {
                if ( this.items.length > 0 && this.data.vouchers != null ) {
                    this.data.items = this.items
                    this.$emit('update', this.data)
                    this.$bvModal.hide("modal-lg")
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
            },
            proVoucher(data) {
                this.data.vouchers = data
            },
            repeateAgain() {
                this.items.push({
                    id: this.nextTodoId += this.nextTodoId,
                })

                this.$nextTick(() => {
                    this.trAddHeight(this.$refs.row[0].offsetHeight)
                })
            },
            removeItem(index) {
                this.items.splice(index, 1)
                this.trTrimHeight(this.$refs.row[0].offsetHeight)
            },
            initTrHeight() {
                this.$nextTick(() => {
                    this.trSetHeight(this.$refs.form.scrollHeight == 0 ? '225' : this.$refs.form.scrollHeight )
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .repeater-form {
        overflow: hidden;
        transition: .35s height;
    }
</style>
