import {draughtInfo, tongji} from "./request";
import {getLayerParameter} from "./layers";

class GanHanZhiShuUtils {
    constructor($this,tbodyId,echartDomId) {
        this.$this = $this;
        // 右下角的 echart 图表
        this.echartDom = document.getElementById(echartDomId);
        this.ec = echarts.init(this.echartDom);
        // 地图中的 echart 管理
        this.eAndc = window.mapApis.createEntityAndCss3Rnederer();
        // 地图中的  echart 实体，因为整个地图只有一个 echart ，所以这里需要单独标记用于删除重建新的 echart
        this.mapEchart = null;

        // 用于更新
        this._tmpFn = () => {};
        this.init();
        // 左下角的表格
        this.tbodyEle = document.getElementById(tbodyId);
        this.edayInfo = {};
    }

    init() {
        let $this = this.$this;
        let $this$ = this;
        // 定义在地图中绘制的多边形的回调事件，这里是向服务器请求区域的统计数据
        mapApis.updateMagmMethod({
            "POLYGON"(magm,obj,geojson) {
                $this$._tmpFn = () => {
                    tongji(`draught:${$this.type.toLowerCase()}_${$this.year}_${$this.eday}`,JSON.stringify(geojson.toGeoJson()),$this.type.toLowerCase())
                        .then(_ => {
                            console.log(_);
                            let a = [];
                            for (let i in _) {
                                a.push([i,_[i]]);
                            }
                            a = a.sort((b,c) => b[0] - c[0]);
                            return a.map(b => b[1]);
                        }).then(datas => {
                        $this$.setOption(datas,
                            draughtInfo.kindName[$this.type.toLowerCase()],
                            `${$this.year}年第${$this.eday}旬${draughtInfo.typeName[$this.type.toLowerCase()]}`);
                        $this$.updateMapEchart(datas,draughtInfo.kindName[$this.type.toLowerCase()],geojson);
                    });
                };
                $this$._tmpFn();
                // utils.setOption();
            }
        });
    }

    // createMapEcart(title,lat,long) {
    //     this.mapEchart = window.mapApis.createEchartDom(
    //         this.eAndc.entity,
    //         this.eAndc.css3Renderer,
    //         { title,long, lat }
    //     );
    // }

