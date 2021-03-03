window.allUrls = {
    // 地形
    'terrain': 'http://10.10.1.132/basemap/地形',
    'label': 'http://10.10.1.132/basemap/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://10.10.1.132/basemap/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://10.10.1.132:8080/geoserver/',
    'base': "http://10.10.1.132:8081/",
    tongji: 'http://10.10.1.132:8000/tongji/',
    realtime: "http://10.10.1.132:8090",
}

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
    },
    大湖区NDVI(year) {
        return {
            url: window.allUrls.geoserver + "dahuqu_net/wms",
            layers: `dahuqu_net:ndvi${year}`,
            params: {
                styles: `dahuqu_net:ndvi`,
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    },
    干旱指数(type,year,day) {
        return {
            url: window.allUrls.geoserver + "draught/wms",
            layers: `draught:${type}_${year}_${day}`,
            params: {
                styles: `draught:${type}`,
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    },
    干旱指数参数(type,year,day) {
        return {
            styles: `draught:${type}`,
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    },
    蒸散发参数(type){
        return {
            styles: `et:et-style`,
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    },
    中亚植被功能(){
        return {
            url: window.allUrls.geoserver + "zhibei/wms",
            layers: `zhibei:zhibei`,
            params: {
                // styles: `draught:${type}`,
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    }
};

// api 请求，结构有要求
// window.fetchFromUrl = (url, data) => fetch(url, {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//     },
//     method: 'POST',
//     body:  toParamString(data || {})
// }).then(_ => _.text())
//     .then(JSON.parse);

window.requestApis = {
    水文观测站点() {
        return {
            getLocations() {
                return fetchOnlyFromUrl(window.allUrls.realtime + '/query/realtime/data/locations',{},'get')
                    // .then(_ => {
                    //     return _.data
                    // })
                    // .then(_ => {
                    //     let menus = {};
                    //     _.forEach(lo => {
                    //         if (!(lo.areaCode in menus)) {
                    //             menus[lo.areaCode] = [];
                    //         }
                    //         menus[lo.areaCode].push({
                    //             title: lo.address,
                    //             id: lo.id + "_" + lo.areaCode + "_" + lo.address,
                    //             ...lo,
                    //         });
                    //     });
                    //     let omenus = [];
                    //     for (let i in menus) {
                    //         omenus.push({
                    //             title: i,
                    //             sub: menus[i]
                    //         });
                    //     }
                    //     return omenus;
                    // });
            },
            getDrivers(locationId) {
                return fetchOnlyFromUrl(window.allUrls.realtime + '/query/realtime/data/devices',{locationId},'get')
                    //.then(_ => _.data)
            },
            getDriversDef(deviceId) {
                return fetchOnlyFromUrl(window.allUrls.realtime + `/query/realtime/data/${deviceId}`,{},'get')
                    //.then(_ => _.data);
            },
            getDriversDatas(DeviceId,from,to,limit) {
                limit = limit || 100;
                return fetchOnlyFromUrl(`${window.allUrls.realtime}/query/realtime/data/${DeviceId}/${from}/${to}/${limit}`,{},'get')
                    //.then(_ => _.data);
            }
        }
    },
    干旱指数() {
        return {
            requestEDay(type) {
                return fetchFromUrl(window.allUrls.base + "table/draught/result/listBy",{
                    dtype: type
                });
            },
            tongji(raster,geojson,typeArray) {
                return fetchJsonPOST(window.allUrls.tongji, {
                    raster, //: 'avi-2018-1',
                    geojson, //,
                    array: typeArray, //: avi: "0,1,2,3",
                });
            }
        }
    },
    蒸散发() {
        return {
            requestEDay() {
                return fetchFromUrl(window.allUrls.base + "table/et/result/listBy",{
                    // dtype: type
                });
            },
            tongji(raster,geojson) {
                return fetchJsonPOST(window.allUrls.tongji, {
                    raster, //: 20151,
                    geojson, //,
                    type: "et",
                    array: '1,2,3,4,5,6,7,8,9999'
                });
            }
        }
    },
    中亚植被功能() {
        return {
            tongji(geojson) {
                return fetchJsonPOST(window.allUrls.tongji, {
                    raster:"zhibei:zhibei", //: 20151,
                    geojson, //,
                    type: "zhibei",
                    array: '1,2,3,4,5,6,7,8,9,10'
                });
            }
        };
    }

}

let toParamString = function(obj) {
    return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&');
};


// 无结构有要求
window.fetchOnlyFromUrlNoAPI =  (url, data) => {
    return fetch(url + "?" + toParamString(data || {}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'GET',
    }).then(_ => _.text());
};

// api 请求，结构有要求
window.fetchOnlyFromUrl = (url, data) => {
    return fetch(url + "?" + toParamString(data || {}), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'GET',
    }).then(_ => _.text())
        .then(JSON.parse)
        .then(d => {
            if (d.code !== 200) {
                alert("发生错误");
                window.loading.close();
            } else {
                return d;
            }
        })
};

// api 请求，结构有要求
window.fetchFromUrl = (url, data) => fetch(url, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    method: 'POST',
    body:  toParamString(data || {})
}).then(_ => _.text())
    .then(JSON.parse);

// 无结构有要求
window.fetchJsonPOST = (url, data) => fetch(url, {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'POST',
    body:  JSON.stringify(data) || JSON.stringify({})
}).then(_ => _.text())
    .then(JSON.parse);
// 无结构有要求
window.fetchJsonGET = (url, data) => fetch(url, {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'GET'
}).then(_ => _.text())
    .then(JSON.parse);

// fetchJsonUrl 或 fetchFromUrl 或 fakeFetchFromUrl 或 fakeFetchJsonUrl 请求回来的数据
// 当数据格式如下时可用，最后返回 data
// {
//     "msg": "success",
//     "flag": true,
//     "code": 0,
//     "data": [{}]
// }
window.featchJsonDefaultDearMFCD = function(promise) {
    return promise.then(_ => {
        if (_.msg !== 'success' && _.code !== 0) {
            window.msg(_.msg,"error");
            throw new Error(_.msg);
        } else {
            return _.data;
        }
    });
};

window.fakeFetchFromUrl = (url,data,defaultValue) => new Promise(function (s) {
    s(defaultValue)
});

window.fakeFetchJsonUrl = (url,data,defaultValue) => new Promise(function (s) {
    s(defaultValue)
})