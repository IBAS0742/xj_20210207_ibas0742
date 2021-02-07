class ZoomBar {
    constructor(parentNode,id) {
        this.parentNode = typeof parentNode === "string" ? document.getElementById(parentNode) : parentNode;
        this.id = id || "__echart_" + (new Date().getTime());
        this.echart = null;
    }

    // xAxisData = ['周一','周二','周三']
    // datas = [1,2,3]
    getOption(xAxisData,datas) {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            xAxis: {
                data: xAxisData,
                splitLine: {
                    show: false
                }
            },
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                },
                {
                    show: false
                }
            ],
            grid: {
                left: '3%',
                right: '4%',
                containLabel: true
            },
            calculable: true,
            yAxis: {
            },
            series: [{
                name: 'bar',
                type: 'bar',
                data: datas,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }]
        };
    }

    setWidthHeight(width, height) {
        this.width = width || 400;
        this.height = height || 240;
    }

    showEchart(xAxisData,datas, cb) {
        this.parentNode.innerHTML = `<div style="width: 100%;height: 100%;" id="${this.id}"></div>`;
        let el = document.getElementById(this.id);
        el.innerHTML = "";
        el.style.backgroundColor = 'white';
        // eslint-disable-next-line no-undef
        let e = echarts.init(el);
        this.echart = e;
        (cb || (() => {}))(e.resize);
        e.setOption(this.getOption(xAxisData,datas),true);
        e.resize();
        window.onresize = window.packageMethod(window.onresize,function () {
            e.resize();
        });
        return el;
    }
}