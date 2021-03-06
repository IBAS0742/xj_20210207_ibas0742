window.allUrls = {
    // 地形
    'terrain': 'http://localhost:8888/地形',
    'label': 'http://localhost:8888/标签/{z}/{x}/{y}.png',
    // 影像
    'image': 'http://localhost:8888/影像/{z}/{x}/{y}.jpg',
    'geoserver': 'http://localhost:8080/geoserver/'
}

let forTest__mapLayers = year => {
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
}
let forTest_randomLayers = () => {
    let layer = ["xj_test:vhi201811","xj_test:vhi201812","xj_test:vhi201813"]
    return {
        url: window.allUrls.geoserver + "xj_test/wms",
        layers: layer[parseInt(Math.random() * 3)],
        params: {
            styles: 'xj_test:vhi',
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    }
}

window.requestApis = {
    水文观测站点() {
        let locations = {"msg":"success","flag":true,"code":200,"data":[{"locationId":9,"coord":"{\"lat\":46.18820280032149,\"lng\":56.79307807772313}","hight":1.5,"areaCode":"中国","address":"新疆"},{"locationId":26,"coord":"{\"lng\":69.153382,\"lat\":38.644804}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Romit"},{"locationId":27,"coord":"{\"lng\":68.893890,\"lat\":37.862928}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Bohtar"},{"locationId":28,"coord":"{\"lng\":69.430633,\"lat\":37.654097}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Kulob"},{"locationId":29,"coord":"{\"lng\":73.965410,\"lat\":38.160650}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Mugarb"},{"locationId":30,"coord":"{\"lng\":69.67162,\"lat\": 40.29383}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Khujad"},{"locationId":31,"coord":"{\"lng\":72.486414,\"lat\":38.313604}","hight":0.0,"areaCode":"塔吉克斯坦","address":"Brchargiv"},{"locationId":32,"coord":"{\"lng\":68.861972,\"lat\":38.552620}","hight":0.0,"areaCode":"塔吉克斯坦","address":"中亚中心"},{"locationId":33,"coord":"{\"lng\":60.325580,\"lat\":43.027890}","hight":0.0,"areaCode":"乌兹别克斯坦","address":"Tahtakupir"},{"locationId":34,"coord":"{\"lng\":59.526672,\"lat\":42.369706}","hight":0.0,"areaCode":"乌兹别克斯坦","address":"Takhiatash"},{"locationId":35,"coord":"{\"lng\":59.729670,\"lat\":42.709010}","hight":0.0,"areaCode":"乌兹别克斯坦","address":"Kegeyli"},{"locationId":36,"coord":"{\"lng\":59.532852,\"lat\":42.583422}","hight":0.0,"areaCode":"乌兹别克斯坦","address":"Akmingit"}]};
        let drivers = {"msg":"success","flag":true,"code":200,"data":[{"deviceId":31,"coord":"{\"lat\":46.18820280032149,\"lng\":56.79307807772313}","hight":1.5,"areaCode":"中国","address":"新疆","deviceName":"新疆地下水","company":"光大","deviceType":"地下水","earlyDate":1574151779000,"lastDate":1574156778000}]};
        return {
            getLocations() {
                return new Promise(s => {
                    s(locations);
                });
            },
            getDrivers(/*locationId*/) {
                return new Promise(s => {
                    s(drivers);
                })
            },
            getDriversDef(/*driverId*/) {
                let def = {"msg":"success","flag":true,"code":200,"data":[{"value":"自动递增","key":"id"},{"value":"采集时间","key":"sys_datetime"},{"value":"水位标高","key":"shuiweibiaogao"},{"value":"水位埋深","key":"shuiweimaishen"},{"value":"电导率","key":"diandaolv"},{"value":"水温","key":"wendu"},{"value":"探头压力","key":"tantouyali"},{"value":"气压","key":"qiyazhi"}]};
                return new Promise(s => s(def));
            },
            getDriversDatas(/*DeviceId,from,to,limit*/) {
                let datas = {"msg":"success","flag":true,"code":200,"data":[{"shuiweimaishen":null,"tantouyali":null,"id":1000136,"shuiweibiaogao":null,"diandaolv":null,"wendu":52.0,"sys_datetime":1574151779000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1000410,"shuiweibiaogao":null,"diandaolv":null,"wendu":7.0,"sys_datetime":1574152053000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1000684,"shuiweibiaogao":null,"diandaolv":null,"wendu":78.0,"sys_datetime":1574152327000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1000958,"shuiweibiaogao":null,"diandaolv":null,"wendu":59.0,"sys_datetime":1574152601000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1001232,"shuiweibiaogao":null,"diandaolv":null,"wendu":87.0,"sys_datetime":1574152875000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1001506,"shuiweibiaogao":null,"diandaolv":null,"wendu":28.0,"sys_datetime":1574153149000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1001780,"shuiweibiaogao":null,"diandaolv":null,"wendu":50.0,"sys_datetime":1574153423000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1002054,"shuiweibiaogao":null,"diandaolv":null,"wendu":73.0,"sys_datetime":1574153697000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1002328,"shuiweibiaogao":null,"diandaolv":null,"wendu":49.0,"sys_datetime":1574153971000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1002602,"shuiweibiaogao":null,"diandaolv":null,"wendu":99.0,"sys_datetime":1574154245000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1002876,"shuiweibiaogao":null,"diandaolv":null,"wendu":70.0,"sys_datetime":1574154519000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1003150,"shuiweibiaogao":null,"diandaolv":null,"wendu":16.0,"sys_datetime":1574154793000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1003424,"shuiweibiaogao":null,"diandaolv":null,"wendu":80.0,"sys_datetime":1574155067000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1003698,"shuiweibiaogao":null,"diandaolv":null,"wendu":99.0,"sys_datetime":1574155341000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1003972,"shuiweibiaogao":null,"diandaolv":null,"wendu":48.0,"sys_datetime":1574155615000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1004246,"shuiweibiaogao":null,"diandaolv":null,"wendu":29.0,"sys_datetime":1574155889000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1004520,"shuiweibiaogao":null,"diandaolv":null,"wendu":60.0,"sys_datetime":1574156163000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1004794,"shuiweibiaogao":null,"diandaolv":null,"wendu":7.0,"sys_datetime":1574156437000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1005068,"shuiweibiaogao":null,"diandaolv":null,"wendu":88.0,"sys_datetime":1574156711000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1005342,"shuiweibiaogao":null,"diandaolv":null,"wendu":49.0,"sys_datetime":1574156985000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1005616,"shuiweibiaogao":null,"diandaolv":null,"wendu":31.0,"sys_datetime":1574157259000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1005890,"shuiweibiaogao":null,"diandaolv":null,"wendu":5.0,"sys_datetime":1574157533000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1006164,"shuiweibiaogao":null,"diandaolv":null,"wendu":99.0,"sys_datetime":1574157807000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1006438,"shuiweibiaogao":null,"diandaolv":null,"wendu":83.0,"sys_datetime":1574158081000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1006712,"shuiweibiaogao":null,"diandaolv":null,"wendu":8.0,"sys_datetime":1574158355000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1006986,"shuiweibiaogao":null,"diandaolv":null,"wendu":16.0,"sys_datetime":1574158629000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1007260,"shuiweibiaogao":null,"diandaolv":null,"wendu":0.0,"sys_datetime":1574158903000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1007534,"shuiweibiaogao":null,"diandaolv":null,"wendu":36.0,"sys_datetime":1574159177000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1007808,"shuiweibiaogao":null,"diandaolv":null,"wendu":98.0,"sys_datetime":1574159451000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1008082,"shuiweibiaogao":null,"diandaolv":null,"wendu":72.0,"sys_datetime":1574159725000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1008356,"shuiweibiaogao":null,"diandaolv":null,"wendu":28.0,"sys_datetime":1574159999000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1008630,"shuiweibiaogao":null,"diandaolv":null,"wendu":75.0,"sys_datetime":1574160273000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1008904,"shuiweibiaogao":null,"diandaolv":null,"wendu":73.0,"sys_datetime":1574160547000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1009178,"shuiweibiaogao":null,"diandaolv":null,"wendu":26.0,"sys_datetime":1574160821000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1009452,"shuiweibiaogao":null,"diandaolv":null,"wendu":10.0,"sys_datetime":1574161095000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1009726,"shuiweibiaogao":null,"diandaolv":null,"wendu":42.0,"sys_datetime":1574161369000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1010000,"shuiweibiaogao":null,"diandaolv":null,"wendu":6.0,"sys_datetime":1574161643000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1010274,"shuiweibiaogao":null,"diandaolv":null,"wendu":3.0,"sys_datetime":1574161917000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1010548,"shuiweibiaogao":null,"diandaolv":null,"wendu":56.0,"sys_datetime":1574162191000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1010822,"shuiweibiaogao":null,"diandaolv":null,"wendu":35.0,"sys_datetime":1574162465000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1011096,"shuiweibiaogao":null,"diandaolv":null,"wendu":42.0,"sys_datetime":1574162739000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1011370,"shuiweibiaogao":null,"diandaolv":null,"wendu":99.0,"sys_datetime":1574163013000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1011644,"shuiweibiaogao":null,"diandaolv":null,"wendu":34.0,"sys_datetime":1574163287000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1011918,"shuiweibiaogao":null,"diandaolv":null,"wendu":40.0,"sys_datetime":1574163561000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1012192,"shuiweibiaogao":null,"diandaolv":null,"wendu":96.0,"sys_datetime":1574163835000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1012466,"shuiweibiaogao":null,"diandaolv":null,"wendu":94.0,"sys_datetime":1574164109000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1012740,"shuiweibiaogao":null,"diandaolv":null,"wendu":70.0,"sys_datetime":1574164383000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1013014,"shuiweibiaogao":null,"diandaolv":null,"wendu":29.0,"sys_datetime":1574164657000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1013288,"shuiweibiaogao":null,"diandaolv":null,"wendu":6.0,"sys_datetime":1574164931000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1013562,"shuiweibiaogao":null,"diandaolv":null,"wendu":65.0,"sys_datetime":1574165205000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1013836,"shuiweibiaogao":null,"diandaolv":null,"wendu":50.0,"sys_datetime":1574165479000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1014110,"shuiweibiaogao":null,"diandaolv":null,"wendu":51.0,"sys_datetime":1574165753000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1014384,"shuiweibiaogao":null,"diandaolv":null,"wendu":66.0,"sys_datetime":1574166027000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1014658,"shuiweibiaogao":null,"diandaolv":null,"wendu":24.0,"sys_datetime":1574166301000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1014932,"shuiweibiaogao":null,"diandaolv":null,"wendu":3.0,"sys_datetime":1574166575000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1015206,"shuiweibiaogao":null,"diandaolv":null,"wendu":81.0,"sys_datetime":1574166849000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1015480,"shuiweibiaogao":null,"diandaolv":null,"wendu":62.0,"sys_datetime":1574167123000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1015754,"shuiweibiaogao":null,"diandaolv":null,"wendu":1.0,"sys_datetime":1574167397000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1016028,"shuiweibiaogao":null,"diandaolv":null,"wendu":8.0,"sys_datetime":1574167671000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1016302,"shuiweibiaogao":null,"diandaolv":null,"wendu":54.0,"sys_datetime":1574167945000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1016576,"shuiweibiaogao":null,"diandaolv":null,"wendu":91.0,"sys_datetime":1574168219000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1016850,"shuiweibiaogao":null,"diandaolv":null,"wendu":73.0,"sys_datetime":1574168493000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1017124,"shuiweibiaogao":null,"diandaolv":null,"wendu":42.0,"sys_datetime":1574168767000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1017398,"shuiweibiaogao":null,"diandaolv":null,"wendu":56.0,"sys_datetime":1574169041000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1017672,"shuiweibiaogao":null,"diandaolv":null,"wendu":41.0,"sys_datetime":1574169315000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1017946,"shuiweibiaogao":null,"diandaolv":null,"wendu":21.0,"sys_datetime":1574169589000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1018220,"shuiweibiaogao":null,"diandaolv":null,"wendu":14.0,"sys_datetime":1574169863000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1018494,"shuiweibiaogao":null,"diandaolv":null,"wendu":44.0,"sys_datetime":1574170137000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1018768,"shuiweibiaogao":null,"diandaolv":null,"wendu":78.0,"sys_datetime":1574170411000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1019042,"shuiweibiaogao":null,"diandaolv":null,"wendu":4.0,"sys_datetime":1574170685000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1019316,"shuiweibiaogao":null,"diandaolv":null,"wendu":63.0,"sys_datetime":1574170959000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1019590,"shuiweibiaogao":null,"diandaolv":null,"wendu":16.0,"sys_datetime":1574171233000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1019864,"shuiweibiaogao":null,"diandaolv":null,"wendu":18.0,"sys_datetime":1574171507000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1020138,"shuiweibiaogao":null,"diandaolv":null,"wendu":36.0,"sys_datetime":1574171782000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1020412,"shuiweibiaogao":null,"diandaolv":null,"wendu":23.0,"sys_datetime":1574172056000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1020686,"shuiweibiaogao":null,"diandaolv":null,"wendu":26.0,"sys_datetime":1574172330000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1020960,"shuiweibiaogao":null,"diandaolv":null,"wendu":90.0,"sys_datetime":1574172604000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1021234,"shuiweibiaogao":null,"diandaolv":null,"wendu":24.0,"sys_datetime":1574172878000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1021508,"shuiweibiaogao":null,"diandaolv":null,"wendu":47.0,"sys_datetime":1574173152000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1021782,"shuiweibiaogao":null,"diandaolv":null,"wendu":8.0,"sys_datetime":1574173426000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1022056,"shuiweibiaogao":null,"diandaolv":null,"wendu":5.0,"sys_datetime":1574173700000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1022330,"shuiweibiaogao":null,"diandaolv":null,"wendu":51.0,"sys_datetime":1574173974000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1022604,"shuiweibiaogao":null,"diandaolv":null,"wendu":13.0,"sys_datetime":1574174248000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1022878,"shuiweibiaogao":null,"diandaolv":null,"wendu":32.0,"sys_datetime":1574174522000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1023152,"shuiweibiaogao":null,"diandaolv":null,"wendu":44.0,"sys_datetime":1574174796000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1023426,"shuiweibiaogao":null,"diandaolv":null,"wendu":44.0,"sys_datetime":1574175070000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1023700,"shuiweibiaogao":null,"diandaolv":null,"wendu":44.0,"sys_datetime":1574175344000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1023974,"shuiweibiaogao":null,"diandaolv":null,"wendu":73.0,"sys_datetime":1574175618000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1024248,"shuiweibiaogao":null,"diandaolv":null,"wendu":10.0,"sys_datetime":1574175892000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1024522,"shuiweibiaogao":null,"diandaolv":null,"wendu":60.0,"sys_datetime":1574176166000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1024796,"shuiweibiaogao":null,"diandaolv":null,"wendu":88.0,"sys_datetime":1574176440000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1025070,"shuiweibiaogao":null,"diandaolv":null,"wendu":50.0,"sys_datetime":1574176714000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1025344,"shuiweibiaogao":null,"diandaolv":null,"wendu":69.0,"sys_datetime":1574176988000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1025618,"shuiweibiaogao":null,"diandaolv":null,"wendu":94.0,"sys_datetime":1574177262000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1025892,"shuiweibiaogao":null,"diandaolv":null,"wendu":84.0,"sys_datetime":1574177536000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1026166,"shuiweibiaogao":null,"diandaolv":null,"wendu":0.0,"sys_datetime":1574177810000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1026440,"shuiweibiaogao":null,"diandaolv":null,"wendu":66.0,"sys_datetime":1574178084000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1026714,"shuiweibiaogao":null,"diandaolv":null,"wendu":98.0,"sys_datetime":1574178358000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1026988,"shuiweibiaogao":null,"diandaolv":null,"wendu":38.0,"sys_datetime":1574178632000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1027262,"shuiweibiaogao":null,"diandaolv":null,"wendu":88.0,"sys_datetime":1574178906000,"qiyazhi":null},{"shuiweimaishen":null,"tantouyali":null,"id":1027536,"shuiweibiaogao":null,"diandaolv":null,"wendu":63.0,"sys_datetime":1574179180000,"qiyazhi":null}]};
                return new Promise(s => s(datas));
            }
        }
    },
    干旱指数() {
        return {
            requestEDay(type) {
                return new Promise(s => {
                    s({"code":200,"data":{"endRow":340,"firstPage":0,"hasNextPage":false,"hasPreviousPage":false,"isFirstPage":false,"isLastPage":true,"lastPage":0,
                            "list":[
                                {"dtype":"vhi","eday":10,"id":"vhi20101","path":"","year":2018},
                                {"dtype":"vhi","eday":11,"id":"vhi20101","path":"","year":2018},
                                {"dtype":"vhi","eday":12,"id":"vhi20101","path":"","year":2018},
                                {"dtype":"vhi","eday":13,"id":"vhi20101","path":"","year":2018},
                                {"dtype":"vhi","eday":14,"id":"vhi20101","path":"","year":2018},
                            ],
                            "navigateFirstPage":0,"navigateLastPage":0,"navigatePages":8,"navigatepageNums":[],"nextPage":0,"orderBy":"","pageNum":0,"pageSize":0,"pages":0,"prePage":0,"size":340,"startRow":1,"total":340},"message":"SUCCESS"});
                });
            },
            tongji() {
                return new Promise(s => {
                    s({"0": "59580", "1": "0", "2": "4", "3": "43", "4": "35", "5": "21", "6": "15", "7": "25", "8": "37", "9": "106"});
                })
            }
        }
    }
}

window.mapLayers = {
    湖泊水面(year) {
        return forTest__mapLayers(year);
    },
    大湖区EVI(year) {
        return forTest__mapLayers(year);
    },
    大湖区NDVI(year) {
        return forTest__mapLayers(year)
    },
    // 干旱指数(type,year,day){
    //     return forTest_randomLayers()
    // },
    干旱指数参数(type){
        return {
            styles: 'xj_test:vhi',
            service: 'WMS',
            transparent: true,
            format: 'image/png'
        }
    }
};