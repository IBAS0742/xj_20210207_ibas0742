<template>
    <div class="selectionDiv" :style="{height: height}">
        <div class="head">{{title}}</div>
        <div :style="selectionHeight">
            <div v-for="(s,ind) in selections" :class="`selection ${s.selected ? 'selected' : ''}`"
                 @click="selectSelection(s.key,ind)">{{s.value}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingleSelection",
        props: {
            height: {
                required: true
            },
            title: {
                required: true
            },
            // [{key:'',value:'',selected:''}]
            selections: {
                required: true
            }
        },
        data() {
            return {
                selectionHeight: {
                    overflow:"auto",
                    "overscroll-behavior-y": "contain"
                }
            }
        },
        methods: {
            selectSelection(key,ind) {
                this.$emit('select',key,ind);
            }
        },
        mounted() {
            // window.$ss = this;
            this.selectionHeight = {
                height: this.height,
                overflow:"auto",
                "overscroll-behavior-y": "contain"
            }
        }
    }
</script>

<style scoped>
    .selectionDiv {
        border-radius: 3px;
        border: 1px solid white;
        margin: 0 45px;
    }
    .head {
        background: #0092b6;
        line-height: 43px;
        height: 43px;
        text-align: center;
        margin-bottom: 1px;
    }
    .selection {
        background: #b6c2c7;
        height: 33px;
        line-height: 33px;
        text-align: center;
        margin-bottom: 1px;
        cursor: pointer;
    }
    .selected {
        background: #dfe6e8;
    }
</style>