import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        /*{
            path: '',  // 路径为空重定向到主页
            redirect: '/home'
        },*/
        {
            path: '/home/:name',
            component: home
        },
      ]
     
    }
  ]

});
