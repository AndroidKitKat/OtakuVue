<template>
  <div id="LoginService" class="col-md-4 mx-auto">
    <div id="login-form" v-if="noCookie">
      <h2 id="login-form-header" class="text-center my-3">Log In</h2>
      <div class="alert alert-danger" role="alert" id="login-alert-danger" style="display: none;"></div>
      <div class="alert alert-success" role="alert" id="login-alert-success" style="display: none;"></div>
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
        <button type="button" class="btn btn-primary" @click="loginAccount">Log In</button>
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
    return {
      noCookie: false,
    }
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

      // check if username already exists
      var checkUsernameUrl =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            username: username,
          },
        })
      const usernameCheckResponse = await fetch(checkUsernameUrl, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
        },
        method: 'GET',
      })

      const existsUserName = await usernameCheckResponse.json()
      if (existsUserName.results.length > 0) {
        $('#create-alert').show()
        $('#create-alert').html('<strong>Error</strong> - Username already taken!')
        return
      }

      // BAD! DO NOT DO
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

      // re-direct user
      $(location).attr('href', '/')
    },

    loginAccount: async function() {
      var username = $('#login-username').val()
      var password = $('#login-password').val()
      // check if these are empty

      if (username == '' || password == '') {
        $('#login-alert-danger').show()
        $('#login-alert-danger').html('<strong>Error</strong> - Enter a username and password')
        return
      }

      var url =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            username: username,
          },
        })
      const response = await fetch(url, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      const data = await response.json()
      var userInfo = data.results[0]

      // make sure that there exists a user with that username
      if (userInfo == undefined) {
        $('#login-alert-danger').show()
        $('#login-alert-danger').html('<strong>Error</strong> - Incorrect Username or Password!')
        return
      }
      if (userInfo.password !== password) {
        $('#login-alert-danger').show()
        $('#login-alert-danger').html('<strong>Error</strong> - Incorrect Username or Password!')
        return
      }
      // if we've made it this far the username exists and the password is correct

      // for checkbox state
      $('#login-alert-success').show()
      $('#login-alert-success').html('<strong>Success!</strong> Redirecting you...')
      // if checked, set expiration date on cookie for 10 days
      if ($('#login-keep').is(':checked')) {
        Cookies.set('id', userInfo.objectId, { expires: 10 })
      } else {
        Cookies.set('id', userInfo.objectId)
      }
      $(location).attr('href', '/')
    },
    checkLogin: function() {
      // if user has cookie, they be logged in
      var cookie = Cookies.get('id')

      if (cookie !== undefined) {
        $(location).attr('href', '/')
      } else {
        this.noCookie = true
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
