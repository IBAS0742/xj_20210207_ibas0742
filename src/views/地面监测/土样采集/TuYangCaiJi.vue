<template>
    <ModelPage title="土样采样" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="menus" @select="menuSelect"
                            height="800"></MultiSelection>
        </div>
        <div slot="right">
            <!-- 上面标题和部分按钮部分 -->
            <div style="user-select: none;">
                <div style="display: flex;">
                    <!-- 这部分是标题 -->
                    <div style="width: auto;line-height: 45px;padding-left: 20px;margin-right: 10px;">
                        <label style="font-size: 16px;font-weight: bold;">{{title}}</label>
                    </div>
                    <!-- pH总盐八大离子监测 在标题旁边的内容 -->
                    <div style="line-height: 40px;margin-right: 10px;" v-show="aboutPh.isPhActive">
                        <i-button class="mbBtn active" @click="openPhJcbg">监测报告</i-button>
                        <Modal v-model="aboutPh.modal" :title="aboutPh.modalTitle"
                               :footer-hide="true" :styles="{ top: '20px' }"
                               width="800" :mask-closable="false">
                            <iframe id="jcbg_fram" name="jcbg_fram" src=""
                                    class="inset-table" width="100%" height="600px"></iframe>
                        </Modal>
                    </div>
                    <!-- 盐分水分温度 在标题旁边的内容 -->
                    <div v-show="aboutYfsf.isYfsfActive" style="padding-top: 10px;">
                        <radio-group v-model="aboutYfsf.chartType" @on-change="yfsfChartTypeChange">
                            <Radio label="Salin"><span>土壤盐分</span></Radio>
                            <Radio label="EC"><span>土壤电导率</span></Radio>
                            <Radio label="Temper"><span>土壤温度</span></Radio>
                            <Radio label="Moist"><span>土壤水分</span></Radio>
                        </radio-group>
                    </div>
                </div>
                <!-- 下面部分，包括左边选中，中间表格，右边图表 -->
                <div style="">
                    <div id="list-div" :style="style.listDivStyle">
                        <label>样本列表</label>
                        <i-select filterable @on-change="ypbhChange" v-model="ypbhModel"
                                  multiple :max-tag-count="1" style="width: 250px;margin: 0 5px;">
                            <i-option v-for="item in ypbhList" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                        </i-select>
                        <Checkbox
                                :indeterminate="checkbox.indeterminate"
                                :value="checkbox.checkAll"
                                @click.prevent.native="handleCheckAll">全选</Checkbox>
                        <div style="padding: 10px;height: calc(100% - 45px);overflow-y: auto;">
                            <checkbox-group v-model="checkbox.checkAllGroup"
                                            @on-change="checkAllGroupChange" :style="style.listGroupItem">
                                <Checkbox v-for="item in checkbox.checkAllList"
                                          :label="item" :style="style.listItem">{{item}}</Checkbox>
                            </checkbox-group>
                        </div>
                    </div>

                    <div id="table-div" :style="style.tableDivStyle">
                        <i-table border @on-row-click="tableRowClick"
                                 @on-selection-change="tableSelect" id="table"
                                 :height="style.tableStyle.height" :columns="columns"
                                 :data="tableData" size="small" :loading="loading"></i-table>
                        <div style="margin: 10px;overflow: hidden"  v-show="tablePage.hasPage">
                            <Page :total="tablePage.total" :page-size-opts="[10,30,50,100]"
                                  :page-size="tablePage.pageSize" :current="tablePage.current"
                                  @on-change="changePage" size="small" @on-page-size-change="changePageSize"
                                  show-sizer show-elevator show-total></Page>
                        </div>
                    </div>

                    <div id="echart-div" :style="style.echartDivStyle" v-show="!aboutJl.isJlActive">
                        <div id="echart" :style="style.echartDomStyle"></div>
                    </div>
                </div>
                <!-- 下面部分结束 -->
            </div>
        </div>
    </ModelPage>    
