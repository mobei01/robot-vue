import avatar from '@/components/avatar';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/message/style/css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';

import './styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
//@ts-ignore
app.component('avatar', avatar);
app.mount('#app');
