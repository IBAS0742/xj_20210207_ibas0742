<template>
    <ModelPage title="湖泊水面" map-rate="0.5">
        <div slot="left">
            <single-selection title="年份" :selections="years" @select="changeYear"
                              height="500px"></single-selection>
        </div>
        <div slot="right"></div>
    </ModelPage>
</template>

<script>
    import ModelPage from "../../../components/layout/ModulPage";
    import SingleSelection from "../../../components/selection/SingleSelection";
    import {getHuPoShuiMianLayerParams} from "./layers";

    // 这个对象不要挂载到 data 里面，不然会被监听会特别消耗浏览器的 cpu 资源
    let provider = null;

    export default {
        name: "HuPoShuiMian",
        components: {SingleSelection, ModelPage},
        data() {
            return {
                defaultSelectYear: 1990,
                years: [1990,2000,2010].map(y => {
                    return {key: y,value:y,selected: false }
                })
            }
        },
        methods: {
            changeYear(year,ind) {
                if (this.years[ind].selected) {
                    return false;
                } else {
                    this.years.forEach((y,_ind) => {
                        if (y.selected) {
                            this.years[_ind].selected = false;
                        }
                    });
                    this.years[ind].selected = true;
                    // todo 这里应该调用 mapApis 换对应的栅格图片
                    window.mapApis.removeSingleLayer(provider);
                    let curLayers = getHuPoShuiMianLayerParams(year);
                    provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);
                }
            }
        },
        mounted() {
            this.changeYear(this.defaultSelectYear,0);
        }
    }
</script>

<style scoped>

</style>