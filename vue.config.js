module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "src/assets/sass/style.scss";',
      },
    },
  },
  pluginOptions: {
    stylelint: {
      fix: true,
      files: '',
      formatter: () => {}
    },
    lintStyleOnBuild: false
  },
}
