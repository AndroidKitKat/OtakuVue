// Import the views for the routes.
import Home from '@views/Home'
import Add from '@views/Add'
import Testing from '@views/Testing'
import { templateSettings } from 'lodash'

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
    path: '/testing',
    name: 'testing',
    title: 'testing',
    component: Testing,
  },
]
