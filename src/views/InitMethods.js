import { HuPoShuiMianInit } from "./遥感影像监测/湖泊水面/init";
import { DaHuQuNDVIInit } from "./遥感影像监测/大湖区NDVI/init";
import { DaHuQuEVIInit } from "./遥感影像监测/大湖区EVI/init";
//import { ShuiWenGuanCeZhanInit } from "./地面监测/水文观测站/init";
//import { ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDianInit } from "./地面监测/中亚生态与环境研究中心气象站点/init";
//import { LiShiQiXiangGuanCeShuJuInit } from "./地面监测/历史气象观测数据/init";
//import { XianHaiYanChenJianCeInit } from "./地面监测/咸海盐尘监测/init";
//import { TuYangCaiJiInit } from "./地面监测/土样采集/init";
//import { ShuiYangInit } from "./地面监测/水样/init";
//import { GanHanZhiShuInit } from "./遥感监测/干旱指数/init";
//import { ZhengSanFaInit } from "./遥感监测/蒸散发/init";
//import { DaHuQuTGDVIInit } from "./遥感监测/大湖区TGDVI/init";
//import { SheHuiJingJiInit } from "./水与社会经济/社会经济/init";
//import { SheHuiJingJiYongShuiYuCeInit } from "./水与社会经济/社会经济用水预测/init";
//import { ZhongZhiJieGouInit } from "./农业大数据/种植结构/init";
//import { TuDiLiYongInit } from "./农业大数据/土地利用/init";
//import { HeDaoLiuLiangSWATInit } from "./三大湖区水生态平衡/河道流量(SWAT)/init";
//import { XianHaiShuiZiYuanInit } from "./三大湖区水生态平衡/咸海水资源/init";
//import { XianHaiHuPenDiBiaoBianHuaInit } from "./三大湖区水生态平衡/咸海湖盆地表变化/init";
//import { XianHaiHuQuShuiWen-ShengTai-HuanJingMoNiInit } from "./三大湖区水生态平衡/咸海湖区水文-生态-环境模拟/init";
//import { ZhongYaZhiBeiGongNengInit } from "./咸海生态服务评估/中亚植被功能/init";
//import { ZhongYaTuRangGongNengInit } from "./咸海生态服务评估/中亚土壤功能/init";
//import { XianHaiLiuYuShengTaiFuWuGongNengPingGuInit } from "./咸海生态服务评估/咸海流域生态服务功能评估/init";
//import { XianHaiLiuYuShengTaiFuWuJiaZhiPingGuInit } from "./咸海生态服务评估/咸海流域生态服务价值评估/init";
//import { XianHaiLiuYuLiShiGanHanFengXian1940-2010Init } from "./生态风险评估/咸海流域历史干旱风险(1940-2010)/init";
//import { XianHaiLiuYuWeiLaiGanHanFengXian2020-2050Init } from "./生态风险评估/咸海流域未来干旱风险(2020-2050)/init";
//import { ZhongYaShengTaiHuanJingXiTongFengXianPingGuInit } from "./生态风险评估/中亚生态环境系统风险评估/init";
//import { TuDiLiYongBianHuaInit } from "./水与生态协同优化配置/土地利用变化/init";
//import { ShuiZiYuanFenPeiInit } from "./水与生态协同优化配置/水资源分配/init";
//import { ShengTaiXiTongFuWuYunSuanJieGuoInit } from "./水与生态协同优化配置/生态系统服务运算结果/init";
//import { ShengTaiXiTongFuWuMuBiaoShiXianLvInit } from "./水与生态协同优化配置/生态系统服务目标实现率/init";

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
//            case "水文观测站":
//                case "ShuiWenGuanCeZhan":
//                ShuiWenGuanCeZhanInit();
//                this.router.push("ShuiWenGuanCeZhan");
//                break;
//            case "中亚生态与环境研究中心气象站点":
//                case "ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian":
//                ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDianInit();
//                this.router.push("ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian");
//                break;
//            case "历史气象观测数据":
//                case "LiShiQiXiangGuanCeShuJu":
//                LiShiQiXiangGuanCeShuJuInit();
//                this.router.push("LiShiQiXiangGuanCeShuJu");
//                break;
//            case "咸海盐尘监测":
//                case "XianHaiYanChenJianCe":
//                XianHaiYanChenJianCeInit();
//                this.router.push("XianHaiYanChenJianCe");
//                break;
//            case "土样采集":
//                case "TuYangCaiJi":
//                TuYangCaiJiInit();
//                this.router.push("TuYangCaiJi");
//                break;
//            case "水样":
//                case "ShuiYang":
//                ShuiYangInit();
//                this.router.push("ShuiYang");
//                break;
//            case "干旱指数":
//                case "GanHanZhiShu":
//                GanHanZhiShuInit();
//                this.router.push("GanHanZhiShu");
//                break;
//            case "蒸散发":
//                case "ZhengSanFa":
//                ZhengSanFaInit();
//                this.router.push("ZhengSanFa");
//                break;
//            case "大湖区TGDVI":
//                case "DaHuQuTGDVI":
//                DaHuQuTGDVIInit();
//                this.router.push("DaHuQuTGDVI");
//                break;
//            case "社会经济":
//                case "SheHuiJingJi":
//                SheHuiJingJiInit();
//                this.router.push("SheHuiJingJi");
//                break;
//            case "社会经济用水预测":
//                case "SheHuiJingJiYongShuiYuCe":
//                SheHuiJingJiYongShuiYuCeInit();
//                this.router.push("SheHuiJingJiYongShuiYuCe");
//                break;
//            case "种植结构":
//                case "ZhongZhiJieGou":
//                ZhongZhiJieGouInit();
//                this.router.push("ZhongZhiJieGou");
//                break;
//            case "土地利用":
//                case "TuDiLiYong":
//                TuDiLiYongInit();
//                this.router.push("TuDiLiYong");
//                break;
//            case "河道流量(SWAT)":
//                case "HeDaoLiuLiangSWAT":
//                HeDaoLiuLiangSWATInit();
//                this.router.push("HeDaoLiuLiangSWAT");
//                break;
//            case "咸海水资源":
//                case "XianHaiShuiZiYuan":
//                XianHaiShuiZiYuanInit();
//                this.router.push("XianHaiShuiZiYuan");
//                break;
//            case "咸海湖盆地表变化":
//                case "XianHaiHuPenDiBiaoBianHua":
//                XianHaiHuPenDiBiaoBianHuaInit();
//                this.router.push("XianHaiHuPenDiBiaoBianHua");
//                break;
//            case "咸海湖区水文-生态-环境模拟":
//                case "XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi":
//                XianHaiHuQuShuiWen-ShengTai-HuanJingMoNiInit();
//                this.router.push("XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi");
//                break;
//            case "中亚植被功能":
//                case "ZhongYaZhiBeiGongNeng":
//                ZhongYaZhiBeiGongNengInit();
//                this.router.push("ZhongYaZhiBeiGongNeng");
//                break;
//            case "中亚土壤功能":
//                case "ZhongYaTuRangGongNeng":
//                ZhongYaTuRangGongNengInit();
//                this.router.push("ZhongYaTuRangGongNeng");
//                break;
//            case "咸海流域生态服务功能评估":
//                case "XianHaiLiuYuShengTaiFuWuGongNengPingGu":
//                XianHaiLiuYuShengTaiFuWuGongNengPingGuInit();
//                this.router.push("XianHaiLiuYuShengTaiFuWuGongNengPingGu");
//                break;
//            case "咸海流域生态服务价值评估":
//                case "XianHaiLiuYuShengTaiFuWuJiaZhiPingGu":
//                XianHaiLiuYuShengTaiFuWuJiaZhiPingGuInit();
//                this.router.push("XianHaiLiuYuShengTaiFuWuJiaZhiPingGu");
//                break;
//            case "咸海流域历史干旱风险(1940-2010)":
//                case "XianHaiLiuYuLiShiGanHanFengXian1940-2010":
//                XianHaiLiuYuLiShiGanHanFengXian1940-2010Init();
//                this.router.push("XianHaiLiuYuLiShiGanHanFengXian1940-2010");
//                break;
//            case "咸海流域未来干旱风险(2020-2050)":
//                case "XianHaiLiuYuWeiLaiGanHanFengXian2020-2050":
//                XianHaiLiuYuWeiLaiGanHanFengXian2020-2050Init();
//                this.router.push("XianHaiLiuYuWeiLaiGanHanFengXian2020-2050");
//                break;
//            case "中亚生态环境系统风险评估":
//                case "ZhongYaShengTaiHuanJingXiTongFengXianPingGu":
//                ZhongYaShengTaiHuanJingXiTongFengXianPingGuInit();
//                this.router.push("ZhongYaShengTaiHuanJingXiTongFengXianPingGu");
//                break;
//            case "土地利用变化":
//                case "TuDiLiYongBianHua":
//                TuDiLiYongBianHuaInit();
//                this.router.push("TuDiLiYongBianHua");
//                break;
//            case "水资源分配":
//                case "ShuiZiYuanFenPei":
//                ShuiZiYuanFenPeiInit();
//                this.router.push("ShuiZiYuanFenPei");
//                break;
//            case "生态系统服务运算结果":
//                case "ShengTaiXiTongFuWuYunSuanJieGuo":
//                ShengTaiXiTongFuWuYunSuanJieGuoInit();
//                this.router.push("ShengTaiXiTongFuWuYunSuanJieGuo");
//                break;
//            case "生态系统服务目标实现率":
//                case "ShengTaiXiTongFuWuMuBiaoShiXianLv":
//                ShengTaiXiTongFuWuMuBiaoShiXianLvInit();
//                this.router.push("ShengTaiXiTongFuWuMuBiaoShiXianLv");
//                break;
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