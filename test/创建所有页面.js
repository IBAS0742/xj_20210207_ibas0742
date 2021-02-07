const fs = require('fs');
const path = require('path');
// 绝对路径
const aPath = "D:\\codes\\node\\xj_20210207_ibas0742\\src\\views";
const defaultMenu = {
    "msg": "success",
    "flag": true,
    "code": 0,
    "data": [
        {
            "projectId": 1,
            "parentId": 0,
            "name": "地面监测",
            "url": "",
            "orderNum": 1,
            "children": [
                {
                    "projectId": 9,
                    "parentId": 1,
                    "name": "水文观测站",
                    "eName": "ShuiWenGuanCeZhan",
                    "url": "./GroundInspection/HydrologicalObservationSite/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 10,
                    "parentId": 1,
                    "name": "中亚生态与环境研究中心气象站点",
                    "eName": "ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian",
                    "url": "",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 11,
                    "parentId": 1,
                    "name": "历史气象观测数据",
                    "eName": "LiShiQiXiangGuanCeShuJu",
                    "url": "./LS/1_3",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 12,
                    "parentId": 1,
                    "name": "咸海盐尘监测",
                    "eName": "XianHaiYanChenJianCe",
                    "url": "./LS/1_4",
                    "orderNum": 4,
                    "children": []
                },
                // {
                //     "projectId": 13,
                //     "parentId": 1,
                //     "name": "历史气象再分析",
                //     "eName": "LiShiQiXiangZaiFenXi",
                //     "url": "",
                //     "orderNum": 5,
                //     "children": []
                // },
                {
                    "projectId": 14,
                    "parentId": 1,
                    "name": "土样采集",
                    "eName": "TuYangCaiJi",
                    "url": "./LS/1_6",
                    "orderNum": 6,
                    "children": []
                },
                {
                    "projectId": 15,
                    "parentId": 1,
                    "name": "水样",
                    "eName": "ShuiYang",
                    "url": "./LS/1_7",
                    "orderNum": 7,
                    "children": []
                },
                // {
                //     "projectId": 16,
                //     "parentId": 1,
                //     "name": "植被样方",
                //     "eName": "ZhiBeiYangFang",
                //     "url": "",
                //     "orderNum": 8,
                //     "children": []
                // }
            ]
        },
        {
            "projectId": 2,
            "parentId": 0,
            "name": "遥感监测",
            "url": "",
            "orderNum": 2,
            "children": [
                {
                    "projectId": 17,
                    "parentId": 2,
                    "name": "干旱指数",
                    "eName": "GanHanZhiShu",
                    "url": "./RemoteSensingMonitoring/Draught/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 18,
                    "parentId": 2,
                    "name": "蒸散发",
                    "eName": "ZhengSanFa",
                    "url": "./RemoteSensingMonitoring/ET/index.html",
                    "orderNum": 2,
                    "children": []
                },
                // {
                //     "projectId": 19,
                //     "parentId": 2,
                //     "name": "湖泊水面",
                //     "url": "./RemoteSensingMonitoring/LakeSurface/index.html",
                //     "eName": "HuPoShuiMian",
                //     "orderNum": 3,
                //     "children": []
                // },
                // {
                //     "projectId": 20,
                //     "parentId": 2,
                //     "name": "大湖区NDVI",
                //     "url": "./RemoteSensingMonitoring/GreatLakeNDVI/index.html",
                //     "eName": "DaHuQuNDVI",
                //     "orderNum": 4,
                //     "children": []
                // },
                // {
                //     "projectId": 21,
                //     "parentId": 2,
                //     "name": "大湖区EVI",
                //     "eName": "DaHuQuEVI",
                //     "url": "./RemoteSensingMonitoring/GreatLakeEVI/index.html",
                //     "orderNum": 5,
                //     "children": []
                // },
                {
                    "projectId": 22,
                    "parentId": 2,
                    "name": "大湖区TGDVI",
                    "eName": "DaHuQuTGDVI",
                    "url": "./RemoteSensingMonitoring/GreatLakeTGDVI/index.html",
                    "orderNum": 6,
                    "children": []
                }
            ]
        },
        {
            "projectId": 3,
            "parentId": 0,
            "name": "水与社会经济",
            "url": "",
            "orderNum": 3,
            "children": [
                {
                    "projectId": 23,
                    "parentId": 3,
                    "name": "社会经济",
                    "eName": "SheHuiJingJi",
                    "url": "./LS/3_1",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 24,
                    "parentId": 3,
                    "name": "社会经济用水预测",
                    "eName": "SheHuiJingJiYongShuiYuCe",
                    "url": "./LS/3_2",
                    "orderNum": 2,
                    "children": []
                }
            ]
        },
        {
            "projectId": 4,
            "parentId": 0,
            "name": "农业大数据",
            "url": "",
            "orderNum": 4,
            "children": [
                {
                    "projectId": 25,
                    "parentId": 4,
                    "name": "种植结构",
                    "eName": "ZhongZhiJieGou",
                    "url": "./AgriculturalBigData/PlantStruct/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 26,
                    "parentId": 4,
                    "name": "土地利用",
                    "eName": "TuDiLiYong",
                    "url": "./AgriculturalBigData/LandUse/index.html",
                    "orderNum": 2,
                    "children": []
                }
            ]
        },
        {
            "projectId": 5,
            "parentId": 0,
            "name": "三大湖区水生态平衡",
            "url": "",
            "orderNum": 5,
            "children": [
                {
                    "projectId": 27,
                    "parentId": 5,
                    "name": "河道流量(SWAT)",
                    "eName": "HeDaoLiuLiangSWAT",
                    "url": "./WaterEcologicalBalanceInTheThreeMajorLakes/SWAT/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 28,
                    "parentId": 5,
                    "name": "咸海水资源",
                    "eName": "XianHaiShuiZiYuan",
                    "url": "./LS/5_2",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 29,
                    "parentId": 5,
                    "name": "咸海湖盆地表变化",
                    "eName": "XianHaiHuPenDiBiaoBianHua",
                    "url": "./WaterEcologicalBalanceInTheThreeMajorLakes/ChangesInTheBasinSurfaceOfTheAralLake/index.html",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 30,
                    "parentId": 5,
                    "name": "咸海湖区水文-生态-环境模拟",
                    "eName": "XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi",
                    "url": "./WaterEcologicalBalanceInTheThreeMajorLakes/HydrologyEcologyEnvironmentSimulationInAralLake/index.html",
                    // "url": "./LS/5_4",
                    "orderNum": 4,
                    "children": []
                }
            ]
        },
        {
            "projectId": 6,
            "parentId": 0,
            "name": "咸海生态服务评估",
            "url": "",
            "orderNum": 6,
            "children": [
                {
                    "projectId": 31,
                    "parentId": 6,
                    "name": "中亚植被功能",
                    "eName": "ZhongYaZhiBeiGongNeng",
                    "url": "./AralSeaEcologicalServiceAssessment/CentralAsianVegetationFunction/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 32,
                    "parentId": 6,
                    "name": "中亚土壤功能",
                    "eName": "ZhongYaTuRangGongNeng",
                    "url": "./AralSeaEcologicalServiceAssessment/CentralAsianSoilFunction/index.html",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 33,
                    "parentId": 6,
                    "name": "咸海流域生态服务功能评估",
                    "eName": "XianHaiLiuYuShengTaiFuWuGongNengPingGu",
                    "url": "./AralSeaEcologicalServiceAssessment/EvaluationOfEcologicalServiceFunctionOfAralSeaBasin/index.html",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 34,
                    "parentId": 6,
                    "name": "咸海流域生态服务价值评估",
                    "eName": "XianHaiLiuYuShengTaiFuWuJiaZhiPingGu",
                    "url": "./AralSeaEcologicalServiceAssessment/6_4/index.html",
                    "orderNum": 4,
                    "children": []
                }
            ]
        },
        {
            "projectId": 7,
            "parentId": 0,
            "name": "生态风险评估",
            "url": "",
            "orderNum": 7,
            "children": [
                {
                    "projectId": 35,
                    "parentId": 7,
                    "name": "咸海流域历史干旱风险(1940-2010)",
                    "eName": "XianHaiLiuYuLiShiGanHanFengXian1940-2010",
                    "url": "./LS/7_1",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 36,
                    "parentId": 7,
                    "name": "咸海流域未来干旱风险(2020-2050)",
                    "eName": "XianHaiLiuYuWeiLaiGanHanFengXian2020-2050",
                    "url": "./EcologicalRiskAssessment/RiskOfFutureDroughtInTheAralSeaBasin/index.html",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 37,
                    "parentId": 7,
                    "name": "中亚生态环境系统风险评估",
                    "eName": "ZhongYaShengTaiHuanJingXiTongFengXianPingGu",
                    "url": "./LS/7_3",
                    "orderNum": 3,
                    "children": []
                }
            ]
        },
        {
            "projectId": 8,
            "parentId": 0,
            "name": "水与生态协同优化配置",
            "url": "",
            "orderNum": 8,
            "children": [
                {
                    "projectId": 38,
                    "parentId": 8,
                    "name": "土地利用变化",
                    "eName": "TuDiLiYongBianHua",
                    "url": "",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 39,
                    "parentId": 8,
                    "name": "水资源分配",
                    "eName": "ShuiZiYuanFenPei",
                    "url": "",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 40,
                    "parentId": 8,
                    "name": "生态系统服务运算结果",
                    "eName": "ShengTaiXiTongFuWuYunSuanJieGuo",
                    "url": "",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 41,
                    "parentId": 8,
                    "name": "生态系统服务目标实现率",
                    "eName": "ShengTaiXiTongFuWuMuBiaoShiXianLv",
                    "url": "",
                    "orderNum": 4,
                    "children": []
                }
            ]
        }
    ]
}

