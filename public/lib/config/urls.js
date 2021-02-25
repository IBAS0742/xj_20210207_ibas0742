window.allUrls = {
    // 地形
    'terrain': 'http://10.10.1.132/basemap/地形',
    'label': 'http://10.10.1.132/basemap/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://10.10.1.132/basemap/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://10.10.1.132:8080/geoserver/',
    'base': "http://10.10.1.132:8081/",
    tongji: 'http://10.10.1.132:8000/tongji/'
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
    }
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

window.requestApis = {
    水文观测站点() {

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

}

let toParamString = function(obj) {
    return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }).join('&');
};
