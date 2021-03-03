<template>
    <ModelPage title="水样" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="menus" @select="menuSelect"
                            height="820" style="margin-bottom: 40px;"></MultiSelection>
        </div>
        <div slot="right" style="width: 100%;height: 100%;padding: 12px 4px;">
            <div style="user-select: none;">
                <div style="display: flex; padding: 5px 8px;">
                    <Radio-group v-model="fieldList" size="small" @on-change="changeField">
                        <Radio v-for="(col) in columns1" :label="col.key" :key="col.key" v-if="col.key !== 'bh' " style="margin-right: 4px !important;">
                            <span>{{ col.title }}</span>
                        </Radio>
                    </Radio-group>
                </div>
                <div style="display: flex;">
                    <div id="table-div" :style="tableDivStyle">
                        <i-table id="table" :height="tableStyle.height" :columns="columns1" :data="data1" size="small" :loading="loading"></i-table>
                        <div style="margin: 10px;overflow: hidden">
                            <Page :total="tablePage.total" :page-size-opts="[10,30,50,100]" :page-size="tablePage.pageSize" :current="tablePage.current" @on-change="changePage" size="small" @on-page-size-change="changePageSize" show-sizer show-elevator show-total></Page>
                        </div>
                    </div>
                    <div style="width: 8px"></div>
                    <div id="echart-div" :style="echartDivStyle">
                        <div id="echart" :style="echartDomStyle"></div>
                    </div>
                </div>
            </div>
        </div>
    </ModelPage>
</template>

<script>
    import {
        requestLocation,requestYydataByBh,requestMenus
    } from "./requests";
    import { configs } from "./datas";
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import { bindSelectionAction } from "../../../components/selection/MultiSelectionUtils";
    import { EChartsOptCls } from "../../../libs/EChartTool";
    import { ShuiYangUtils } from "./utils";

    // 上部分菜单的默认点击事件
    let bindMenuSelectionAction = () => {};
    let _ShuiYangUtils = null;

    export default {
        name: "ShuiYang",
        components: {ModelPage,MultiSelection},
        data() {
            return {
                menus:[],
                fieldList: "f1",
                columns1: [
                    {"title": "编号", "key": "bh", "width": 150},
                    {"title": "Temp °C", "key": "f1", "width": 150},
                    {"title": "ORP mV", "key": "f10", "width": 150},
                    {"title": "fDOM RFU", "key": "f12", "width": 150},
                    {"title": "Turbidity FNU", "key": "f11", "width": 150},
                    {"title": "NH4+ -N mg/L", "key": "f14", "width": 150},
                    {"title": "fDOM QSU", "key": "f13", "width": 150},
                    {"title": "NH3 mg/L", "key": "f16", "width": 150},
                    {"title": "Cl- mg/L", "key": "f15", "width": 150},
                    {"title": "Cond µS/cm", "key": "f2", "width": 150},
                    {"title": "nLF Cond µS/cm", "key": "f3", "width": 150},
                    {"title": "SpCond µS/cm", "key": "f4", "width": 150},
                    {"title": "TDS mg/L", "key": "f5", "width": 150},
                    {"title": "Sal psu", "key": "f6", "width": 150},
                    {"title": "ODO % sat", "key": "f7", "width": 150},
                    {"title": "ODO mg/L", "key": "f8", "width": 150},
                    {"title": "pH1213cvgzs", "key": "f9", "width": 150}],
                data1: [],
                dataSource: [],

                echartDivStyle: {
                    width: "30%",
                    display: "inline-block",
                    height: "211px",
                    margin: "0 5px"
                },
                tableDivStyle: {
                    width: "70%",
                    display: "inline-block",
                    height: "211px",
                    margin: "0 5px"
                },

                echartDomStyle: {
                    width: "100%",
                    display: "inline-block",
                    height: "211px",
                },
                tableStyle: {
                    height: 211
                },
                tablePage: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },

                _myChart: null,
                bPadding: 65,
                loading: false,

            }
        },
        methods: {
            // 左上的菜单选择事件
            menuSelect(tar,item,ind,sind) {
                let change = bindMenuSelectionAction(tar,item,ind,sind);
                if (tar === "option") {
                    _ShuiYangUtils.clearEchart();
                    if (ind === 0) {
                        // 单机子级菜单，如果点击的是当前已经选中的菜单，那就不管了，change 表示点击的项目是不是新的
                        if (change) {
                            // 第一个是跳转到对应的站点，下方显示 沙尘暴发生次数详情
                            // 该方法会自动调用 this.changePage(1)
                            // changePage(1) 中会调用 _XianHaiYanChenJianCeUtils.ParsingFscsData2 同步地图中的图表
                            // _ShuiYangUtils.setDataSourceAnData(requestYydataByBh(item.name));
                            this.inShow = true;

                            //查询数据
                            var data = requestYydataByBh(item.name);
                            this.queryLoadFirst(data);
                            //图表
                            if (this.fieldList) {
                                this.showChart(this.fieldList);
                            }
                            console.log(item.name)
                            // 地图飞到指定位置
                            _ShuiYangUtils.flyToSite(item.name);
                        }
                    }
                }
            },
            showChart(field) {
                let $this = this
                let cname = function () {
                    var name = "";
                    $this.columns1.forEach(function (value) {
                        if (value.key === field) {
                            name = value.title;
                        }
                    });
                    return name;
                }();

                //整理数据
                this.dataSource.forEach(function (value, idx) {
                    value["idx"] = idx;
                });

                let optcls = new EChartsOptCls({
                    dataZoom: true
                });
                optcls.setDataset(this.dataSource, ["序号", cname], ["idx", field]);
                optcls.setSeries("bar", cname);
                _ShuiYangUtils._myChart.setOption(optcls._opt, true);
            },
            queryLoadFirst(data) {
                this.dataSource = data;
                this.tablePage.total = this.dataSource.length; //设置总数
                this.tablePage.current = 1;

                //加载第一页
                let list = [];
                for (var i = 0; i < this.tablePage.pageSize; i++) {
                    if (this.dataSource.length > i) list.push(this.dataSource[i]);
                }
                this.data1 = list;

                this.loading = false;
            },
            changePage(currentPage){
                this.tablePage.current = currentPage;
                let list = [];

                for(let i = 0; i < this.tablePage.pageSize; i ++) {
                    let idx = this.tablePage.pageSize * ( currentPage - 1 ) + i;
                    if (this.dataSource.length > idx) list.push(this.dataSource[idx]);
                }
                this.data1 = list;
            },
            changePageSize(size) {
                this.tablePage.pageSize = size;
                this.changePage(1);
            },
            changeField() {
                this.showChart(this.fieldList);
            }
        },
        watch: {

        },
        mounted() {
            bindMenuSelectionAction = bindSelectionAction(this.menus);
            // 创建 XianHaiYanChenJianCeUtils 对象，并初始化页面坐下角的 echart
            window._ShuiYangUtils = _ShuiYangUtils;
            _ShuiYangUtils = new ShuiYangUtils(this)
                .init("echart");
            // 请求站点（即左小角的菜单的内容）（摆设用）
            requestLocation()
                .then(s => {
                    // this.stations.splice(0,0,...s);
                    // 请求菜单内容（其实没必要做成请求的）
                    requestMenus()
                        .then(s => {
                            this.menus.splice(0,0,...s);
                            // 对所有的站点在地图的位置创建标记和 echart 图表节点（display:none）
                            _ShuiYangUtils.createEchart();
                            setTimeout(() => {
                                this.menuSelect('option',this.menus[0].options[0],0,0);
                            });
                        });
                });
        }
    }
</script>

