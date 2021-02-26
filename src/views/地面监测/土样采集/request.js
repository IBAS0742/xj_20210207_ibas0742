import { _SPECI,_PH,_TYLJ,_YFSF  } from "./datas";

//获取样品信息
const requestSpeci = () => new Promise(s => {
    var list = [],
        itemList = [];
    _SPECI.forEach(function (value) {
        var val = value.name.substring(0, value.name.lastIndexOf("-"));
        if (itemList.indexOf(val) === -1) {
            list.push({
                label: val,
                value: val,
            });
            itemList.push(val);
        }
    });
    s(list);
});

const requestPhByNames = nameList => new Promise(s => {
    var data = [];

    _PH.forEach(function (value) {
        if(nameList.indexOf(value.name) !== -1) {
            data.push(value);
        }
    });

    s(data);
});

const requestSpeci2 = () => new Promise(s => {
    s(_SPECI);
});

const requestYfsfLocationByPrefix = prefixList => new Promise(s => {
    var data = [];

    _YFSF.forEach(function (value) {
        var isValid = false;
        var location = value.Location;
        prefixList.forEach(function (pfv) {
            if (location.indexOf(pfv) !== -1) {
                isValid = true;
            }
        });
        if (isValid && !data.includes(location)) {
            data.push(location);
        }
    });

    s(data);
});

const requestSpeciByPrefix = prefixList => new Promise(s => {
    var data = [];

    _SPECI.forEach(function (value) {
        var isValid = false;
        var name = value.name;
        prefixList.forEach(function (pfv) {
            if (name.indexOf(pfv) !== -1) {
                isValid = true;
            }
        });
        if (isValid && !data.includes(name)) {
            data.push(name);
        }
    });

    s(data);
});

const requestJlByName = nameList => new Promise(s => {
    var data = [];

    nameList.forEach(function (value) {
        var item = {};
        for (let key in _TYLJ) {
            item[key] = _TYLJ[key];
        }
        item["name"] = value;
        data.push(item);
    });

    s(data);
});

const requestYfsfLocationPrefix = () => new Promise(s => {
    var list = [],
        itemList = [];
    _YFSF.forEach(function (value) {
        var location = value["Location"];
        var val = location.substring(0, location.indexOf(","));
        if (itemList.indexOf(val) === -1) {
            list.push({
                label: val,
                value: val,
            });
            itemList.push(val);
        }
    });
    s(list);
});

const requestYfsfByLocationList = locationList => new Promise(s => {
    var data = [];

    _YFSF.forEach(function (value) {
        var location = value["Location"];
        if(locationList.includes(location)) {
            data.push(value);
        }
    });
    s(data);
});

const requestYfsf = () => new Promise(s => {
    s(_YFSF);
});

export { requestSpeci,requestSpeci2,requestPhByNames,
    requestSpeciByPrefix,
    requestYfsfLocationByPrefix,
    requestJlByName,
    requestYfsfLocationPrefix,
    requestYfsfByLocationList,
    requestYfsf
}