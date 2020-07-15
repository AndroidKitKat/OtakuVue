<template>
  <div id="home" class="home">
    <TestingService />
  </div>
</template>

<script>
import TestingService from '../services/TestingService.vue'

export default {
  name: 'testing',
  components: {
    TestingService,
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
