<template>
    <div class="col-md-12 home-title">
        <div class="socials-back">
            <div class="socials-pop">
                <img :src="asset('Visit-Our-Socials.png')">
                <a class="btn-img"><img :src="svg('FB')"></a>
                <a class="btn-img"><img :src="svg('Twitter')"></a>
                <a class="btn-img"><img :src="svg('LinkeIn')"></a>
            </div>
        </div>
    </div>
</template>
<script setup>
import { asset, svg, PLAY_PATH, LOGIN_PATH } from '$collector/bootstrap/paths.js'
</script>
