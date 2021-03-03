import {_LOCATION,_DATA} from "./datas"
//获取水样站点
function requestLocation() {
    return new Promise(s => s([
        {
            title: "巴尔喀什湖水样采样数据集",
            sub: _LOCATION
        }
    ]));
}

//获取水样信息
function requestYydataByBh(bh) {
    let data = [];

    _DATA.forEach(function (value) {
        if(value.bh === bh) {
            data.push(value);
        }
    });

    // return new Promise(s => s(data));
    return data
}
// 格式同 requestStation
const requestMenus = () => new Promise(function (s) {
    s([
        {
            title: '巴尔喀什湖水样采样数据集', open: false,
            options: _LOCATION.map(_ => {
                return {
                    name: _.bh,
                    label: '样本'+_.bh,
                    key: _.bh,
                    selected: false,
                    long: _.long,
                    lat: _.lat,
                    title: '巴尔喀什湖水样采样数据集'
                };
            })
        }
    ]);
});

export {
    requestLocation,
    requestYydataByBh,
    requestMenus
}