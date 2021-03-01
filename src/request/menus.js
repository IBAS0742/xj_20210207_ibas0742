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
                    "url": "./GroundInspection/HydrologicalObservationSite/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 10,
                    "parentId": 1,
                    "name": "中亚生态与环境研究中心气象站点",
                    "url": "",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 11,
                    "parentId": 1,
                    "name": "历史气象观测数据",
                    "url": "./LS/1_3",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 12,
                    "parentId": 1,
                    "name": "咸海盐尘监测",
                    "url": "./LS/1_4",
                    "orderNum": 4,
                    "children": []
                },
                // {
                //     "projectId": 13,
                //     "parentId": 1,
                //     "name": "历史气象再分析",
                //     "url": "",
                //     "orderNum": 5,
                //     "children": []
                // },
                {
                    "projectId": 14,
                    "parentId": 1,
                    "name": "土样采集",
                    "url": "./LS/1_6",
                    "orderNum": 6,
                    "children": []
                },
                {
                    "projectId": 15,
                    "parentId": 1,
                    "name": "水样",
                    "url": "./LS/1_7",
                    "orderNum": 7,
                    "children": []
                },
                // {
                //     "projectId": 16,
                //     "parentId": 1,
                //     "name": "植被样方",
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
                    "url": "./RemoteSensingMonitoring/Draught/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 18,
                    "parentId": 2,
                    "name": "蒸散发",
                    "url": "./RemoteSensingMonitoring/ET/index.html",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 19,
                    "parentId": 2,
                    "name": "湖泊水面",
                    "url": "./RemoteSensingMonitoring/LakeSurface/index.html",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 20,
                    "parentId": 2,
                    "name": "大湖区NDVI",
                    "url": "./RemoteSensingMonitoring/GreatLakeNDVI/index.html",
                    "orderNum": 4,
                    "children": []
                },
                {
                    "projectId": 21,
                    "parentId": 2,
                    "name": "大湖区EVI",
                    "url": "./RemoteSensingMonitoring/GreatLakeEVI/index.html",
                    "orderNum": 5,
                    "children": []
                },
                {
                    "projectId": 22,
                    "parentId": 2,
                    "name": "大湖区TGDVI",
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
                    "url": "./LS/3_1",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 24,
                    "parentId": 3,
                    "name": "社会经济用水预测",
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
                    "url": "./AgriculturalBigData/PlantStruct/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 26,
                    "parentId": 4,
                    "name": "土地利用",
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
                    "url": "./WaterEcologicalBalanceInTheThreeMajorLakes/SWAT/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 28,
                    "parentId": 5,
                    "name": "咸海水资源",
                    "url": "./LS/5_2",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 29,
                    "parentId": 5,
                    "name": "咸海湖盆地表变化",
                    "url": "./WaterEcologicalBalanceInTheThreeMajorLakes/ChangesInTheBasinSurfaceOfTheAralLake/index.html",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 30,
                    "parentId": 5,
                    "name": "咸海湖区水文-生态-环境模拟",
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
                    "url": "./AralSeaEcologicalServiceAssessment/CentralAsianVegetationFunction/index.html",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 32,
                    "parentId": 6,
                    "name": "中亚土壤功能",
                    "url": "./AralSeaEcologicalServiceAssessment/CentralAsianSoilFunction/index.html",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 33,
                    "parentId": 6,
                    "name": "咸海流域生态服务功能评估",
                    "url": "./AralSeaEcologicalServiceAssessment/EvaluationOfEcologicalServiceFunctionOfAralSeaBasin/index.html",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 34,
                    "parentId": 6,
                    "name": "咸海流域生态服务价值评估",
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
                    "name": "威海流域历史干旱风险(1940-2010)",
                    "url": "./LS/7_1",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 36,
                    "parentId": 7,
                    "name": "威海流域未来干旱风险(2020-2050)",
                    "url": "./EcologicalRiskAssessment/RiskOfFutureDroughtInTheAralSeaBasin/index.html",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 37,
                    "parentId": 7,
                    "name": "中亚生态环境系统风险评估",
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
                    "url": "",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "projectId": 39,
                    "parentId": 8,
                    "name": "水资源分配",
                    "url": "",
                    "orderNum": 2,
                    "children": []
                },
                {
                    "projectId": 40,
                    "parentId": 8,
                    "name": "生态系统服务运算结果",
                    "url": "",
                    "orderNum": 3,
                    "children": []
                },
                {
                    "projectId": 41,
                    "parentId": 8,
                    "name": "生态系统服务目标实现率",
                    "url": "",
                    "orderNum": 4,
                    "children": []
                }
            ]
        }
    ]
}

let getMenu = () => {
    return new Promise((s) => {
        let menus = [];
        defaultMenu.data.forEach(m => {
            let _m = {
                id: m.projectId,
                name: m.name,
                width: 0,
                children: []
            }
            m.children.forEach(sm => {
                _m.children.push({
                    id: sm.projectId,
                    name: sm.name,
                });
                _m.width = _m.width > sm.name.length ? _m.width : sm.name.length;
            });
            _m.width = ((_m.width + 2) * 14) + 'px';
            menus.push(_m);
        });
        s(menus);
    });
}
export {
    getMenu
}