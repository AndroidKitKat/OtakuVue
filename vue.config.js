module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "src/sass/style.scss";'
      }
    }
  },
  pluginOptions: {
    stylelint: {
      fix: true,
      files: '',
      formatter: () => {}
    },
    lintStyleOnBuild: false
  }
};
