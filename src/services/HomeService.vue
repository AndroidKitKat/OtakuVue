<template>
  <div id="HomeService">
    <h2>Shows on Watchlist</h2>
    <div id="shows-container" v-if="watched.length > 0">
      <div class="well well-sm" v-for="show in watched" :key="show.name" :id="show.gid">
        <a :href="ann_url + show.anid" target="_blank">{{ show.name }}</a>
      </div>
    </div>
    <div id="empty-shows-container" v-else>
      <h3>You have no shows on your watchlist!</h3>
      <p>Go to the add tab and add some shows!</p>
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
