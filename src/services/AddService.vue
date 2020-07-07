<template>
  <div id="AddService">
    <h2>Add show</h2>
    <div class="ani-input-div">
      <input type="text" v-model="showName" />
      <button @click="searchShow">Search</button>
    </div>
    <div class="well well-sm" v-if="validShow">
      <a class="ani-name" :href="ann_url + show.anid" target="_blank">{{ show.name }}</a>
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
    }
  },
  methods: {
    searchShow: async function() {
      // eslint-disable-next-line no-undef
      var url = 'https://parseapi.back4app.com/classes/Titles?' + $.param({ where: { name: this.showName } })

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
      var check_url = 'https://parseapi.back4app.com/classes/Watched?' + $.param({ where: { anid: this.show.anid } })
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

        var add_url = 'https://parseapi.back4app.com/classes/Watched'

        var newShow = {
          anid: this.show.anid,
          name: this.show.name,
          status: 'started',
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

<style>
.ani-input-div {
  padding-bottom: 10px;
}
.ani-name {
  padding-right: 10px;
}
.well {
  min-height: 54px;
}
</style>

<style>
.ani-input-div {
  padding-bottom: 10px;
}
.ani-name {
  padding-right: 10px;
}
.well {
  min-height: 54px;
}
</style>
