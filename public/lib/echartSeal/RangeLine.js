class RangeLine {
    constructor(parentNode,id) {
        this.parentNode = typeof parentNode === "string" ? document.getElementById(parentNode) : parentNode;
        this.id = id || "__echart_" + (new Date().getTime());
    }

    // option = {
    //     title: {
    //         text: '折线图堆叠'
    //     },
    //     tooltip: {
    //         trigger: 'axis'
    //     },
    //     legend: {
    //         data: ["ibas","bing"],
    //          selected: {
    //              ibas: true,
    //              bing: true
    //          },
    //         top:"20px",//与上方的距离 可百分比% 可像素px
    //         bottom:"5px"
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //     },
    //     xAxis: {
    //         type: 'category'
    //     },
    //     yAxis: {
    //         type: 'value',
    //         boundaryGap: [0, '100%'],
    //         scale:true
    //     },
    //     dataset: {
    //         source: [
    //             ["1",1,1],
    //             ["2",5,2],
    //             ["3",8,3],
    //             ["4",8,4],
    //             ["5",9,6],
    //             ["6",1,6]
    //         ],
    //     },
    //     series: [
    //         {
    //             name: "ibas",
    //             type: 'line'
    //         },
    //         {
    //             name: "bing",
    //             type: 'line'
    //         }
    //     ],
    // };
    getOption({ title, dataset }, dataname) {
        let seriesArray = [];
        // 使默认显示第一个
        let selectedArray = {};
        // let colors = ['rgb(96, 55, 62)', 'rgb(215, 196, 187)', 'rgb(251, 226, 81)', 'rgb(168, 216, 185)', 'rgb(119, 66, 141)', 'rgb(248, 195, 205)']
        dataname.map((_) => {
            seriesArray.push({
                name: _,
                type:'line',
            });
            selectedArray[_] = false;
        });
        selectedArray[dataname[0]] = true;
        return {
            tooltip: {
                trigger: 'axis',
                position: function(point, params){
                    //其中params为当前鼠标的位置
                    return [params[0]-220,'10%'];
                }
                // position: function (pt) {
                //     return [pt[0], '10%'];
                // }
            },
            legend: {
                data: dataname, // 传dataname
                selected: selectedArray,
                top:"20px",//与上方的距离 可百分比% 可像素px
                bottom:"5px"
            },
            title: {
                left: 'left',
                text: title,
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataset: {
                source: dataset,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                scale:true
                // min: Math.min.apply(null,data),
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100,
                height: "15px",//高度设置，另外还有宽度
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: seriesArray
        }
    }

    setWidthHeight(width, height) {
        this.width = width || 400;
        this.height = height || 240;
    }

    // time 就是现实在下面的时间，可以是任何格式
    // dataset = [ ["time",value1,value2], ["time",value1,value2] ]
    // dataname = ['value1_Name', 'value2_Name']
    showEchart({ title, dataset }, dataname, cb) {
        this.parentNode.innerHTML = `<div style="width: 100%;height: 100%;" id="${this.id}"></div>`;
        let el = document.getElementById(this.id);
        el.innerHTML = "";

        el.style.backgroundColor = 'white';
        // eslint-disable-next-line no-undef
        let e = echarts.init(el);
        (cb || (() => {}))(e.resize);
        e.setOption(this.getOption({ title, dataset }, dataname),true);
        e.resize();
        return el;
    }
}

// new ShowEChar(document.getElementById('echart'))
//     .showEchart(
//         {title: "标题", dataset: echartData },
//         ["line1","line2"], (e) => {this.echar = e}
//     );