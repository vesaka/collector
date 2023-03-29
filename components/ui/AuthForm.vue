<template>
    <div class="d-flex flex-column">
        <slot name="header">
            <div class="col-md-6 home-title mx-auto">
                <img :src="asset(props.titleImage)">
            </div>
        </slot>
        <div class="col-md-12">
            <Transition name="fade">
            <form :class="formClass" @submit.prevent="onSubmit" novalidate v-if="!didSubmit">
                <slot></slot>
                <div class="text text-danger py-2" v-html="displayError"></div>
                <button type="submit" class="btn btn-unstyled btn-img mx-auto" :disabled="isLoading">
                    <img :src="asset(props.btnImage)"/>
                </button>
                <div class="d-flex justify-content-center" v-if="isLoading">
                    <div class="spinner-border text-warning" role="status" color>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <slot name="footer"></slot>
            </form>
            </Transition>
            <Transition name="scale-in">
            <div v-if="didSubmit">
                <slot name="redirect">
                    <div class="col-md-12 home-title">
                        <img :src="asset(props.titleImage)">
                        Thank you
                    </div>
                </slot>
            </div>
            </Transition>
        </div>
    </div>
</template>
<script setup>
    import { computed, ref, watch } from 'vue';
    import { asset } from '$collector/bootstrap/paths.js'
    import { useRouter } from 'vue-router';
    import { raw } from '$core/utils/object';
    
    const router = useRouter();
    let loading = ref(false);
    let submitted = ref(false);
    let error = ref('');

    const props = defineProps({
        auth: {
            type: Object,
            default: {}
        },
        titleImage: {
            type: String,
            default: ''
        },
        btnImage: {
            type: String,
            default: 'Play-btn.svg'
        },
        name: {
            type: String,
            default: ''
        },
        submit: {
            type: Function,
            default: () => {
            }
        }
    });
    
    watch(props.auth, (n) => {
        error.value = '';
    });

    const onSubmit = () => {
        loading.value = true;
        props.submit().then(() => {
                    submitted.value = true;
                })
                .catch(({ response }) => {
                    
                    if ((422 === response.status)) {
                        
                        error.value = Object.values(raw(response.data.errors))[0][0];
                    }
                })
                .then(() => {
                    loading.value = false
                })
    };

    const displayError = computed(() => { return error.value; });
    const isLoading = computed(() => { return loading.value; });
    const didSubmit = computed(() => { return submitted.value; });
    
    const formClass = computed(() => ({
        'register-form text-center': true,
        [props.name]: true
    }));
</script>
