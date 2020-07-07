<template>
  <nav class="nav" id="nav" v-if="menuRoutes">
    <ul class="outer-nav">
      <li class="nav-left-align">OtakuVue</li>
      <li>
        <ul class="inner-nav">
          <li class="header-item" v-for="(route, index) in menuRoutes" :key="index">
            <router-link :to="route.path" :key="$route.fullPath">{{ route.title }}</router-link>
          </li>
        </ul>
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

<style>
.outer-nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  background: rgb(66, 122, 178); /* WaifuPaste blue */
}

.inner-nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  background: rgb(66, 122, 178);
}

.inner-nav a {
  text-decoration: none;
  display: block;
  padding: 1em;
  color: white;
}

.inner-nav a:hover {
  filter: brightness(85%);
}

.nav-left-align {
  display: block;
  padding: 1em;
  color: white;
  position: absolute;
  left: 20px;
}
</style>
