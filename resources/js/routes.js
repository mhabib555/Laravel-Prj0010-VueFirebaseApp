import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store.js'


const routes = [
    {
        path: '/',
        component: require('./components/welcomeComponent.vue').default,
        meta: {
            hideForAuth: true
        }
    },
    {
        path: '/register',
        component: require('./components/registerComponent.vue').default,
        meta: {
            hideForAuth: true
        }
    },
    {
        path: '/home',
        component: require('./components/homeComponent.vue').default,
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '*',
        component: require('./components/notFoundComponent.vue').default
    },
]

let router =  new VueRouter ({
    base: process.env.BASE_URL,
    mode: 'history',
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/') 
    } else {
      next() 
    }

    if (to.matched.some(record => record.meta.hideForAuth)) {
        if (store.getters.isLoggedIn) {
            next({ path: '/home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;