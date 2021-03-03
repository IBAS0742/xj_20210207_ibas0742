/* 获取数据请求 | yangjianzhi */
import { _LOCATION,_JJYS } from "./datas";

function requestSite() {
    return _LOCATION;
}

//获取人口信息
function requestYsByName(name) {
    var data = [];

    _JJYS.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    })

    return data;
}

//获取某年某地人口信息
function requestYsByYearName(year, name) {
    var data = [];

    _JJYS.forEach(function (value) {
        if(value.name === name && +value.year === year) {
            data.push(value);
        }
    });

    return data;
}

export {
    requestSite,
    requestYsByName,
    requestYsByYearName,
}