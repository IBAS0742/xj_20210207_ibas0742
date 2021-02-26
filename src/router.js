import IndexView from "./views/index";
import HuPoShuiMian from "./views/遥感影像监测/湖泊水面/HuPoShuiMian";
import DaHuQuEVI from "./views/遥感影像监测/大湖区EVI/DaHuQuEVI";
import DaHuQuNDVI from "./views/遥感影像监测/大湖区NDVI/DaHuQuNDVI";
import ShuiWenGuanCeZhan from "./views/地面监测/水文观测站/ShuiWenGuanCeZhan";
//import ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian from "./views/地面监测/中亚生态与环境研究中心气象站点/ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian";
import LiShiQiXiangGuanCeShuJu from "./views/地面监测/历史气象观测数据/LiShiQiXiangGuanCeShuJu";
import XianHaiYanChenJianCe from "./views/地面监测/咸海盐尘监测/XianHaiYanChenJianCe";
import TuYangCaiJi from "./views/地面监测/土样采集/TuYangCaiJi";
//import ShuiYang from "./views/地面监测/水样/ShuiYang";
import GanHanZhiShu from "./views/遥感监测/干旱指数/GanHanZhiShu";
//import ZhengSanFa from "./views/遥感监测/蒸散发/ZhengSanFa";
//import DaHuQuTGDVI from "./views/遥感监测/大湖区TGDVI/DaHuQuTGDVI";
//import SheHuiJingJi from "./views/水与社会经济/社会经济/SheHuiJingJi";
//import SheHuiJingJiYongShuiYuCe from "./views/水与社会经济/社会经济用水预测/SheHuiJingJiYongShuiYuCe";
//import ZhongZhiJieGou from "./views/农业大数据/种植结构/ZhongZhiJieGou";
//import TuDiLiYong from "./views/农业大数据/土地利用/TuDiLiYong";
//import HeDaoLiuLiangSWAT from "./views/三大湖区水生态平衡/河道流量(SWAT)/HeDaoLiuLiangSWAT";
//import XianHaiShuiZiYuan from "./views/三大湖区水生态平衡/咸海水资源/XianHaiShuiZiYuan";
//import XianHaiHuPenDiBiaoBianHua from "./views/三大湖区水生态平衡/咸海湖盆地表变化/XianHaiHuPenDiBiaoBianHua";
//import XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi from "./views/三大湖区水生态平衡/咸海湖区水文-生态-环境模拟/XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi";
//import ZhongYaZhiBeiGongNeng from "./views/咸海生态服务评估/中亚植被功能/ZhongYaZhiBeiGongNeng";
//import ZhongYaTuRangGongNeng from "./views/咸海生态服务评估/中亚土壤功能/ZhongYaTuRangGongNeng";
//import XianHaiLiuYuShengTaiFuWuGongNengPingGu from "./views/咸海生态服务评估/咸海流域生态服务功能评估/XianHaiLiuYuShengTaiFuWuGongNengPingGu";
//import XianHaiLiuYuShengTaiFuWuJiaZhiPingGu from "./views/咸海生态服务评估/咸海流域生态服务价值评估/XianHaiLiuYuShengTaiFuWuJiaZhiPingGu";
//import XianHaiLiuYuLiShiGanHanFengXian1940-2010 from "./views/生态风险评估/咸海流域历史干旱风险(1940-2010)/XianHaiLiuYuLiShiGanHanFengXian1940-2010";
//import XianHaiLiuYuWeiLaiGanHanFengXian2020-2050 from "./views/生态风险评估/咸海流域未来干旱风险(2020-2050)/XianHaiLiuYuWeiLaiGanHanFengXian2020-2050";
//import ZhongYaShengTaiHuanJingXiTongFengXianPingGu from "./views/生态风险评估/中亚生态环境系统风险评估/ZhongYaShengTaiHuanJingXiTongFengXianPingGu";
//import TuDiLiYongBianHua from "./views/水与生态协同优化配置/土地利用变化/TuDiLiYongBianHua";
//import ShuiZiYuanFenPei from "./views/水与生态协同优化配置/水资源分配/ShuiZiYuanFenPei";
//import ShengTaiXiTongFuWuYunSuanJieGuo from "./views/水与生态协同优化配置/生态系统服务运算结果/ShengTaiXiTongFuWuYunSuanJieGuo";
//import ShengTaiXiTongFuWuMuBiaoShiXianLv from "./views/水与生态协同优化配置/生态系统服务目标实现率/ShengTaiXiTongFuWuMuBiaoShiXianLv";

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
                       {
               path: "ShuiWenGuanCeZhan",
               component: ShuiWenGuanCeZhan
           },
