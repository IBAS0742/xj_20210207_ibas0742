<template>
    <ModelPage title="干旱指数" map-rate="0.7">
        <div slot="left">
            <single-selection title="干旱指数" :selections="types" @select="changeType"
                              height="181px"></single-selection>
            <div class="menus-block">
                <div class="menus-label" style="padding: 0 6px;">时间</div>
                <div style="padding-left: 20px;">
                    <div style="padding-top: 5px;">
                        <div style="display: inline-block;width: 66px;text-align: right;">年份：</div>
                        <i-select v-model="year" style="width:calc(100% - 70px);" @on-change="changeYear">
                            <i-option v-for="y in yearList" :value="y" :key="y">{{y}}</i-option>
                        </i-select>
                    </div>
                    <div style="padding-top: 5px;">
                        <div style="display: inline-block;width: 66px;text-align: right;">日期(旬)：</div>
                        <i-select v-model="eday" style="width:calc(100% - 70px);" @on-change="changeEDay">
                            <i-option v-for="ed in edayList" :value="ed" :key="ed">{{ed}}</i-option>
                        </i-select>
                    </div>
                    <!--<div style="padding-top: 5px;">
                        <i-button type="primary" style="padding: 0 40px;">加载</i-button>
                    </div> -->
                </div>
            </div>
            <PlayButton speed="0" @clickBtn="playBtnClick"
                        :time="currentTime"></PlayButton>
        </div>
        <div slot="right">
            <div class="demo-split-pane" style="padding-top: 10px;">
                <div>
                    <div style="float:left;">
                        <span style="font-size: 20px;font-weight: bold;">{{tableTitle}}</span>
                        <table cellspacing="0" cellpadding="1" border="1">
                            <thead style="background-color: #B7C2C8;" >
                            <tr>
                                <th colspan="2" style="width:100px;">数量统计</th>
                                <th v-for="i in 46">{{i}}</th>
                            </tr>
                            </thead>
                            <tbody style="background-color: #DEE6E8;">
                            <tr v-for="ds in edayInfo_tmp.yearList" :key=ds>
                                <td>{{ds}}年</td>
                                <td>{{edayInfo_tmp.all[ds].has}}期</td>
                                <td v-for="i in 46" :style="{background: 'radial-gradient(' + (edayInfo_tmp.all[ds].edayHas[i - 1] ? '#0092B6':'white') + ', transparent)'}"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div :style="echartStyle" id="echart"></div>
                </div>
            </div>
        </div>
    </ModelPage>    
</template>

