<template>
    <ModelPage title="咸海盐尘监测" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="menus" @select="menuSelect"
                            height="380" style="margin-bottom: 40px;"></MultiSelection>
            <MultiSelection :selections="stations" @select="stationsSelect"
                            height="380"></MultiSelection>
        </div>
        <div slot="right" style="width: 100%;height: 100%;padding: 12px 30px;">
            <div style="display: flex;">
                <div style="width: auto;line-height: 45px;padding-left: 20px;margin-right: 10px;">
                    <label style="font-size: 16px;font-weight: bold;margin-left: 10px;">{{title ? title : "请点击左侧目录"}}</label>
                </div>
                <!-- 沙尘输送量统计特征(需要几个按钮) -->
                <div style="line-height: 40px;margin-right: 10px;" v-if="type === 'ssl'">
                    <button v-for="(b,ind) in sslButton.btns"
                        :key="ind" :style="sslButton.active === b.type ? sslButton.activeStyle : sslButton.noActiveStyle"
                        @click="sslButtonAction(b.type)">{{b.lable}}</button>
<!--                    <button @click="sslButton('scb')">沙尘暴</button>-->
<!--                    <button @click="sslButton('fsl')">风沙流</button>-->
<!--                    <button @click="sslButton('scbfsl')">沙尘暴与风沙流</button>-->
                </div>
            </div>
            <div style="display: flex;height: calc(100% - 45px)">
                <div id="echart-div" :style="styles.echartDivStyle">
                    <div id="echart" :style="styles.echartDomStyle"></div>
                </div>
                <div id="table-div" :style="styles.tableDivStyle">
                    <i-table border @on-row-click="rowClick" ref="table"
                             :style="{display: styles.tableStyle.display}"
                             @on-selection-change="tableSelect"
                             id="table" :columns="columns"
                             :height="styles.tableStyle.height"
                             :data="tableData" size="small" :loading="tableLoading"></i-table>
                    <div style="margin: 10px;overflow: hidden" v-show="tablePage.hasPage">
                        <Page :total="tablePage.total" :page-size-opts="[10,30,50,100]"
                              :page-size="tablePage.pageSize" :current="tablePage.current"
                              @on-change="changePage" size="small" @on-page-size-change="changePageSize"
                              show-sizer show-elevator show-total></Page>
                    </div>
                </div>
            </div>
        </div>
    </ModelPage>
</template>

