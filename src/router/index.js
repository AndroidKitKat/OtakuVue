// Import Dependencies
import Vue from 'vue'
import Router from 'vue-router'

// Import routes
import AppRoutes from '@/router/routes/AppRoutes'

Vue.use(Router)

// Wildcard redirect to base URL for any undefined URLs.
const wildcardRedirect = [{ path: '*', redirect: '/' }]

export default new Router({
  // Concatenate all the routes.
  routes: [...wildcardRedirect, ...AppRoutes],
})
