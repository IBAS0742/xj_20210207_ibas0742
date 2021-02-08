window.allUrls = {
    // 地形
    'terrain': 'http://10.10.1.132/basemap/地形',
    'label': 'http://10.10.1.132/basemap/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://10.10.1.132/basemap/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://10.10.1.132/basemap/:8080/geoserver/'
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
    }
};