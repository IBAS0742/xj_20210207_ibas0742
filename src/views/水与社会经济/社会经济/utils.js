import {
    requestJjczByName, requestRkByName, requestSctsByName, requestZzjgByName,
    requestZzjgByNameYear,requestSctsByNameYear,requestRkByNameYear,requestJjczByNameYear,
    requestRkByYear,requestZzjgByYear,requestSctsByYear,requestJjczByYear
} from "./request";
import { EChartsOptCls } from "../../../libs/EChartTool";
import { columns,_LOCATION } from "./datas";
import {_STATION} from "../../地面监测/咸海盐尘监测/datas";

class SheHuiJingJiUtils {
    constructor($this,_echarts) {
        this.$this = $this;
        this.tmpData = [];

        let dom = document.getElementById(_echarts.yearList);
        this.yearListEchart = echarts.init(dom);
        dom = document.getElementById(_echarts.pipe);
        this.pipeEChart = echarts.init(dom);
        dom = document.getElementById(_echarts.bar);
        this.barEchart = echarts.init(dom);
        this.keyNameJson = {
            "人口": ["农村人口", "城市人口"],
            "经济": ["工业产业", "农业产值"],
            "牲畜头数": ["牛", "羊"],
            "种植结构": ["经济作物", "粮食作物"],
        }
        this.keyJson = {
            "人口": ["ncrk", "csrk"],
            "经济": ["gycz", "nycz"],
            "牲畜头数": ["y", "n"],
            "种植结构": ["jjzw", "lszw"],
        };
        this.titleJson = {
            "人口": "城市人口农村人口对比",
            "经济": "工业产值农业产值对比",
            "牲畜头数": "牛羊数量对比",
            "种植结构": "粮食作物经济作物对比",
        };
        this.playId = null;

        this.eAndc = window.mapApis.createEntityAndCss3Rnederer();
        this.pointEchart = {};
        this.init();
    }

    init() {
        _LOCATION.forEach(point => {
            let obj = window.mapApis.createEchartDom(
                this.eAndc.entity,
                this.eAndc.css3Renderer,
                { title: point.name,long: +point.long, lat: +point.lat },
                {
                    width: '30px',
                    height: '90px',
                }
            );
            // obj.echartElement.style.display = 'block';
            this.pointEchart[point.name] = obj;
        });
    }

    switchMenu() {
        switch (this.$this.currentMenu.filter) {
            case "人口":
                this.tmpData = requestRkByName(this.$this.currentMenu.area);
                this.$this.table.columns.splice(0,this.$this.table.columns.length,...columns.人口);
                break;
            case "经济":
                this.tmpData = requestJjczByName(this.$this.currentMenu.area);
                this.$this.table.columns.splice(0,this.$this.table.columns.length,...columns.经济);
                break;
            case "牲畜头数":
                this.tmpData = requestSctsByName(this.$this.currentMenu.area);
                this.$this.table.columns.splice(0,this.$this.table.columns.length,...columns.牲畜头数);
                break;
            case "种植结构":
                this.tmpData = requestZzjgByName(this.$this.currentMenu.area);
                this.$this.table.columns.splice(0,this.$this.table.columns.length,...columns.种植结构);
                break;
        }
        {
            let ys = [];
            this.tmpData.forEach(t => ys.push(+t.year));
            this.$this.year.list.splice(0,this.$this.year.list.length,...ys);
            this.$this.year.start = ys[0];
            this.$this.year.end = ys[ys.length - 1];
            this.$this.year.current = ys[ys.length - 1];
            this.$this.year.play = false;
        }
        this.$this.title = this.$this.currentMenu.area + this.$this.currentMenu.filter + "统计信息";
        this.$this.tablePage.total = this.tmpData.length;
        this.$this.tablePage.current = 1;
        this.$this.tablePage.hasPage = true;
        this.chanePage(1);
        this.togglePlay(true);
        this.ParsingChart3();
        this.yearChange();
    }

    chanePage(page) {
        let list = [];
        let _this = this.$this;

        for(var i = 0; i < _this.tablePage.pageSize; i ++) {
            var idx = _this.tablePage.pageSize * ( page - 1 ) + i;
            if (this.tmpData.length > idx) list.push(this.tmpData[idx]);
        }
        _this.table.data.splice(0,_this.table.data.length,...list);
    }

    yearChange(noPause) {
        if (!noPause) {
            this.togglePlay(true);
        }
        this.ParsingChart1(this.$this.year.current);
        this.ParsingChart2(this.$this.year.current);
        _LOCATION.forEach(l => this.refereshMapCharts(l.name,this.$this.year.current));
    }

