import {assetsBaseUrl} from '../config/options.json';

export const BASE = env.base || '/';
export const SIGNUP_PATH = BASE + 'sign-up';
export const LOGIN_PATH = BASE + 'log-in';
export const AUTH_PATH = BASE + 'playground';
export const PLAY_PATH = BASE + 'playground';
export const LEADERBOARD_PATH = BASE + 'leaderboard';
export const PAGE_404 = BASE + '404';
export const FORGOT_PASSWORD_PATH = BASE + 'forgot-password';
export const RESET_PASSWORD_PATH = BASE + 'reset-password/:token';

export const TERMS_EXTERNAL = 'localhost/en/terms-and-conditions';

export const asset = path => '/assets/' + path;
export const svg = path => '/assets/svg/' + path + '.svg';
