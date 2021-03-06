import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/irregularverbstutorial',
      name: 'irregularverbstutorial',
      component: () => import('@/views/IrregularVerbsTutorial.vue'),
    },
    {
      path: '/irregularverbseditor',
      name: 'irregularverbseditor',
      component: () => import('@/views/IrregularVerbsEditor.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
    },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('@/views/Settings.vue'),
    // },
    // {
    //   path: '/editor',
    //   name: 'editor',
    //   component: () => import('@/views/Editor.vue'),
    // },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
    },
    // {
    //   path: '/@:userFirstName',
    //   name: 'profile',
    //   component: () => import('@/views/Profile.vue'),
    // },
  ],
});
// routes: [
//   {
//     path: '/',
//     name: 'home',
//     component: Home,
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//   },import { IrregularVerb } from './store/models.d';

// ],
// });
