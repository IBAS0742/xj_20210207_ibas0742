# xj_20210130_ibas0742
新疆项目（重建）

### 配置

url 配置项在 [这里](./lib/config/urls.js)

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