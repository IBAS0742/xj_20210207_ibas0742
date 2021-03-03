import {
    requestYsByYearName,
    requestYsByName,
    requestSite
} from "./request";
import { EChartsOptCls } from "../../../libs/EChartTool";
import { columns,_LOCATION } from "./datas";
import {_STATION} from "../../地面监测/咸海盐尘监测/datas";

class SheHuiJingJiYongShuiUtils {
    constructor($this,_echarts) {
        this.$this = $this;
        this.tmpData = [];

        let dom = document.getElementById(_echarts.yearList);
        this.yearListEchart = echarts.init(dom);
        dom = document.getElementById(_echarts.pipe);
        this.pipeEChart = echarts.init(dom);
        dom = document.getElementById(_echarts.bar);
        this.barEchart = echarts.init(dom);

        this.playId = null;

        this.eAndc = null;
        this.pointEchart = [];
        this.init();
    }

    init() {
        this.eAndc = window.mapApis.createEntityAndCss3Rnederer();
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
        this.tmpData = requestYsByName(this.$this.currentMenu.area);
        {
            let ys = [];
            this.tmpData.forEach(t => ys.push(+t.year));
            this.$this.year.list.splice(0,this.$this.year.list.length,...ys);
            this.$this.year.start = ys[0];
            this.$this.year.end = ys[ys.length - 1];
            this.$this.year.current = ys[ys.length - 1];
            this.$this.year.play = false;
        }
        this.$this.title = this.$this.currentMenu.area + "用水量统计信息";
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
        var data = requestYsByYearName(year, this.$this.currentMenu.area);

        var optcls = new EChartsOptCls({
            title: {
                text: (year || "xx") + "年用水量对比",
                textStyle: {
                    fontSize: 12
                }
            },
            tooltip: "item"
        });
        optcls.setAxis([]);
        optcls.setDataset(data, ["年份", "工业用水量", "生活用水量"], ["year", "gyysl", "shysl"]);
        optcls.setSeries([
            {type: "pie", name: "用水量", encode: {itemName: 0, value: 1}, seriesLayoutBy: "row", top: 20}
        ]);
        this.pipeEChart.setOption(optcls._opt, true);
    }
    ParsingChart2(year) {
        var data = requestYsByYearName(year, this.$this.currentMenu.area);

        //整理数据
        var dataList = [];
        var xList = ["type", "s1,s6", "s2,s7", "s3,s8", "s4,s9", "s5,s10"];

        if(data && data.length > 0) {
            var value = data[0];
            dataList = [{type: "value1"}, {type: "value2"}];
            for (var i = 1; i < xList.length; i++) {
                var xStr = xList[i];
                var xNames = xStr.split(",");

                //数值1
                dataList[0][xStr] = value[xNames[0]];
                //数值2
                dataList[1][xStr] = value[xNames[1]];
            }
        }

        var optcls = new EChartsOptCls({
            title: {
                text: (year || "xx") + "农业用水s1-s10对比",
                textStyle: {
                    fontSize: 12
                }
            },
            dataZoom: true,
            grid: {
                left: 45
            }
        });
        optcls.setDataset(dataList,xList,xList);
        optcls.setSeries([
            {type: "bar", encode: { x: 0,y: 1, seriesName: 1 }, seriesLayoutBy: 'row' },
            {type: "bar", encode: { x: 0,y: 2, seriesName: 2 }, seriesLayoutBy: 'row' },
        ]);

        this.barEchart.setOption(optcls._opt, true);
    }
    ParsingChart3() {
        var optcls = new EChartsOptCls({
            title: {
                text: "用水预测对比",
                textStyle: {
                    fontSize: 12
                }
            },
            dataZoom: true,
            grid: {
                left: 45
            }
        });
        optcls.setDataset(this.tmpData, ["年份", "工业用水量", "生活用水量"], ["year", "gyysl", "shysl"]);
        optcls.setSeries([
            {type: "bar", stack: "用水", name: "工业用水量", encode: { x: 0 , y: 1}},
            {type: "bar", stack: "用水", name: "生活用水量", encode: { x: 0 , y: 2}},
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

            if (year) {
                var data = requestYsByYearName(year, name);
                var optcls = new EChartsOptCls({
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                });
                optcls.setAxis([{type: "category", axisTick: {show: false}}, {type: "value", axisTick: {show: false}}]);
                optcls.setDataset(data, ["年份", "工业用水量", "生活用水量"], ["year", "gyysl", "shysl"]);
                optcls.setSeries([
                    {type: "bar", name: "工业用水量", stack: "用水", encode: {x: 0, y: 1}},
                    {type: "bar", name: "生活用水量", stack: "用水", encode: {x: 0, y: 2}}
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
    SheHuiJingJiYongShuiUtils
}