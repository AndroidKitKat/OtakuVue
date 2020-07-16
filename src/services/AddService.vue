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
    <div class="card bg-light card-body mb-3 card bg-faded p-1 mb-3" v-if="validShow">
      <a class="ani-name" :href="ann_url + show.anid" target="_blank">{{ show.name }}</a>
      <p>{{ show.summary.replace(/╘/g, ',') }}</p>
      <button type="button" class="btn btn-info" @click="addShow">Add</button>
    </div>
    <div class="well well-sm" v-else-if="validShow == false">
      Input a valid show name!
    </div>
  </div>
</template>

<script>
export default {
  name: 'addService',
  components: {},
  props: {},
  data() {
    return {
      showName: '',
      ann_url: 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=',
      show: {},
      validShow: false,
      showResult: '',
      fixedSummary: '',      
    }
  },
  methods: {
    searchShow: async function() {
      // eslint-disable-next-line no-undef
      // var url = 'https://parseapi.back4app.com/classes/newTitles'
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
        this.show = data.results[0]
        console.log(data.results)
        // i love csv
        this.showResult = this.show.name
        this.validShow = true
      } catch {
        this.showResult = 'Not an anime!'
        this.validShow = false
      }
    },
    addShow: async function() {
      // first check if entry is already in the deeb
      // eslint-disable-next-line no-undef
      var check_url = 'https://parseapi.back4app.com/classes/newWatched?' + $.param({ where: { 
        anid: this.show.anid
      } })
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
        console.log(`going to add show ${this.show.name} to the watch list`)

        var add_url = 'https://parseapi.back4app.com/classes/newWatched'

        var newShow = {
          anid: this.show.anid,
          name: this.show.name,
          status: 'started',
          summary: this.show.summary,
          img: this.show.img,
          watchedEps: "0",
          totalEps: this.show.eps,
          type: this.show.type,
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
        console.log(`${this.show.name} is already in the watchlist!`)
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