let defaultVueContent = (name,title) => `<template>
    <ModelPage title="${title}" map-rate="1">
        <div slot="left">
        </div>
        <div slot="right"></div>
    </ModelPage>    
</template>

<script>
    export default {
        name: "${name}"
    }
</script>

<style scoped>

</style>`;

let defaultInitJs = name => `function ${name}Init() {
    window.spop.setRate(1);
}

export {${name}Init}`

defaultMenu.data.forEach(m => {
    let pPath = path.join(aPath,m.name);
    if (!fs.existsSync(pPath)) {
        fs.mkdirSync(pPath);
    }
    m.children.forEach(mm => {
        let cPath = path.join(pPath,mm.name);
        if (!fs.existsSync(cPath)) {
            fs.mkdirSync(cPath);
            fs.writeFileSync(path.join(cPath,`${mm.eName}.vue`),defaultVueContent(mm.eName));
            fs.writeFileSync(path.join(cPath,`init.js`),defaultInitJs(mm.eName));
        }
    })
});

let router = `import IndexView from "./views/index";
import HuPoShuiMian from "./views/遥感影像监测/湖泊水面/HuPoShuiMian";
import DaHuQuEVI from "./views/遥感影像监测/大湖区EVI/DaHuQuEVI";
import DaHuQuNDVI from "./views/遥感影像监测/大湖区NDVI/DaHuQuNDVI";
$import$

const routers = [
    {
        path: '/',
        meta: {
            title: '中亚大湖区决策支持信息系统'
        },
        component: IndexView,
        children: [
            {
                path: "HuPoShuiMian",
                component: HuPoShuiMian
            },
            {
                path: "DaHuQuEVI",
                component: DaHuQuEVI
            },
            {
                path: "DaHuQuNDVI",
                component: DaHuQuNDVI
            },
            $children$
        ]
    }
];

export default routers;`;

