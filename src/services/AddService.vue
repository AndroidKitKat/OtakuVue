<template>
  <div id="AddService">
    <h2 class="text-center my-3">Add show</h2>
    <div id="input-container" class="col-md-4 mx-auto">
      <div class="alert alert-danger" role="alert" id="add-alert-danger" style="display: none;"></div>
      <div class="alert alert-success" role="alert" id="add-alert-success" style="display: none;"></div>
      <div class="input-group pb-3">
        <input
          v-model="showName"
          type="text"
          class="form-control"
          placeholder="Search for a show..."
          aria-label="Search for a show"
          aria-describedby="show-input"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-primary" type="button" @click="searchShow">Search</button>
        </div>
      </div>
    </div>
    <div id="search-results" class="col-md-8 mx-auto">
      <div class="card mb-2" v-for="show in shows" :key="show.gid" style="height:210px; justify-content: center;">
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
                <button class="btn btn-primary mr-1" @click="addShow(show)">Add Show</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable no-undef
export default {
  name: 'addService',
  components: {},
  props: {},
  data() {
    return {
      showName: '',
      ann_url: 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=',
      shows: [],
      validShow: false,
      showResult: '',
      fixedSummary: '',
    }
  },
  methods: {
    searchShow: async function() {
      $('#add-alert-success').hide()
      $('#add-alert-danger').hide()
      var url = 'https://parseapi.back4app.com/classes/newTitles?' + $.param({ where: { name: this.showName } })

      const response = await fetch(url, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      try {
        const data = await response.json()
        this.shows = data.results
        // i love csv
        this.showResult = this.show.name
        this.validShow = true
      } catch {
        this.showResult = 'Not an anime!'
        this.validShow = false
      }
    },
    addShow: async function(Show) {
      //Show is an object that contains the info for the show that was just selected
      var userId = Cookies.get('id')
      var check_url =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            objectId: userId,
          },
        })
      // get showlist from server
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
      //userInfo.shows now contains an array of anids that the user has on their watch list

      //checks to see if the selected anid IS in the userInfo.shows array
      if ($.inArray(Show.anid, userInfo.shows) !== -1) {
        $('#add-alert-danger').show()
        $('#add-alert-danger').html('<strong>Error</strong> - Show already on watchlist!')
        return
      }

      // show was not in the list, so lets send it!
      var updateUrl = 'https://parseapi.back4app.com/classes/Users/' + userId
      var updatedShowList = userInfo.shows
      updatedShowList.push(Show.anid)
      var updateInfo = {
        shows: updatedShowList,
      }

      await fetch(updateUrl, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(updateInfo),
      })
      $('#add-alert-success').show()
      $('#add-alert-success').html('<strong>Show added to watch list!</strong>')
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
