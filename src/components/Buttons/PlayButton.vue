<template>
    <div :style="playBtnDivStyle">
        <div class="lrBtn" @click="clickBtn('left')">
        </div>
        <div class="cBtn">
            <div class="cBtnText">
                <div>{{speed}}</div>
                <div>{{time}}</div>
            </div>
        </div>
        <div class="lrBtn" @click="clickBtn('right')">
        </div>
    </div>
</template>

<script>
    import {playBtn} from "../../libs/Pictures";

    export default {
        name: "PlayButton",
        props: {
            speed: '',
            time: '',
            bottom: {
                default() {
                    return true;
                }
            }
        },
        data() {
            let playBtnDivStyle = {
                background: playBtn,
                "box-sizing": "border-box",
                width: "291px",
                height: "139px",
                padding: "auto",
                margin: "4.5px",
                "background-size":"100% 100%",
            }
            if (this.bottom) {
                playBtnDivStyle.margin = "4.5px";
                playBtnDivStyle.position = "absolute";
                playBtnDivStyle.bottom = "5px";
            }
            return {
                playBtnDivStyle
            }
        },
        methods: {
            clickBtn(tar) {
                this.$emit('clickBtn',tar);
            }
        }
    }
</script>

<style scoped>
    .playBtnDiv {
        /*background: url("lib/pics/播放按钮.png");*/
        box-sizing: border-box;
        width: 291px;
        height: 139px;
        padding: 5px;
        margin: auto;
        background-size:100% 100%;
    }
    .lrBtn {
        margin-top: 27px;
        width: 72px;
        height: 72px;
        float:left;
        border-radius: 50px;
        background: rgba(0,0,0,0);
    }
    .cBtn {
        width: 136px;
        height: 136px;
        float:left;
        background: rgba(0,0,0,0);
        border-radius: 63px;
    }
    .cBtnText {
        margin-top: 46px;
        text-align: center;
        font-size: small;
        background: #d8d8d8;
        width: 102px;
        margin-left: 19px;
    }
</style>