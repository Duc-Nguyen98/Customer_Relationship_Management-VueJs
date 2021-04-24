<template>
    <div>
        <div>
            <b-form
                    ref="form"
                    class="repeater-form"
            >

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
                                    <b-input-group>
                                        <b-form-input
                                                id="Number-Of-Vouchers"
                                                placeholder="Your Number Of Vouchers"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon
                                                    icon="TargetIcon"
                                                    class="cursor-pointer"
                                            />
                                        </b-input-group-append>
                                    </b-input-group>
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
                                    <b-input-group>
                                        <b-form-input
                                                id="Voucher-Code-Length"
                                                placeholder="Your Voucher Code Length"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon
                                                    icon="TargetIcon"
                                                    class="cursor-pointer"
                                            />
                                        </b-input-group-append>
                                    </b-input-group>
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
                                    <b-input-group>
                                        <b-form-input
                                                id="Begin-characters"
                                                placeholder="Your Begin characters"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon
                                                    icon="TargetIcon"
                                                    class="cursor-pointer"
                                            />
                                        </b-input-group-append>
                                    </b-input-group>
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
                                    <b-input-group>
                                        <b-form-input
                                                id="End-characters"
                                                placeholder="Your End characters"
                                        />
                                        <b-input-group-append is-text>
                                            <feather-icon
                                                    icon="TargetIcon"
                                                    class="cursor-pointer"
                                            />
                                        </b-input-group-append>
                                    </b-input-group>
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
                                :to="{name: 'apps-voucher-list'}"
                        >
                            Cancel
                        </b-button>
                        <b-button
                                class="text-uppercase"
                                variant="primary"
                                type="button"

                        >
                            Save
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </div>
    </div>
</template>

<script>
    import {
        BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BInputGroup, BInputGroupAppend,
    } from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'

    export default {
        components: {
            BForm,
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

        data() {
            return {

            }
        },
        mounted() {

        },
        created() {

        },
        destroyed() {

        },
        methods: {

        },
    }
</script>

<style lang="scss" scoped>

</style>
