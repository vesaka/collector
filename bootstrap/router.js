import { nextTick, computed } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router';
import { BASE, AUTH_PATH, LOGIN_PATH, PAGE_404} from './paths.js';
import routes from './routes.js';
import { useAuthStore } from '$collector/stores/auth.store.js';
import { storeToRefs } from 'pinia'


const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: routes
});

const title = document.title;


router.beforeEach((to, from) => {
    if (PAGE_404 === to.path) {
        return;
    }
    
    const store = useAuthStore();
    const { loggedIn } = storeToRefs(store);

    if (!to.name) {
        router.push(PAGE_404);
        return;
    }

    if ((false === to.meta.shouldBeLoggedIn) && loggedIn.value) {
        router.push(BASE);
    }

});

router.afterEach((to, from) => {
    nextTick(() => {
        document.body.classList.remove(from.name);
        document.body.classList.add(to.name);
        if (to.meta.title) {
            document.title = to.meta.title + ' | ' + title;
        }
    });

});

export { routes };
export default router;