<template>
  <div id="ProfileService" class="col-md-4 mx-auto">
    <h1 class="text-center my-3">Profile</h1>
    <button class="btn btn-outline-danger" @click="logUserOut">Log Out</button>
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
    logUserOut: function() {
      Cookies.remove('id')
      $(location).attr('href', '/')
    },
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
