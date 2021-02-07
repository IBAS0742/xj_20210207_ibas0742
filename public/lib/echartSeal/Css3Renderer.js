/* Cesium 动态渲染 | yangjianzhi 20200806 */
class Css3Renderer {
    constructor(viewer,isBackHide) {
        this._scratch = new Cesium.Cartesian2();//划痕
        this._viewer = viewer;
        this._scene = viewer.scene;
        this._camera = viewer.camera;
        this._container = null;
        this._elements = [];
        this._isBackHide = isBackHide;
        this.init();
    }
    //初始化
    init() {
        //添加容器
        var container = document.createElement('div');
        container.className = "ys-css3-container";
        document['body']['appendChild'](container);
        this._container = container;

        //添加元素
        jQuery.each(this._elements, function (idx, element) {
            container.insertAdjacentHTML("beforeend", element['element']);
        });

        var _this = this;
        this._scene.preRender.addEventListener(function () {
            for (var i = 0; i < container.children.length; i++) {

                var cart = Cesium.Cartesian3.fromDegrees(_this._elements[i].position[0], _this._elements[i].position[1], _this._elements[i].position[2] || 0);

                //将笛卡尔坐标中的位置转换为画布坐标
                var canvasXY = _this._scene.cartesianToCanvasCoordinates(cart, _this._scratch);
                if (Cesium.defined(canvasXY)) {
                    container['children'][i]['style']['left'] = parseFloat(canvasXY['x']) + parseFloat(_this['_elements'][i]['offset'][0]) + "px";
                    // container['children'][i]['style']['left'] = parseFloat(canvasXY['x']) + 350 + parseFloat(_this['_elements'][i]['offset'][0]) + "px";
                    container['children'][i]['style']['top'] = parseFloat(canvasXY['y']) + parseFloat(_this['_elements'][i]['offset'][1]) + "px";
                    if (_this._isBackHide) {
                        var position = _this['_camera']['position'],
                            height = _this['_scene']['globe']['ellipsoid']['cartesianToCartographic'](position)['height'];

                        height += _this['_scene']['globe']['ellipsoid']['maximumRadius'];
                        if (!(Cesium['Cartesian3']['distance'](position, cart) > height)) {
                            container['children'][i]['style']['display'] = 'block';
                        } else {
                            container['children'][i]['style']['display'] = 'none';
                        }
                    }
                }
            }
        });
    }
    //移除
    remove(removeID) {
        this['_elements'] = this['_elements']['filter'](function(e) {
            return e.id !== removeID;
        });
        let div = document['getElementById'](removeID);
        if (div.parentElement === this['_container']) {
            this['_container']['removeChild'](div);
        } else {
            this['_container']['removeChild'](div.parentElement);
        }

    }
    //添加
    append(el) {
        this['_elements']['push'](el);
        this['_container']['insertAdjacentHTML']("beforeend", el['element']);
    }
    //移除实体图层
    removeEntityLayer(removeID) {
        this['_viewer']['entities']['removeById'](removeID + '_1');
        this['_viewer']['entities']['removeById'](removeID +  '_2');
        this['_viewer']['entities']['removeById'](removeID + '_3');
        this['remove'](removeID);
    }
    //添加实体图层
    addEntityLayer(opts) {
        var pos_x = opts['position'][0],
            pos_y = opts['position'][1],
            boo1 = true,
            _this = this,
            p1 = 0.001,
            p2 = p1,
            p3 = p1,
            p4 = p1;

        setTimeout(function (e) {
            e = true;
        }, 300);

        var rad = Cesium['Math']['toRadians'](30);
        var rad2 = Cesium['Math']['toRadians'](30);

        var boxHeight = opts['boxHeight'] || 300,
            boxHeightMax = opts['boxHeightMax'] || 400,
            boxHeightDif = opts['boxHeightDif'] || 10;
        var boo2 = true;

        if (opts['boxShow']) {
            this['_viewer']['entities']['add']({
                'id': opts['id'] + '_1',
                'name': "name1",
                'position': new Cesium['CallbackProperty'](function () {
                    boxHeight = boxHeight + boxHeightDif;
                    if (boxHeight >= boxHeightMax) {
                        boxHeight = boxHeightMax;
                    }
                    return Cesium['Cartesian3']['fromDegrees'](pos_x, pos_y, boxHeight / 2);
                }, false),
                'box': {
                    'dimensions': new Cesium['CallbackProperty'](function () {
                        boxHeight = boxHeight + boxHeightDif;
                        if (boxHeight >= boxHeightMax) {
                            boxHeight = boxHeightMax;
                            if (boo2) {
                                boo2 = false;
                                _this['append'](opts, true);
                            }
                        }
                        return new Cesium['Cartesian3'](opts['boxSide'] || 100, opts['boxSide'] || 100, boxHeight);
                    }, false),
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    'material': opts['boxMaterial'] || Cesium['Color']['DEEPSKYBLUE']['withAlpha'](0.5)
                }
            });
        } else {
            _this['append'](opts, true);
        }

        if (opts['circleShow']) {
            opts['circleSize'] = opts['circleSize'] || 120;
            this['_viewer']['entities']['add']({
                'id': opts['id'] + '_2',
                'name': 'name2',
                'position': Cesium['Cartesian3']['fromDegrees'](pos_x, pos_y),
                'ellipse': {
                    'semiMinorAxis': new Cesium['CallbackProperty'](function () {
                        if (boo1) {
                            p1 = p1 + opts['circleSize'] / 20;
                            if (p1 >= opts['circleSize']) {
                                p1 = opts['circleSize'];
                            }
                        }
                        return p1;
                    }, false),
                    'semiMajorAxis': new Cesium['CallbackProperty'](function () {
                        if (boo1) {
                            p2 = p2 + opts['circleSize'] / 20;
                            if (p2 >= opts['circleSize']) {
                                p2 = opts['circleSize'];
                            }
                        }
                        return p2;
                    }, false),
                    'material': './img/cesium/circle2.png',
                    'rotation': new Cesium['CallbackProperty'](function () {
                        rad += 0.05;
                        return rad;
                    }, false),
                    'stRotation': new Cesium['CallbackProperty'](function () {
                        rad += 0.05;
                        return rad;
                    }, false),
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    'zIndex': 2
                }
            });
            this['_viewer']['entities']['add']({
                'id': opts['id'] + '_3',
                'name': 'name3',
                'position': Cesium['Cartesian3']['fromDegrees'](pos_x, pos_y),
                'ellipse': {
                    'semiMinorAxis': new Cesium['CallbackProperty'](function () {
                        if (boo1) {
                            p3 = p3 + opts['circleSize'] / 20;
                            if (p3 >= opts['circleSize'] / 2) {
                                p3 = opts['circleSize'] / 0x2;
                            }
                        }
                        return p3;
                    }, false),
                    'semiMajorAxis': new Cesium['CallbackProperty'](function () {
                        if (boo1) {
                            p4 = p4 + opts['circleSize'] / 20;
                            if (p4 >= opts['circleSize'] / 2) {
                                p4 = opts['circleSize'] / 0x2;
                            }
                        }
                        return p4;
                    }, false),
                    'material': './img/cesium/circle1.png',
                    'rotation': new Cesium['CallbackProperty'](function () {
                        rad2 -= 0.03;
                        return rad2;
                    }, false),
                    'stRotation': new Cesium['CallbackProperty'](function () {
                        rad2 -= 0.03;
                        return rad2;
                    }, false),
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                    'zIndex': 3
                }
            });
        }
    }

    // 销毁所有
    destroy() {
        this['_elements'] = this['_elements']['filter']((e) => {
            this.removeEntityLayer(e.id);
            return false;
        });
    }
}