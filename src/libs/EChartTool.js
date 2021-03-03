/* 图表辅助工具 | yangjianzhi  */

//自定义图表参数方法(不适用于多网格)
var EChartsOptCls = function (opts) {
    this._opt = {
        grid: {
            top: 10,
            bottom: 25,
            left: 60,
            right: 5,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: 'line',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        xAxis: [{type: 'category'}],
        yAxis: [{type: 'value'}],
        dataset: [],
        series: [],
    };

    //声明时的参数设置
    if (opts) {
        if (opts.title) {
            //标题
            this._opt.title = typeof opts.title === "string" ? {text: opts.title} : opts.title;
            //防止标题被挡住
            this._opt.grid.top = 35;
        }
        if (opts.grid) {
            //网格
            for (let key in opts.grid) {
                this._opt.grid[key] = opts.grid[key];
            }
        }
        if (opts.dataZoom) {
            //缩放组件:默认设置inside
            this._opt.dataZoom = typeof opts.dataZoom === "boolean" ? {
                type: "inside",
                show: true,
                start: 0,
                end: 100
            } : opts.dataZoom
        }
        if (opts.tooltip) {
            if (typeof opts.tooltip === "string") {
                this._opt.tooltip.trigger = opts.tooltip;
            } else {
                this._opt.tooltip = opts.tooltip;
            }
        }
    }
};

//默认: x: category y: value
//设置 x,y 坐标轴
EChartsOptCls.prototype.setAxis = function (list) {
    var _this = this;
    _this._opt.xAxis = [];
    _this._opt.yAxis = [];

    //设置x
    if (list && list.length > 0) {
        var xOpt = list[0];
        if (typeof xOpt === "string") {
            _this._opt.xAxis.push({type: xOpt});
        }
        if (typeof xOpt === "object") {
            if (xOpt.length === undefined) {
                _this._opt.xAxis.push(xOpt);
            } else if (xOpt.length > 0) {
                xOpt.forEach(function (o) {
                    if (typeof o === "string") {
                        _this._opt.xAxis.push({type: o});
                    } else if (typeof o === "object" && o.length === undefined) {
                        _this._opt.xAxis.push(o);
                    }
                });
            }
        }
    }

    //设置y
    if (list && list.length > 1) {
        var yOpt = list[1];
        if (typeof yOpt === "string") {
            _this._opt.yAxis.push({type: yOpt});
        }
        if (typeof yOpt === "object") {
            if (yOpt.length === undefined) {
                _this._opt.yAxis.push(yOpt);
            } else if (yOpt.length > 0) {
                yOpt.forEach(function (o) {
                    if (typeof o === "string") {
                        _this._opt.yAxis.push({type: o});
                    } else if (typeof o === "object" && o.length === undefined) {
                        _this._opt.yAxis.push(o);
                    }
                });
            }
        }
    }
};

//设置系列 （饼状图不可设置dataZoom）
EChartsOptCls.prototype.setSeries = function (info, otherInfo) {
    this._opt.series = [];

    if (typeof info === "string") {
        var newSeries = {
            type: info, encode: {x: 0, y: 1}
        };
        if (otherInfo) {
            newSeries.name = otherInfo;
        }
        this._opt.series.push(newSeries);
    } else if (typeof info === "object") {
        if (info.length > 0) {
            this._opt.series = info;
        } else {
            this._opt.series.push(info);
        }
    }
};

//设置dataset 只用这种情况(将json数据转化为二维表形式)
EChartsOptCls.prototype.setDataset = function (data, nameList, colList) {
    var sourceList = [nameList];
    data.forEach(function (value) {
        var list = [];

        colList.forEach(function (col) {
            list.push(value[col]);
        });
        sourceList.push(list);
    });

    this._opt.dataset.push({
        source: sourceList,
        sourceHeader: true,
    })
};

//设置图例
EChartsOptCls.prototype.setLegend = function (opt) {
    if (opt) {
        if (opt.length > 0) {
            this._opt.legend = {
                orient: 'vertical',
                left: 10,
                data: opt
            }
        } else {
            this._opt.legend = opt;
        }
    }
};

export {
    EChartsOptCls
}