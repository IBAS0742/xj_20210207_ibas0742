<template>
    <div class="dataListBox">
        <div class="title">{{title}}</div>
        <div class="content">
            <div class="item" v-for="(it,ind) in items" :key="ind">{{it}}</div>
        </div>
        <div class="footer">{{footText}}</div>
    </div>
</template>

<script>
    export default {
        name: "DataList",
        props: {
            // ["第一项","第二项"]
            items: {
                required: true
            },
            title: {
                reuqired: true
            },
            footText: {
                required: true
            }
        }
    }
</script>

<style scoped>
    .dataListBox {
        height: 297px;
        width: 348px;
        border: 1px solid black;
        border-radius: 5px;
        background: #dee6e8;
        display: inline-block;
    }
    .dataListBox .title {
        height: 28px;
        background: #b7c2c8;
        border-radius: 5px 5px 0 0;
        text-align: center;
        line-height: 26px;
    }
    .dataListBox .content {
        height: 240px;
        padding-left: 18px;
        background: #dee6e8;
        overflow-y: scroll;
        margin-right: 5px;
        padding-bottom: 2px;
        box-sizing: border-box;
    }
    .dataListBox .content .item {
        height: 34px;
        width: 302px;
        border-bottom: 1px solid black;
    }
    .dataListBox .footer {
        height: 29px;
        background: #b7c2c8;
        border-radius: 0 0 5px 5px;
        text-align: center;
        line-height: 26px;
    }
</style>