<template>
  <div id="home" class="home">
    <HomeService />
  </div>
</template>

<script>
import HomeService from '../services/HomeService.vue'

export default {
  name: 'home',
  components: {
    HomeService,
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
