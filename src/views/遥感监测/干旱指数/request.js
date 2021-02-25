const url = () => window.allUrls.base + "/table/draught/";

// yearList = [2010,2011,2012,2013,2014,2015,2016],
// edayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
// all = {year:2010,has: 10,edayHas:[1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,1],eday:[1,3,5,7,8,9]},
const requestEDay = (type) =>
    fetchFromUrl(url() + "result/listBy",{
        dtype: type
    }).then(_ => _.data.list)
        // 按年排序
        // .then(_ => _.sort((a,b) => a.year - b.year))
        .then(_ => {
            let yearList = [];
            let all = {};
            let edayHas = (() => {
                let a = [];
                for (let i = 0;i < 46;i++) {
                    a.push(0);
                }
                return a;
            })();
            _.forEach(d => {
                // 只管这两个字段 eday、year
                if (d.year in all) {
                } else {
                    all[d.year] = {year:d.year,has: 0,eday:[],edayHas: JSON.parse(JSON.stringify(edayHas))};
                }
                all[d.year].has++;
                all[d.year].eday.push(d.eday);
            });
            for (let i in all) {
                yearList.push(i);
                all[i].eday = all[i].eday.sort((a,b) => a - b);
                all[i].eday.forEach(ed => {
                    all[i].edayHas[ed - 1] = 1;
                });
            }
            yearList = yearList.sort((a,b) => a - b);
            return {
                all,
                yearList
            }
        });

const requestEDayCache = new (class  {
    constructor() {
        this.cache = {};
        this.localStorageName = "__draught_eday_cache__";
        this.init();
    }

    init() {
        // { time:1595388556655, cache: {} }
        let store = localStorage.getItem(this.localStorageName);
        if (store) {
            let now = (new Date).getTime();
            store = JSON.parse(store);
            if (store.time) {
                // 半个钟内可以直接使用
                if (now - store.time < 30 * 1000 * 60) {
                    this.cache = store.cache;
                }
            } else {
                localStorage.removeItem(this.localStorageName);
            }
        }
    }

    update() {
        let now = (new Date).getTime();
        localStorage.setItem(this.localStorageName,JSON.stringify({
            time: now,cache: this.cache
        }));
    }

    getEDay(type) {
        let $this = this;
        if (type in this.cache) {
            return new Promise(function(s) {
                s($this.cache[type]);
            });
        } else {
            return requestEDay(type)
                .then(_ => {
                    $this.cache[type] = _;
                    $this.update();
                    return _;
                });
        }
    }
});

const requestYears = new Promise(function (s) {
    let years = [];
    let last = new Date().getYear() + 1900;
    for (let i = 2018;i <= last;i++) {
        years.push({
            key: i,
            value: i
        });
    }
    s(years);
});

const draughtInfo = {
    typeName: {
        avi: 'AVI 距平指标指数',
        vhi: 'VHI 植被健康指数',
        vswi: 'VSWI 植被供水指数',
        result: '干旱程度预警'
    },
    kind: {
        avi: "0,1,2,3",
        vhi: "0,1,2,3,4,5,6,7,8,9",
        vswi: "0,1,2,3,4,5",
        result: "0,1,2,3,4,5"
    },
    kindName: {
        avi: ['Positive','Drought arise','Moderate drought','Severe drought'],
        vhi: ['snow/ice/missing','0 ~ 6','6 ~ 12','12 ~ 24','24 ~ 36','36 ~ 48','48 ~ 60','60 ~ 72','72 ~ 84','84 ~ 100'],
        vswi: ['nodata','Heavy drought','Medium drought','Light drought','suitable','Wet (over-wet)'],
        result: ['nodata','Heavy drought','Medium drought','Light drought','suitable','Wet (over-wet)'],
    }
};
const tongji = function (raster,geojson,type) {
    return fetchJsonPOST(window.ips.api.tongji + '/tongji/',{
        raster, //: 'avi-2018-1',
        geojson, //,
        array: draughtInfo.kind[type], //:
    })
}