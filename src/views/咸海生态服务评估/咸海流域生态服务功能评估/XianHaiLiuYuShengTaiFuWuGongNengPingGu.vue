<template>
    <ModelPage title="咸海流域生态服务功能评估" map-rate="0.664">
        <div slot="left">
            <MultiSelection :selections="menus" @select="changeSelect"
                            height="820"></MultiSelection>
        </div>
        <div slot="right">
            <Row v-show="type==1" style="height: 319px;padding: 0 2px;" type="flex" justify="start">
                <Col span="5" style="padding: 0 2px;">
                    <i-table :columns="columns.lishi" :data="tableData.lishi"
                             style="display: inline-block;width: 100%;float:left;"
                             :height="319"></i-table>
                </Col>
                <Col span="7" style="padding: 0 2px;">
                    <div id="historyEchart" style="height: 319px;width: 100%"></div>
                </Col>
                <Col span="5" style="padding: 0 2px;">
                    <i-table :columns="columns.weilai" :data="tableData.weilai"
                             style="display: inline-block;width: 100%;float:left;"
                             :height="319"></i-table>
                </Col>
                <Col span="7" style="padding: 0 2px;">
                    <div id="weilaiEchart" style="height: 319px;width: 100%"></div>
                </Col>
            </Row>
            <Row v-show="type==2" style="height: 319px;padding: 0 2px;" type="flex" justify="start">
                <Col span="24" style="padding: 0 2px;">
                    <i-Select v-model="shengjing.area" style="width:200px" @on-change="changeLiuyu">
                        <i-Option v-for="item in shengjing.options" :value="item" :key="item">{{ item }}</i-Option>
                    </i-Select>
                </Col>
                <Col span="18"style="padding: 0 2px;">
                    <i-table :columns="columns.shengjing" :data="tableData.shengjing"
                             style="display: inline-block;width: 100%;float:left;"
                             :height="280"></i-table>
                </Col>
                <Col span="6"style="padding: 0 2px;">
                    <div id="shengjingEchart" style="height: 280px;width: 100%;"></div>
                </Col>
            </Row>
        </div>
    </ModelPage>
</template>

<script>
    import ModelPage from "../../../components/layout/ModulPage";
    import MultiSelection from "../../../components/selection/MultiSelection";
    import { bindSelectionAction } from "../../../components/selection/MultiSelectionUtils";
    import { menus } from "./datas";
    import { getAllDatas } from "./datas";

    let provider = null;
    let historyEchart = null;
    let weilaiEchart = null;
    let shengjingEchart = null;
    let bsa = null;
    let datas = [];
    export default {
        name: "XianHaiLiuYuShengTaiFuWuGongNengPingGu",
        components: {ModelPage,MultiSelection},
        data() {
            return {
                type: 1,
                columns: {
                    lishi: [],
                    weilai: [],
                    shengjing: []
                },
                tableData: {
                    lishi: [],
                    weilai: [],
                    shengjing: []
                },
                menus,
                shengjing: {
                    area: '咸海流域',
                    options: ['咸海流域','锡尔河流域','阿姆河流域']
                }
            }
        },
        methods: {
            changeSelect(tar,op,ind,sind,force) {
                let change = bsa(tar,op,ind,sind);
                if (change || force) {
                    let obj = datas.menus2TypeTarInd(ind,op.key);
                    if (ind === 3) {
                        this.type = 2;
                        this.changeLiuyu(this.shengjing.area);
                    } else {
                        this.type = 1;
                        let cds = datas.getColumnsAndData(obj.type);
                        this.columns.lishi.splice(0,this.columns.lishi.length,...cds.lishiColumns);
                        this.columns.weilai.splice(0,this.columns.weilai.length,...cds.weilaiColumns);
                        this.tableData.lishi.splice(0,this.tableData.lishi.length,...cds.lishiData);
                        this.tableData.weilai.splice(0,this.tableData.weilai.length,...cds.weilaiData);
                        historyEchart.setOption(cds.lishiOptions);
                        weilaiEchart.setOption(cds.weilaiOptions);
                    }
                    if (provider) {
                        window.mapApis.removeSingleLayer(provider.id);
                    }
                    let layer = datas.getLayer(obj.type,obj.tar,obj.ind);
                    provider = mapApis.addSingleLayer(layer.url,layer.layer,layer.param);
                    window.mapApis.showImageLegend(datas.getImageLegend(obj.type,obj.tar,obj.ind));
                }
            },
            changeLiuyu(nv) {
                this.tableData.shengjing.splice(0,this.tableData.shengjing.length,...datas.datas.shenghuozhiliang[nv + 'Data']);
                shengjingEchart.setOption(datas.getShenghuozhiliangEchart(nv));
                setTimeout(() => shengjingEchart.resize(),500);
            }
        },
        mounted() {
            bsa = bindSelectionAction(menus);
            datas = getAllDatas();
            window.datas = datas;
            this.columns.shengjing.splice(0,0,...datas.datas.shenghuozhiliang.columns);
            this.tableData.shengjing.splice(0,0,...datas.datas.shenghuozhiliang.咸海流域Data)
            let dom = document.getElementById('historyEchart');
            historyEchart = echarts.init(dom);
            dom = document.getElementById('weilaiEchart');
            weilaiEchart = echarts.init(dom);
            dom = document.getElementById('shengjingEchart');
            shengjingEchart = echarts.init(dom);
            setTimeout(() => this.changeSelect('option',this.menus[0].options[0],0,0,true),100);
            setTimeout(() => {
                window.mapApis.setBaseView(64.9,41.47);
            },500);
        }
    }
</script>

<style scoped>

</style>