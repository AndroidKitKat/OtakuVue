<template>
  <header :id="attr.id" :class="attr.class" v-bind="attr.attrs">
    <slot><p>Header</p></slot>
  </header>
</template>

<script>
export default {
  name: 'mainLayoutHeader',
  components: {},
  props: {
    attr: {
      type: Object,
      default: () => {
        return {
          id: 'header',
          class: 'header',
          attrs: { role: 'banner' },
        }
      },
    },
  },
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
