const menus = [
    {
        title: '咸海区域采用数据集',
        open: false,
        options: [
            {
                key: 'ph',label:'pH总盐八大离子监测',selected: false
            },
            {
                key: 'jl',label:'土样粒径',selected: false
            },
            {
                key: 'yfsf',label:'盐分水分温度',selected: false
            },
        ]
    }
];

const columns = {
    ph: [
        {type: "selection", width: 60, align: 'center'},
        {title: "样品名称", key: "name", "width": 150},
        {title: "Cl- mg/g", key: "f1", "width": 150},
        {title: "SO42-mg/g", key: "f2", "width": 150},
        {title: "Ca2+ mg/g", key: "f3", "width": 150},
        {title: "K+ mg/g", key: "f4", "width": 150},
        {title: "Mg2+ mg/g", key: "f5", "width": 150},
        {title: "Na+ mg/g", key: "f6", "width": 150},
        {title: "CO32- mg/g", key: "f7", "width": 150},
        {title: "HCO3- mg/g", key: "f8", "width": 150},
        {title: "pH", key: "ph", "width": 150},
        {title: "总盐 mg/g", key: "zy", "width": 150},
    ],
    jl: [
        {title: "样品名称", key: "name", "width": 150},
        {title: "中位径", key: "f1", width: 150},
        {title: "体积平均径", key: "f2", width: 150},
        {title: "面积平均径", key: "f3", width: 150},
        {title: "遮光率", key: "f4", width: 150},
        {title: "跨度", key: "f5", width: 150},
        {title: "长度平均径", key: "f6", width: 150},
        {title: "比表面积", key: "f7", width: 150},
        {title: "拟合残差", key: "f8", width: 150},
        {title: "D3", key: "D3", width: 150},
        {title: "D6", key: "D6", width: 150},
        {title: "D10", key: "D10", width: 150},
        {title: "D16", key: "D16", width: 150},
        {title: "D25", key: "D25", width: 150},
        {title: "D75", key: "D75", width: 150},
        {title: "D84", key: "D84", width: 150},
        {title: "D90", key: "D90", width: 150},
        {title: "D97", key: "D97", width: 150},
        {title: "D98", key: "D98", width: 150},
    ],
    yfsf: [
        {"title": "№ point", "key": "Nam", width: 150},
        {"title": "Location", "key": "Location", width: 300},
        {"title": "E", "key": "E", width: 150},
        {"title": "N", "key": "N", width: 150},
        {"title": "Elevation, м", "key": "Z", width: 150},
        {"title": "Date", "key": "Dat", width: 150},
        {"title": "Time", "key": "ObservTime", width: 150},
        {
            title: "Weather", align: "center",
            children: [
                {"title": "Sunshine", "key": "Sunshine", width: 150},
                {"title": "Cloudiness", "key": "Cloudiness", width: 150},
                {"title": "Snow", "key": "Snow", width: 150},
                {"title": "Rain", "key": "Rain", width: 150},
            ]
        },
        {
            title: "Soil salinity", align: "center",
            children: [
                {"title": "0-20", "key": "Salin20", width: 150},
                {"title": "20-50", "key": "Salin50", width: 150},
                {"title": "50-100", "key": "Salin100", width: 150},
            ]
        },
        {
            title: "Soil electric conductivity", align: "center",
            children: [
                {"title": "0-20", "key": "EC20", width: 150},
                {"title": "20-50", "key": "EC50", width: 150},
                {"title": "50-100", "key": "EC100", width: 150},
            ]
        },
        {
            title: "Soil temperature", align: "center",
            children: [
                {"title": "0-20", "key": "Temper20", width: 150},
                {"title": "20-50", "key": "Temper50", width: 150},
                {"title": "50-100", "key": "Temper100", width: 150},
            ]
        },
        {
            title: "Soil moisture", align: "center",
            children: [
                {"title": "0-20", "key": "Moist20", width: 150},
                {"title": "20-50", "key": "Moist50", width: 150},
                {"title": "50-100", "key": "Moist100", width: 150},
            ]
        },
        {"title": "LandCov", "key": "LandCov", width: 150},
        {"title": "LandCov2", "key": "LandCov2", width: 150},
        {"title": "VegType", "key": "VegType", width: 150},
        {"title": "VegName", "key": "VegName", width: 150},
        {"title": "VegDens", "key": "VegDens", width: 150},
        {"title": "Terrain", "key": "Terrain", width: 150},
        {"title": "SoilText", "key": "SoilText", width: 150},
        {"title": "Lithology", "key": "Lithology", width: 150},
        {"title": "SoilColor", "key": "SoilColor", width: 150},
        {"title": "Note", "key": "Note", width: 300},
    ]
};

const title = {
    ph: "pH总盐八大离子监测",
    jl: "土样径粒",
    yfsf: "盐分水分温度"
};

export {menus,columns,title}