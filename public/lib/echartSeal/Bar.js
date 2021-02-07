// id => dom id
function createSimpleEchartBar(_id,closeBtn) {
    let p = document.getElementById(_id);
    id = '__chart__' + (new Date().getTime()) + '__';
    p.innerHTML = `
    <div style='position: relative;width: 100%;height: 100%;' id='${id}'></div>
    ${closeBtn ? `<i id="${id}close" style="position: absolute;top: 10px;right: 10px;font-size: 20px;cursor: pointer;" title="关闭" class="ivu-icon ivu-icon-md-close-circle"></i>` : ''}
    `;
    var myChart = echarts.init(document.getElementById(id));
    if (closeBtn) {
        if (typeof closeBtn === "function") {} else {
            closeBtn = () => {};
        }
        document.getElementById(id + 'close').onclick = function () {
            p.innerHTML = "";
            closeBtn();
        };
    }
    return {
        chart: myChart,
        setDatas(datas,labels,title) {
            let option = {
                title: {
                    left: 'center',
                    text: title || '标题',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: labels,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: '60%',
                        data: datas,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = ["#3398db", "#434348", "#90ed7d", "#f7a35c", "#61a0a8", "#61a0a8", "#91c7ae", "#2f4554"];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                    }
                ]
            }
            myChart.setOption(option);
            myChart.resize()
        }
    }
}
