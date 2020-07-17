<template>
  <div id="LoginService" class="col-md-4 mx-auto">
    <div id="login-form">
      <h2 id="login-form-header" class="text-center my-3">Log In</h2>
      <div class="alert alert-danger" role="alert" id="login_alert" style="display: none;"></div>
      <div class="form-group">
        <label for="login-username">Username</label>
        <input
          type="text"
          class="form-control"
          id="login-username"
          aria-describedby="emailHelp"
          placeholder="Enter Username"
        />
      </div>
      <div class="form-group">
        <label for="login-password">Password</label>
        <input type="password" class="form-control" id="login-password" placeholder="Password" />
      </div>
      <div class="form-check form-group">
        <input type="checkbox" class="form-check-input" id="login-keep" />
        <label class="form-check-label" for="login-keep">Keep Me Logged In</label>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary">Log In</button>
      </div>
      <small>Don't have an account? Click <a href="#" @click="changeForm('login')">here</a> to make one.</small>
    </div>
    <div id="create-form" style="display: none">
      <h2 id="login-form-header" class="text-center my-3">Create Account</h2>
      <div class="alert alert-danger" role="alert" id="create-alert" style="display: none;"></div>
      <div class="form-group">
        <label for="create-username">Username</label>
        <input type="text" class="form-control" id="create-username" placeholder="Enter Username" />
      </div>
      <div class="form-group">
        <label for="login-password">Password</label>
        <input type="password" class="form-control" id="create-password" placeholder="Password" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="create-password-repeat" placeholder="Confirm Password" />
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="createAccount">Sign up</button>
      </div>
      <small>Already have an account? Click <a href="#" @click="changeForm('create')">here</a> to log in.</small>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'testing',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
    changeForm: function(shown) {
      if (shown === 'login') {
        $('#login-form').hide()
        $('#create-form').show()
      } else if (shown === 'create') {
        $('#login-form').show()
        $('#create-form').hide()
      }
    },

    createAccount: async function() {
      var username = $('#create-username').val()
      var password = $('#create-password').val()
      var passwordConfirm = $('#create-password-repeat').val()

      if (!(password === passwordConfirm)) {
        $('#create-alert').show()
        $('#create-alert').html('<strong>Error</strong> - Passwords do not match!')
        return
      }

      //BAD DO NOT DO
      var newUser = {
        username: username,
        password: password,
        shows: [],
        picture: 'https://yld.moe/e56',
      }
      var newUserURL = 'https://parseapi.back4app.com/classes/Users'

      const response = await fetch(newUserURL, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newUser),
      })
      const user = await response.json()
      // set the user cookie
      Cookies.set('id', user.objectId, { expires: 10 })
    },
  },
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
