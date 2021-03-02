// 因为 东西全部堆积在 VUE 文件中，所以还是把他提取出来好操作
import {EChartsOptCls} from "../../../libs/EChartTool";
import { requestLocation,requestYydataByBh } from "./requests";
import { _LOCATION } from "./datas";

class ShuiYangUtils {
    /**
     *
     * @param $this 这个是 vue 对象
     */
    constructor($this,nameList) {
        this.$this = $this;
        this._myChart = null;
        this.echartElement = null;
        // 放置请求的数据（因为要分页这里放的是全部数据）
        this.tmpData = [];
        this.nameList = nameList;
        //
        this.eAndc = null;
        this.pointEchart = {};
    }

    init(echartId) {
        this.echartElement = document.getElementById(echartId);
        this._myChart = echarts.init(this.echartElement);
        // 创建一个 eAndC 对象，这个对象时用于创建地图上的 点 和在 点 所在位置创建一个 echart 图表
        this.eAndc = window.mapApis.createEntityAndCss3Rnederer();
        return this;
    }

    // 用于清空左下角的图表（▲并非地图中的图表）
    clearEchart() {
        this._myChart.setOption({},true);
    }

    // 用于更新左下角图表的样式，使其自动拉升为左下角大小
    _resetChartStyle() {
        this.echartElement.getElementsByTagName('div')[0].style.width = "100%";
        (this.echartElement.getElementsByTagName('canvas')[0] || {style: {width: 0}}).style.width = "100%";
        this._myChart.resize();
    }

    // 用于左数据缓存和执行 changePage 事件并初始化 分页器 配置
    setDataSourceAnData(promise) {
        return promise.then(d => {
            this.tmpData = d;
            this.$this.tablePage.total = d.length;
            this.$this.tablePage.current = 1;
            this.$this.changePage(1);
            return true;
        });
    }

    // 解析沙尘暴柱状图
    ParsingFscsData(dataList) {
        var optcls = new EChartsOptCls({
            dataZoom: true
        });
        optcls.setDataset(dataList, ["年份", "咸海", "尤阿雷", "卡萨雷", "克孜勒奥尔达", "斯瑞克拉巴特", "朱萨雷", "卡拉克"], ["year", "xh", "yal", "ksl", "aed", "lbt", "zsl", "klk"]);
        optcls.setSeries([
            {type: "bar", name: "咸海", encode: {x: 0, y: 1}},
            {type: "bar", name: "尤阿雷", encode: {x: 0, y: 2}},
            {type: "bar", name: "卡萨雷", encode: {x: 0, y: 3}},
            {type: "bar", name: "克孜勒奥尔达", encode: {x: 0, y: 4}},
            {type: "bar", name: "斯瑞克拉巴特", encode: {x: 0, y: 5}},
            {type: "bar", name: "朱萨雷", encode: {x: 0, y: 6}},
            {type: "bar", name: "卡拉克", encode: {x: 0, y: 7}}
        ]);
        this._myChart.setOption(optcls._opt, true);
        this._resetChartStyle();
    }

    //解析单个点具体信息折线图
    ParsingFscsData2(dataList) {
        var optcls = new EChartsOptCls({
            dataZoom: true
        });
        optcls.setDataset(dataList, ["年份", "次数"], ["year", "count"]);
        optcls.setSeries({
            type: "bar", name: "沙尘暴发生次数", encode: {x: 0, y: 1},
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        });
        this._myChart.setOption(optcls._opt, true);
        this._resetChartStyle();
    }
    //解析水样柱状图
    ParsingSYData(type) {
        let key;
        switch (type) {
            case "scb":
                key = 1;
                break;
            case "fsl":
                key = 2;
                break;
            case "scbfsl":
                key = 3;
                break;
        }

        var optcls = new EChartsOptCls({
            dataZoom: true,
            grid: {
                left: 40,
                right: 25
            }
        });
        optcls.setAxis([
            {type: "category"},
            [
                {type: "value"},
                {type: "value", name: "变异系数"}
            ]
        ]);
        optcls.setDataset(this.tmpData, ["气象站名", "沙尘量", "均方偏差", "变异系数"],
            ["name", "scl" + key, "jfpc" + key, "byxs" + key]);
        optcls.setSeries([
            {type: "bar", name: "沙尘量", encode: {x: 0, y: 1}},
            {type: "bar", name: "均方偏差", encode: {x: 0, y: 2}},
            {type: "bar", name: "变异系数", encode: {x: 0, y: 3}, yAxisIndex: 1}
        ]);
        this._myChart.setOption(optcls._opt, true);
        this._resetChartStyle();

        // 改变输送量同时改变地图图表
        this.nameList.forEach(name => {
            var data = [];
            this.tmpData.forEach(function (value) {
                if (value.name === name) {
                    data.push(value);
                }
            });

            this._updateMapChartSsl(name, data, key);
        });
    }


