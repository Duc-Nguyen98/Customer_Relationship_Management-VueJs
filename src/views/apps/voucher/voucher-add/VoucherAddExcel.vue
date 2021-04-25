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
                            <b-col md="12">
                                <label for="Number-Of-Vouchers">You can download sample here: <a href="">Excel File Demo</a></label>
                                <b-alert show variant="warning">
                                    <feather-icon
                                            icon="MicIcon"
                                            class="cursor-pointer"
                                    />
                                    Note: The system allows to receive a maximum of 5,000 vouchers each time from the file
                                </b-alert>
                                <b-form-group>
                                    <!-- Styled -->
                                    <b-form-file
                                            v-model="file"
                                            :state="Boolean(file)"
                                            placeholder="Choose a file or drop it here..."
                                            drop-placeholder="Drop file here..."
                                    />
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
        BForm, BRow, BCol, BButton, BFormFile, BAlert, BFormGroup,
    } from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'

    export default {
        components: {
            BForm,
            BRow,
            BCol,
            BButton,
            BFormFile,
            BAlert,
            BFormGroup,
        },
        directives: {
            Ripple,
        },

        data() {
            return {
                file: null,
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
