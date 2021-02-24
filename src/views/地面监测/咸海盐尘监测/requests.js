import { stations,_STATION,_FSCS,LocationMapping,_PJSSL,_SSL} from "./datas";

/**
 * 需要形如
 * Promise(s => {
 *     s([
 *         {
 *             title: '',
 *             open: false,
 *             options: [ {key:'',label:'',selected: false } ]
 *         }
 *     ]);
 * });
 */
const requestStation = () => new Promise(function (resolve) {
    let sts = [];
    stations.forEach(s => {
        let _s = {
            title: s.title,open: false,
            options: []
        };
        s.sub.forEach(ss => {
            _s.options.push({
                label: ss.title,
                key: ss.key,
                selected: false
            })
        });
        sts.push(_s);
    });
    resolve(sts);
});

// 格式同 requestStation
const requestMenus = () => new Promise(function (s) {
    s([
        {
            title: '沙尘暴发生次数', open: false,
            options: _STATION.map(_ => {
                return {
                    name: _.title,
                    label: _.title,
                    key: _.title,
                    selected: false,
                    long: _.long,
                    lat: _.lat,
                    type: 'fscs2',
                    title: '沙尘暴发生次数'
                };
            })
        },
        {
            title: '沙尘输送量统计特征',open: false,
            options: [ {
                label: '沙尘输送量统计特征', key: '沙尘输送量统计特征', selected: false,
                type: 'ssl', title: '沙尘输送量统计特征'
            } ]
        },
        {
            title: '沙尘多年平均输送量',open: false,
            options: [ {
                label: '沙尘多年平均输送量', key: '沙尘多年平均输送量', selected: false,
                type: 'pjssl', title: '沙尘多年平均输送量'
            } ]
        }
    ]);
});

//获取某地名的沙尘暴发生次数
// datas 格式为
// {
//     count: "62"
//     name: "克孜勒奥尔达"
//     year: "1966"
// }
const requestFscsByName = name => new Promise(s => {
    var datas = [];
    _FSCS.forEach(function (value) {
        if(value.name === name) {
            datas.push(value);
        }
    });
    s(datas);
});
const requestFscsByNameYears = (name,years) => new Promise(s => {
    var data = [];
    _FSCS.forEach(function (value) {
        if(value.name === name && years.includes(value.year)) {
            data.push(value);
        }
    });
    s(data);
});
const requestFscs = () => new Promise(s => {
    var data = [];

    var dataJson = {};
    _FSCS.forEach(function (value) {
        var name = value.name;
        var year = value.year;
        var count = value.count;

        if (year && LocationMapping[name]) {
            if (!dataJson[year]) {
                dataJson[year] = { year : year };
            }
            dataJson[year][LocationMapping[name]] = count;
        }
    });

    for(var key in dataJson) {
        data.push(dataJson[key]);
    }
    s(data);
});

const requestSsl = () => new Promise(s => {
    s(_SSL);
});

const requestPjSsl = () => new Promise(s => {
    var data = [];

    var dataJson = {};
    _PJSSL.forEach(function (value) {
        var name = value.name;
        var val = value.val;
        var direction = value.direction;

        if(name && direction) {
            if(!dataJson[name]) {
                dataJson[name] = { name: name };
            }
            dataJson[name][direction] = val;
        }
    });

    for (let key in dataJson) {
        data.push(dataJson[key]);
    }

    s(data);
});

const requestPjsslByName = name => {
    var data = [];

    _PJSSL.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

export {
    requestStation,
    requestMenus,
    requestFscs,
    requestFscsByName,
    requestFscsByNameYears,
    requestPjSsl,
    requestSsl,
    requestPjsslByName
}