let initMethods = `import { HuPoShuiMianInit } from "./遥感影像监测/湖泊水面/init";
import { DaHuQuNDVIInit } from "./遥感影像监测/大湖区NDVI/init";
import { DaHuQuEVIInit } from "./遥感影像监测/大湖区EVI/init";
$importInit$

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
$case$
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
`

let buildRouter = () => {
    let importStr = [];
    let children = [];
    let importInitStr = [];
    let caseStr = [];
    let key = {};
    defaultMenu.data.forEach(m => {
        m.children.forEach(mm => {
            if (mm.eName in key) {
                console.log(`${mm.eName} 重复`);
            } else {
                key[mm.eName] = true;
            }
            importStr.push(`//import ${mm.eName} from "./views/${m.name}/${mm.name}/${mm.eName}";`);
            children.push(`//            {
//                path: "${mm.eName}",
//                component: ${mm.eName}
//            },`);
            importInitStr.push(`//import { ${mm.eName}Init } from "./${m.name}/${mm.name}/init";`);
            caseStr.push(`//            case "${mm.name}":
//                case "${mm.eName}":
//                ${mm.eName}Init();
//                this.router.push("${mm.eName}");
//                break;`);
        });
    });
    return {
        router: router.replace('$import$',importStr.join('\r\n')).replace('$children$',children.join('\r\n')),
        init: initMethods.replace('$importInit$',importInitStr.join('\r\n')).replace('$case$',caseStr.join('\r\n'))
    };
};
let bs = buildRouter();
fs.writeFileSync('D:\\codes\\node\\xj_20210207_ibas0742\\src\\router.js',bs.router,'utf-8');
fs.writeFileSync('D:\\codes\\node\\xj_20210207_ibas0742\\src\\views\\InitMethods.js',bs.init,'utf-8');
