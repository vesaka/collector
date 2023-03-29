<template>
    <div class="text text-danger py-2">
        <span v-html="error"></span>
    </div>
</template>
<script >
    import { computed, watch, ref } from 'vue';
    import { raw } from '$core/utils/object';

    export default {
        data() {
            return {
                auth: {},
                error: ''
            };
        },
        props: {
            xhr: {
                type: Object,
                default: {}
            }
        },
        wacth: {
            auth(n, o) {
                this.error = '';
            }
        },
        methods: {
            updateError() {
                const { response } = this.xhr;
                if (422 === response.status) {
                    this.error = Object.values(raw(response.data.errors))[0][0];
                } else {
                    this.error = 'An error has occured. Please try again later!';
                }
                
            }
        },
        computed: {
            displayError() {
                return this.error;
            }
        },
        mounted() {
            this.updateError();
        }
    }
</script>
