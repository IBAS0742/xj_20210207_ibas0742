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
                <router-view></router-view>
            </div>
        </IndexLayout>
    </div>
</template>
<script>
    import IndexLayout from "../components/layout/IndexLayout";
    import { SplitPanelOP } from "../libs/splitPanelOP";
    import { layoutConfig } from "../libs/layoutConfig";
    import { InitMethods } from "./InitMethods";

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
        components: { IndexLayout },
        methods: {
            menuChange(m) {
                console.log(m);
                InitMethods.jumpToPage(m);
            },
            toggleLoading(show,text) {
                if (show) {
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', text || 'Loading')
                            ]);
                        }
                    });
                } else {
                    this.$Spin.hide();
                }
            }
        },
        mounted() {
            let $this = this;
            this.toggleLoading(true,"加载地图中");
            console.clear();
            if (this.$route.fullPath !== "/") {
                this.defaultPath = this.$route.fullPath.substring(1);
                this.$router.push('/');
            }
            InitMethods.setRouter(this.$router);
            spop.init({
                setDefault() {
                    $this.splitPC = 0.5;
                },
                setAny(n) {
                    $this.splitPC = n;
                },
                setOne() {
                    $this.splitPC = 1;
                },
                setZero() {
                    $this.splitPC = 0;
                },
            },"_index_split_");
            window.$index = this;
            window.$spop = spop;
            window.initOk = function() {
                console.log("地图加载完成");
                $this.initOk = true;
                InitMethods.jumpToPage($this.defaultPath);
                window.mapApis = document.getElementById(`_map_`).contentWindow.apis;
                $this.toggleLoading(false);
            };
            window.spop = spop;
            setTimeout(function () {
                document.getElementById(`_map_`).src = "./map.html"
            });
            spop.hideToggle();
            spop.hideBottom();
        }
    }
</script>
