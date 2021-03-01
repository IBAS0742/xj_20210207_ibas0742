// yearList = [2010,2011,2012,2013,2014,2015,2016],
// edayList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
// all = {year:2010,has: 10,edayHas:[1,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,1],eday:[1,3,5,7,8,9]},
const requestEDay = () =>{
    let defaultData = {
        "code": 200,
        "data": {
            "list": [
                ...(function () {
                    let a = [];
                    for (let year = 2010;year < 2019;year++){
                        for (let i = 0;i < 46;i++) {
                            a.push({
                                "eday": i + 1,
                                "year": year
                            });
                        }
                    }

                    return a;
                })()
            ],
        },
        "message": "SUCCESS"
    };
    return new Promise(s => s(defaultData))
        .then(_ => _.data.list)
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
}



const requestETEDayCache = new (class  {
    constructor() {
        this.cache = null;
        this.localStorageName = "__et_eday_cache__";
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

    getEDay() {
        let $this = this;
        if (this.cache) {
            return new Promise(function(s) {
                s($this.cache);
            });
        } else {
            return requestEDay()
                .then(_ => {
                    $this.cache = _;
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

const etInfo = {
    kindName: ['0-1 mm','1-2 mm','2-3 mm','3-4 mm','4-5 mm','5-6 mm','6-7 mm','7-8 mm','>8 mm']
};
const tongji = function (raster,geojson) {
    return window.requestApis.蒸散发().tongji(
        raster, //: 'avi-2018-1',
        geojson
    )
}

export {
    tongji,
    requestEDay,
    etInfo
}