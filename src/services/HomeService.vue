<template>
  <div id="HomeService">
    <h1 class="text-center my-3">Watchlist</h1>
    <div id="has-cookie-div" v-if="hasCookie">
      <div id="nav-container" class="m-2 text-center">
        <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" id="my-list" @click="changeActiveTab('mine')" href="#">My Shows</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="others-list" @click="changeActiveTab('else')" href="#">What others are watching</a>
          </li>
        </ul>
      </div>
      <div id="entire-shows-container" v-if="!loading">
        <div id="my-shows-container" style="display: block;">
          <div class="col-md-8 mx-auto">
            <div class="card mb-2" v-for="show in watched" :key="show.gid" :data-id="show.anid">
              <div class="row no-gutters">
                <div class="pl-1 my-auto col-2">
                  <img :src="show.img" class="card-img anime-art" />
                </div>
                <div class="col-sm">
                  <div class="card-body pl-3">
                    <h5 class="card-title">{{ show.name }}</h5>
                    <p class="card-text">{{ show.summary.replace(/╘/g, ',') }}</p>
                    <div class="row no-gutters">
                      <button class="btn btn-danger mr-1" @click="removeShow(show)">Drop Show</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="watched.length == 0">
            <h4>You have nothing on your watchlist.</h4>
          </div>
        </div>
        <div id="others-shows-container" style="display: none;">
          <div class="col-md-8 mx-auto">
            <div class="card mb-2" v-for="show in globalWatched" :key="show.gid" :data-id="show.anid">
              <div class="row no-gutters">
                <div class="pl-1 my-auto col-2">
                  <img :src="show.img" class="card-img anime-art" />
                </div>
                <div class="col-sm">
                  <div class="card-body pl-3">
                    <h5 class="card-title">{{ show.name }}</h5>
                    <p class="card-text">{{ show.summary.replace(/╘/g, ',') }}</p>
                    <p class="text-muted">Watched by {{ show.watchers.join(', ') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center" v-if="globalWatched.length == 0">
            <h4>Apparently no one else is watching anything...</h4>
          </div>
        </div>
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
      globalWatched: [],
      // store the user info just because
      userInfo: {},
      activeTab: 'mine',
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
      this.userInfo = userAnidListData.results[0]
      var userShows = userAnidListData.results[0].shows

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
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      var globalUsersResp = await usersResponse.json()
      var globalUsersData = globalUsersResp.results
      var globalUserShowsObj = {}
      for (var i = 0; i < globalUsersData.length; i++) {
        for (var j = 0; j < globalUsersData[i].shows.length; j++) {
          // set thing to array if it isn't
          if (globalUserShowsObj[globalUsersData[i].shows[j].name] == undefined) {
            globalUserShowsObj[globalUsersData[i].shows[j].name] = { watchers: [] }
          }
          globalUserShowsObj[globalUsersData[i].shows[j].name].watchers.push(globalUsersData[i].username)
          // set the rest of the data
          globalUserShowsObj[globalUsersData[i].shows[j].name]['summary'] = globalUsersData[i].shows[j].summary
          globalUserShowsObj[globalUsersData[i].shows[j].name]['name'] = globalUsersData[i].shows[j].name
          globalUserShowsObj[globalUsersData[i].shows[j].name]['gid'] = globalUsersData[i].shows[j].gid
          globalUserShowsObj[globalUsersData[i].shows[j].name]['anid'] = globalUsersData[i].shows[j].anid
          globalUserShowsObj[globalUsersData[i].shows[j].name]['img'] = globalUsersData[i].shows[j].img
        }
      }
      var globalUserShowsArray = Object.values(globalUserShowsObj)
      this.globalWatched = globalUserShowsArray
    },
    // remove show from list
    // has to be await so we get the user object
    removeShow: async function(Show) {
      this.userInfo.shows.splice(
        this.userInfo.shows.findIndex(function(show) {
          return show.anid === Show.anid
        }),
        1
      )
      // // off to remove that pesky show
      // // doesn't need to be await since we just need to yeet
      var updateUrl = 'https://parseapi.back4app.com/classes/Users/' + this.userInfo.objectId
      var updatedShowList = {
        shows: this.userInfo.shows,
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
    },
    checkLogin: function() {
      var cookie = Cookies.get('id')
      // dont show anything to users who aren't logged in!
      if (cookie !== undefined) {
        this.hasCookie = true
      }
    },
    changeActiveTab: function(clickedTab) {
      // determine active tab
      var activeTab = ''
      if ($('#my-list').attr('class') === 'nav-link active') {
        activeTab = 'mine'
      } else {
        activeTab = 'else'
      }
      // see if the activeTab is not the clicked tab
      if (activeTab !== clickedTab) {
        // change the active tab
        if (clickedTab === 'mine') {
          $('#my-list').attr('class', 'nav-link active')
          $('#others-list').attr('class', 'nav-link')
          $('#my-shows-container').show()
          $('#others-shows-container').hide()
        } else {
          $('#my-list').attr('class', 'nav-link')
          $('#others-list').attr('class', 'nav-link active')
          $('#my-shows-container').hide()
          $('#others-shows-container').show()
        }
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
    this.getAllShows()
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
