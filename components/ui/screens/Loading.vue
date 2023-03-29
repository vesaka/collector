<template>
    <Transition>
        <div v-if="store.loaded < 100" :style="bgStyle">
            <Ring :options="options" gradient-id="game-loader" size="300" :with-percents="true" :value="store.loaded" v-slot="{ size, halfSize }">
                <g transform-origin="50%, 50%">
                <animateTransform attributeName="transform"
                  attributeType="XML" type="rotate"
                  :from="`0 ${halfSize} ${halfSize}`"
                  :to="`360 ${halfSize} ${halfSize}`"
                  dur="2s" repeatCount="indefinite" />
                <g id="Timer" :transform="`translate(${sandWatch.point.x} ${sandWatch.point.y}) scale(${sandWatch.scale})`" :transform-origin="`${halfSize}, ${halfSize}`">
                <path id="Path_20015" data-name="Path 20015" d="M74.348,449.569c-.181-2.648-4.77-3.881-8.71-4.131l-.323-.019-.339-.016-.071,0c-.143-.005-.288-.009-.433-.012l-.112,0c-.3,0-.6,0-.9,0l-.11,0c-.146,0-.291.007-.432.012l-.073,0-.339.016-.323.019c-3.655.232-8.067,1.359-8.651,3.769a6.734,6.734,0,0,0-.079,2.335c.007.149.013.263.014.314,0,2.856,5.254,4.35,10.445,4.35s10.444-1.494,10.444-4.348c0-.051.007-.162.014-.306A8.248,8.248,0,0,0,74.348,449.569Z" transform="translate(-53.409 -418.206)" fill="#7f281a"/>
                <g id="Group_31391" data-name="Group 31391" transform="translate(0.89 27.643)">
                <path id="Path_20016" data-name="Path 20016" d="M75.857,458.014c0,1.9-4.278,3.439-9.554,3.439s-9.554-1.54-9.554-3.439a11.766,11.766,0,0,1,.02-2.347c.97-1.53,4.991-1.092,9.534-1.092,4.617,0,8.663-.252,9.554,1.315A11.856,11.856,0,0,1,75.857,458.014Z" transform="translate(-56.694 -452.451)" fill="#f26611"/>
                <ellipse id="Ellipse_27" data-name="Ellipse 27" cx="9.554" cy="3.439" rx="9.554" ry="3.439" transform="translate(0.055 0)" fill="#ffcb00"/>
                <path id="Path_20017" data-name="Path 20017" d="M56.988,450.97c1.323,1.257,5.059,2.163,9.464,2.163s8.141-.906,9.464-2.163a1.316,1.316,0,0,0,.09-.467c0-1.9-4.277-3.439-9.554-3.439S56.9,448.6,56.9,450.5A1.316,1.316,0,0,0,56.988,450.97Z" transform="translate(-56.843 -447.064)" fill="#fdae00"/>
                <path id="Path_20018" data-name="Path 20018" d="M69.115,448.756c.867.545,3.314.937,6.2.937s5.332-.393,6.2-.937a.406.406,0,0,0,.059-.2c0-.823-2.8-1.49-6.258-1.49s-6.258.667-6.258,1.49A.405.405,0,0,0,69.115,448.756Z" transform="translate(-65.705 -447.064)" fill="#ffcb00"/>
                <ellipse id="Ellipse_28" data-name="Ellipse 28" cx="1.153" cy="0.405" rx="1.153" ry="0.405" transform="translate(8.457 6.069)" fill="#fff"/>
                </g>
                <path id="Path_20019" data-name="Path 20019" d="M73.9,385.3a9.551,9.551,0,0,0-3.776-1.984,5.03,5.03,0,0,1-.761-.271,1.061,1.061,0,0,1,.111-.482,3.445,3.445,0,0,1,.89-.342,10.167,10.167,0,0,0,4.02-2.112c2.795-2.414,1.17-8.976.976-9.717l-.176-.669-8.732,1.347-8.732-1.347-.176.669c-.194.74-1.819,7.3.976,9.717a10.169,10.169,0,0,0,4.02,2.112,3.727,3.727,0,0,1,.885.333,1.07,1.07,0,0,1,.117.491,5.036,5.036,0,0,1-.761.271A9.55,9.55,0,0,0,59.01,385.3c-2.415,2.086-1.349,7.4-.96,9,0,.014.006.027.01.041l.446.731c1.688,1.612,7.26,1.663,7.95,1.663s6.282-.051,7.959-1.672l.416-.633C75.014,393.732,76.539,387.573,73.9,385.3Z" transform="translate(-55.957 -363.519)" fill="#457c94"/>
                <path id="Path_20020" data-name="Path 20020" d="M71.762,384.141c-.006-.014-.011-.027-.017-.041a1.932,1.932,0,0,1,.162-1.111c.414-.9,2.446-.515,4.85-2.747s.7-9.186.7-9.186L69.7,372.343l-7.766-1.288s-1.7,6.954.7,9.186,4.435,1.846,4.85,2.747a1.927,1.927,0,0,1,.162,1.111c-.006.014-.01.027-.017.041-.387.843-2.286.482-4.533,2.568-2.077,1.929-.877,7.627-.684,8.475,0,.01,0,.02.007.03.012.052.019.08.019.08h0c.374,1,3.479,1.779,7.254,1.779s6.88-.78,7.254-1.779h0s1.589-6.5-.659-8.585S72.15,384.984,71.762,384.141Z" transform="translate(-59.196 -364.484)" fill="#a6bdc9"/>
                <path id="Path_20021" data-name="Path 20021" d="M67.368,389.015a2.218,2.218,0,0,0-1.488-.086,3.741,3.741,0,0,0,1.281,3.434c1.7,1.417,3.969,1.674,4.465,2.4a6.088,6.088,0,0,1,0,4.765c-.513,1.421-2.853,2.6-4.258,3.19a1.993,1.993,0,0,0-1.194,1.793,11.092,11.092,0,0,0,.078,1.671c.207,1.631.248,1.274.248,1.274s1.93,1.388,6.463,1.388,5.959-1.145,6.28-1.388a6.955,6.955,0,0,0-.259-4.579c-.744-1.073-3.72-1.545-4.712-2.747s-1.075-4.765-.537-5.409,4.817-.9,5.219-2.274S67.368,389.015,67.368,389.015Z" transform="translate(-62.467 -377.077)" fill="#ca944e"/>
                <path id="Path_20022" data-name="Path 20022" d="M65.982,386.31c.294,2.06,7.009,4.507,11.038,4.121s2.644-1.975,0-3.305S65.689,384.035,65.982,386.31Z" transform="translate(-62.662 -374.22)" fill="#ccaa72"/>
                <path id="Path_20023" data-name="Path 20023" d="M74.348,348.841c-.181-2.648-4.77-3.881-8.71-4.131l-.323-.019-.339-.016-.071,0c-.143,0-.288-.009-.433-.012l-.112,0c-.3,0-.6,0-.9,0l-.11,0c-.146,0-.291.007-.432.012l-.073,0-.339.016-.323.019c-3.655.232-8.067,1.359-8.651,3.769a6.734,6.734,0,0,0-.079,2.335c.007.149.013.263.014.314,0,2.856,5.254,4.35,10.445,4.35s10.444-1.494,10.444-4.348c0-.051.007-.162.014-.306A8.248,8.248,0,0,0,74.348,348.841Z" transform="translate(-53.409 -344.654)" fill="#7f281a"/>
                <g id="Group_31392" data-name="Group 31392" transform="translate(0.89 0.466)">
                <path id="Path_20024" data-name="Path 20024" d="M75.857,357.286c0,1.9-4.278,3.439-9.554,3.439s-9.554-1.54-9.554-3.439a11.765,11.765,0,0,1,.02-2.347c.97-1.53,4.991-1.092,9.534-1.092,4.617,0,8.663-.252,9.554,1.315A11.856,11.856,0,0,1,75.857,357.286Z" transform="translate(-56.694 -351.723)" fill="#f26611"/>
                <ellipse id="Ellipse_29" data-name="Ellipse 29" cx="9.554" cy="3.439" rx="9.554" ry="3.439" transform="translate(0.055 0)" fill="#ffcb00"/>
                <path id="Path_20025" data-name="Path 20025" d="M56.988,350.242c1.323,1.257,5.059,2.163,9.464,2.163s8.141-.906,9.464-2.163a1.317,1.317,0,0,0,.09-.467c0-1.9-4.277-3.439-9.554-3.439s-9.554,1.54-9.554,3.439A1.316,1.316,0,0,0,56.988,350.242Z" transform="translate(-56.843 -346.336)" fill="#fdae00"/>
                <path id="Path_20026" data-name="Path 20026" d="M69.115,348.029c.867.545,3.314.937,6.2.937s5.332-.393,6.2-.937a.406.406,0,0,0,.059-.2c0-.823-2.8-1.49-6.258-1.49s-6.258.667-6.258,1.49A.406.406,0,0,0,69.115,348.029Z" transform="translate(-65.705 -346.336)" fill="#ffcb00"/>
                <ellipse id="Ellipse_30" data-name="Ellipse 30" cx="1.153" cy="0.405" rx="1.153" ry="0.405" transform="translate(8.457 6.069)" fill="#fff"/>
                </g>
                <path id="Path_20027" data-name="Path 20027" d="M78.022,387.822a.952.952,0,1,1-.951-.973A.962.962,0,0,1,78.022,387.822Z" transform="translate(-70.03 -375.389)" fill="#fff"/>
                <path id="Path_20028" data-name="Path 20028" d="M75.831,395.8a.476.476,0,1,1-.476-.487A.481.481,0,0,1,75.831,395.8Z" transform="translate(-69.12 -381.547)" fill="#fff"/>
                <ellipse id="Ellipse_31" data-name="Ellipse 31" cx="1.241" cy="1.269" rx="1.241" ry="1.269" transform="translate(6.815 24.11)" fill="#fff"/>
                <ellipse id="Ellipse_32" data-name="Ellipse 32" cx="0.39" cy="0.398" rx="0.39" ry="0.398" transform="translate(10.089 24.596)" fill="#fff"/>
                </g>
                </g>
            </Ring>
            <h2 v-html="progress"></h2>
        </div>
    </Transition>
</template>
<script setup>

    import { computed, onBeforeMount } from 'vue';
    import Ring from '$core/components/progress/Ring.vue';
    import { useGameStore } from '$collector/stores/auth.store.js';
    import { asset } from '$collector/bootstrap/paths';
    const store = useGameStore();
    
    const box = {
       w: 21,
       h: 38
    };
    const options = {
        stroke: {
            width: 20,
            color: '#a8c8ea',
            empty: "#005081"
        },
        font: {
            family: 'Teshrin'
        }
    };
    
    const bgStyle = {
        backgroundImage: `url(${asset('BG-transparent.jpg')})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
    
    const size = 300;
    const sandWatch = computed(() => {
        const scale = Math.min(size / box.w, size / box.h) / 2 
        return {
            point: {
                x: (size - box.w*scale) / 2,
                y: (size - box.h*scale) / 2
            },
            scale
        };
    });

    const progress = computed(() => {
        return Math.round(store.loaded) + '%';
    });
    
    
</script>