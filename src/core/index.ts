import { createApp } from 'vue';
import App from '../App.vue';
import ajax from './ajax';

const app = createApp(App);
export { app, ajax };
