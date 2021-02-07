<style scoped>
    .main {
        height: 100vh;
    }
    .header {
        height: 200px;
    }
    .content {
        /*height: calc(100%- 200px);*/
    }
</style>
<template>
    <div style="width: 1920px;height: 1080px;margin: auto;">
        <Row :style="headerStyle">
            <Col span="24">
                <slot name="menu"></slot>
            </Col>
        </Row>
        <div class="content" :style="contentStyle">
            <div :style="colLeftStyle">
                <div style="height: 43px;margin-bottom: 26px;text-align: center;font-weight: bold;
                margin-top: 32px;line-height: 43px;background: #d7d9d9;font-size: 14px;">
                    {{title}}
                </div>
                <slot name="left"></slot>
            </div>
            <div :style="colRightStyle">
                <slot name="content"></slot>
            </div>
            <slot name="other"></slot>
        </div>
    </div>
</template>
<script>
    import {layoutConfig} from "../../libs/layoutConfig";

    const headerHeight = layoutConfig.header.height;
    export default {
        components: {

        },
        name: "DefaultLayout",
        props: {
            title: {
                type: String,
                required: true
            },
            headerStyle: {
                required: true
            }
        },
        data() {
            return {
                contentStyle: {
                    height: `calc(100% - ${headerHeight}px)`
                },
                colLeftStyle: {
                    height: '100%',
                    width: `${layoutConfig.left.width}px`,
                    float: `left`,
                    background: `#012d3e`
                },
                colRightStyle: {
                    height: '100%',
                    width: `calc(100% - ${layoutConfig.left.width}px)`,
                    float: `left`
                },
            }
        },

    }
</script>