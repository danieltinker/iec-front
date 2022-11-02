const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    //   devServer:{
    //  port:80,
    //  host:"192.116.153.15"
    // },

  lintOnSave:false,
  transpileDependencies: [
    'vuetify'
  ]
})
