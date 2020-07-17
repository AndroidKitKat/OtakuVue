<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: rgb(66, 122, 178);">
    <a class="navbar-brand" href="/">OtakuVue</a>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active" v-for="(route, index) in menuRoutes" :key="index">
        <router-link class="nav-link" :to="route.path" :key="$route.fullPath">{{ route.title }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import AppRoutes from '@router/appRoutes.js'

export default {
  name: 'mainNav',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    menuRoutes() {
      // check for cookie to see if logged in and display either profile or log in appropriately
      var cookie = Cookies.get('id')
      //deep copy the routes
      var newAppRoutes = JSON.parse(JSON.stringify(AppRoutes))
      if (cookie === undefined) {
        newAppRoutes.splice(
          newAppRoutes.findIndex(function(route) {
            return route.path == '/profile'
          }),
          1
        )
        newAppRoutes.splice(
          newAppRoutes.findIndex(function(route) {
            return route.path == '/add'
          }),
          1
        )
      } else {
        newAppRoutes.splice(
          newAppRoutes.findIndex(function(route) {
            return route.path == '/login'
          }),
          1
        )
      }
      return newAppRoutes
    },
  },
  watch: {},
  // Lifecycle Hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
