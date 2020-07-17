// Import the views for the routes.
import Home from '@views/Home'
import Add from '@views/Add'
import Login from '@views/Login'
import Profile from '@views/Profile'
import { templateSettings } from 'lodash'
// import { component } from 'vue/types/umd'

// Define the routes.
export default [
  {
    path: '/',
    name: 'home',
    title: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'add',
    title: 'Add',
    component: Add,
  },
  {
    path: '/login',
    name: 'Log In',
    title: 'Log In',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    title: 'Profile',
    component: Profile,
  },
]
