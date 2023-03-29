<template>
    
</template>
<script setup>
    import { isLandscape, isHorizontal, getOrientation } from '$core/utils/window.js';
    
    defineProps({
        from: {
            type: String,
            default: ''
        }
    });
</script>

