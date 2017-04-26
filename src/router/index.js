import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import daydetail from '@/components/daydetail/daydetail';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      // name: 'Hello',
      component: daydetail,
     
    }
  ]

});