<script>
    import {
        requestStation,requestMenus,requestPjSsl,
        requestFscs,requestFscsByName,requestSsl
    } from "./requests";
    import { configs } from "./datas";
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import { bindSelectionAction } from "../../../components/selection/MultiSelectionUtils";
    import { EChartsOptCls } from "../../../libs/EChartTool";
    import { XianHaiYanChenJianCeUtils } from "./utils";

    // 上部分菜单的默认点击事件
    let bindStationSelectionAction = () => {};
    // 上部分菜单的默认点击事件
    let bindMenuSelectionAction = () => {};
    let _XianHaiYanChenJianCeUtils = null;
    let nameList = ["咸海","尤阿雷","卡萨雷","克孜勒奥尔达","斯瑞克拉巴特","朱萨雷","卡拉克"];

    export default {
        name: "XianHaiYanChenJianCe",
        components: {ModelPage,MultiSelection},
        data() {
            return {
                stations: [],
                menus: [],
                type: "",
                title: '',
                styles: {
                    echartDivStyle: {
                        width: "50%",
                        display: "inline-block",
                        height: "100%",
                        margin: "0 5px"
                    },
                    tableDivStyle: {
                        width: "50%",
                        display: "inline-block",
                        height: "100%",
                        margin: "0 5px"
                    },

                    echartDomStyle: {
                        width: "100%",
                        display: "inline-block",
                        height: "100%",
                    },
                    tableStyle: {
                        height: 205,
                        display: 'block'
                    },
                },
                tablePage: {
                    hasPage: true,
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                columns: [],
                tableData: [],
                tableLoading: false,
                sslButton: {
                    btns: [
                        { lable: '沙尘暴',type: 'scb' },
                        { lable: '风沙流',type: 'fsl' },
                        { lable: '沙尘暴与风沙流',type: 'scbfsl' },
                    ],
                    active: '',
                    activeStyle: {
                        padding: "0 6px",
                        "margin-right": "5px",
                        background: '#0092b6'
                    },
                    noActiveStyle: {
                        padding: "0 6px",
                        "margin-right": "5px",
                        background: '#e0e0e0'
                    }
                },

            }
        },
        methods: {
            // 左上的菜单选择事件
            menuSelect(tar,item,ind,sind) {
                let change = bindMenuSelectionAction(tar,item,ind,sind);
                if (tar === "option") {
                    _XianHaiYanChenJianCeUtils.clearEchart();
                    this.type = item.type;
                    if (ind === 0) {
                        // 单机子级菜单，如果点击的是当前已经选中的菜单，那就不管了，change 表示点击的项目是不是新的
                        if (change) {
                            // 第一个是跳转到对应的站点，下方显示 沙尘暴发生次数详情
                            // 该方法会自动调用 this.changePage(1)
                            // changePage(1) 中会调用 _XianHaiYanChenJianCeUtils.ParsingFscsData2 同步地图中的图表
                            _XianHaiYanChenJianCeUtils.setDataSourceAnData(requestFscsByName(item.name));
                            // 地图飞到指定位置
                            _XianHaiYanChenJianCeUtils.flyToSite(item.name);
                        }
                    } else if (ind == 1) {
                        this.type = "ssl";
                        _XianHaiYanChenJianCeUtils.setDataSourceAnData(requestSsl())
                            .then(() => this.sslButtonAction('scb'));
                    } else if (ind == 2) {
                        this.type = "pjssl";
                        _XianHaiYanChenJianCeUtils.setDataSourceAnData(requestPjSsl())
                            .then(() => {
                                _XianHaiYanChenJianCeUtils.updateMapChartPjssl();
                            });
                    }
                } else {
                    // 原代码中，点击第一个菜单时，表格显示内容是全部数据，这里就单独写出来
                    if (ind === 0) {
                        this.type = "fscs";
                        _XianHaiYanChenJianCeUtils.setDataSourceAnData(requestFscs());
                        _XianHaiYanChenJianCeUtils.clearEchart();
                        window.mapApis.resetView();
                    }
                }
            },
            stationsSelect(tar,item,ind,sind) {
                bindStationSelectionAction(tar,item,ind,sind);
            },
            changePage(currentPage) {
                this.tablePage.current = currentPage;
                let list = [];
                for (let i = 0,ind = this.tablePage.pageSize * (currentPage - 1);i < this.tablePage.pageSize && _XianHaiYanChenJianCeUtils.tmpData.length > ind;i++,ind++) {
                    list.push(_XianHaiYanChenJianCeUtils.tmpData[ind]);
                }
                this.tableData.splice(0,this.tableData.length,...list);

                if (this.type === "fscs") {
                    _XianHaiYanChenJianCeUtils.ParsingFscsData([]);
                }
                if (this.type === "fscs2") {
                    _XianHaiYanChenJianCeUtils.ParsingFscsData2([]);
                }
                if (this.type.substring(0,4) === "fscs") {
                    setTimeout(() => this.$refs.table.selectAll(true),200);
                } else if (this.type === "pjssl") {
                    setTimeout(() =>　$xhycjc.$refs.table.clickCurrentRow(0),200);
                }
            },
            changePageSize(size) {
                this.tablePage.pageSize = size;
                this.changePage(1);
            },
            // 沙尘暴、风沙流、沙尘暴与风沙流
            sslButtonAction(type) {
                this.sslButton.active = type;
                _XianHaiYanChenJianCeUtils.ParsingSslData(type);
            },
            // 表格点击（用于 flyto 到指定的坐标）
            rowClick(value) {
                _XianHaiYanChenJianCeUtils.flyToSite(value.name);
                if (this.type === "pjssl") {
                    // flyToSite(value.name);
                    this.title = `${value.name}沙尘输送量统计特征详情`
                    _XianHaiYanChenJianCeUtils.ParsingPjsslData(value);
                }
            },
            // 表格的某一行被选择（用于更新图表）
            tableSelect(selection) {
                var yearlist = [];
                selection.forEach(function (value) {
                    if(value.year) yearlist.push(value.year);
                });

                if (this.type === "fscs") {
                    _XianHaiYanChenJianCeUtils.ParsingFscsData(selection);

                    // 同步地图
                    nameList.forEach(function (name) {
                        _XianHaiYanChenJianCeUtils.updateMapChartFscs(name, yearlist);
                    });
                }
                if (this.type === "fscs2") {
                    _XianHaiYanChenJianCeUtils.ParsingFscsData2(selection);
                    //setMapChart1(this.fscsConfig2.name, yearlist);
                    _XianHaiYanChenJianCeUtils.updateMapChartFscs(this.menus[0].options.filter(_ => _.selected)[0].name, yearlist);
                }
            }
        },
        watch: {
            type(val) {
                var config = null;

                switch (val) {
                    case "fscs":
                        config = configs.fscsConfig;
                        break;
                    case "fscs2":
                        config = configs.fscsConfig2;
                        break;
                    case "ssl":
                        config = configs.sslConfig;
                        break;
                    case "pjssl":
                        config = configs.pjsslConfig;
                        break;
                }

                if (config) {
                    if(val === "fscs2") {
                        this.title = config.name + config.title;
                    }else{
                        this.title = config.title;
                    }

                    this.columns = config.columns;
                    this.styles.echartDivStyle.width = config.echartDivWidth;
                    this.styles.tableDivStyle.width = config.tableDivWidth;
                }
            }
        },
        mounted() {
            window.$xhycjc = this;
            bindMenuSelectionAction = bindSelectionAction(this.menus);
            bindStationSelectionAction = bindSelectionAction(this.stations);
            // 创建 XianHaiYanChenJianCeUtils 对象，并初始化页面坐下角的 echart
            window._XianHaiYanChenJianCeUtils = _XianHaiYanChenJianCeUtils;
            _XianHaiYanChenJianCeUtils = new XianHaiYanChenJianCeUtils(this,nameList)
                .init("echart");
            // 请求站点（即左小角的菜单的内容）（摆设用）
            requestStation()
                .then(s => {
                    this.stations.splice(0,0,...s);
                    // 请求菜单内容（其实没必要做成请求的）
                    requestMenus()
                        .then(s => {
                            this.menus.splice(0,0,...s);
                            // 对所有的站点在地图的位置创建标记和 echart 图表节点（display:none）
                            _XianHaiYanChenJianCeUtils.createEchart();
                        });
                });

        }
    }
</script>

