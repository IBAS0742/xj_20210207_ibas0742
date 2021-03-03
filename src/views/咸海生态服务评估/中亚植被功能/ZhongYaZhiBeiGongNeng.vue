<template>
    <ModelPage title="中亚植被功能" map-rate="1">
        <div slot="left">
            <div id="echart" style="height: calc(100vh - 160px);width:100%;margin-top: 10px;padding: 10px;"></div>
        </div>
        <div slot="right"></div>
    </ModelPage>    
</template>

<script>
    import ModelPage from "../../../components/layout/ModulPage";
    import {getZhongYaZhiBeiGongNengLayerParams} from "./layers";
    import {tongji} from "./request";
    let provider = null;
    export default {
        name: "ZhongYaZhiBeiGongNeng",
        components:{ModelPage},
        mounted() {
            mapApis.drawer(true);
            window.mapApis.removeSingleLayer(provider);
            let curLayers = getZhongYaZhiBeiGongNengLayerParams();
            provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);

            ImageLegend.init(`${window.ips.api.base}/table/image/zhibei.jpg`)
            mapApis.updateMagmMethod({
                "POLYGON"(magm,obj,geojson) {
                    console.log(geojson)
                    tongji(JSON.stringify(geojson.toGeoJson()))
                        .then(_ => {
                            console.log(_);
                            let a = [];
                            for (let i in _) {
                                a.push([i,_[i]]);
                            }
                            a = a.sort((b,c) => b[0] - c[0]);
                            return a.map(b => b[1]);
                        }).then(datas => {
                        console.log(datas)
                    });
                }
            });
        }
    }
</script>

<style scoped>

</style>