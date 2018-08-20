<template>
  <div>
    <slot name="header"><p>Header</p></slot>
    <slot name="main"><p>Main</p></slot>
    <slot name="footer"><p>Footer</p></slot>
  </div>
</template>

<script>
export default {
  name: 'mainLayout',
  components: {},
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
