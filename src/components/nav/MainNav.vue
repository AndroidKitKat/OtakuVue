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
    return {
      loggedin: false,
    }
  },
  methods: {
    determineLoginState: function(){
      console.log(AppRoutes[1])
      AppRoutes[1].title = 'Succ'
      return AppRoutes[1].title
    }
  },
  computed: {
    menuRoutes() {
      // Return the routes object.
      return AppRoutes
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