</template>

<script>
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import { menus,columns,title } from "./datas";
    import {bindSelectionAction} from "../../../components/selection/MultiSelectionUtils";

    // 菜单的默认点击事件
    let bindMenuSelectionAction = () => {};
    export default {
        name: "TuYangCaiJi",
        components: {
            ModelPage,
            MultiSelection
        },
        data() {
            return {
                type: '',
                menus: menus,
                title: '标题部分',
                aboutPh: {
                    modal: false,
                    modalTitle: "",
                    isPhActive: true
                },
                aboutYfsf: {
                    isYfsfActive: false,
                    chartType: ""
                },
                aboutJl: {
                    isJlActive: false
                },
                ypbhModel: [],
                ypbhList: [],
                checkbox: {
                    indeterminate: true,
                    checkAll: false,
                    checkAllGroup: [],
                    checkAllList: []
                },
                style: {
                    listGroupItem: {
                        "border-top": "1px solid #e1e1e1",
                        "border-left": "1px solid #e1e1e1",
                    },
                    tableStyle: {
                        height: 100
                    },
                    listDivStyle: {
                        width: "380px",
                        display: "inline-block",
                        margin: "0 5px",
                        float: 'left',
                        height: '272px',
                    },
                    tableDivStyle: {
                        width: "830px",
                        display: "inline-block",
                        margin: "0 5px",
                        float: 'left',
                        height: '272px',
                    },
                    echartDivStyle: {
                        width: "380px",
                        display: "inline-block",
                        margin: "0 5px",
                        background: "red",
                        float: 'left',
                        height: '272px',
                    },
                    listItem: {
                        "border-bottom": "1px solid #e1e1e1",
                        "border-right": "1px solid #e1e1e1",
                        "margin": "0",
                        "padding": "5px",
                        "width": "33%",
                    },
                    echartDomStyle: {
                        width: "100%",
                        display: "inline-block",
                        height: "100px",
                    },
                },
                loading: false,
                tableData: [],
                columns: [],
                tablePage: {
                    hasPage: false,
                    total: 0,
                    pageSice: 0,
                    current: 0
                }
            }
        },
        methods: {
            menuSelect(tar,item,ind,sind) {
                let change = bindMenuSelectionAction(tar, item, ind, sind);
                if (tar === "option") {
                    this.type = item.key;
                    if (sind === 0) {
                        this.aboutPh.isPhActive = true;
                        this.aboutYfsf.isYfsfActive = false;
                    } else if (sind === 1) {
                        this.aboutPh.isPhActive = false;
                        this.aboutYfsf.isYfsfActive = false;
                    } else {
                        this.aboutPh.isPhActive = false;
                        this.aboutYfsf.isYfsfActive = true;
                    }
                }
            },
            openPhJcbg() {},
            yfsfChartTypeChange() {},
            ypbhChange() {},
            handleCheckAll() {},
            checkAllGroupChange() {},
            tableSelect() {},
            tableRowClick() {},
            changePage() {},
            changePageSize() {}
        },
        mounted() {
            bindMenuSelectionAction = bindSelectionAction(this.menus);
            setTimeout(() => {
                this.menuSelect('title',null,0,);
            },20);
        },
        watch: {
            type(val) {
                this.title = title[val];
                this.columns = columns[val];
                this.style.listItem.width = "33%";

                switch (val) {
                    case "ph":
                        this.style.tableDivStyle.width = (1590 - 380 * 2) + 'px';
                        this.style.echartDivStyle.display = 'block';
                        break;
                    case "jl":
                        this.style.tableDivStyle.width = (1590 - 380) + 'px';
                        this.style.echartDivStyle.display = 'none';
                        break;
                    case "yfsf":
                        this.style.tableDivStyle.width = (1590 - 380 * 2) + 'px';
                        this.style.echartDivStyle.display = 'block';
                        this.style.listItem.width = "100%";
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>