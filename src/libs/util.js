
const title = function (title) {
    title = title ? title + ' - Home' : 'View UI project';
    window.document.title = title;
};

// ts 为时间戳（到毫秒），返回 年-月-日T时：分：秒
const timestampToYMDHMS = (ts) => {
    let d = new Date();
    d.setTime(ts);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

export {
    title,
    timestampToYMDHMS
};
