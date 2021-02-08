<template>
  <ModelPage title="大湖区NDVI" map-rate="1">
    <div slot="left">
      <single-selection title="年份" :selections="years" @select="changeYear"
                        height="500px"></single-selection>
      <PlayButton speed="0" @clickBtn="playBtnClick"
                  :time="currentTime"></PlayButton>
    </div>
    <div slot="right"></div>
  </ModelPage>
</template>

<script>
import ModelPage from "../../../components/layout/ModulPage";
import SingleSelection from "../../../components/selection/SingleSelection";
import {getDaHuQuNDVILayerParams} from "./layers";
import PlayButton from "../../../components/Buttons/PlayButton";

let provider = null;
export default {
  name: "DaHuQuNDVI",
  components: {PlayButton, SingleSelection, ModelPage},
  data() {
    return {
      defaultSelectYear: 2000,
      defaultSelectInd: 0,
      years: [2000,2001,2002,2003,2004,2010,2011,2012,2013,2014].map(y => {
        return {key: y,value:y,selected: false }
      }),
      currentTime: '2000年01月01日'
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
        this.defaultSelectInd = ind;
        this.currentTime = `${year}年01月01日`;
        // todo 这里应该调用 mapApis 换对应的栅格图片
        window.mapApis.removeSingleLayer(provider);
        let curLayers = getDaHuQuNDVILayerParams(year);
        provider = window.mapApis.addSingleLayer(curLayers.url,curLayers.layers,curLayers.params);
      }
    },
    playBtnClick(tar) {
      this.defaultSelectInd += tar === 'left'? -1 : 1;
      if (this.defaultSelectInd < 0) {
        this.defaultSelectInd = this.years.length - 1;
      } else if (this.defaultSelectInd > this.years.length) {
        this.defaultSelectInd = 0;
      }
      this.changeYear(this.years[this.defaultSelectInd].key,this.defaultSelectInd);
    }
  },
  mounted() {
    this.changeYear(this.defaultSelectYear,0);
  }
}
</script>

<style scoped>

</style>