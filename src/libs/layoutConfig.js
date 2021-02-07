const layoutConfig = {
    header: {
        height: 130
    },
    left: {
        width: 300
    },
    // 默认显示哪一个模块
    defaultPath(url) {
        if (url) {
            localStorage.setItem("__defaultPath__",url);
            return url;
        } else {
            let dp = localStorage.getItem("__defaultPath__") || "/";
            return dp;
        }
    }
};

export {
    layoutConfig
}