<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <div :style="leftStyle">
            <div style="height: 43px;margin-bottom: 26px;text-align: center;font-weight: bold;
                margin-top: 32px;line-height: 43px;background: #d7d9d9;font-size: 14px;" v-show="title">
                {{title}}
            </div>
            <slot name="left"></slot>
        </div>
        <div :style="rightStyle">
            <div :style="rightDivStyle.topStyle"></div>
            <div :style="rightDivStyle.bottomStyle">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import {layoutConfig} from "../../libs/layoutConfig";

    export default {
        name: "ModelPage",
        components: { },
        props: {
            // 0~1，默认为 1 即地图铺满
            mapRate: {
                default() { return 1; }
            },
            title: {
                default() {
                    return false;
                }
            }
        },
        computed: {
            rightDivStyle() {
                let topStyle = {};
                let bottomStyle = {};
                if (this.mapRate <= 0) {
                    topStyle = { display: 'none' };
                } else if (this.mapRate > 1) {
                    bottomStyle = { display: 'none' };
                } else {
                    topStyle = {
                        display: 'block',
                        height: `${100 * this.mapRate}%`
                    };
                    bottomStyle = {
                        display: 'block',
                        height: `${100 - 100 * this.mapRate}%`,
                        position: "absolute",
                        "z-index": 100000,
                        width: `calc(100% - 300px)`,
                    };
                }
                console.log({topStyle,bottomStyle})
                return {topStyle,bottomStyle}
            },
        },
        data() {
            return {
                leftStyle: {
                    width: `${layoutConfig.left.width}px`, height: '100%',float: 'left',position: 'absolute',"z-index":100,
                    background: `#012d3e`
                },
                rightStyle: {
                    width: `calc(100% - ${layoutConfig.left.width}px)`, height: '100%',position: 'absolute',left: `${layoutConfig.left.width}px`
                }
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>