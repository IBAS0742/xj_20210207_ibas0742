/**
 * @param id        id 为元素的 id ，例如 <div id="test"></div>
 * @param option    option 为 echart 的参数
 * */
const createEchart = (id,option) => {
    let dom = document.getElementById(id);
    let ec = echarts.init(dom);
    ec.setOption(option);
    return ec;
}

export {
    createEchart
}