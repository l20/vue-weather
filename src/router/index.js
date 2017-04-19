import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import forecast24h from '@/components/24hforecast/24hforecast';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',

  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
      	{
      		path: '/otherdays',
      		component: forecast24h
      	}
      ]
    }
  ]
});
