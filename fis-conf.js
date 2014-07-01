fis.config.merge({
  project : {
    exclude : /html|js|css|json/
  },
  //插件配置节点
  modules : {
    // 编译器插件配置节点
    parser : {
      jade : 'jade',
      less : 'less'
    }
  },
  roadmap : {
    ext : {
      jade : 'html',
      less : 'css'
    },
    //配置所有资源的domain
    path : [{
        reg : 'map.json',
        release : false
      },{
        reg     : 'templates/layout.jade',
        release : 'index.html',
        isHtmlLike:false
      },{
        reg     : '**.jade',
        release : false,
        useCache: false
      }]
  },
  deploy : {
    local : {
      to : './'
    }
  }
});