<template>
  <div id="HomeService">
    <h1 class="text-center my-3">Shows on Watchlist</h1>
    <div id="shows-container" v-if="watched.length > 0 && !loading">
      <div class="col-md-8 mx-auto">
        <div
          class="card mb-2"
          style="height:210px; justify-content: center;"
          v-for="show in watched"
          :key="show.name"
          :data-id="show.gid"
        >
          <div class="row no-gutters">
            <div class="pl-1">
              <img
                :src="show.img"
                class="card-img anime-art"
                alt=""
              />
            </div>
            <div class="col-sm">
              <div class="card-body">
                <h5 class="card-title">{{ show.name }}</h5>
                <!-- TODO: FIX SPACING -->
                <p class="card-text">{{ show.summary.replace(/╘/g, ',') }}</p>
                <button class="btn btn-danger" @click="removeShow(show.objectId)">Remove</button>
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
      // actually get the db here
      var parseUrl = 'https://parseapi.back4app.com/classes/newWatched'

      const response = await fetch(parseUrl, {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
          'Content-Type': 'application/json',
        },
      })
      const shows = await response.json()
      this.watched = shows.results
      this.loading = false
    },
    // remove show from list
    removeShow: function(delObjectId) {
      console.log(`removing object id: ${delObjectId}`)
      var url = 'https://parseapi.back4app.com/classes/newWatched/' + delObjectId

      fetch(url, {
        headers: {
          'X-Parse-Application-Id': 'SoRFZII22nVCw17Wg28IZMKbfCfnbYupOke1dx0i',
          'X-Parse-REST-API-Key': 'P3TaBptY0NJFXpBCEwzJTtqKod1F61itSeBuUQ4P',
        },
        method: 'DELETE',
      })


    // https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
    this.watched.splice(this.watched.findIndex(function(show){
      return show.objectId === delObjectId;
    }), 1);
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
