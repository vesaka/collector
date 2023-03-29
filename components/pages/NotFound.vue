<template>
    <div class="text-center">
        <ImageTitle src="title-404.png"/>
        <div class="col-md-12 reg-play">
            <button class="btn btn-img" @click="$router.go(-1)">
                <img :src="svg('btn-back')"/>
                <p><span v-html="t('buttons.back')"></span></p>
            </button>
        </div>
    </div>
</template>
<script setup>
    import ImageTitle from '$collector/components/ui/ImageTitle.vue';
    import { svg } from '$collector/bootstrap/paths';
    import { t } from '$core/utils/i18n';
    const path = '*';
    const name = '404';
    

</script>
