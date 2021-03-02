import {
    _LOCATION,
    _JJCZ,
    _RK,
    _SCTS,
    _ZZJG
} from "./datas";

function requestSite() {
    return _LOCATION;
}

//获取人口信息
function requestRkByName(name) {
    var data = [];

    _RK.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

function requestRkByNameYear(name, year) {
    var data = [];

    _RK.forEach(function (value) {
        if(value.name === name && + value.year === year) {
            data.push(value);
        }
    });

    return data;
}

function requestRkByYear(year) {
    var data = [];

    _RK.forEach(function (value) {
        if(+value.year === year) {
            data.push(value);
        }
    });

    return data;
}

//获取经济产值
function requestJjczByName(name) {
    var data = [];

    _JJCZ.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

function requestJjczByNameYear(name, year) {
    var data = [];

    _JJCZ.forEach(function (value) {
        if(value.name === name && + value.year === year) {
            data.push(value);
        }
    });

    return data;
}

function requestJjczByYear(year) {
    var data = [];

    _JJCZ.forEach(function (value) {
        if(+ value.year === year) {
            data.push(value);
        }
    });

    return data;
}

//获取牲畜数量
function requestSctsByName(name) {
    var data = [];

    _SCTS.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

function requestSctsByNameYear(name, year) {
    var data = [];

    _SCTS.forEach(function (value) {
        if(value.name === name && + value.year === year) {
            data.push(value);
        }
    });

    return data;
}

function requestSctsByYear(year) {
    var data = [];

    _SCTS.forEach(function (value) {
        if(+value.year === year) {
            data.push(value);
        }
    });

    return data;
}

//获取种植结构
function requestZzjgByName(name) {
    var data = [];

    _ZZJG.forEach(function (value) {
        if(value.name === name) {
            data.push(value);
        }
    });

    return data;
}

function requestZzjgByNameYear(name, year) {
    var data = [];

    _ZZJG.forEach(function (value) {
        if(value.name === name && + value.year === year) {
            data.push(value);
        }
    });

    return data;
}

function requestZzjgByYear(year) {
    var data = [];

    _ZZJG.forEach(function (value) {
        if(+value.year === year) {
            data.push(value);
        }
    });

    return data;
}

export {
    requestJjczByName,
    requestJjczByNameYear,
    requestJjczByYear,
    requestRkByName,
    requestRkByNameYear,
    requestRkByYear,
    requestSctsByName,
    requestSctsByNameYear,
    requestSctsByYear,
    requestSite,
    requestZzjgByName,
    requestZzjgByNameYear,
    requestZzjgByYear
}