const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    //   devServer:{
    //  port:80,
    //  host:"look for  Wireless LAN ip4v"
    // },

  lintOnSave:false,
  transpileDependencies: [
    'vuetify'
  ],

  publicPath:"/mobile/"
})
