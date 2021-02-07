class SimpleMultiLine {
    constructor(parentNode,id) {
        this.parentNode = typeof parentNode === "string" ? document.getElementById(parentNode) : parentNode;
        this.id = id || "__echart_" + (new Date().getTime());
        this.echart = null;
    }

    // dataset = [{name:'邮件销量',data: [120, 132, 101, 134, 90, 230]}]
    // dataname = [’邮件销量‘]
    // xLabelName = ['一月','二月','三月','四月','五月','六月']
    getOption({ title, dataset }, dataname,xLabelName) {
        let option = {
            ...(title ? {
                title: {
                    text: title
                }
            }:{}),

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            legend: {
                data: dataname // [‘邮件销量’,'xxxx']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xLabelName
            },
            yAxis: {
                type: 'value'
            },
            series: dataset.map(_ => {
                return {
                    ..._,
                    type: 'line',
                    smooth: true
                }
            })
        };
        return option;
    }

    setWidthHeight(width, height) {
        this.width = width || 400;
        this.height = height || 240;
    }

    // time 就是现实在下面的时间，可以是任何格式
    // dataset = [ {name:'',data:[value1,value2]}, {name:'',data:[value1,value2]} ]
    // dataname = ['value1_Name', 'value2_Name']
    showEchart({ title, dataset }, dataname,xLabelName, cb) {
        this.parentNode.innerHTML = `<div style="width: 100%;height: 100%;" id="${this.id}"></div>`;
        let el = document.getElementById(this.id);
        el.innerHTML = "";
        el.style.backgroundColor = 'white';
        // eslint-disable-next-line no-undef
        let e = echarts.init(el);
        this.echart = e;
        (cb || (() => {}))(e.resize);
        e.setOption(this.getOption({ title, dataset }, dataname,xLabelName),true);
        e.resize();
        window.onresize = window.packageMethod(window.onresize,function () {
            e.resize();
        });
        return el;
    }

    showEchartWithOption(option,cb) {
        this.parentNode.innerHTML = `<div style="width: 100%;height: 100%;" id="${this.id}"></div>`;
        let el = document.getElementById(this.id);
        el.innerHTML = "";
        el.style.backgroundColor = 'white';
        // eslint-disable-next-line no-undef
        let e = echarts.init(el);
        this.echart = e;
        (cb || (() => {}))(e.resize);
        e.setOption(option,true);
        e.resize();
        window.onresize = window.packageMethod(window.onresize,function () {
            e.resize();
        });
        return el;
    }
}