<template>
  <div id="HomeService">
    <h1 class="text-center my-3">Shows on Watchlist</h1>
    <div class="px-5" id="shows-container" v-if="watched.length > 0">
      <div class="card-deck">
        <div class="card" style="max-width: 540px;" v-for="show in watched" :key="show.name" :data-id="show.gid">
          <div class="row">
            <div class="col-md-4">
              <img src="" class="card-img" alt="" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ show.name }}</h5>
                <p class="card-text">
                  This text is limited to fourty eight characters.
                </p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
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
    }
  },
  methods: {
    // get the db info
    queryDb: async function() {
      // actually get the db here
      var parseUrl = 'https://parseapi.back4app.com/classes/Watched'

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
.shows-container .parent {
  display: grid;
  place-items: center;
}
</style>
