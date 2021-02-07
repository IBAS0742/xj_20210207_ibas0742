// 控制iview的splitpanel控件
class SplitPanelOP {
    // id 为元素的 id，需要事先设置到组件上，例如
    // <Split v-model="splitPC" mode="vertical" id="_index_split_"
    //     slot="content" :min="0" :max="'100%'">
    //         <div class="viewer"slot="top">
    //         <MapViewer @ready="ready"></MapViewer>
    // </div>
    // <div slot="bottom" class="demo-split-pane">
    //         Bottom Pane
    //     </div>
    // </Split>
    constructor(id) {
        this.defaultClass = {
            toggle: 'ivu-split-trigger-con',
            top: 'top-pane',
            bottom: 'bottom-pane',
        }
        this.id = id;
        this.method = {
            setZero() {},
            setOne() {},
            setDefault() {},
            setAny() {}
        };
        this.dom = null;
    }

    init(/*method = */{setZero,setOne,setDefault,setAny},id) {
        if (setOne) {
            this.method.setOne = setOne;
        }
        if (setZero) {
            this.method.setZero = setZero;
        }
        if (setDefault) {
            this.method.setDefault = setDefault;
        }
        if (setAny) {
            this.method.setAny = setAny;
        }
        if (id) {
            this.id = id;
        }
        this.dom = document.getElementById(this.id);
        this.dom.getElementsByClassName(this.defaultClass.top)[0].style.zIndex = '100';
    }
    _showAll() {
        this.dom.getElementsByClassName(this.defaultClass.bottom)[0].style.display = 'block';
        this.dom.getElementsByClassName(this.defaultClass.top)[0].style.display = 'block';
        this.dom.getElementsByClassName(this.defaultClass.toggle)[0].style.display = 'block';
    }
    hideBottom() {
        if (!this.dom) {
            this.init();
        }
        if (this.dom) {
            this.method.setOne();
            this._showAll();
            this.dom.getElementsByClassName(this.defaultClass.toggle)[0].style.display = 'none';
            this.dom.getElementsByClassName(this.defaultClass.bottom)[0].style.display = 'none';
        }
    }
    hideTop() {
        if (!this.dom) {
            this.init();
        }
        if (this.dom) {
            this.method.setZero();
            this._showAll();
            this.dom.getElementsByClassName(this.defaultClass.toggle)[0].style.display = 'none';
            this.dom.getElementsByClassName(this.defaultClass.top)[0].style.display = 'none';
        }
    }
    hideToggle() {
        this.dom.getElementsByClassName(this.defaultClass.toggle)[0].style.display = 'none';
    }
    noHide() {
        if (!this.dom) {
            this.init();
        }
        if (this.dom) {
            this.method.setDefault();
            this._showAll();
        }
    }
    // rate 是一个 0~1 的数
    setRate(rate) {
        if (rate <= 0) {
            this.hideTop();
        } else if (rate >= 1) {
            this.hideBottom();
        } else {
            this.dom.getElementsByClassName(this.defaultClass.bottom)[0].style.display = 'block';
            this.dom.getElementsByClassName(this.defaultClass.top)[0].style.display = 'block';
            this.method.setAny(rate);
        }
    }
}

export {
    SplitPanelOP
}