<style scoped>
    .viewer {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div>
        <IndexLayout :title="title" ref="defaultLayout" @menuChange="menuChange">
            <Split v-model="splitPC" mode="vertical" id="_index_split_"
                   slot="content">
                <div class="viewer" slot="top">
                    <iframe style="height: 100%;width: 100%;border: none;" src="" id="_map_"></iframe>
                </div>
                <div slot="bottom" class="demo-split-pane"></div>
            </Split>
            <div slot="left">
            </div>
            <div style="width: 100%;height: 100%;" slot="other">
                <SheHuiJingJiYongShuiYuCe></SheHuiJingJiYongShuiYuCe>
            </div>
        </IndexLayout>
    </div>
</template>
<script>
    import IndexLayout from "../components/layout/IndexLayout";
    import { SplitPanelOP } from "../libs/splitPanelOP";
    import { layoutConfig } from "../libs/layoutConfig";
    import { InitMethods } from "./InitMethods";
    import SheHuiJingJiYongShuiYuCe from "./水与社会经济/社会经济用水预测/SheHuiJingJiYongShuiYuCe";

    let spop = new SplitPanelOP();

    export default {
        name: 'IndexView',
        data() {
            return {
                splitPC: 0.5,
                title: '第二层的标题',
                initOk: false,
                defaultPath: layoutConfig.defaultPath()
            }
        },
        components: {SheHuiJingJiYongShuiYuCe, IndexLayout },
        methods: {
            menuChange(m) {
                console.log(m);
                InitMethods.jumpToPage(m);
            },
            toggleLoading(show,text) {
            }
        },
        mounted() {
            let $this = this;
            this.toggleLoading(true,"加载地图中");
            window.initOk = function() {
                console.log("地图加载完成");
                $this.initOk = true;
                window.mapApis = document.getElementById(`_map_`).contentWindow.apis;
                $this.toggleLoading(false);
            };
        }
    }
</script>
<style>

</style>
