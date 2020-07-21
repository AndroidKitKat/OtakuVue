<template>
  <div id="ProfileService" class="col-md-5 mx-auto">
  <h1 class="text-center my-3">Profile</h1>
    <div id="ProfilePage" class="card mb-2">
      <div class="row no-gutters">
        <div class="p-2 my-auto">
          <img :src="userInfo.picture" class="card-img" style="height: 50%;" />
        </div>
        <div class="col-sm">
          <div class="card-body">
            <h3 class="card-title">{{ userInfo.username }}</h3>
            <p class="card-text"><strong>User since:</strong> {{ new Date(userInfo.createdAt).toDateString() }}</p>
            <p class="card-text"><strong>Shows on list:</strong> {{ showListLen }}</p>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button class="btn btn-outline-danger" @click="logUserOut">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'Profile',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
      showListLen: '',
    }
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
    getUserInfo: async function() {
      var userId = Cookies.get('id')
      var userUrl =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            objectId: userId,
          },
        })
      const response = await fetch(userUrl, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      var userResults = await response.json()
      this.userInfo = userResults.results[0]
      this.showListLen = this.userInfo.shows.length
    },
  },
  computed: {},
  watch: {},
  // Lifecycle Hooks
  beforeCreate() {},
  created() {
    this.checkLogin()
  },
  beforeMount() {
    this.getUserInfo()
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>
