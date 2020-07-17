<template>
  <div id="login" class="login">
    <LoginService />
  </div>
</template>

<script>
import LoginService from '../services/LoginService.vue'

export default {
  name: 'login',
  components: {
    LoginService,
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

<style></style>
