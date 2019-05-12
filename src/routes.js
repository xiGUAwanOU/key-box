import Accounts from '@/views/Accounts.vue'
import Login from '@/views/Login.vue'

export default {
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    }
  ]
}