<script>
    import SingleSelection from "../../../components/selection/SingleSelection";
    import PlayButton from "../../../components/Buttons/PlayButton";
    import ModelPage from "../../../components/layout/ModulPage";
    import {
        // getGanHanZhiShuLayerParams
        getLayerParameter
    } from "./layers";
    import { tongji,requestEDay,draughtInfo } from "./request";
    import { GanHanZhiShuUtils } from "./utils";

    // let provider = null;
    // 不想挂到 vue 上，一旦挂上就变化时就会被监听，特别耗内存
    let edayInfo = null;
    let updateLayer = ($this) => {
        // todo 这里应该调用 mapApis 换对应的栅格图片
        // window.mapApis.removeSingleLayer(provider);
        //$this.type = type
        let type = $this.types[$this.currentSelectInd].key;
        let edays = edayInfo.all[$this.year].eday;
        // let curLayers = getGanHanZhiShuLayerParams(type,this.year,this.eday);
        // provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);
        mapApis.stop();
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
                    utils ? utils._tmpFn() : false;
                }
            });
        utils ? utils._tmpFn() : false;
    };
    let utils = null;
    export default {
        components: {PlayButton, SingleSelection, ModelPage},
        name: "GanHanZhiShu",
        data() {
            return {
                currentSelectInd: 0,
                types: [
                    {value: "AVI 距平指标指数",key:"avi",selected: false },
                    {value: "VHI 植被健康指数",key:"vhi",selected: false },
                    {value: "VSWI 植被供水指数",key:"vswi",selected: false },
                    {value: "干旱程度预警",key:"result",selected: false },
                ],
                currentTime: '2010年01期（旬）',
                year:2010,
                yearList: [],
                eday:1,
                edayList: [],
                // 第一个是 year ，第二个是 eday，对应的是
                // year = edayInfo.all[edayInfo.yearList[time[0]]].year
                // eday = edayInfo.all[edayInfo.yearList[time[0]]].eday[time[1]]
                // 可以用于遍历
                time: [0,0],
                type:"avi",
                playing: false,
                echartStyle: {
                    width:"calc(100% - 1030px)",
                    display: "inline-block",
                    height: "270px"
                },
                tableDivStyle: {
                    width: "598px",
                    display: "inline-block",
                    height: "275px",
                    // background: ;
                    padding: "0 20px",
                },
                tableTitle:"AVI 距平指标指数",
                edayInfo_tmp: {}
            }
        },
        methods:{
            changeType(type,ind) {
                // 如果没有改变选中的类型（不管）
                if (this.types[ind].selected) {
                    return false;
                } else {
                    mapApis.showImageLegend(`${window.allUrls.base}/table/image/DRAUGHT_${type.toLowerCase()}.jpg`);

                    // 修改菜单的选中情况
                    this.types.forEach((y,_ind) => {
                        if (y.selected) {
                            this.types[_ind].selected = false;
                        }
                    });
                    this.types[ind].selected = true;
                    this.type = this.types[ind].key;

                    this.currentSelectInd = ind;
                    // this.type = type;
                    this.tableTitle = this.types[ind].value
                    let $this = this;
                    requestEDay($this.type).then(ei => {
                        edayInfo = ei;
                        window.ei = ei;
                        $this.edayInfo_tmp = ei
                        // 更新时间
                        $this.yearList.splice(0,$this.yearList.length,...ei.yearList);
                        $this.edayList.splice(0,$this.edayList.length,...ei.all[ei.yearList[0]].eday);
                        $this.year = ei.yearList[0];
                        $this.eday = ei.all[ei.yearList[0]].eday[0];
                        $this.time = [0,0];
                        $this.currentTime = `${$this.year}年${$this.eday}期（旬）`;
                        // 这里需要重置时间轴
                        updateLayer($this);
                        // 将时间轴拨到第一张影像的时间
                        window.mapApis.setTime($this.year,$this.eday * 8);
                    });
                }
            },
            changeYear() {
                this.edayList = edayInfo.all[this.year].eday
                this.eday = this.edayList[0];
                // 将时间轴拨到当前影像的时间
                updateLayer(this);
            },
            changeEDay() {
                // 将时间轴拨到当前影像的时间
                window.mapApis.setTime(this.year,this.eday * 8 - 8);
                utils ? utils._tmpFn() : false;
            },
            playBtnClick(tar) {
                // this.currentSelectInd += tar === 'left'? -1 : 1;
                // 这里先不管他，直接写播放
                // 每秒播放一天的量
                if (this.playing) {
                    window.mapApis.stop();
                } else {
                    window.mapApis.play(false,tar === 'left'? -1 : 1);
                }
                this.playing = !this.playing;
            },
        },
        mounted() {
            this.changeType(this.types[0].key,0);
            window.requestEDay = requestEDay;

            mapApis.drawer(true);
            let $this = this;
            utils = new GanHanZhiShuUtils(this,"echart");

            mapApis.setPanelCallback({
                clearCallback(){
                    utils.removeMapEchart();
                }
            });

        }
    }
</script>

<style scoped>
.menus-block{
    color: #000;
    width: 212px;
    border: 1px solid;
    margin: 20px 44px;
    border-radius: 3px;
    background-color: #b6c2c7;
    height: 117px;
}
tr>th {
    width: 20px;
    text-align: center;
}
tr>td {
    text-align: center;
}
</style>