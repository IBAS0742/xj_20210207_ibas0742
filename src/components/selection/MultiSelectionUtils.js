/**
 * 组件默认为不使用 v-modal 传值方式，因此需要在父级实现菜单选中事件的编写
 */
const bindSelectionAction = (selectionObj) => {
    /**
     * 函数参数为 组件中 select 中 $emit 的参数
     * @param tar
     * @param item
     * @param ind
     * @param sind
     * @param notEmitChange
     */
    return (tar,item,ind,sind) => {
        if (tar === 'title') {
            for (let i = 0;i < selectionObj.length;i++) {
                if (selectionObj[i].open) {
                    if (i === ind) {
                        return;
                    } else {
                        selectionObj[i].open = false;
                    }
                }
            }
            selectionObj[ind].open = true;
        } else {
            let change = true;
            selectionObj.forEach((sta,_ind) => {
                if (change) {
                    for (let i = 0;i < sta.options.length;i++) {
                        if (sta.options[i].selected) {
                            if (_ind === ind && sind === i) {
                                change = false;
                            } else {
                                selectionObj[_ind].open = false;
                                selectionObj[_ind].options[i].selected = false;
                            }
                        }
                    }
                }
            });
            selectionObj[ind].open = true;
            selectionObj[ind].options[sind].selected = true;
            return change;
        }
    }
};

export {
    bindSelectionAction
}