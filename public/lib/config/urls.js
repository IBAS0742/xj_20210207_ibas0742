window.allUrls = {
    // 地形
    'terrain': 'http://localhost:8888/地形',
    'label': 'http://localhost:8888/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://localhost:8888/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://10.10.1.132:8080/geoserver/'
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
            url: window.allUrls.geoserver + "lake/wms",
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