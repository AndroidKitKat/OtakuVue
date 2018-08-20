<template>
  <div id="app">
    <Layout>
      <!-- header -->
      <Header slot="header">
        <Nav />
      </Header>
      <!-- /header | main-->
      <Main slot="main">
        <router-view/>
      </Main>
      <!-- /main | footer -->
      <Footer slot="footer">
        <Copyright />
      </Footer>
      <!-- /footer -->
    </Layout>
  </div>
</template>

<script>
import Layout from '@layouts/MainLayout'
import Header from '@layouts/Header'
import Main from '@layouts/Main'
import Footer from '@layouts/Footer'
import Nav from '@components/MainNav'
import Copyright from '@components/Copyright'

export default {
  name: 'app',
  components: {
    Layout,
    Header,
    Main,
    Footer,
    Nav,
    Copyright,
  },
}
</script>
