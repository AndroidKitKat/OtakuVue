<template>
  <div>
    <hr />
    <footer class="text-center">
      <p class="text-muted">
        <small>
          Built using
          <a href="https://vuejs.org">Vue.js</a>, <a href="https://code.visualstudio.com">VSCode</a>,
          <a href="https://nodejs.org">Node.js</a>, and <a href="https://back4app.com">Parse</a>. Data from the
          <a href="https://animenewsnetwork.com">Anime News Network</a>.
          <br />
          &#xA9;
          {{ currentYear() }} <a href="https://github.com/AndroidKitKat">AndroidKitKat</a> and
          <a href="https://github.com/ogallahu">ogallahu</a>. Open source on
          <a href="https://github.com/AndroidKitKat/OtakuVue">GitHub</a>!
        </small>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'copyright',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
    siteName() {
      return process.env.VUE_APP_TITLE
    },
    currentYear() {
      return new Date().getFullYear()
    },
  },
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

<style></style>
