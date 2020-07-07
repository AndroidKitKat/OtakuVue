// Import the views for the routes.
import Home from '@views/Home'
import Add from '@views/Add'

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
]
