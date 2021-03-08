module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        // @已经被vue配置别名为src
        'assets': '@/assets',
        'common': '@/commom',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}