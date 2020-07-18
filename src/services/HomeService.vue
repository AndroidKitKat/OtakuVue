<template>
  <div id="HomeService">
    <h1 class="text-center my-3">Shows on Watchlist</h1>
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
              <div class="card-body">
                <h5 class="card-title">{{ show.name }}</h5>
                <!-- TODO: FIX SPACING -->
                <p class="card-text">{{ show.summary.replace(/╘/g, ',') }}</p>
                <div class="row pl-3">
                  <!-- <button class="btn btn-success mr-1">Finish</button> -->
                  <button class="btn btn-danger mr-1" @click="removeShow(show.anid)">Drop Show</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
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
    }
  },
  methods: {
    // get the db info
    queryDb: async function() {
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
      // grab the anids from the showlist
      var userAnids = userAnidListData.results[0].shows
      // now turn those Anids into the show objects

      // query the db for each show in the database, i guess...
      // I THINK THIS IS ACTUALLY VERY SLOW WHEN IT GETS BIGGER
      // However, I think trade-off is worth it, since we want users to see the
      // show they JUST added to the top
      var userShows = []
      for (var i = 0; i < userAnids.length; i++) {
        var userShowUrl =
          'https://parseapi.back4app.com/classes/newTitles?' +
          $.param({
            where: {
              anid: userAnids[i],
            },
          })
        const userGetShowResponse = await fetch(userShowUrl, {
          method: 'GET',
          headers: {
            'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
            'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
            'Content-Type': 'application/json',
          },
        })
        const userGetShowData = await userGetShowResponse.json()
        userShows.push(userGetShowData.results[0])
      }
      // reverse to see latest added
      this.watched = userShows.reverse()

      this.loading = false
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
  },
  computed: {},
  watch: {},
  // Lifecycle Hooks
  beforeCreate() {},
  created() {},
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
