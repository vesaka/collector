import Login from '$collector/components/pages/Login.vue';
import SignUp from '$collector/components/pages/SignUp.vue';
import Playground from '$collector/components/pages/Playground.vue';
import Leaderboard from '$collector/components/pages/Leaderboard.vue';
import Welcome from '$collector/components/pages/Welcome.vue';
import NotFound from '$collector/components/pages/NotFound.vue';
import ForgotPassword from '$collector/components/pages/ForgotPassword.vue';
import ResetPassword from '$collector/components/pages/ResetPassword.vue';

import {
    BASE, LOGIN_PATH, AUTH_PATH, PAGE_404, SIGNUP_PATH,
    FORGOT_PASSWORD_PATH, RESET_PASSWORD_PATH, LEADERBOARD_PATH
} from './paths';

const routes = [
    {
        path: BASE,
        name: 'home',
        component: Welcome,
        meta: {
            transitionName: 'slide-left',
            autoStart: true
        }
    },
    {
        path: LOGIN_PATH,
        name: 'login',
        component: Login,
        meta: {
            title: 'Log in',
            shouldBeLoggedIn: false,
            transitionName: 'jump',
        }
    },
    {
        path: SIGNUP_PATH,
        name: 'sign-up',
        component: SignUp,
        meta: {
            title: 'Sign up',
            transitionName: 'jump',
            transitions: {
                [LOGIN_PATH]: ''
            }
        }
    },
    {
        path: AUTH_PATH,
        name: 'playground',
        component: Playground,
        meta: {
            title: 'Playground',
            //shouldBeLoggedIn: true
        }
    },
    {
        path: LEADERBOARD_PATH,
        name: 'leaderboard',
        component: Leaderboard,
        meta: {
            title: 'Leaderboard',
            //shouldBeLoggedIn: false
        }
    },
    {
        path: FORGOT_PASSWORD_PATH,
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'New Password',
            shouldBeLoggedIn: false
        }
    },
    {
        path: RESET_PASSWORD_PATH,
        name: 'reset-password',
        component: ResetPassword,
        meta: {
            title: 'Reset Password',
            shouldBeLoggedIn: false
        }
    },
    {
        path: PAGE_404,
        name: 'not-found',
        component: NotFound,
        meta: {
            title: '404',
            transitonName: 'scale-up',
        }
    }, 
];
    
export default routes;