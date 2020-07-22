<template>
  <div id="ProfileService" class="col-md-5 mx-auto">
    <h1 class="text-center my-3">Profile</h1>
    <div id="ProfilePage" class="card mb-2">
      <div class="row no-gutters">
        <div class="p-2 my-auto">
          <img :src="userInfo.picture" class="card-img" id = "user-image" style="height: 272px; width: 260px;" />
        </div>
        <div class="col-sm">
          <div class="card-body">
            <h3 class="card-title">{{ userInfo.username }}</h3>
            <p class="card-text"><strong>User since:</strong> {{ new Date(userInfo.createdAt).toDateString() }}</p>
            <p class="card-text"><strong>Shows on list:</strong> {{ showListLen }}</p>
          </div>
        </div>
      </div>
      <div id="pic-file-picker" style="display: none">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span @click="uploadFile" class="input-group-text">Upload</span>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="profile-pic-input" accept="image/*" />
            <label class="custom-file-label" for="profile-pic-input">Choose file</label>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button class="btn btn-outline-danger" @click="logUserOut">Log Out</button>
        <button class="btn btn-outline-primary" @click="showPicChooser">Change Picture</button>
      </div>
    </div>
    <!-- hacks -->
    <script type="application/javascript">
      $('input[type="file"]').change(function(e) {
        var fileName = e.target.files[0].name
        $('.custom-file-label').html(fileName)
      })
    </script>
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
    showPicChooser: function() {
      $('#pic-file-picker').show()
    },

    uploadFile: async function() {
      // switch to using jQuery to get the things?
      var file_data = $('#profile-pic-input').prop('files')[0]
      var form_data = new FormData()
      form_data.append('image', file_data)
      // https://stackoverflow.com/questions/36067767/how-do-i-upload-a-file-with-the-js-fetch-api#40826943
      // https://flaviocopes.com/how-to-upload-files-fetch/ Same thing; FormData() 👌
      const response = await fetch('https://api.imgur.com/3/image', {
        headers: {
          Authorization: 'Client-ID 24b7ab50ffdb0da',
        },
        method: 'POST',
        body: form_data /* we need the file here */,
        // mode: 'no-cors',
      })
      var imgur_response = await response.json()
      // imgur_response.data.link contains the URL for the user's photo

      // now update the user profile picture on the website.
      var updateUrl = 'https://parseapi.back4app.com/classes/Users/' + this.userInfo.objectId
      var updatePicData = {
        picture: imgur_response.data.link,
      }
      await fetch(updateUrl, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updatePicData),
      })
      // now change the src on the image to reflect that change
      $('#user-image').attr('src', imgur_response.data.link)
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
