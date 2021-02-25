<template>
    <ModelPage title="干旱指数" map-rate="0.7">
        <div slot="left">
            <single-selection title="干旱指数" :selections="types" @select="changeType"
                              height="181px"></single-selection>
            <div class="menus-block">
                <div class="menus-label">时间</div>
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
        <div slot="right"></div>
    </ModelPage>    
</template>

<script>
    import SingleSelection from "../../../components/selection/SingleSelection";
    import PlayButton from "../../../components/Buttons/PlayButton";
    import ModelPage from "../../../components/layout/ModulPage";
    import {getGanHanZhiShuLayerParams} from "./layers";
    export default {
        components: {PlayButton, SingleSelection, ModelPage},
        name: "GanHanZhiShu",
        data() {
            return {
                defaultSelectYear: 2000,
                defaultSelectInd: 0,
                types: [
                    {value: "AVI 距平指标指数",key:"avi",selected: true },
                    {value: "VHI 植被健康指数",key:"vhi",selected: false },
                    {value: "VSWI 植被供水指数",key:"vswi",selected: false },
                    {value: "干旱程度预警",key:"result",selected: false },
                    ],
                currentTime: '2010年01期（旬）',
                year:2010,
                eday:1,
                type:"avi"
            }
        },
        methods:{
            changeType(type,ind) {
                if (this.types[ind].selected) {
                    return false;
                } else {
                    this.types.forEach((y,_ind) => {
                        if (y.selected) {
                            this.types[_ind].selected = false;
                        }
                    });
                    this.types[ind].selected = true;
                    this.defaultSelectInd = ind;
                    this.currentTime = `${this.year}年${this.eday}期（旬）`;
                    // todo 这里应该调用 mapApis 换对应的栅格图片
                    window.mapApis.removeSingleLayer(provider);
                    this.type = type
                    let curLayers = getGanHanZhiShuLayerParams(type,this.year,this.eday);
                    provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);
                }
            },
            changeYear(year) {
                this.edayList = this.all[year].eday;
                this.eday = this.edayList[0];
                window.setTimeLine();
            },
            changeEDay(eday) {
                window.viewer.clock.currentTime = CesiumUtils.getJulianDateFromDayNumber(this.year,(this.eday - 1) * 8);
            },
            playBtnClick(tar) {
                this.defaultSelectInd += tar === 'left'? -1 : 1;
                if (this.defaultSelectInd < 0) {
                    this.defaultSelectInd = this.years.length - 1;
                } else if (this.defaultSelectInd > this.years.length) {
                    this.defaultSelectInd = 0;
                }
                this.changeYear(this.years[this.defaultSelectInd].key,this.defaultSelectInd);
            }
        },
        mounted() {
            this.changeType(this.defaultSelectYear,0);
        }
    }
</script>

<style scoped>

</style>