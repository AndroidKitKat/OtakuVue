<template>
  <Layout>
    <!-- header -->
    <Header slot="header">
    </Header>
    <!-- /header | main-->
    <Main slot="main">
    </Main>
    <!-- /main | footer -->
    <Footer slot="footer">
    </Footer>
    <!-- /footer -->
  </Layout>
</template>

<script>
import Layout from './layouts/MainLayout'
import Header from './layouts/Header'
import Main from './layouts/Main'
import Footer from './layouts/Footer'

export default {
  name: 'home',
  components: {
    Layout,
    Header,
    Main,
    Footer,
  },
  props: {},
  data() {
    return {
      // Add to Header component
      // :attr="headerAttrs"
      headerAttrs: {
        id: '',
        class: '',
        attrs: '',
      },
    }
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
