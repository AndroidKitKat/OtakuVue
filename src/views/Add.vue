/* eslint-disable no-undef */
<template>
  <div id="add" class="add">
    <AddService />
  </div>
</template>

<script>
import AddService from '../services/AddService.vue'

export default {
  name: 'add',
  components: {
    AddService,
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
