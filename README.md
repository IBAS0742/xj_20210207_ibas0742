# 新疆项目（重建）

### 配置

url 配置项在 [config](./public/lib/config) 

### 启动项目需要启动的服务有

1、```D:\Temp\nginx-1.8.1\nginx.exe``` 

> 端口 8088

> 开启运行跨域

```text
server {
    listen       8888;
    #listen       somename:8080;
    #server_name  somename  alias  another.alias;
    add_header 'Access-Control-Allow-Origin' $http_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    location / {
        root   D:\Temp\map_data;
        #index  index.html index.htm;
    }
}
// D:\Temp\map_data 中的内容如下
map_data
├─标签
│  ├─1
│  ├─2
│  ├─...
├─地形
│  ├─0
│  ├─1
│  ├─...
├─影像
│  ├─0
│  ├─1
│  ├─...
```

2、```C:\Program Files (x86)\GeoServer 2.13.0\bin\startup.bat``` 

> 端口 8080

> 开启允许跨域

> 修改 ```C:\Program Files (x86)\GeoServer 2.13.0\webapps\geoserver\WEB-INF\web.xml```

### 其他

1、 可能各个 nodejs 版本的问题 webpack.*.config.js 脚本会有差异

```javascript
fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    // 这个是原始的内容，我的 nodejs 版本不支持
    // fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer){});
    // 这个理解为兼容版本，一般都可以用，无法使用请到 nodejs 官网查看当前版本的语法
    fs.write(fd, buf, 0, buf.length, function (err, written, buffer){});
});
```

### 页面编写规则(views/xxx/xxx)

① 不能删除或修改 xxx.vue 的名字和内部的 name 名字

② init.js 不能删除且不能修改其 export 的方法(可以添加方法)

③ 需要其他 js 的可以在页面底下重建 js 名字任意

> init.js

```javascript
const HuPoShuiMianInit = () => {
    // 设置地图左边占满整个屏幕，因为不需要底部的内容
    window.spop.setRate(1);
    // 各占一半可以这样写
    window.spop.setRate(0.5);
};
export {
    HuPoShuiMianInit
}
```

> xxx.vue

```vue
<template>
    <!- 注意这里的 map-rate 设置的值需要和 init.js 中设置的值一致 -->
    <ModelPage title="undefined" map-rate="1">
        <div slot="left">
            <!-- 这里是左边的部分，根据每个页面不同编写 -->
        </div>
        <div slot="right">
            <!-- 如果 map-rate 设置为 1 这里就不管了 -->
        </div>
    </ModelPage>
</template>

<script>
    export default {
        name: "XianHaiShuiZiYuan"
    }
</script>

<style scoped>
</style>
```

> 关于 接口 和 地图

本地开发可以直接在 [devUrls.js](./public/lib/config/devUrls.js) 中随意添加修改，在 [urls.js](./public/lib/config/urls.js) 中正确编写部署环境的部分

如果是地图部分，在 `window.mapLayers` 中定义，直接用中文即可，然后再在页面部分引入或调用即可

```javascript
// 湖泊水面 在 devUrl 中定义如下
window.mapLayers = {
    湖泊水面(year) {
        return forTest__mapLayers(year);
    },
    大湖区EVI(year) {
        return forTest__mapLayers(year);
    }
};
// 在 url 中定义如下
window.mapLayers = {
    湖泊水面(year) {
        return {
            url: window.allUrls.geoserver + "lake/wms",
            layers: `lake:lake_${year}`,
            params: {
                styles: `lake:lake`,
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    },
    大湖区EVI(year) {
        return {
            url: window.allUrls.geoserver + "dahuqu_net/wms",
            layers: `dahuqu_net:evi${year}`,
            params: {
                styles: `dahuqu_net:evi`,
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    }
};
```

具体的例子可以直接看 [湖泊水面](./src/views/遥感影像监测/湖泊水面/) 页面的内容

### 打包页面

```text
执行 yarn build 或点击 package.json 中 build 的按钮
如果是发布到对应的环境，在 build 之后点击 buildAfter 按钮 
```

### 其他

- 问题1：无法获取到球面外的点坐标

[问答:Cesium 屏幕坐标转换出现undefined](http://ask.supermap.com/50749?show=51384)

因此如果模块中部分点不在事先声明的范围内，需要执行 apis.setBaseView，默认范围在 apis.setBaseView 中

- 问题2：无法监听时间变化（时间序列影像，在播放时无法获取到影像是否变化的情况）

在[timeline代码](./public/lib/CesiumSeal/TimeLine.js)中添加以下内容

```javascript
//回调函数
let id = setInterval(() => {
    $this.onTimelineChange(viewer.clock.currentTime,CesiumUtils.julianIntToDate(viewer.clock.currentTime.dayNumber,$this.startTimeMill));
},200);
```

### 各个页面的开发说明

[apis接口使用说明](./document/apis接口使用说明.md)

[咸海盐尘监测](./document/咸海盐尘监测_文件结构和代码说明.md)