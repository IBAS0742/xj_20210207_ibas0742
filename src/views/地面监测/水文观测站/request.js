import {
    timestampToYMDHMS
} from "../../../libs/util";
// ① 获取站点，可以获取到所有站点信息，并知道这些站点属于哪一个区域（自定义的区域）
const requestLocations = () => {
    /**
     * Promise(s => {
     *     s([
     *         {
     *             title: '中国',
     *             open: false,
     *             options : [
     *                 {
     *                      // id: '',
     *                      coord: "{lat:1,lng:1}",
     *                      locationId: 9,
     *                      address: '新疆',
     *                      areaCode: '中国',
     *                      height: 1.5,
     *                      // 下面三个属性是给组件用的
     *                      selected: false,
     *                      value: '',
     *                      label: ''
     *                 }
     *             ]
     *         }
     *     ])
     * });
     */
    return window.requestApis.水文观测站点().getLocations()
        .then(_ => _.data)
        .then(_ => {
            let menus = {};
            _.forEach(lo => {
                if (!(lo.areaCode in menus)) {
                    menus[lo.areaCode] = [];
                }
                menus[lo.areaCode].push({
                    title: lo.address,
                    value: lo.areaCode + "_" + lo.address,
                    label: `${lo.address}`,
                    ...lo,
                    selected: false
                });
            });
            let omenus = [];
            for (let i in menus) {
                omenus.push({
                    title: i,
                    open: false,
                    options: menus[i]
                });
            }
            return omenus;
        });
}
// ② 获取某一个站点下有哪些设备，返回设备的名字类型和开始结束时间
const requestDrivers = (locationId) => {
    // [
    //     {
    //         "deviceId": 31,
    //         "coord": "{\"lat\":46.18820280032149,\"lng\":56.79307807772313}",
    //         "hight": 1.5,
    //         "areaCode": "中国",
    //         "address": "新疆",
    //         "deviceName": "新疆地下水",
    //         "company": "光大",
    //         "deviceType": "地下水",
    //         "earlyDate": 1573633842000,
    //         "lastDate": 1575151821000
    //     }
    // ]
    // =>
    // [
    //     {
    //         "id": 31,
    //         "name": "新疆地下水",
    //         "type": "地下水",
    //         "from": 1573633842000,
    //         "to": 1575151821000
    //     }
    // ]
    return window.requestApis.水文观测站点().getDrivers(locationId)
        .then(_ => _.data)
        .then(ret => {
            let devices = ret.map(_ => {
                return {
                    id: _.deviceId,
                    from: _.earlyDate,
                    to: _.lastDate,
                    name: _.deviceName,
                    type: _.deviceType
                };
            });
            return devices;
        });
}
// ③ 获取设备的字段定义（即key与中文名的映射对象）
const requestDriverDef = (deviceId) => {
    /**
     * [{"value":"自动递增","key":"id"},{"value":"采集时间","key":"sys_datetime"}]
     * */
    return window.requestApis.水文观测站点().getDriversDef(deviceId)
        .then(_ => _.data);
}
// ④ 获取一个站点的某一个设备的数据(直接获取全部就好了)
const requestDriverDatas = (DeviceId,from,to,limit) => {
    /** 各种设备的数据可能不太一样
     * Promise(s => {
     *     s([ {"shuiweimaishen":null,"tantouyali":null,"id":1000136,"shuiweibiaogao":null,"diandaolv":null,"wendu":52.0,"sys_datetime":1574151779000,"qiyazhi":null}] ]);
     * })
     * */
    return window.requestApis.水文观测站点().getDriversDatas(DeviceId,from,to,limit || 100)
        .then(_ => _.data)
        .then(data => {
            for (let i = 0;i < data.length;i++) {
                data[i].sys_datetime = timestampToYMDHMS(data[i].sys_datetime);
            }
            return data;
        });
};

// 将第 ④ 步获取到的数据转化为 DataList 组件的 item 数据和 echart 的 option 数据
// datas => item and option
const datas2ItemAndOption = (datas,type) => {
    let items = [];
    let option = {};
    if (type === "地下水") {
        option = {
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line'
            }]
        };
        datas.forEach(d => {
            items.push(`${d.sys_datetime}:${d.wendu}`);
            option.xAxis.data.push(d.sys_datetime);
            option.series[0].data.push(d.wendu);
        });
        return {
            items,option
        };
    }
}

export {
    requestDriverDatas,
    requestDriverDef,
    requestDrivers,
    requestLocations,
    datas2ItemAndOption
}