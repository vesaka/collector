<template>
    <button type="submit" class="btn btn-unstyled btn-img mx-auto">
        <img :src="asset(props.src)">
    </button>
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