//            {
//                path: "ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian",
//                component: ZhongYaShengTaiYuHuangJingYanJiuZhongXinQiXiangZhanDian
//            },
           {
               path: "LiShiQiXiangGuanCeShuJu",
               component: LiShiQiXiangGuanCeShuJu
           },
           {
               path: "XianHaiYanChenJianCe",
               component: XianHaiYanChenJianCe
           },
           {
               path: "TuYangCaiJi",
               component: TuYangCaiJi
           },
//            {
//                path: "ShuiYang",
//                component: ShuiYang
//            },
           {
               path: "GanHanZhiShu",
               component: GanHanZhiShu
           },
//            {
//                path: "ZhengSanFa",
//                component: ZhengSanFa
//            },
//            {
//                path: "DaHuQuTGDVI",
//                component: DaHuQuTGDVI
//            },
//            {
//                path: "SheHuiJingJi",
//                component: SheHuiJingJi
//            },
//            {
//                path: "SheHuiJingJiYongShuiYuCe",
//                component: SheHuiJingJiYongShuiYuCe
//            },
//            {
//                path: "ZhongZhiJieGou",
//                component: ZhongZhiJieGou
//            },
//            {
//                path: "TuDiLiYong",
//                component: TuDiLiYong
//            },
//            {
//                path: "HeDaoLiuLiangSWAT",
//                component: HeDaoLiuLiangSWAT
//            },
//            {
//                path: "XianHaiShuiZiYuan",
//                component: XianHaiShuiZiYuan
//            },
//            {
//                path: "XianHaiHuPenDiBiaoBianHua",
//                component: XianHaiHuPenDiBiaoBianHua
//            },
//            {
//                path: "XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi",
//                component: XianHaiHuQuShuiWen-ShengTai-HuanJingMoNi
//            },
//            {
//                path: "ZhongYaZhiBeiGongNeng",
//                component: ZhongYaZhiBeiGongNeng
//            },
//            {
//                path: "ZhongYaTuRangGongNeng",
//                component: ZhongYaTuRangGongNeng
//            },
//            {
//                path: "XianHaiLiuYuShengTaiFuWuGongNengPingGu",
//                component: XianHaiLiuYuShengTaiFuWuGongNengPingGu
//            },
//            {
//                path: "XianHaiLiuYuShengTaiFuWuJiaZhiPingGu",
//                component: XianHaiLiuYuShengTaiFuWuJiaZhiPingGu
//            },
//            {
//                path: "XianHaiLiuYuLiShiGanHanFengXian1940-2010",
//                component: XianHaiLiuYuLiShiGanHanFengXian1940-2010
//            },
//            {
//                path: "XianHaiLiuYuWeiLaiGanHanFengXian2020-2050",
//                component: XianHaiLiuYuWeiLaiGanHanFengXian2020-2050
//            },
//            {
//                path: "ZhongYaShengTaiHuanJingXiTongFengXianPingGu",
//                component: ZhongYaShengTaiHuanJingXiTongFengXianPingGu
//            },
//            {
//                path: "TuDiLiYongBianHua",
//                component: TuDiLiYongBianHua
//            },
//            {
//                path: "ShuiZiYuanFenPei",
//                component: ShuiZiYuanFenPei
//            },
//            {
//                path: "ShengTaiXiTongFuWuYunSuanJieGuo",
//                component: ShengTaiXiTongFuWuYunSuanJieGuo
//            },
//            {
//                path: "ShengTaiXiTongFuWuMuBiaoShiXianLv",
//                component: ShengTaiXiTongFuWuMuBiaoShiXianLv
//            },
        ]
    }
];

export default routers;