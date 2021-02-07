window.allUrls = {
    // 地形
    'terrain': 'http://localhost:8888/地形',
    'label': 'http://localhost:8888/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://localhost:8888/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://localhost:8080/geoserver/'
}

window.mapLayers = {
    湖泊水面(year) {
        let layers = "";
        switch (year) {
            case 1990:
                layers = "xj_test:vhi201811";
                break;
            case 2000:
                layers = "xj_test:vhi201812";
                break;
            case 2010:
                layers = "xj_test:vhi201813";
                break;
        }
        return {
            url: window.allUrls.geoserver + "xj_test/wms",
            layers: layers,
            params: {
                styles: 'xj_test:vhi',
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    },
    大湖区EVI(year) {
        let layers = "xj_test:vhi201813";
        switch (year) {
            case 1990:
                layers = "xj_test:vhi201811";
                break;
            case 2000:
                layers = "xj_test:vhi201812";
                break;
            case 2010:
                layers = "xj_test:vhi201813";
                break;
        }
        return {
            url: window.allUrls.geoserver + "xj_test/wms",
            layers: layers,
            params: {
                styles: 'xj_test:vhi',
                service: 'WMS',
                transparent: true,
                format: 'image/png'
            }
        }
    }
};