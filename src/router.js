import IndexView from "./views/index";
import HuPoShuiMian from "./views/遥感影像监测/湖泊水面/HuPoShuiMian";
import DaHuQuEVI from "./views/遥感影像监测/大湖区EVI/DaHuQuEVI";
import DaHuQuNDVI from "./views/遥感影像监测/大湖区NDVI/DaHuQuNDVI";

const routers = [
    {
        path: '/',
        meta: {
            title: '中亚大湖区决策支持信息系统'
        },
        component: IndexView,
        children: [
            {
                path: "/HuPoShuiMian",
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
        ]
    }
];

export default routers;