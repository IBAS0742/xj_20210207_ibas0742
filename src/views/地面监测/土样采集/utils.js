import {
    requestPhByNames,requestJlByName,requestYfsfByLocationList,
    requestYfsf,
    requestSpeci2
} from "./request";
import { EChartsOptCls } from "../../../libs/EChartTool";

class TuYangCaiJiUtils {
    constructor($this,echartId) {
        this.$this = $this;
        var echartElement = document.getElementById(echartId);
        this._myChart = echarts.init(echartElement);
        this.tmpData = [];
        this.entity = mapApis.createPointEntity();
        this._init();
    }

    _init() {
        let $this = this;
        mapApis.updateMagmMethod({
            OTHER(obj) {
                let name = obj.id.properties.name.getValue();
                $this.entity.flytoByEntityProperties(name);
                $this.entity.highlightEntity([name]);
            }
        });
    }

    refreshMapPointEntity(type){
        this.entity.clearEntityChildren();

        if(type === 0) {
            requestSpeci2()
                .then(ypList => {
                    this.entity.addPoints(ypList, "long", "lat", "name","type_" + 0);
                });
        }else if(type === 1){
            requestYfsf()
                .then(data => {
                    this.entity.addPoints(data, "E", "N", "Nam","type_" + 1);
                });
        }
    }

    showInfo(data) {
        switch (this.$this.type) {
            case "ph":
                this.showPhInfo(data);
                this.highlightYb(data);
                break;
            case "jl":
                this.showJlInfo(data);
                this.highlightYb(data);
                break;
            case "yfsf":
                this.showYfsf(data);
                break;
        }
    }
    showPhInfo(nameList) {
        requestPhByNames(nameList)
            .then(data => {
                this.queryLoadFirst(data);

                this.ParsingPhData([]);
            });
    }
    highlightYb(data) {
        this.entity.highlightEntity(data);
    }

    showJlInfo(nameList) {
        // $splitPanel.loading = true;
        requestJlByName(nameList)
            .then(data => this.queryLoadFirst(data));
    }

    showYfsf(locationList) {
        // $splitPanel.loading = true;
        requestYfsfByLocationList(locationList)
            .then(data => {
                this.queryLoadFirst(data);

                this.ParsingYfsfData();

                //高亮地图点
                var nameList = [];
                data.forEach(function (value) {
                    nameList.push(value.Nam);
                });
                this.highlightYb(nameList);
            });
    }

    ParsingPhData(dataList) {
        var optcls = new EChartsOptCls({
            dataZoom: true,
            grid: {
                right: 25
            }
        });
        optcls.setAxis([
            "category",
            ["value","value"]
        ]);
        optcls.setDataset(dataList, ["样本编号", "Cl- mg/g", "SO42-mg/g", "Ca2+ mg/g", "K+ mg/g", "Mg2+ mg/g", "Na+ mg/g", "CO32- mg/g", "HCO3- mg/g", "pH", "总盐 mg/g"],
            ["name", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "ph", "zy"]);
        optcls.setSeries([
            {type: "bar", name: "Cl- mg/g", encode: {x: 0, y: 1}},
            {type: "bar", name: "SO42-mg/g", encode: {x: 0, y: 2}},
            {type: "bar", name: "Ca2+ mg/g", encode: {x: 0, y: 3}},
            {type: "bar", name: "K+ mg/g", encode: {x: 0, y: 4}},
            {type: "bar", name: "Mg2+ mg/g", encode: {x: 0, y: 5}},
            {type: "bar", name: "Na+ mg/g", encode: {x: 0, y: 6}},
            {type: "bar", name: "CO32- mg/g", encode: {x: 0, y: 7}},
            {type: "bar", name: "HCO3- mg/g", encode: {x: 0, y: 8}},
            {type: "line", name: "pH", encode: {x: 0, y: 9}, yAxisIndex: 1},
            // {type: "line", name: "总盐 mg/g", encode: {x: 0, y: 10}},
        ]);
        this._myChart.setOption(optcls._opt, true);
    }

    ParsingYfsfData() {
        let chartType = this.$this.aboutYfsf.chartType;
        var cname = {
            "Salin": "土壤盐分",
            "EC": "土壤电导率",
            "Temper": "土壤温度",
            "Moist": "土壤水分"
        }[chartType];

        var optcls = new EChartsOptCls({
            dataZoom: true
        });
        optcls.setDataset(this.tmpData,["Nam","20","50","100"],
            ["Nam", chartType + "20",chartType + "50",chartType + "100"]);
        optcls.setSeries([
            { type: "bar", name: cname + "(0-20)", encode: {x: 0, y: 1}},
            { type: "bar", name: cname + "(20-50)", encode: {x: 0, y: 2}},
            { type: "bar", name: cname + "(50-100)", encode: {x: 0, y: 3}}
        ]);
        this._myChart.setOption(optcls._opt, true);
    }

    queryLoadFirst(data) {
        this.tmpData = data;
        this.$this.tablePage.total = this.tmpData.length; //设置总数
        this.$this.tablePage.current = 1;

        //加载第一页
        var list = [];
        for (var i = 0; i < this.$this.tablePage.pageSize; i++) {
            if (this.tmpData.length > i) list.push(this.tmpData[i]);
        }
        // this.$this.tableData = list;
        this.$this.tableData.splice(0,this.$this.tableData.length,...list);
        // this.$this.loading = false;
    }

    parsePromise(promise) {
        let $this = this.$this;
        promise.then(data => {
            $this.ypbhList.splice(0,$this.ypbhList.length,...data);
            $this.ypbhModel.splice(0,$this.ypbhModel.length,...(function () {
                var list = [];
                data.forEach(function (val) {
                    list.push(val.value);
                });
                return list;
            }()));
            $this.checkbox.checkAllGroup.splice(0,$this.checkbox.checkAllGroup.length);
            $this.checkbox.indeterminate = false;
            $this.checkbox.checkAll = false;

            // showJlInfo([]);
        });
    }

    changePage(currentPage) {
        var list = [];

        for(var i = 0; i < this.$this.tablePage.pageSize; i ++) {
            var idx = this.$this.tablePage.pageSize * ( currentPage - 1 ) + i;
            if (this.tmpData.length > idx) list.push(this.tmpData[idx]);
        }
        this.$this.tableData.splice(0,this.$this.tableData.length,...list);
    }
}

export {TuYangCaiJiUtils}