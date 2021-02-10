<template>
    <div class="selectionDiv" :style="{height: `${height}px`}">
        <div v-for="(s,ind) in selections" :key="ind">
            <div class="head" @click="select('title',s,ind)">{{s.title}}</div>
            <div class="selectionContain" :style="s.open ? openStyle : closeStyle">
                <div v-for="(op,sind) in s.options" @click="select('option',op,ind,sind)" :key="sind"
                     :class="op.selected ? 'selection selected' : 'selection'">{{op.label}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MultiSelection.vue",
        props: {
            height: {
                required: true,
            },
            // [
            //      {
            //          title:'', open: false,
            //          options: [ {key:'',label:'',selected: false } ]
            //      }
            // ]
            selections: {
                required: true,
            }
        },
        data() {
            return {
                openStyle: {
                    height: 0
                },
                closeStyle: {
                    height: 0
                }
            }
        },
        methods: {
            select(tar,op,ind,sind) {
                this.$emit('select',tar,op,ind,sind);
            }
        },
        mounted() {
            // this.openStyle['max-height'] = (+this.height - 47 * this.selections.length + 2) + 'px';
            // this.openStyle['height'] = 'auto';
            this.openStyle['height'] = (+this.height - 47 * this.selections.length + 2) + 'px';
        },
        watch: {
            selections(n) {
                // this.openStyle['max-height'] = (+this.height - 47 * this.selections.length + 2) + 'px';
                this.openStyle['height'] = (+this.height - 47 * this.selections.length + 2) + 'px';
            }
        }
    }
</script>

<style scoped>
    .selectionDiv {
        border-radius: 3px;
        border: 1px solid white;
        margin: 0 45px;
        color: black;
        font-weight: bold;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }
    .head {
        background: #0092b6;
        line-height: 43px;
        height: 43px;
        text-align: center;
        cursor: pointer;
        /*margin-bottom: 1px;*/
    }
    .selectionDiv div:nth-of-type(n+2) {
        margin-top: 2px;
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
    .selectionContain {
        overflow:auto;
        overscroll-behavior-y: contain;
        height: 0px;
        transition: height 0.4s ease-in;
    }
</style>