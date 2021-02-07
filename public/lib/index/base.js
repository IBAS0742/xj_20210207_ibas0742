// 显示信息

const init = function () {

    window.utils = (function () {
        let d = new Date();
        return {
            timestampToYMD(ts) {
                d.setTime(ts);
                return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            },
            timestampToYMDHMS(ts) {
                d.setTime(ts);
                return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            },
        }
    })();
    window.loadCesiumJS = function (url,cb) {
        let script = document.createElement("script");
        script.src = url;
        document.body.append(script);
        script.onload = (cb || (_ => _));
    }
    let obj = [
        'toParamString','fetchOnlyFromUrl',
        'fetchFromUrl',
        'fetchOnlyFromUrlNoAPI',
        'fetchJsonPOST','fetchJsonGET',
        'featchJsonDefaultDearMFCD',
        'fakeFetchFromUrl','fakeFetchJsonUrl',
        'msg','layui','loading','$'
    ];
    if (window === window.parent) {
        // type = 'success' || 'err'
        window.msg = function (msg,type) {
        }
        window.loading = (new class {
            constructor() {
                this.id = null;
                this.text = null;
            }
            close() {
                if (this.id) {
                    layer.close(this.id);
                    this.id = null;
                    this.text = null;
                }
            }
            load(text) {
                text = text || "加载中...";
                if (this.id) {
                    this.text.innerText = text;
                } else {
                    this.id = layer.msg(
                        `<div>
<i class="layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 30px; color: #1E9FFF;float:left;"></i>
<div style="float: left;padding-left: 5px;" class="text">${text}</div>
</div>`, {
                            shade: 0.3,
                            time: -1
                    });
                    let div = document.getElementById("layui-layer" + this.id);
                    div.classList.remove('layui-layer-hui');
                    this.text = div.getElementsByClassName('text')[0];
                }
            }
        });
        window.$ = jQuery;
    } else {
        window.vueMessage = function ($vue) {
            if ($vue instanceof Vue) {
                let types = ['error','success','info','warning'];
                window.vueMessage = function (msg,type) {
                    type = (type || '').toString().toLowerCase()
                    if (!types.includes(type)) {
                        type = 'success';
                    }
                    $vue.$Message[type](msg);
                };
            } else {
                window.vueMessage = function () {};
            }
        }
        obj.forEach(_ => {
            window[_] = window.parent[_];
        });
    }
}