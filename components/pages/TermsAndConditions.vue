<template>
    <div>
        <h4>Terms And Conditions</h4>
        <button class="btn btn-primary" @click="router.back()">
            Back
        </button>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
</script>
