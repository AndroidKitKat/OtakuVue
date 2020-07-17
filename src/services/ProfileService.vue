<template>
  <div id="ProfileService" class="col-md-4 mx-auto">
    succ
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'Profile',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
    checkLogin: function() {
      var userId = Cookies.get('id')
      if (userId == undefined) {
        console.log('no id found')
      } else if (userId !== undefined) {
        console.log(`user id: ${userId}`)
      }
    },
  },
  computed: {},
  watch: {},
  // Lifecycle Hooks
  beforeCreate() {},
  created() {
    this.checkLogin()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