    ParsingChart1(year) {
        var type = this.$this.currentMenu.filter;
        var titleJson = {
            "人口": "城市人口农村人口对比",
            "经济": "工业产值农业产值对比",
            "牲畜头数": "牛羊数量对比",
            "种植结构": "粮食作物经济作物对比",
        };

        var data = [];
        switch (type) {
            case "人口":
                data = requestRkByNameYear(this.$this.currentMenu.area, year);
                break;
            case "经济":
                data = requestJjczByNameYear(this.$this.currentMenu.area, year);
                break;
            case "牲畜头数":
                data = requestSctsByNameYear(this.$this.currentMenu.area, year);
                break;
            case "种植结构":
                data = requestZzjgByNameYear(this.$this.currentMenu.area, year);
                break;
        }

        var optcls = new EChartsOptCls({
            title: {
                text: (year || "xx") + "年" + this.titleJson[type],
                textStyle: {
                    fontSize: 12
                }
            },
            tooltip: "item"
        });
        optcls.setAxis([]);
        optcls.setDataset(data, ["年份", this.keyNameJson[type][0], this.keyNameJson[type][1]], ["year", this.keyJson[type][0], this.keyJson[type][1]]);
        optcls.setSeries({
            type: "pie", name: this.titleJson[type], encode: {itemName: 0, value: 1},seriesLayoutBy: "row", top: 20
        });
        this.pipeEChart.setOption(optcls._opt, true);
    }
    ParsingChart2(year) {
        var type = this.$this.currentMenu.filter;
        var data = [];
        switch (type) {
            case "人口":
                data = requestRkByYear(year);
                break;
            case "经济":
                data = requestJjczByYear(year);
                break;
            case "牲畜头数":
                data = requestSctsByYear(year);
                break;
            case "种植结构":
                data = requestZzjgByYear(year);
                break;
        }

        var optcls = new EChartsOptCls({
            dataZoom: true,
            title: {
                text: (year || "xx") + "年五国" + type + "对比",
                textStyle: {
                    fontSize: 12
                }
            },
            grid: {
                left: 55
            }
        });
        optcls.setDataset(data, ["名称", this.keyNameJson[type][0], this.keyNameJson[type][1]], ["name", this.keyJson[type][0], this.keyJson[type][1]]);
        optcls.setSeries([
            {type: "bar", name: this.keyNameJson[type][0], stack: "值", encode: { x: 0, y: 1 }},
            {type: "bar", name:  this.keyNameJson[type][1], stack: "值", encode: { x: 0, y: 2 }}
        ]);
        this.barEchart.setOption(optcls._opt, true);
    }
    ParsingChart3() {
        var type = this.$this.currentMenu.filter;
        var optcls = new EChartsOptCls({
            dataZoom: true,
            title: {
                text:  this.$this.currentMenu.area + this.$this.currentMenu.filter + "变化对比",
                textStyle: {
                    fontSize: 12
                }
            },
            grid: {
                left: 55
            }
        });
        optcls.setDataset(this.tmpData, ["年份", this.keyNameJson[type][0], this.keyNameJson[type][1]],
            ["year", this.keyJson[type][0], this.keyJson[type][1]]);
        optcls.setSeries([
            {type: "bar", name: this.keyNameJson[type][0], stack: "值", encode: {x: 0, y: 1}},
            {type: "bar", name: this.keyNameJson[type][1], stack: "值", encode: {x: 0, y: 2}}
        ]);
        this.yearListEchart.setOption(optcls._opt, true);
    }

    togglePlay(forceStop) {
        if (forceStop) {
            if (this.playId) {
                clearInterval(this.playId);
                this.playId = null;
                this.$this.year.play = false;
            }
        } else {
            if (this.$this.year.play) {
                let $this = this.$this;
                let $this$ = this;
                $this.year.list.forEach((y,ind) => {
                    if (y === $this.year.start) {
                        $this.year.startIndex = ind;
                    }
                    if (y === $this.year.end) {
                        $this.year.endIndex = ind;
                    }
                });
                $this.year.current = $this.year.list[$this.year.startIndex];
                this.playId = setInterval(() => {
                    if ($this.year.startIndex > $this.year.endIndex) {
                        $this$.togglePlay(true);
                    } else {
                        $this.year.current = $this.year.list[$this.year.startIndex];
                        $this$.yearChange(true);
                    }
                    $this.year.startIndex++;
                },500);
            } else {
                this.togglePlay(true);
            }
        }
    }

    refereshMapCharts(name,year) {
        if (name in this.pointEchart) {
            var mapChartItem = this.pointEchart[name];
            var type = this.$this.currentMenu.filter;

            if (year) {
                var data = [];
                switch (type) {
                    case "人口":
                        data = requestRkByNameYear(name, year);
                        break;
                    case "经济":
                        data = requestJjczByNameYear(name, year);
                        break;
                    case "牲畜头数":
                        data = requestSctsByNameYear(name, year);
                        break;
                    case "种植结构":
                        data = requestZzjgByNameYear(name, year);
                        break;
                }

                var optcls = new EChartsOptCls({
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                });
                optcls.setAxis([{type: "category", axisTick: {show: false}}, {type: "value", axisTick: {show: false}}]);
                optcls.setDataset(data, ["年份", this.keyNameJson[type][0], this.keyNameJson[type][1]], ["year", this.keyJson[type][0], this.keyJson[type][1]]);
                optcls.setSeries([
                    {type: "bar", name: this.keyNameJson[type][0], stack: "值", encode: {x: 0, y: 1}},
                    {type: "bar", name: this.keyNameJson[type][1], stack: "值", encode: {x: 0, y: 2}}
                ]);

                mapChartItem.echartElement.style.display = "block";
                mapChartItem.ec.setOption(optcls._opt, true);
            } else {
                mapChartItem.echartElement.style.display = "none";
            }
        }
    }
}

export {
    SheHuiJingJiUtils
}