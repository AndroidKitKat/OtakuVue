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
      var cookie = Cookies.get('id')
      // redirect users who aren't logged in
      if (cookie == undefined) {
        $(location).attr('href', '/')
      } else {
        this.hasCookie = true
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
