<template>
  <div id="AddService">
    <h2 class="text-center my-3">Add show</h2>
    <div id="input-container" class="col-md-4 mx-auto">
      <div class="input-group">
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
      // eslint-disable-next-line no-undef
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
        console.log(data.results)
        // i love csv
        this.showResult = this.show.name
        this.validShow = true
      } catch {
        this.showResult = 'Not an anime!'
        this.validShow = false
      }
    },
    addShow: async function(Show) {
      console.log(Show)
      // check if anid is already in the database
      var check_url =
        'https://parseapi.back4app.com/classes/Users?' +
        $.param({
          where: {
            anid: Show.anid,
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
      // response.json() now contains either valid data from something in the watch list or an empty array if it isn't there
      const data = await response.json()
      // check if there is data
      if (!data.results[0]) {
        console.log(`going to add show ${Show.name} to the watch list`)

        var add_url = 'https://parseapi.back4app.com/classes/newWatched'

        var newShow = {
          anid: Show.anid,
          name: Show.name,
          status: 'started',
          summary: Show.summary,
          img: Show.img,
          watchedEps: '0',
          totalEps: Show.eps,
          type: Show.type,
        }

        await fetch(add_url, {
          headers: {
            'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
            'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(newShow),
        })
      } else {
        // TODO add alert
        console.log(`${Show.name} is already in the watchlist!`)
      }
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
