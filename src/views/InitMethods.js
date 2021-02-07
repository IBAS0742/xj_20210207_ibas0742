import { HuPoShuiMianInit } from "./遥感影像监测/湖泊水面/init";
import { DaHuQuNDVIInit } from "./遥感影像监测/大湖区NDVI/init";
import { DaHuQuEVIInit } from "./遥感影像监测/大湖区EVI/init";

const InitMethods = new (class {
    constructor() {
        this.router = null;
    }
    setRouter(router) {
        this.router = router;
    }
    /**
     * menu = { id: 10,name: "中亚生态与环境研究中心气象站点" }
     * */
    jumpToPage(menu) {
        let jump = true;
        if (menu === undefined) {
            return;
        }
        if (typeof menu === "string") {
            if (menu[0] === '/') {
                menu = menu.substring(1)
            }
            menu = {name: menu};
        }
        switch (menu.name) {
            case "湖泊水面":
            case "HuPoShuiMian":
                HuPoShuiMianInit();
                this.router.push("HuPoShuiMian");
                break;
            case "大湖区EVI":
            case "DaHuQuEVI":
                DaHuQuEVIInit();
                this.router.push("DaHuQuEVI");
                break;
            case "DaHuQuNDVI":
            case "大湖区NDVI":
                DaHuQuNDVIInit();
                this.router.push("DaHuQuNDVI");
                break;
            default:
                console.warn("指定路径不存在或未定义，请确认");
                jump = false;
                break;
        }
        if (jump) {
            if (!window.mapApis) {
                console.warn("可能是一个异常，第一次调用不可用是正常的");
            } else {
                window.mapApis.removeAll();
            }
        }
    }
});

export {
    InitMethods
}
