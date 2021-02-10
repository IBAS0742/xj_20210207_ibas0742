<template>
    <ModelPage title="历史旗下观测数据" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="stations" @select="select"
                            height="800"></MultiSelection>
        </div>
        <div slot="right" style="width: 100%;height: 100%;padding: 12px 30px;">
            <DataList :items="dataListPcp.items" style="float:left;"
                      :foot-text="dataListPcp.footText" :title="dataListPcp.title"></DataList>
            <DataList :items="dataListT.items" style="float:left;margin-left: 13px;"
                      :foot-text="dataListT.footText" :title="dataListT.title"></DataList>
            <div style="display:inline-block;" id="swgcz_echart">
                <div style="float:left;height: 100%;width: 50%;" id="echart_pcp"></div>
                <div style="float:left;height: 100%;width: 50%;" id="echart_t"></div>
            </div>
        </div>
    </ModelPage>
</template>

<script>
    import {datas2ItemAndOption, requestDriverDatas, requestDrivers, requestLocations} from "../水文观测站/request";
    import {createEchart} from "../../../libs/echartUtils";
    import {
        requestT,
        requestStationByName,
        requestStation,
        requestPcp,
        requestTItemsAndOption,
        requestPcpItemsAndOption
    } from "./requests";
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import DataList from "../../../components/List/DataList";

    export default {
        name: "LiShiQiXiangGuanCeShuJu",
        components: {ModelPage,MultiSelection,DataList},
        data() {
            return {
                stations: [],
                dataListPcp: {
                    items: [],
                    title: 'Pcp 数据',
                    footText: ''
                },
                dataListT: {
                    items: [],
                    title: '温度数据',
                    footText: ''
                },
            }
        },
        methods: {
            /**
             * @param tar   'title' 或 'option'
             * @param item  点击的项目的节点信息
             * @param ind   父级索引
             * @param sind  子级索引
             * @param notEmitChange 不提交节点修改信号(默认是提交的，不提交的情况为点击地图触发该方法)
             */
            select(tar,item,ind,sind,notEmitChange) {
                if (tar === 'title') {
                    for (let i = 0;i < this.stations.length;i++) {
                        if (this.stations[i].open) {
                            if (i === ind) {
                                return;
                            } else {
                                this.stations[i].open = false;
                            }
                        }
                    }
                    this.stations[ind].open = true;
                } else {
                    let change = true;
                    this.stations.forEach((sta,_ind) => {
                        if (change) {
                            for (let i = 0;i < sta.options.length;i++) {
                                if (sta.options[i].selected) {
                                    if (_ind === ind && sind === i) {
                                        change = false;
                                    } else {
                                        this.stations[_ind].open = false;
                                        this.stations[_ind].options[i].selected = false;
                                    }
                                }
                            }
                        }
                    });
                    this.stations[ind].open = true;
                    this.stations[ind].options[sind].selected = true;
                    let pointLatLng = {
                        lng: this.stations[ind].options[sind].lng,
                        lat: this.stations[ind].options[sind].lat,
                    };
                    window.mapApis.flyToLatLng(pointLatLng.lat,pointLatLng.lng,40000);
                    if (change && !notEmitChange) {
                        this.changeStation(this.stations[ind].options[sind]);
                    }
                }
            },
            /**
             * {
             *      // id: '',
             *      coord: "{lat:1,lng:1}",
             *      locationId: 9,
             *      address: '新疆',
             *      areaCode: '中国',
             *      height: 1.5,
             *      // 下面三个属性是给组件用的
             *      selected: false,
             *      value: '',
             *      label: ''
             * }
             */
            changeStation(node) {
                // todo
                let $this = this;
                requestPcpItemsAndOption(node.name)
                    .then(pcpObj => {
                        $this.dataListPcp.items.splice(0,$this.dataListPcp.items.length,...pcpObj.items);
                        $this.dataListPcp.footText = `共${pcpObj.items.length}条数据`;
                        let hasPcp = !!pcpObj.items.length;
                        createEchart("echart_pcp",pcpObj.options);
                        requestTItemsAndOption(node.name)
                            .then(tObj => {
                                $this.dataListT.items.splice(0,$this.dataListT.items.length,...tObj.items);
                                $this.dataListT.footText = `共${tObj.items.length}条数据`;
                                let hasT = !!pcpObj.items.length;
                                // if (hasT)
                                createEchart("echart_t",tObj.options);
                            });
                    });
            }
        },
        mounted() {
            let $this = this;
            requestStation().then(stations => {
                this.stations.splice(0,0,...stations);
                if (window.mapApis) {
                    stations.forEach((sta,ind) => {
                        sta.options.forEach((s,sind) => {
                            window.mapApis.addMark({lng: s.lng,lat: s.lat},s.name,s.label,{
                                ind,sind
                            });
                        });
                    });
                }
                window.mapApis.updateMagmMethod({
                    MARKER(m,obj,gobj,geo) {
                        if (gobj) {
                            $this.select('option',{},gobj.info.ind,gobj.info.sind);
                            // window.mapApis.flyToLatLng(geo.geometry.coordinates[1],geo.geometry.coordinates[0])
                        }
                        window._obj = {m,obj,gobj,geo};
                        // window.mapApis
                        // console.log(obj);

                    }
                });
                $this.select("option",{},0,0);
            });
        }
    }
</script>

<style scoped>
    #swgcz_echart {
        float: left;
        height: 100%;
        width: 850px;
        padding-left: 40px;
    }
</style>