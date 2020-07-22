<template>
  <div id="HomeService">
    <h1 class="text-center my-3">Shows on Watchlist</h1>
    <div id="has-cookie-div" v-if="hasCookie">
      <div id="shows-container" v-if="watched.length > 0 && !loading">
        <div class="col-md-8 mx-auto">
          <div
            class="card mb-2"
            style="height:210px; justify-content: center;"
            v-for="show in watched"
            :key="show.gid"
            :data-id="show.anid"
          >
            <div class="row no-gutters">
              <div class="pl-1 my-auto">
                <img :src="show.img" class="card-img anime-art" alt="" />
              </div>
              <div class="col-sm">
                <div class="card-body pl-3">
                  <h5 class="card-title">{{ show.name }}</h5>
                  <!-- TODO: FIX SPACING -->
                  <p class="card-text">{{ show.summary.replace(/╘/g, ',') }}</p>
                  <div class="row no-gutters">
                    <!-- <button class="btn btn-success mr-1">Finish</button> -->
                    <button class="btn btn-danger mr-1" @click="removeShow(show.anid)">Drop Show</button>
                  </div>
                  <div class="row no-gutters mt-2">
                    <small class="text-muted">You're the only one watching this</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="watched.length == 0">
        <h4>You have nothing on your watchlist.</h4>
      </div>
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div id="hasnt-cookie-div" v-if="!hasCookie">
      <h3 class="text-center">You're not logged in!</h3>
      <h4 class="text-center">Log in to add shows to the watchlist.</h4>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'homeService',
  components: {},
  props: {},
  data() {
    return {
      watched: [],
      ann_url: 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=',
      loading: true,
      hasCookie: false,
    }
  },
  methods: {
    // get the db info
    queryDb: async function() {
      // bail if cookie isn't set
      if (!this.hasCookie) {
        return
      }
      // pull in the user's show list
      var userId = Cookies.get('id')

      var userAnidsListUrl =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            objectId: userId,
          },
        })

      const userAnidListResponse = await fetch(userAnidsListUrl, {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
      })
      const userAnidListData = await userAnidListResponse.json()
      // grab the SHOWS LIST (THESE ARE JSON Objects effectively)
      var userShows = userAnidListData.results[0].shows
      // no more need to fetch the database every freaking time...
      console.log(userShows)

      // reverse to see latest added
      this.watched = userShows.reverse()

      this.loading = false
    },
    getAllShows: async function() {
      // i guess we should get everyone's show list
      var url = 'https://parseapi.back4app.com/classes/Users'
      const usersResponse = await fetch(url, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })
      console.log(await usersResponse.json())
    },
    // remove show from list
    // has to be await so we get the user object
    removeShow: async function(delAnid) {
      console.log(`removing anid: ${delAnid}`)
      // need user id and get userObject from Db
      var userId = Cookies.get('id')
      var check_url =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            objectId: userId,
          },
        })
      const response = await fetch(check_url, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      var userResults = await response.json()
      var userInfo = userResults.results[0]
      // work with a deep copy of the user object just in case
      var userInfoCopy = JSON.parse(JSON.stringify(userInfo))
      // remove show from list
      userInfoCopy.shows.splice(userInfoCopy.shows.indexOf(delAnid), 1)

      // off to remove that pesky show
      // doesn't need to be await since we just need to yeet
      var updateUrl = 'https://parseapi.back4app.com/classes/Users/' + userInfo.objectId
      var updatedShowList = {
        shows: userInfoCopy.shows,
      }
      fetch(updateUrl, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updatedShowList),
      })
      this.watched.splice(
        this.watched.findIndex(function(show) {
          return show.anid === delAnid
        }),
        1
      )
    },
    checkLogin: function() {
      var cookie = Cookies.get('id')
      // dont show anything to users who aren't logged in!
      if (cookie !== undefined) {
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
  beforeMount() {
    this.queryDb()
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
}
</script>

<style scoped>
.card-img {
  object-fit: none;
  object-position: center;
}
</style>
