<template>
    <ModelPage title="社会经济" map-rate="0.664">
        <div slot="left">
            <SingleSelection :selections="menus" title="区域" height="250px"
                             @select="areaSelect" style="margin-bottom: 20px;"></SingleSelection>
            <div>
                <div style="padding: 0 5px;">
                    <label style="color: white;font-size: 18px;">当前年份：</label>
                    <Select v-model="year.current" @on-change="yearChange"
                            class="sheHuiJingJiSelect">
                        <Option v-for="y in year.list" :value="y" :key="y">{{ y }}</Option>
                    </Select>
                </div>
                <div style="padding: 0 5px;margin-top: 15px;">
                    <div style="margin-bottom: 8px;">
                        <label style="color: white;font-size: 18px;">开始年份：</label>
                        <Select v-model="year.start"
                                class="sheHuiJingJiSelect">
                            <Option v-for="y in year.list" :value="y" :key="y">{{ y }}</Option>
                        </Select>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="color: white;font-size: 18px;">结束年份：</label>
                        <Select v-model="year.end"
                                class="sheHuiJingJiSelect">
                            <Option v-for="y in year.list" :value="y" :key="y">{{ y }}</Option>
                        </Select>
                    </div>
                    <div>
                        <i-button @click="year.play = true" v-if="!year.play" long>
                            <Icon type="md-play" />播放
                        </i-button>
                        <i-button @click="year.play = false" v-else long>
                            <Icon type="md-pause" />暂停
                        </i-button>
                    </div>
                </div>
            </div>
        </div>
        <Row slot="right" style="height: 100%;padding: 0 2px;" type="flex" justify="start">
            <Col span="6">
                <span style="font-weight: bold;font-size: 20px;">{{title}}</span>
                <i-table @on-row-click="rowClick" id="table" height="244"
                         :columns="table.columns" :data="table.data" size="small"></i-table>
                <div style="margin: 10px;overflow: hidden" v-show="tablePage.hasPage">
                    <Page :total="tablePage.total" :page-size="tablePage.pageSize"
                          :current="tablePage.current" @on-change="changePage" size="small" show-total></Page>
                </div>
            </Col>
            <Col span="5" style="padding: 30px 2px 0;">
                <div style="height: 100%;width: 100%;" id="pipe"></div>
            </Col>
            <Col span="5" style="padding: 30px 2px 0;">
                <div style="height: 100%;width: 100%;" id="bar"></div>
            </Col>
            <Col span="8" style="padding: 30px 2px 0;">
                <div style="height: 100%;width: 100%;" id="yearListEchart"></div>
            </Col>
        </Row>
    </ModelPage>
</template>

<script>
    import SingleSelection from "../../../components/selection/SingleSelection";
    import ModelPage from "../../../components/layout/ModulPage";
    import {SheHuiJingJiYongShuiUtils} from "./utils";

    let utils = null;
    export default {
        name: "SheHuiJingJiYongShuiYuCe",
        components: {SingleSelection, ModelPage},
        data() {
            return {
                title: "哈萨克斯坦用水量统计信息",
                currentMenu: {
                    selectInd: 0,
                    area: null,
                },
                menus: [
                    {key:'哈萨克斯坦',value:'哈萨克斯坦',selected: false},
                    {key:'乌兹别克斯坦',value:'乌兹别克斯坦',selected: false},
                    {key:'土库曼斯坦',value:'土库曼斯坦',selected: false},
                    {key:'塔吉克斯坦',value:'塔吉克斯坦',selected: false},
                    {key:'吉尔吉斯斯坦',value:'吉尔吉斯斯坦',selected: false},
                ],
                table: {
                    columns: [
                        { title: "年份", key: "year" },
                        { title: "工业用水量", key: "gyysl" },
                        { title: "生活用水量", key: "shysl" }
                    ],
                    data: []
                },
                tablePage: {
                    hasPage: true,
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                year: {
                    list: [],
                    current: 0,
                    start: 0,
                    end: 0,
                    play: false,
                    startIndex: 0,
                    endIndex: 0
                }
            }
        },
        methods: {
            changePage(currentPage) {
                this.tablePage.current = currentPage;
                utils.chanePage(currentPage);
            },
            rowClick(val) {
                this.year.current = + val.year;
                this.yearChange();
            },
            areaSelect(key,ind) {
                if (key === this.currentMenu.key) {} else {
                    this.menus.forEach((_,_ind) => {
                        this.menus[_ind].selected = false;
                    });
                    this.menus[ind].selected = true;
                    this.currentMenu.area = key;
                    utils.switchMenu();
                }
            },
            yearChange() {
                utils.yearChange();
            }
        },
        watch: {
            'year.play'() {
                utils.togglePlay();
            }
        },
        mounted() {
            window.$shjj = this;
            utils = new SheHuiJingJiYongShuiUtils(this,{
                yearList: 'yearListEchart',
                pipe: 'pipe',
                bar: 'bar'
            });
            window.mapApis ? window.mapApis.setBaseView(69.47,39.78) : false;
            this.areaSelect(this.menus[0].key,0);
        }
    }
</script>

<style scoped>

</style>