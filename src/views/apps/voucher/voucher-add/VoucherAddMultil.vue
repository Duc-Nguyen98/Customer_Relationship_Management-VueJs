<template>
    <div>
        <div>
            <b-form
                    ref="form"
                    :style="{height: trHeight}"
                    class="repeater-form"
                    @submit.prevent="repeateAgain"
            >

                <!-- Row Loop -->
                <b-row
                        v-for="(item, index) in items"
                        :id="item.id"
                        :key="item.id"
                        ref="row"
                >

                    <!-- Item Name -->
                    <b-col lg="9" md="9">
                        <b-form-group
                                label="Item Name"
                                label-for="item-name"
                        >
                            <b-form-input
                                    id="item-name"
                                    type="text"
                                    placeholder="Vuexy Admin Template"
                            />
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
                <b-row class="d-flex float-right mt-2">
                    <b-col>
                        <b-button
                                variant="outline-secondary"
                                class="mr-2 text-uppercase"
                                type="button"
                                :to="{name: 'apps-users-list'}"
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
        BForm, BFormGroup, BFormInput, BRow, BCol, BButton,
    } from 'bootstrap-vue'
    import { heightTransition } from '@core/mixins/ui/transition'
    import Ripple from 'vue-ripple-directive'

    export default {
        components: {
            BForm,
            BRow,
            BCol,
            BButton,
            BFormGroup,
            BFormInput,
        },
        directives: {
            Ripple,
        },
        mixins: [heightTransition],
        data() {
            return {
                items: [{
                    id: 1,
                    selected: 'male',
                    selected1: 'designer',
                    prevHeight: 0,
                }],
                nextTodoId: 2,
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
                this.trSetHeight()
                this.$nextTick(() => {
                    this.trSetHeight(this.$refs.form.scrollHeight == 0 ? '209' : this.$refs.form.scrollHeight )
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
