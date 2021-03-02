<template>
    <ModelPage title="水文观测站" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="stations" @select="select"
                            height="800"></MultiSelection>
        </div>
        <div slot="right" style="width: 100%;height: 100%;padding: 12px 43px;">
            <DataList :items="dataList.items" style="float:left;"
                      :foot-text="dataList.footText" :title="dataList.title"></DataList>
            <div style="display:inline-block;" id="swgcz_echart"></div>
        </div>
    </ModelPage>
</template>

<script>
    import {
        requestLocations,
        requestDrivers,
        requestDriverDatas,
        datas2ItemAndOption
    } from './request'
    import {
        createEchart
    } from "../../../libs/echartUtils";
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import DataList from "../../../components/List/DataList";
    export default {
        name: "ShuiWenGuanCeZhan",
        components: {DataList, ModelPage,MultiSelection},
        data() {
            return {
                stations: [],
                dataList: {
                    items: [],
                    title: '',
                    footText: ''
                }
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
                    let pointLatLng = JSON.parse(this.stations[ind].options[sind].coord);
                    window.mapApis.flyToLatLng(pointLatLng.lat,pointLatLng.lng);
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
                document.getElementById('swgcz_echart').innerHTML = '';
                let $this = this;
                requestDrivers(node.locationId)
                    .then(drivers => {
                        if (drivers.length) {
                            requestDriverDatas(drivers[0].id,drivers[0].from,drivers[0].to)
                                .then(list => {
                                    let {items,option} = datas2ItemAndOption(list,drivers[0].type);
                                    this.dataList.items.splice(0,this.dataList.items.length,...items);
                                    createEchart("swgcz_echart",option);
                                    this.dataList.title = drivers[0].name;
                                    this.dataList.footText = `共${list.length}条数据`;
                                });
                        } else {
                            this.dataList.items.splice(0,this.dataList.items.length);
                            this.dataList.title = "没有设备";
                            this.dataList.footText = "-";
                        }
                    })
            }
        },
        mounted() {
            let $this = this;
            requestLocations().then(stations => {
                this.stations.splice(0,0,...stations);
                if (window.mapApis) {
                    stations.forEach((sta,ind) => {
                        sta.options.forEach((s,sind) => {
                            window.mapApis.addMark(JSON.parse(s.coord),s.value,s.label,{
                                ind,sind
                            });
                        });
                    });
                }
                $this.select('option',{},0,0);
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
                })
            });
        }
    }
</script>

<style scoped>
    #swgcz_echart {
        float: left;
        height: 100%;
        width: 1186px;
        padding-left: 40px;
    }
</style>