require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import Swal from 'sweetalert2';
import VueProgressBar from 'vue-progressbar';
import Gate from './gate';
import router from './routes';
import { Form, HasError, AlertError } from 'vform';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import store from './store.js'
import "./plugins/firebase";

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer "+token;
}

window.Vue = Vue;
window.swal = Swal;
window.toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
Vue.use(VueRouter);
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '10px'
});
Vue.prototype.$gate = new Gate(window.user);
window.fireEvent = new Vue();
window.Form = Form;
  
Vue.filter('capitalizeFirstLetter', text =>{
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('notFound', require('./components/notFoundComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

const app = new Vue({
    el: '#app',
    router,
    store
});

axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
        }
        throw err;
    });
});

