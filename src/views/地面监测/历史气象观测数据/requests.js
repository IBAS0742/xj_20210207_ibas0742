const {
    _STATION,
    _PRECIP,
    _T
} = require('./datas')

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
const requestStation = () => new Promise(function (s) {
    var data = [];

    var countryDict = {};
    _STATION.forEach(function (value) {
        var countryid = value["countryID"];
        if(countryid) {
            if(!countryDict[countryid]) {
                countryDict[countryid] = [];
            }
            countryDict[countryid].push({
                name: value.name,
                key: value.name,label: value.name,selected: false,
                lng: value.long,lat: value.lat
            });
        }
    });

    for(var key in countryDict) {
        data.push({
            title: key,
            open: false,
            options: countryDict[key]
        });
    }

    s(data);
});

//根据站点名获取气象站信息
const requestStationByName = name => {
    var data;

    _STATION.forEach(function (value) {
        if(value.name === name) {
            data = value;
        }
    });

    return data;
}

// 返回 items 和 options
const requestPcpItemsAndOption = name => new Promise(s => {
    var items = [];
    var options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Pcp值']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Pcp值',
                type: 'line',
                stack: '总量',
                data: [],
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
    _PRECIP.forEach(function (value) {
        if(value.name === name) {
            options.xAxis.data.push(`${value.year}-${value.month}`);
            options.series[0].data.push(value.pcp_mm);
            items.push(`${value.year}-${value.month} : ${value.pcp_mm}`);
        }
    });
    s({ options,items });
});

// 返回 items 和 options
const requestTItemsAndOption = name => new Promise(s => {
    var items = [];
    var options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['溫度(max)','溫度(min)','溫度(avg)']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '最大值',
                type: 'line',
                stack: '总量',
                data: []
            },
            {
                name: '最小值',
                type: 'line',
                stack: '总量',
                data: []
            },
            {
                name: '平均值',
                type: 'line',
                stack: '总量',
                data: []
            },
        ]
    };
    _T.forEach(function (value) {
        if(value.name === name) {
            options.xAxis.data.push(`${value.year}-${value.month}`);
            options.series[0].data.push(value.tmax);
            options.series[1].data.push(value.tmin);
            options.series[2].data.push(value.tavg);
            items.push(`${value.year}-${value.month} : [max:${value.tmax},min:${value.tmin},avg:${value.tavg}]`);
        }
    });
    s({ options,items })
});

//获取pcp值
const requestPcp = name => {
    var data = [];

    _PRECIP.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

// 获取温度
const requestT = name => {
    var data = [];

    _T.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

export {
    requestT,
    requestPcp,
    requestStation,
    requestStationByName,
    requestTItemsAndOption,
    requestPcpItemsAndOption,
}