    // 获取 echart 图表的 options，齐总 title_ = null/undefined 表示这个 option 是绘制在地图上的 echart 图表用到的
    getOption(datas,labels,title_) {
        let obj = title_ ? {
            title: {
                left: 'center',
                text: title_,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
        } : {};
        return {
            ...obj,
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: labels,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '60%',
                    data: datas,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = ["#3398db", "#434348", "#90ed7d", "#f7a35c", "#61a0a8", "#61a0a8", "#91c7ae", "#2f4554"];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                }
            ]
        }
    }
    // 这是一个测试而已，可删除
    getOption_() {
        return {
            "color": [
                "#c23531",
                "#2f4554",
                "#61a0a8",
                "#d48265",
                "#91c7ae",
                "#749f83",
                "#ca8622",
                "#bda29a",
                "#6e7074",
                "#546570",
                "#c4ccd3"
            ],
            "gradientColor": [
                "#f6efa6",
                "#d88273",
                "#bf444c"
            ],
            "textStyle": {
                "fontFamily": "Microsoft YaHei",
                "fontSize": 12,
                "fontStyle": "normal",
                "fontWeight": "normal"
            },
            "animation": "auto",
            "animationDuration": 1000,
            "animationDurationUpdate": 300,
            "animationEasing": "exponentialOut",
            "animationEasingUpdate": "cubicOut",
            "animationThreshold": 2000,
            "progressiveThreshold": 3000,
            "progressive": 400,
            "hoverLayerThreshold": 3000,
            "useUTC": false,
            "title": [
                {
                    "left": "center",
                    "text": "2019年第1旬AVI 距平指标指数",
                    "zlevel": 0,
                    "z": 6,
                    "show": true,
                    "target": "blank",
                    "subtext": "",
                    "subtarget": "blank",
                    "top": 0,
                    "backgroundColor": "rgba(0,0,0,0)",
                    "borderColor": "#ccc",
                    "borderWidth": 0,
                    "padding": 5,
                    "itemGap": 10,
                    "textStyle": {
                        "fontSize": 18,
                        "fontWeight": "bolder",
                        "color": "#333"
                    },
                    "subtextStyle": {
                        "color": "#aaa"
                    },
                    "right": null
                }
            ],
            "axisPointer": [
                {
                    "show": "auto",
                    "triggerOn": null,
                    "zlevel": 0,
                    "z": 50,
                    "type": "line",
                    "snap": false,
                    "triggerTooltip": true,
                    "value": null,
                    "status": null,
                    "link": [],
                    "animation": null,
                    "animationDurationUpdate": 200,
                    "lineStyle": {
                        "color": "#aaa",
                        "width": 1,
                        "type": "solid"
                    },
                    "shadowStyle": {
                        "color": "rgba(150,150,150,0.3)"
                    },
                    "label": {
                        "show": true,
                        "formatter": null,
                        "precision": "auto",
                        "margin": 3,
                        "color": "#fff",
                        "padding": [
                            5,
                            7,
                            5,
                            7
                        ],
                        "backgroundColor": "auto",
                        "borderColor": null,
                        "borderWidth": 0,
                        "shadowBlur": 3,
                        "shadowColor": "#aaa"
                    },
                    "handle": {
                        "show": false,
                        "icon": "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                        "size": 45,
                        "margin": 50,
                        "color": "#333",
                        "shadowBlur": 3,
                        "shadowColor": "#aaa",
                        "shadowOffsetX": 0,
                        "shadowOffsetY": 2,
                        "throttle": 40
                    }
                }
            ],
            "tooltip": [
                {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow",
                        "axis": "auto",
                        "animation": "auto",
                        "animationDurationUpdate": 200,
                        "animationEasingUpdate": "exponentialOut",
                        "crossStyle": {
                            "color": "#999",
                            "width": 1,
                            "type": "dashed",
                            "textStyle": {}
                        }
                    },
                    "zlevel": 0,
                    "z": 60,
                    "show": true,
                    "showContent": true,
                    "triggerOn": "mousemove|click",
                    "alwaysShowContent": false,
                    "displayMode": "single",
                    "renderMode": "auto",
                    "confine": false,
                    "showDelay": 0,
                    "hideDelay": 100,
                    "transitionDuration": 0.4,
                    "enterable": false,
                    "backgroundColor": "rgba(50,50,50,0.7)",
                    "borderColor": "#333",
                    "borderRadius": 4,
                    "borderWidth": 0,
                    "padding": 5,
                    "extraCssText": "",
                    "textStyle": {
                        "color": "#fff",
                        "fontSize": 14
                    }
                }
            ],
            "yAxis": [
                {
                    "type": "value",
                    "boundaryGap": [
                        0,
                        0
                    ],
                    "splitNumber": 5,
                    "minorTick": {
                        "show": false,
                        "splitNumber": 5,
                        "length": 3,
                        "lineStyle": {}
                    },
                    "minorSplitLine": {
                        "show": false,
                        "lineStyle": {
                            "color": "#eee",
                            "width": 1
                        }
                    },
                    "show": true,
                    "zlevel": 0,
                    "z": 0,
                    "inverse": false,
                    "name": "",
                    "nameLocation": "end",
                    "nameRotate": null,
                    "nameTruncate": {
                        "maxWidth": null,
                        "ellipsis": "...",
                        "placeholder": "."
                    },
                    "nameTextStyle": {},
                    "nameGap": 15,
                    "silent": false,
                    "triggerEvent": false,
                    "tooltip": {
                        "show": false
                    },
                    "axisPointer": {},
                    "axisLine": {
                        "show": true,
                        "onZero": true,
                        "onZeroAxisIndex": null,
                        "lineStyle": {
                            "color": "#333",
                            "width": 1,
                            "type": "solid"
                        },
                        "symbol": [
                            "none",
                            "none"
                        ],
                        "symbolSize": [
                            10,
                            15
                        ]
                    },
                    "axisTick": {
                        "show": true,
                        "inside": false,
                        "length": 5,
                        "lineStyle": {
                            "width": 1
                        }
                    },
                    "axisLabel": {
                        "show": true,
                        "inside": false,
                        "rotate": 0,
                        "showMinLabel": null,
                        "showMaxLabel": null,
                        "margin": 8,
                        "fontSize": 12
                    },
                    "splitLine": {
                        "show": true,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ],
                            "width": 1,
                            "type": "solid"
                        }
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    },
                    "offset": 0,
                    "rangeEnd": null,
                    "rangeStart": null
                }
            ],
            "xAxis": [
                {
                    "type": "category",
                    "data": [
                        "Positive",
                        "Drought arise",
                        "Moderate drought",
                        "Severe drought"
                    ],
                    "axisTick": {
                        "alignWithLabel": true,
                        "interval": "auto",
                        "show": true,
                        "inside": false,
                        "length": 5,
                        "lineStyle": {
                            "width": 1
                        }
                    },
                    "boundaryGap": true,
                    "deduplication": null,
                    "splitLine": {
                        "show": false,
                        "lineStyle": {
                            "color": [
                                "#ccc"
                            ],
                            "width": 1,
                            "type": "solid"
                        }
                    },
                    "axisLabel": {
                        "interval": "auto",
                        "show": true,
                        "inside": false,
                        "rotate": 0,
                        "showMinLabel": null,
                        "showMaxLabel": null,
                        "margin": 8,
                        "fontSize": 12
                    },
                    "show": true,
                    "zlevel": 0,
                    "z": 0,
                    "inverse": false,
                    "name": "",
                    "nameLocation": "end",
                    "nameRotate": null,
                    "nameTruncate": {
                        "maxWidth": null,
                        "ellipsis": "...",
                        "placeholder": "."
                    },
                    "nameTextStyle": {},
                    "nameGap": 15,
                    "silent": false,
                    "triggerEvent": false,
                    "tooltip": {
                        "show": false
                    },
                    "axisPointer": {
                        "status": "hide",
                        "value": 1,
                        "seriesDataIndices": [
                            {
                                "seriesIndex": 0,
                                "dataIndexInside": 1,
                                "dataIndex": 1
                            }
                        ]
                    },
                    "axisLine": {
                        "show": true,
                        "onZero": true,
                        "onZeroAxisIndex": null,
                        "lineStyle": {
                            "color": "#333",
                            "width": 1,
                            "type": "solid"
                        },
                        "symbol": [
                            "none",
                            "none"
                        ],
                        "symbolSize": [
                            10,
                            15
                        ]
                    },
                    "splitArea": {
                        "show": false,
                        "areaStyle": {
                            "color": [
                                "rgba(250,250,250,0.3)",
                                "rgba(200,200,200,0.3)"
                            ]
                        }
                    },
                    "offset": 0,
                    "rangeEnd": null,
                    "rangeStart": null
                }
            ],
            "grid": [
                {
                    "left": "3%",
                    "right": "4%",
                    "bottom": "3%",
                    "containLabel": true,
                    "show": false,
                    "zlevel": 0,
                    "z": 0,
                    "top": 60,
                    "backgroundColor": "rgba(0,0,0,0)",
                    "borderWidth": 1,
                    "borderColor": "#ccc"
                }
            ],
            "series": [
                {
                    "type": "bar",
                    "barWidth": "60%",
                    "data": [
                        "33045",
                        "129607",
                        "0",
                        "0"
                    ],
                    "itemStyle": {},
                    "zlevel": 0,
                    "z": 2,
                    "coordinateSystem": "cartesian2d",
                    "legendHoverLink": true,
                    "barMinHeight": 0,
                    "barMinAngle": 0,
                    "large": false,
                    "largeThreshold": 400,
                    "progressive": 3000,
                    "progressiveChunkMode": "mod",
                    "emphasis": {
                        "label": {}
                    },
                    "clip": true,
                    "roundCap": false,
                    "showBackground": false,
                    "backgroundStyle": {
                        "color": "rgba(180, 180, 180, 0.2)",
                        "borderColor": null,
                        "borderWidth": 0,
                        "borderType": "solid",
                        "borderRadius": 0,
                        "shadowBlur": 0,
                        "shadowColor": null,
                        "shadowOffsetX": 0,
                        "shadowOffsetY": 0,
                        "opacity": 1
                    },
                    "label": {}
                }
            ],
            "visualMap": [],
            "legend": [],
            "markArea": [
                {
                    "zlevel": 0,
                    "z": 1,
                    "tooltip": {
                        "trigger": "item"
                    },
                    "animation": false,
                    "label": {
                        "show": true,
                        "position": "top"
                    },
                    "itemStyle": {
                        "borderWidth": 0
                    },
                    "emphasis": {
                        "label": {
                            "show": true,
                            "position": "top"
                        }
                    }
                }
            ],
            "markLine": [
                {
                    "zlevel": 0,
                    "z": 5,
                    "symbol": [
                        "circle",
                        "arrow"
                    ],
                    "symbolSize": [
                        8,
                        16
                    ],
                    "precision": 2,
                    "tooltip": {
                        "trigger": "item"
                    },
                    "label": {
                        "show": true,
                        "position": "end",
                        "distance": 5
                    },
                    "lineStyle": {
                        "type": "dashed"
                    },
                    "emphasis": {
                        "label": {
                            "show": true
                        },
                        "lineStyle": {
                            "width": 3
                        }
                    },
                    "animationEasing": "linear"
                }
            ],
            "markPoint": [
                {
                    "zlevel": 0,
                    "z": 5,
                    "symbol": "pin",
                    "symbolSize": 50,
                    "tooltip": {
                        "trigger": "item"
                    },
                    "label": {
                        "show": true,
                        "position": "inside"
                    },
                    "itemStyle": {
                        "borderWidth": 2
                    },
                    "emphasis": {
                        "label": {
                            "show": true
                        }
                    }
                }
            ],
            "marker": [],
            "brush": [],
            "dataZoom": []
        };
    }
    // 设置 左小角的 echart 图表的 option
    setOption(datas,labels,title) {
        this.ec.setOption(this.getOption(datas,labels,title));
        this.ec.resize();
    }

    // 移除地图中的图表
    removeMapEchart() {
        if (this.mapEchart) {
            window.mapApis.removeEchart(this.eAndc.entity,this.eAndc.css3Renderer);
        }
    }
    // 更新地图中的图表
    updateMapEchart(datas,labels,geojson) {
        this.removeMapEchart();
        let center = this.getGeoJsonCenter(geojson);
        this.mapEchart = window.mapApis.createEchartDom(
            this.eAndc.entity,
            this.eAndc.css3Renderer,
            { title: '',...center }
        );
        this.mapEchart.ec.setOption(this.getOption(datas,labels));
        this.mapEchart.echartElement.style.display = "block";
    }
    // 获取点击的面的中心点
    getGeoJsonCenter(geojson) {
        let center = {lat:0,long:0};
        geojson.positions.forEach(p => {
            let obj = mapApis.CVT().cartesian2Wgs84(p,mapApis.viewer);
            center.lat += obj.latitude;
            center.long += obj.longitude;
        });
        return {
            lat: center.lat / geojson.positions.length,
            long: center.long / geojson.positions.length,
        }
    }

    // 更新图层，这里是在 类型(avi、vhi、vswi、result) 改变时、在年份改变时 调用，
    // 这里时更改时间轴的范围
    updateLayer() {
        let $this = this.$this;
        let $this$ = this;
        // todo 这里应该调用 mapApis 换对应的栅格图片
        // window.mapApis.removeSingleLayer(provider);
        //$this.type = type
        let type = $this.types[$this.currentSelectInd].key;
        let edays = this.edayInfo.all[$this.year].eday;
        // let curLayers = getGanHanZhiShuLayerParams(type,this.year,this.eday);
        // provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);
        mapApis.stop();
        $this.playing = false;
        mapApis.removeTimelineLayer();
        let tag = -1;
        mapApis.addTimelineLayer(
            $this.year + '-1-1',
            $this.year + "-12-31",
            window.allUrls.geoserver + "draught/wms",
            getLayerParameter(type)
            ,function ({year,month,day,dd}) {
                let eday = parseInt(dd / 8) + 1;
                if (!edays.includes(eday)) {
                    //window.vueMessage(`没有日期为 ${$menus.year}年 ${eday}旬 的影像`,'info');
                    let ind = 0;
                    for (;ind <  edays.length;ind++) {
                        if ( edays[ind] > eday) break;
                    }
                    if (ind === 0) eday = edays[ind]; else eday = edays[ind - 1];
                }
                return {
                    layers: `draught:${type.toLowerCase()}_${year}_${eday}`,
                    query_layers: `draught:${type.toLowerCase()}_${year}_${eday}`,
                    // layers: `xj_test:vhi${year}${eday}`,
                    // query_layers: `xj_test:vhi${year}${eday}`,
                };
            },function (j,{Y,M,D,date,day}) {
                // console.log(date);
                // console.log(day);
                $this.eday = parseInt(day / 8) + 1;
                if (tag !== $this.eday) {
                    tag = $this.eday;
                    $this.currentTime = `${$this.year}年${$this.eday}期（旬）`;
                    $this$._tmpFn();
                }
            });
        // 这个方法在 init 中的函数中 定义了，
        $this$._tmpFn();
    }

    // 更新左下角的 表格
    updateTable() {
        let dom = ``;
        this.edayInfo.yearList.forEach(ys => {
            dom += `<tr>
                <td>${ys}年</td>
                <td>${this.edayInfo.all[ys].has}旗</td>
                ${(_ => {
                    let tds = ``;
                    for (let i = 0;i < 46;i++) {
                        if (this.edayInfo.all[ys].edayHas[i]) {
                            tds += `<td style="background: radial-gradient(#0092B6,transparent);"></td>`;
                        } else {
                            tds += `<td style="background: radial-gradient(white,transparent);"></td>`;
                        }
                    }
                    return tds;
                        })()}
            </tr>`;
        });
        this.tbodyEle.innerHTML = dom;
    }
}

export { GanHanZhiShuUtils }