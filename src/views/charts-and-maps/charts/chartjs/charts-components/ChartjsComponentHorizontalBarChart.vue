<script>
    import {HorizontalBar} from 'vue-chartjs'

    export default {
        extends: HorizontalBar,
        props: {
            data: {
                type: Object,
                default: null,
            },
            options: {
                type: Object,
                default: null,
            },
        },
        mounted() {
            this.renderChart(this.data, this.options)
        },
        watch: {
            data: function (value) {
                this.data = value
                this.renderChart(this.data, this.options)
            }
        }
    }
</script>
