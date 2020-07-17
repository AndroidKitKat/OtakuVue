<template>
  <div id="Profile" class="Profile">
    <ProfileService />
  </div>
</template>

<script>
import ProfileService from '../services/ProfileService.vue'

export default {
  name: 'Profile',
  components: {
    ProfileService,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
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

<style></style>
