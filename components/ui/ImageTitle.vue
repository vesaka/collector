<template>
    <div class="col-md-12 home-title">
        <img :src="asset(props.src)">
    </div>
</template>
<script setup>
    import { asset } from '$collector/bootstrap/paths.js'
            const props = defineProps({
                src: {
                    type: String,
                    default: ''
                }
            });
</script>
