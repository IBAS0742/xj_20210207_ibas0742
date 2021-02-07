// id => dom id
function createSimpleEchartSanKey(_id,closeBtn) {
    let p = document.getElementById(_id);
    id = '__chart__' + (new Date().getTime()) + '__';
    p.innerHTML = `
    <div style='position: relative;width: 100%;height: 100%;' id='${id}'></div>
    ${closeBtn ? `<i id="${id}close" style="position: absolute;top: 10px;right: 10px;font-size: 20px;cursor: pointer;" title="关闭" class="ivu-icon ivu-icon-md-close-circle"></i>` : ''}
    `;
    var myChart = echarts.init(document.getElementById(id));
    if (closeBtn) {
        if (typeof closeBtn === "function") {
            document.getElementById(id + 'close').onclick = function () {
                p.innerHTML = "";
                closeBtn();
            };
        } else {
            closeBtn = () => {};
            document.getElementById(id + 'close').remove();
        }
    }
    return {
        chart: myChart,
        setDatas(data,links) {
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                series: {
                    type: 'sankey',
                    layout: 'none',
                    focusNodeAdjacency: 'allEdges',
                    data,
                    links
                }
            };
            myChart.setOption(option);
            myChart.resize();

            window.onresize = window.packageMethod(window.onresize,function () {
                myChart.resize();
            });
        }
    }
}