    // 创建地图中的点及图表 改
    createEchart() {
        _LOCATION.forEach(point => {
            let obj = window.mapApis.createEchartDom(
                    this.eAndc.entity,
                    this.eAndc.css3Renderer,
                    { title: point.bh,long: +point.long, lat: +point.lat }
                );
            // obj.echartElement.style.display = 'block';
            this.pointEchart[point.bh] = obj;
        });
    }
    // 下面三个方法都是用于更新地图中图表的内容的方法，根据不同菜单选用
    updateMapChartFscs(name,yearList) {
        if (name in this.pointEchart) {
            var mapChartItem = this.pointEchart[name];

            if(yearList && yearList.length > 0) {
                requestFscsByNameYears(name, yearList)
                    .then(data => {
                        var optcls = new EChartsOptCls({
                            grid: {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0
                            },
                            dataZoom: true
                        });
                        optcls.setAxis([{type: "category", axisTick: {show: false}}, {type: "value", axisTick: {show: false}}]);
                        optcls.setDataset(data, ["年份", "次数"], ["year", "count"]);
                        optcls.setSeries("bar", "沙尘暴发生次数");

                        mapChartItem.echartElement.style.display = "block";
                        mapChartItem.ec.setOption(optcls._opt, true);
                    });
            }else{
                mapChartItem.echartElement.style.display = "none";
            }
        }
    }
    _updateMapChartSsl(name, data, key) {
        if (name in this.pointEchart) {
            var mapChartItem = this.pointEchart[name];

            if (data) {
                var optcls = new EChartsOptCls({
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    dataZoom: true
                });
                optcls.setAxis([
                    {type: "category"},
                    [
                        {type: "value"},
                        {type: "value", name: "变异系数"}
                    ]
                ]);
                optcls.setDataset(data, ["气象站名", "沙尘量", "均方偏差", "变异系数"], ["name", "scl" + key, "jfpc" + key, "byxs" + key]);
                optcls.setSeries([
                    {type: "bar", name: "沙尘量", encode: {x: 0, y: 1}},
                    {type: "bar", name: "均方偏差", encode: {x: 0, y: 2}},
                    {type: "bar", name: "变异系数", encode: {x: 0, y: 3}, yAxisIndex: 1}
                ]);

                mapChartItem.echartElement.style.display = "block";
                mapChartItem.ec.setOption(optcls._opt, true);
            } else {
                mapChartItem.echartElement.style.display = "none";
            }
        }
    }
    updateMapChartPjssl() {
        this.nameList.forEach(name => {
            var mapChartItem = this.pointEchart[name];
            var data = requestPjsslByName(name);

            if (data) {
                var optcls = new EChartsOptCls({
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    tooltip: "item"
                });
                optcls.setAxis([]);
                optcls.setDataset(data, ["方向", "输送量"], ["direction", "val"]);
                optcls.setSeries({
                    type: "pie", name: name + "沙尘输送量", encode: {itemName: 0, value: 1}, label: {show: false}
                    // roseType: 'area'
                });

                mapChartItem.echartElement.style.display = "block";
                mapChartItem.ec.setOption(optcls._opt, true);
            } else {
                mapChartItem.echartElement.style.display = "none";
            }
        })
    }

    // 将地图中心拉到指定名称的点的位置
    flyToSite(bh) {
        _LOCATION.forEach(s => {
            if (s.bh === bh) {
                window.mapApis.flyToLatLng(s.lat,s.long,40000);
            }
        })
    }
}

export {
    ShuiYangUtils
}