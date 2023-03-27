// https://nuxt.com/docs/api/configuration/nuxt-config
export default({
    css: ['/assets/css/style.css'],
    build: {
      extend(config, { isDev, isClient }) {
        if (!isDev) {
          // JSONファイルがキャッシュされないようにする
          config.module.rules.push({
            test: /\.json$/,
            type: 'javascript/auto',
            use: ['json-loader']
          })
        }
      }
    }
  });
