<template>
  <div id="app">
    <header id="header"><MainNav /></header>
    <main id="main"><router-view /></main>
    <footer id="footer"><Copyright /></footer>
  </div>
</template>

<script>
import MainNav from '@components/nav/MainNav'
import Copyright from '@components/copywrite/Copyright'

export default {
  name: 'app',
  components: {
    MainNav,
    Copyright,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
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
