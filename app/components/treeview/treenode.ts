/**
 * 节点实体
 */
export class TreeNode {
    public id: number; //id

    public pId: number = 0;//父亲的id

    public label: string; //显示的名称

    public level: number; //层级


    public isExpend: boolean = false; //是否展开

    public iconUrl: string;

    public parent: TreeNode;    // 父节点

    public children: TreeNode[] = [];//子节点


    //0 未选中 1 半选中 2 全选中
    public chooseState: number = 0;

    public chooseStateIcon: string = 'url("./app/components/treeview/check_0.png") 0% 0% / 20px 20px no-repeat';

    //是否根节点
    public isRoot(): boolean {
        if (this.parent) {
            return false;
        } else {
            return true;
        }
    }

    //设置当前节点是否展开，如果是false，那么递归关闭当前节点的所有子节点
    public setExpand(expand: boolean) {
        this.isExpend = expand;
        if (!expand) {
            this.children.forEach(cn => cn.setExpand(false));
        }

    }

    //父节点是否展开
    public isParentExpand(): boolean {
        if (this.parent) {
            return this.parent.isExpend;
        } else {
            return false;
        }
    }

    public  isLeft(): boolean {
        return this.children.length == 0;
    }

    /**
     * 检查兄弟节点是否全部没有选中
     * @returns {boolean}
     */
    public isBrotherAllNotChecked(): boolean {
        let nodes: TreeNode[] = this.parent.children;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].chooseState != 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * 检查兄弟节点是否全部选中
     * @returns {boolean}
     */
    public isBrotherAllChecked(): boolean {
        let nodes: TreeNode[] = this.parent.children;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].chooseState != 2) {
                return false;
            }
        }
        return true;
    }

    /**
     * 设置子节点全选中
     */
    public setChildernChooseState(state: number) {
        switch (this.chooseState) {
            case 0:
                this.chooseStateIcon = 'url("./app/components/treeview/check_0.png") 0% 0% / 20px 20px no-repeat';
                break;
            case 1:
                this.chooseStateIcon = 'url("./app/components/treeview/check_1.png") 0% 0% / 20px 20px no-repeat';
                break;
            case 2:
                this.chooseStateIcon = 'url("./app/components/treeview/check_2.png") 0% 0% / 20px 20px no-repeat';
                break;
            default:
                this.chooseStateIcon = 'url("./app/components/treeview/check_0.png") 0% 0% / 20px 20px no-repeat';
                break;
        }
        if (!this.isLeft()) {
            this.children.forEach(child => {
                child.chooseState = state;
                child.setChildernChooseState(state);
            });
        }
    }

    /**
     * 改变节点选中状态
     * @param c 要改到的状态
     * @param flag 2 叶  1 枝 0根
     * @param state 0未选中 1 半选中 2 全选中
     */
    public onChoiseStateChange(state: number) {
        this.chooseState = state;
        switch (this.chooseState) {
            case 0:
                this.chooseStateIcon = 'url("./app/components/treeview/check_0.png") 0% 0% / 20px 20px no-repeat';
                break;
            case 1:
                this.chooseStateIcon = 'url("./app/components/treeview/check_1.png") 0% 0% / 20px 20px no-repeat';
                break;
            case 2:
                this.chooseStateIcon = 'url("./app/components/treeview/check_2.png") 0% 0% / 20px 20px no-repeat';
                break;
            default:
                this.chooseStateIcon = 'url("./app/components/treeview/check_0.png") 0% 0% / 20px 20px no-repeat';
                break;
        }

        if (this.parent) {//有父
            //state=0 检查兄弟是不是全0
            if (this.isBrotherAllNotChecked()) {
                this.parent.onChoiseStateChange(0);
            } else if (this.isBrotherAllChecked()) {
                this.parent.onChoiseStateChange(2);
            } else {
                this.parent.onChoiseStateChange(1);
            }
        }
    }

    /**
     * 处理子节点的选中状态
     */
    handleChildrenChooseState(state: number) {
        this.chooseState = state;
        if (this.chooseState == 0) {
            this.children.forEach(child => {
                child.handleChildrenChooseState(0)
            });
        } else if (this.chooseState == 2) {
            this.children.forEach(child => {
                child.handleChildrenChooseState(2)
            });
        }

    }
}